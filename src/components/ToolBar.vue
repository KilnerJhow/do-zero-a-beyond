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
      <v-btn icon @click="goToMyProfile()">
        <v-avatar v-if="photoNotNull">
          <img :src="this.photo" alt="JK" />
        </v-avatar>
        <v-avatar v-else color="primary lighten-1 white--text">{{
          nameInitials
        }}</v-avatar>
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
      uid: this.$store.state.users.loggedUser.uid,
      items: [
        { name: 'Tema', icon: 'mdi-brightness-6' },
        { name: 'Usuários', icon: 'mdi-account-multiple' },
        { name: 'Logout', icon: 'mdi-logout' }
      ],
      selected: null
    }
  },
  computed: {
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
    },
    photoNotNull() {
      if (this.photo == null) {
        return false
      }
      return true
    }
  },
  methods: {
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
    },
    goToMyProfile() {
      console.log('Toolbar test icon button')
      this.$router.push(`/myprofile/${this.uid}`)
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
