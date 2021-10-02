<template>
  <v-main>
    <v-container
      fluid
      v-for="(publication, index) in this.publications"
      :key="index"
    >
      <v-row no-gutters justify="center">
        <v-col lg="8" md="8" class="align">
          <v-card class="pa-5">
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
              <v-card-text>
                {{ publication.data.text }}
              </v-card-text>
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
  </v-main>
</template>

<script>
// import { firestore } from '../config/firebase.js'
import { apiURL } from '../config/apiURL.js'
export default {
  props: ['id', 'name', 'photoURL'],
  data() {
    return {
      publications: []
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
        console.log(this.publications)
      } catch (e) {
        console.log(e)
        // alert(e)
      }
    }
  },
  created() {
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
