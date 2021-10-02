<template>
  <v-container fluid>
    <v-row align-content="center" justify="center" no-gutters>
      <v-col md="6" lg="7">
        <v-skeleton-loader
          v-if="!infoLoaded"
          type="list-item-avatar, divider, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-container
      fluid
      v-for="(publication, index) in this.publications"
      :key="index"
    >
      <v-row v-if="infoLoaded" no-gutters justify="center">
        <v-col lg="8" md="7">
          <v-card outlined class="pa-5">
            <v-row>
              <v-avatar v-if="photoNotNull">
                <img :src="photo" />
              </v-avatar>
              <v-avatar v-else color="primary white--text">
                {{ nameInitials }}
              </v-avatar>
              <span class="pa-3">{{ name }}</span>
            </v-row>
            <v-row>
              <v-card flat class="pa-5">
                {{ publication.data.text }}
              </v-card>
            </v-row>
            <v-row v-if="publicationHasImage(publication)">
              <v-img :src="publication.file"> </v-img>
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
  </v-container>
</template>

<script>
// import { firestore } from '../config/firebase.js'
import { apiURL } from '../config/apiURL.js'
export default {
  props: ['id', 'name', 'photoURL'],
  data() {
    return {
      publications: [],
      loaded: false
      // photo: this.photoURL
    }
  },
  components: {},
  computed: {
    nameInitials() {
      let name = this.name.split(' ')
      let ret = ''
      if (name.length > 1) {
        ret = name[0].charAt(0) + name[name.length - 1].charAt(0)
        return ret.toUpperCase()
      } else {
        ret = name[0].charAt(0)
        return ret
      }
    },
    photoNotNull() {
      if (this.photo != null) {
        // console.log('Photo not null ' + this.photo)
        return true
      } else {
        return false
      }
    },
    photo() {
      // console.log('Retornando a foto: ' + this.photoURL)
      return this.photoURL
    }
  },
  methods: {
    publicationHasImage(publication) {
      if (publication.file) return true

      return false
    },
    infoLoaded() {
      return this.loaded
    },
    async getUserPublications() {
      try {
        const axios = require('axios').default
        const req = await axios.get(`${apiURL}/publications`, {
          headers: {
            Authorization: 'Bearer autenticado'
          }
        })
        const data = req.data
        data.forEach((doc) => {
          if (doc.data.uid == this.id) {
            this.publications.push({
              data: doc.data,
              id: doc.id
            })
          }
        })
        this.loaded = true
        // console.log(this.publications)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },
  created() {
    this.loaded = false
    this.getUserPublications()
    // firestore
    //   .collection('publications')
    //   .where('uid', '==', this.id)
    //   .get()
    //   .then((query) => {
    //     query.forEach((doc) => {
    //       this.publications.push(doc.data())
    //     })
    //   })
  }
}
</script>
