<template>
  <v-main>
    <v-container
      fluid
      v-for="(publication, index) in userPublications"
      :key="index"
    >
      <v-row no-gutters justify="center">
        <v-col lg="8" md="8" class="align">
          <v-card class="pa-5">
            <v-row>
              <v-avatar color="primary white--text">{{
                nameInitials
              }}</v-avatar>
              <span class="pa-3">{{ publication.name }}</span>
            </v-row>
            <v-row>
              <v-card-text>
                {{ publication.text }}
              </v-card-text>
            </v-row>
            <v-row justify="space-between">
              <v-btn plain @click="test()">
                <v-icon>mdi-thumb-up-outline</v-icon>
              </v-btn>
              <v-btn plain>
                <v-icon>mdi-comment-outline</v-icon>
              </v-btn>
              <v-btn plain>
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      user_id: parseInt(this.id)
    }
  },
  components: {},
  computed: {
    nameInitials() {
      let arr = this.$store.state.users.users.filter(
        (users) => users.id === this.user_id
      )

      let name = arr[0].name.split(' ')
      // console.log('Nome: ' + name)

      if (name.length > 1) {
        // console.log(name.charAt(0) + name.charAt(0))
        return name[0].charAt(0) + name[name.length - 1].charAt(0)
      } else {
        return name[0].charAt(0)
      }
    },
    userPublications() {
      // console.log('ID: ' + this.id)
      // console.log(
      //   this.$store.state.content.publications.filter(
      //     (publications) => publications.user_id === this.user_id
      //   )
      // )
      return this.$store.state.content.publications.filter(
        (publications) => publications.user_id === this.user_id
      )
    }
  },
  methods: {
    // test() {
    //   let retName = this.$store.state.users.users.filter(
    //     (users) => users.id === this.id
    //   )
    //   console.log('retName: ')
    //   console.log(retName[0].name[0])
    // }
  }
}
</script>
