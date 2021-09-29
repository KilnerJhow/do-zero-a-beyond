<template>
  <v-main>
    <tool-bar />
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col v-if="true" lg="8" md="8">
          <v-row justify="center" class="ma-4">
            <v-avatar size="100">
              <v-img :src="this.user.photoURL"></v-img>
            </v-avatar>
          </v-row>
          <v-card class="pa-5">
            <v-card-title class="justify-center">
              <span v-if="infoLoaded">
                {{ this.user.displayName }}
              </span>
              <v-skeleton-loader
                v-if="!infoLoaded"
                type="text"
                width="700"
              ></v-skeleton-loader>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center" style="height:50vh" v-if="!publicUser">
        <v-col
          lg="8"
          md="8"
          class="d-flex flex-column justify-center align-center"
        >
          <v-card>
            <v-skeleton-loader
              v-if="!infoLoaded"
              type="list-item-avatar, divider, article, actions"
              width="700"
            >
            </v-skeleton-loader>
            <v-card-title v-if="infoLoaded" class="justify-center">
              <v-icon class="pr-2">mdi-lock</v-icon>
              Perfil Privado
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <user-publications
      v-if="infoLoaded && publicUser"
      :id="this.$route.params.id"
      :name="this.user.displayName"
      :photoURL="this.user.photoURL"
    />
  </v-main>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import UserPublications from '../components/UserPublications.vue'
import { firestore } from '../config/firebase.js'

export default {
  data() {
    return {
      user: {}
    }
  },
  components: {
    ToolBar,
    UserPublications
  },
  computed: {
    userName() {
      // if(user.displayName)
      return 'a'
    },
    publicUser() {
      // return false
      return this.user.public
    },
    infoLoaded() {
      // return false
      if (this.user != {}) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    firestore
      .collection('users')
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.data()) {
          // console.log('Profile')
          this.user = {}
          this.user = doc.data()
          console.log(this.user.displayName)
        }
      })
  }
}
</script>
