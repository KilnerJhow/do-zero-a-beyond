<template>
  <v-main>
    <v-btn @click="test()">Teste</v-btn>
  </v-main>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    test() {
      // let id = this.$route.params.id

      console.log(
        this.$store.state.content.publications.filter(
          (publications) => publications.user_id === 4
        )
      )
    }
  }
}
</script>
