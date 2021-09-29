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
import { firestore } from '../config/firebase.js'
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
    }
  },
  components: {
    ToolBar
  },
  created() {
    firestore
      .collection('users')
      .get()
      .then((snap) => {
        this.users = []
        console.log('Users')
        snap.forEach((doc) => {
          // console.log(doc.data())
          this.users.push(doc.data())
          // this.publications.push(doc.data())
          // console.log(doc.id)
        })
      })
  }
}
</script>
