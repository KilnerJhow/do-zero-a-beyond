<template>
  <v-main class="background">
    <tool-bar @delete-all="deleteAllContent($event)" />
    <add-publication @publish="addContent($event)" />
    <div
      v-for="(publication, index) in $store.state.content.publications"
      :key="index"
    >
      <publications
        :publicationProp="publication"
        @change-content="changeContent($event)"
        @remove-content="removeContent($event)"
      />
    </div>
  </v-main>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
import Publications from '../components/Publications.vue'
import AddPublication from '../components/AddPublication.vue'

export default {
  name: 'App',

  components: {
    ToolBar,
    Publications,
    AddPublication
  },

  data() {
    return {}
  },
  methods: {
    changeContent(content) {
      this.$store.dispatch('content/changePublication', content)
    },
    removeContent(index) {
      this.$store.dispatch('content/deletePublication', index)
    },
    addContent(content) {
      this.$store.dispatch('content/addPublication', content)
    },
    deleteAllContent(content) {
      if (content == 'y') {
        this.$store.dispatch('content/deleteAllPublication')
      }
    }
  },
  mounted() {
    if (this.$store.state.users.loggedUser == null) {
      console.log('Router')
      console.log(this.$store.state.users.loggedUser)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped></style>
