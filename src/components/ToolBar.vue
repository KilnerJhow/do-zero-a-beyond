<template>
  <div class="navbar">
    <v-app-bar app elevate-on-scroll flat class="primary">
      <v-toolbar-title class="text-uppercase" @click="goToHome()">
        <button class="button">
          <span class="font-weight-light">Vuetify</span>
          <span>Social</span>
        </button>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-avatar class="mr-4">
          <img v-if="photoNotNull" :src="this.photo" alt="JK" />
        </v-avatar>
      </v-btn>
      <span class="white--text pa-3">{{ this.name }}</span>

      <v-menu offset-y app>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab v-bind="attrs" v-on="on" text dark>
            <v-icon>mdi-arrow-down-drop-circle</v-icon>
          </v-btn>
        </template>

        <v-list text>
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="selectAction(index)"
            >
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
            <v-dialog v-model="dialog_delete_toolbar" width="500">
              <template v-slot:activator="{ on }">
                <v-list-item v-on="on">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Apagar publicações</v-list-item-title>
                </v-list-item>
              </template>

              <v-card>
                <v-card-title>
                  Deseja excluir todas as publicações?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="deleteAllPublications()">
                    Sim
                  </v-btn>
                  <v-btn text color="red" @click="closeDialog()">Não</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_delete_toolbar: false,
      photo: this.$store.state.users.loggedUser.photoURL,
      name: this.$store.state.users.loggedUser.displayName,
      items: [
        { name: 'Tema', icon: 'mdi-brightness-6' },
        { name: 'Usuários', icon: 'mdi-account-multiple' },
        { name: 'Logout', icon: 'mdi-logout' }
      ],
      selected: null
      // leftDrawer: false,
      // rightDrawer: false
    }
  },
  computed: {
    photoNotNull() {
      if (this.photo == null) {
        return false
      }
      return true
    }
  },
  methods: {
    deleteAllPublications() {
      this.$emit('delete-all', 'y')
      this.dialog_delete_toolbar = false
    },
    closeDialog() {
      this.dialog_delete_toolbar = false
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.dispatch('lightMode', this.$vuetify.theme.dark)
    },
    goToUsers() {
      if (this.$route.path != '/users') this.$router.push(`/users`)
    },
    goToHome() {
      if (this.$route.path != '/home') this.$router.push('/home')
    },
    selectAction(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.darkMode()
          break
        case 1:
          this.goToUsers()
          break
        case 2:
          console.log('Logout')
          this.$store.dispatch('users/signOut')
          break
      }
    }
  },
  mounted() {
    if (this.$store.state.users.loggedUser == null) {
      console.log('Router')
      console.log(this.$store.state.users.loggedUser)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
