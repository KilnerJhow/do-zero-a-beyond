<template>
  <v-main>
    <v-list-item
      v-for="user of $store.state.users.users"
      :key="user.id"
      @click="goToUser(user)"
    >
      <v-list-item-tile> {{ user.name }}</v-list-item-tile>
    </v-list-item>
  </v-main>
</template>

<script>
export default {
  methods: {
    goToUser(user) {
      this.$router.push(`/user/${user.id}`)
    }
  }
}
</script>
