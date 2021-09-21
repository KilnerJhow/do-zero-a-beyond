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
    const theme = this.$store.state.dark_mode
    // console.log('Dark mode: ' + theme)
    this.$vuetify.theme.dark = theme
  }
}
</script>

<style scoped></style>
