<template>
  <v-main class="background">
    <tool-bar @delete-all="deleteAllContent($event)" />
    <add-publication @publish="addContent($event)" />
    <div v-for="(publication, index) in this.publications" :key="index">
      <publications
        :publicationProp="publication.data"
        :idProp="publication.id"
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
import { firestore } from '../config/firebase.js'

export default {
  name: 'App',

  components: {
    ToolBar,
    Publications,
    AddPublication
  },

  data() {
    return {
      publications: []
    }
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
  created() {
    firestore
      .collection('publications')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        this.publications = []
        snap.forEach((doc) => {
          this.publications.push({
            data: doc.data(),
            id: doc.id
          })
          // this.publications.push(doc.data())
          // console.log(doc.id)
        })
      })
  }
}
</script>

<style scoped></style>
