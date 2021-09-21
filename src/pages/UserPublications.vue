<template>
  <v-main>
    <tool-bar />
    <v-container
      fluid
      v-for="(publication, index) in userPublications"
      :key="index"
    >
      <v-row no-gutters justify="center">
        <v-col lg="8" md="8" class="mt-5 align">
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
import ToolBar from '../components/ToolBar.vue'
export default {
  data() {
    return { id: parseInt(this.$route.params.id) }
  },
  components: {
    ToolBar
  },
  computed: {
    nameInitials() {
      let retName = this.$store.state.users.users.filter(
        (users) => users.id === this.id
      )

      return retName[0].name[0]
    },
    userPublications() {
      console.log('ID: ' + this.id)
      console.log(
        this.$store.state.content.publications.filter(
          (publications) => publications.user_id === this.id
        )
      )
      return this.$store.state.content.publications.filter(
        (publications) => publications.user_id === this.id
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
