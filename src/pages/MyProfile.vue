<template>
  <v-container>
    <tool-bar />
    <v-row align="center" justify="center">
      <v-col md="7" lg="8">
        <v-row justify="center" class="mt-4 mb-1">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                width="auto"
                height="auto"
                class="mt-10"
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar
                  v-if="!photoNotNull"
                  color="primary lighten-1 white--text"
                  size="200"
                  class="ma-4"
                >
                  <span style="font-size:36px">{{ nameInitials }}</span>
                </v-avatar>
                <v-avatar v-else size="100">
                  <v-img :src="imgURL" alt="" />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>Alterar Foto</v-card-title>
              <v-file-input
                v-model="imgFile"
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Escolha um arquivo"
                class="pa-5"
              >
              </v-file-input>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="sendImage()" color="primary">
                  Sim
                </v-btn>
                <v-btn text @click="closeDialog()" color="red">Não</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center" no-gutters>
          <v-card class="pa-5">
            <v-card-title width="700" class="justify-center">
              {{ this.name }}
              <v-dialog width="500" v-model="dialogEdit">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text small v-on="on" v-bind="attrs">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Alterar Nome</v-card-title>

                  <v-text-field v-model="name" class="pa-5"></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="changeName()" color="primary">
                      Salvar
                    </v-btn>
                    <v-btn text @click="closeDialog()" color="red"
                      >Cancelar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog width="500" v-model="dialogConfig">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text small v-on="on" v-bind="attrs">
                    <v-icon>
                      mdi-cog
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>Configurações</v-card-title>
                  <span class="pl-5">Perfil público?</span>
                  <v-switch
                    v-model="switch1"
                    :label="switch1 ? 'Sim' : 'Não'"
                    class="pa-5"
                  ></v-switch>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="changeConfig()" color="primary">
                      Salvar
                    </v-btn>
                    <v-btn text @click="closeDialog()" color="red"
                      >Cancelar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <user-publications
      :id="this.$route.params.id"
      :name="this.name"
      :photoURL="this.photoURL"
    />
  </v-container>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import UserPublications from '../components/UserPublications.vue'
import { apiURL } from '../config/apiURL.js'
export default {
  data() {
    return {
      dialog: false,
      imgFile: null,
      photoURL: this.$store.state.users.loggedUser.photoURL,
      name: this.$store.state.users.loggedUser.displayName,
      dialogEdit: false,
      dialogConfig: false,
      switch1: true
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    closeDialog() {
      this.dialog = false
      ;(this.dialogEdit = false), (this.dialogConfig = false)
    },
    photoChanged(img) {
      this.imgFile = img
    },
    sendImage() {
      console.log('Enviando foto ao servidor')
      let payload = {
        file: this.imgFile,
        uid: this.$route.params.id
      }
      console.log(payload)
      this.$store.dispatch('users/changeProfileImg', payload)
      this.dialog = false
    },
    changeName() {
      console.log('Alterando nome')
      let payload = {
        displayName: this.name,
        uid: this.$route.params.id
      }
      console.log(payload)
      this.$store.dispatch('users/changeUserName', payload)
      this.dialogEdit = false
    },
    changeConfig() {
      console.log('Alterando configurações')
      let payload = {
        public: this.switch1,
        uid: this.$route.params.id
      }
      this.$store.dispatch('users/changeConfig', payload)
      this.dialogConfig = false
    },
    async getUserInfo() {
      try {
        const axios = require('axios').default
        const req = await axios.get(
          `${apiURL}/users/collection/${this.$route.params.id}`,
          {
            headers: {
              Authorization: 'Bearer autenticado'
            }
          }
        )
        this.switch1 = req.data.public
        // console.log('Privacidade do usuario ' + this.switch1)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },
  computed: {
    photoNotNull() {
      if (this.photoURL) {
        return true
      } else {
        return false
      }
    },
    imgURL() {
      console.log(this.$store.state.users.loggedUser)
      return this.$store.state.users.loggedUser.photoURL
    },
    nameInitials() {
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
  },
  components: {
    ToolBar,
    UserPublications
  }
}
</script>
