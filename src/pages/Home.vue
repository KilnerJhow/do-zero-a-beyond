<template>
  <v-main class="grey lighten-4">
    <tool-bar
      :lightState="$store.state.dark_mode"
      @change-light-mode="changeLightMode($event)"
      @delete-all="deleteAllContent($event)"
    />
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

  computed: {
    reversePublication() {
      return this.publications.slice().reverse()
    }
  },

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
      // let objIndex = this.publications.findIndex(
      //   (obj) => obj.id == content.index
      // )
      // this.publications[objIndex].text = content.text
      this.$store.dispatch('content/changePublication', content)
    },
    removeContent(index) {
      // let objIndex = this.publications.findIndex((obj) => obj.id == index)
      // this.publications.splice(objIndex, 1)
      this.$store.dispatch('content/deletePublication', index)
    },
    addContent(content) {
      let temp = {
        name: content.name,
        text: content.text,
        id: this.id
      }
      this.$store.dispatch('content/addPublication', temp)
      this.$store.dispatch('content/increaseID')
    },
    deleteAllContent(content) {
      if (content == 'y') {
        this.$store.dispatch('content/deleteAllPublication')
      }
    },
    changeLightMode(dark_mode) {
      this.$store.dispatch('lightMode', dark_mode)
    }
  }
}
</script>

<style scoped></style>
