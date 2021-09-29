<template>
  <v-main class="background">
    <tool-bar @delete-all="deleteAllContent($event)" />
    <add-publication @publish="addContent($event)" />
    <div v-for="(publication, index) in this.publications" :key="index">
      <publications
        :publicationProp="publication.data"
        :name="publication.name"
        :idProp="publication.id"
        :loaded="loaded"
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
      publications: [],
      loaded: false
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
    this.loaded = false
    firestore
      .collection('publications')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        this.publications = []
        snap.forEach((doc) => {
          // console.log('UID: ' + doc.data().uid)
          // console.log(doc.data())
          firestore
            .collection('users')
            .doc(doc.data().uid)
            .get()
            .then((ret) => {
              // console.log('Name na home: ' + ret.data().displayName)
              this.loaded = true
              // console.log(ret.data())
              this.publications.push({
                data: doc.data(),
                name: ret.data().displayName,
                photoURL: ret.data().photoURL,
                id: doc.id
              })
            })
        })
      })
  }
}
</script>

<style scoped></style>
