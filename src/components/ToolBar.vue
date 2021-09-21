<template>
  <div class="navbar">
    <v-app-bar flat class="primary">
      <!-- <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon> -->
      <v-toolbar-title class="text-uppercase" @click="goToHome()">
        <!-- <v-btn class="button"> -->
        <button class="button">
          <span class="font-weight-light">Vuetify</span>
          <span>Social</span>
        </button>
        <!-- </v-btn> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="darkMode()">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
      <v-btn @click="goToUsers()" text>
        Usuários
      </v-btn>
      <v-dialog v-model="dialog_delete_toolbar" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog_delete_toolbar: false
      // leftDrawer: false,
      // rightDrawer: false
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
      if (this.$route.path != '/') this.$router.push('/')
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
