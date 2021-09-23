<template>
  <v-main>
    <tool-bar />
    <v-container fluid>
      <v-row no-gutters justify="center">
        <v-col lg="8" md="8">
          <v-card class="pa-5">
            <v-row justify="center" no-gutters>
              <v-card-title>
                {{ userName }}
              </v-card-title>
            </v-row>
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
            <v-card-title class="justify-center">
              <v-icon class="pr-2">mdi-lock</v-icon>
              Perfil Privado
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <user-publications :id="this.$route.params.id" v-if="publicUser" />
  </v-main>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import UserPublications from '../components/UserPublications.vue'

export default {
  data() {
    return {
      user_id: parseInt(this.$route.params.id)
    }
  },
  components: {
    ToolBar,
    UserPublications
  },
  computed: {
    userName() {
      let arr = this.$store.state.users.users.filter(
        (users) => users.id === this.user_id
      )
      // console.log(arr[0].name)
      return arr[0].name
    },
    publicUser() {
      console.log('User id: ' + this.user_id)
      let arr = this.$store.state.users.users.filter(
        (users) => users.id === this.user_id
      )
      console.log(arr)
      return arr[0].public
    }
  }
}
</script>
