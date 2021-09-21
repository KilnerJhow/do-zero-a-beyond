<template>
  <v-main class="background">
    <v-btn @click="test()">aaaaaaaa</v-btn>
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
      let temp = {
        name: content.name,
        text: content.text,
        id: this.id
      }
      this.$store.dispatch('content/addPublication', temp)
    },
    deleteAllContent(content) {
      if (content == 'y') {
        this.$store.dispatch('content/deleteAllPublication')
      }
    },
    changeLightMode(dark_mode) {
      this.$store.dispatch('lightMode', dark_mode)
    },
    test() {
      let index = 4
      console.log(this.$store.getters['content/getPublicationByUserId'](index))
    }
  }
}
</script>

<style scoped></style>
