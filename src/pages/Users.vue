<template>
  <v-main>
    <tool-bar />
    <v-list-item
      v-for="user of this.users"
      :key="user.uid"
      @click="goToProfile(user)"
    >
      <v-list-item-title> {{ user.displayName }}</v-list-item-title>
    </v-list-item>
  </v-main>
</template>

<script>
// import { firestore } from '../config/firebase.js'
import ToolBar from '../components/ToolBar.vue'
export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    goToProfile(user) {
      console.log(user.uid)
      this.$router.push(`/profiles/${user.uid}`)
    },
    async listAllUsers() {
      try {
        const axios = require('axios').default
        const req = await axios.get('http://0.0.0.0:8081/users', {
          headers: {
            Authorization: 'Bearer autenticado'
          }
        })
        const data = req.data
        data.forEach((doc) => {
          this.users.push({
            uid: doc.uid,
            displayName: doc.displayName,
            photoURL: doc.photoURL
          })
        })
        // console.log(this.users)
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
  },
  components: {
    ToolBar
  },
  created() {
    this.listAllUsers()
  }
}
</script>
