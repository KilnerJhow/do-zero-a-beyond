<template>
  <v-main class="background">
    <tool-bar @delete-all="deleteAllContent($event)" />
    <add-publication @publish="addContent($event)" />
    <div v-for="(publication, index) in this.publications" :key="index">
      <publications
        :publicationProp="publication.data"
        :name="publication.name"
        :idProp="publication.id"
        :photoURL="publication.photoURL"
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
// import { firestore } from '../config/firebase.js'

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
    },
    async getPublications() {
      try {
        const axios = require('axios').default
        const req = await axios.get('http://0.0.0.0:8081/publications', {
          headers: {
            Authorization: 'Bearer autenticado'
          }
        })
        const data = req.data
        data.forEach((doc) => {
          this.publications.push({
            data: doc.data,
            id: doc.id
          })
        })
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },
  created() {
    this.getPublications()
  }
}
</script>

<style scoped></style>
