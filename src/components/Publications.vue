<template>
  <v-container fluid>
    <v-skeleton-loader
      v-if="!infoLoaded"
      type="list-item-avatar, divider, article, actions"
    ></v-skeleton-loader>
    <v-row v-else no-gutters justify="center">
      <v-col lg="8">
        <v-card outlined class="pa-5">
          <v-row>
            <v-avatar v-if="photoNotNull">
              <img :src="this.photoURL" alt="JK" />
            </v-avatar>
            <v-avatar v-else color="primary white--text">{{
              nameInitials
            }}</v-avatar>
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
                <v-card-title class="text-h5 grey lighten-2">
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
          <v-row class="pa-3 rounded">
            <v-card flat>
              {{ publicationProp.text }}
            </v-card>
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
export default {
  props: ['publicationProp', 'idProp', 'name', 'loaded', 'photoURL'],
  data() {
    return {
      dialog_delete: false,
      dialog_edit: false,
      textField: '',
      photo: null
    }
  },
  computed: {
    nameInitials() {
      let name = this.publicationProp.name.split(' ')
      let ret = ''
      if (name.length > 1) {
        // console.log(name[0].charAt(0) + name[1].charAt(0))
        ret = name[0].charAt(0) + name[name.length - 1].charAt(0)
        return ret.toUpperCase()
      } else {
        ret = name[0].charAt(0)
        return ret
      }
    },
    photoNotNull() {
      if (this.photoURL != null) {
        return true
      } else {
        return false
      }
    },
    userPublication() {
      if (
        this.publicationProp.user_id == this.$store.state.users.loggedUser.uid
      ) {
        return true
      }
      return false
    },
    infoLoaded() {
      return this.loaded
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
    removeContent() {
      this.$emit('remove-content', this.idProp)
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
      console.log('Publication id ' + this.publicationProp.user_id)
      console.log('User id ' + this.$store.state.users.loggedUser.uid)
    }
  }
  // created() {
  //   console.log('Name na publicação ' + this.name)
  //   console.log('Loaded: ' + this.loaded)
  // }
}
</script>
