<template>
  <v-main>
    <tool-bar />
    <v-list-item
      v-for="user of $store.state.users.users"
      :key="user.id"
      @click="goToUserPublications(user)"
    >
      <v-list-item-title> {{ user.name }}</v-list-item-title>
    </v-list-item>
  </v-main>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
export default {
  methods: {
    goToUserPublications(user) {
      this.$router.push(`/profiles/${user.id}`)
    }
  },
  components: {
    ToolBar
  }
}
</script>
