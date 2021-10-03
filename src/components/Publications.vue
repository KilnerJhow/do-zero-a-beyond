<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col lg="8" md="7">
        <v-skeleton-loader
          v-if="!infoLoaded"
          type="list-item-avatar, divider, article, actions"
        ></v-skeleton-loader>
        <v-card v-else outlined class="pa-5">
          <v-row>
            <v-avatar v-if="urlPhotoNotNull">
              <img :src="this.photoURL" alt="JK" />
            </v-avatar>
            <v-avatar v-else color="primary white--text">
              {{ nameInitials }}
            </v-avatar>
            <span class="pa-3">{{ name }}</span>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog_edit" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="userPublication"
                  v-bind="attrs"
                  v-on="on"
                  text
                  @click="showContent()"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title color="primary">
                  Editando publicação
                </v-card-title>
                <v-textarea
                  class="ma-3"
                  v-model="textField"
                  auto-grow
                ></v-textarea>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="changeContent()">
                    Confirmar
                  </v-btn>
                  <v-btn color="red" text @click="closeDialogEdit()">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog_delete" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="userPublication"
                  v-bind="attrs"
                  v-on="on"
                  text
                  retain-focus-on-click
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  >Você tem certeza de que deseja excluir?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="removeContent()" color="primary">
                    Sim
                  </v-btn>
                  <v-btn text @click="closeDialogDelete()" color="red"
                    >Não</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row class="pa-3 rounded" v-if="publicationHasText">
            <v-card flat class="pt-5 pb-5">
              {{ publicationProp.text }}
            </v-card>
          </v-row>
          <v-row v-if="publicationHasImage">
            <v-img :src="this.publicationProp.file"> </v-img>
          </v-row>
          <v-row justify="space-between">
            <v-btn plain @click="test()">
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-btn>
            <v-btn plain>
              <v-icon>mdi-comment-outline</v-icon>
            </v-btn>
            <v-btn plain>
              <v-icon>mdi-share</v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { firestore } from '../config/firebase.js'
import { apiURL } from '../config/apiURL.js'
export default {
  props: ['publicationProp', 'idProp'],
  data() {
    return {
      name: null,
      photoURL: null,
      loaded: false,
      dialog_delete: false,
      dialog_edit: false,
      textField: '',
      photo: null
    }
  },
  computed: {
    nameInitials() {
      if (this.infoLoaded) {
        let name = this.name.split(' ')
        let ret = ''
        if (name.length > 1) {
          // console.log(name[0].charAt(0) + name[1].charAt(0))
          ret = name[0].charAt(0) + name[name.length - 1].charAt(0)
          return ret.toUpperCase()
        } else {
          ret = name[0].charAt(0)
          return ret
        }
      }
      return ''
    },
    urlPhotoNotNull() {
      if (this.photoURL != null) {
        return true
      } else {
        return false
      }
    },
    userPublication() {
      if (this.publicationProp.uid == this.$store.state.users.loggedUser.uid) {
        return true
      }
      return false
    },
    infoLoaded() {
      return this.loaded
    },
    publicationHasImage() {
      if (this.publicationProp.file) return true

      return false
    },
    publicationHasText() {
      if (this.publicationProp.text != null) return true

      return false
    }
  },
  methods: {
    changeContent() {
      let content = {
        text: this.textField,
        idPublication: this.idProp
      }
      this.dialog_edit = false
      console.log('ID da publicação: ' + this.idProp)
      this.$emit('change-content', content)
    },
    async removeContent() {
      // this.$emit('remove-content', this.idProp)
      try {
        const axios = require('axios').default
        await axios.delete(`${apiURL}/publications/${this.idProp}`, {
          headers: {
            Authorization: 'Bearer autenticado'
          }
        })
        alert('Deletado com sucesso!')
        console.log('Deletado com sucesso!')
        // console.log(req)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
      this.dialog_delete = false
    },
    showContent() {
      this.textField = this.publicationProp.text
    },
    closeDialogDelete() {
      this.dialog_delete = false
    },
    closeDialogEdit() {
      this.dialog_edit = false
    },
    test() {
      console.log('Curti!')
      // console.log('Publication id ' + this.publicationProp.user_id)
      // console.log('User id ' + this.$store.state.users.loggedUser.uid)
    },
    async getUserInfo() {
      try {
        const axios = require('axios').default
        const req = await axios.get(
          `${apiURL}/users/${this.publicationProp.uid}`,
          {
            headers: {
              Authorization: 'Bearer autenticado'
            }
          }
        )
        console.log('photoURL: ' + req.data.photoURL)
        this.name = req.data.displayName
        this.photoURL = req.data.photoURL
        this.loaded = true
        // console.log('name: ' + this.name)
      } catch (e) {
        console.log(e)
        // alert(e)
      }

      // console.log(req.data.displayName)
    }
  },
  created() {
    this.loaded = false
    this.getUserInfo()
  }
}
</script>
