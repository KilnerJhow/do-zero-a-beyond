<template>
  <v-main>
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
export default {
  methods: {
    goToUserPublications(user) {
      this.$router.push(`/publication/${user.id}`)
    }
  }
}
</script>
