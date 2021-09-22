<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {}
  },
  mounted() {
    this.$vuetify.theme.dark = this.$store.state.dark_mode
  }
}
</script>

<style scoped></style>
