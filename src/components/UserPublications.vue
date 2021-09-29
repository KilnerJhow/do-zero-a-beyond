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
import { firestore } from '../config/firebase.js'
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
        console.log('Photo not null ' + this.photo)
        return true
      } else {
        return false
      }
    },
    photo() {
      console.log('Retornando a foto: ' + this.photoURL)
      return this.photoURL
    }
  },
  methods: {},
  created() {
    console.log('URL da foto ' + this.photo)
    console.log('UID: ' + this.id)
    firestore
      .collection('publications')
      .where('user_id', '==', this.id)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          // console.log(doc.data())
          this.publications.push(doc.data())
        })
      })
  }
}
</script>
