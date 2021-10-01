<template>
  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col lg="8" class="mt-4">
        <v-card outlined class="pa-5">
          <v-avatar v-if="photoNotNull">
            <img :src="this.photo" alt="JK" />
          </v-avatar>
          <v-avatar v-else color="primary white--text">
            {{ nameInitials }}
          </v-avatar>
          <span class="pa-3">{{ this.name }}</span>
          <v-textarea
            v-if="this.textVisibility"
            v-model="text"
            auto-grow
            placeholder="Bora postar?"
            class="pa-3"
            height="1%"
          ></v-textarea>
          <v-file-input
            v-if="this.imgVisibility"
            v-model="imgFile"
            prepend-icon="mdi-camera"
            accept="image/*"
            label="Escolha um arquivo"
            class="pa-5"
          >
          </v-file-input>
          <v-card-actions class="mt-10">
            <v-btn text @click="toggleTextVisibility()">
              <v-icon>mdi-format-text</v-icon>
            </v-btn>
            <v-btn text @click="toggleImgVisibility()">
              <v-icon>mdi-camera</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="publish()">Publicar</v-btn>
            <v-btn text color="red" @click="cancel()">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      name: this.$store.state.users.loggedUser.displayName,
      photo: this.$store.state.users.loggedUser.photoURL,
      textVisibility: false,
      imgVisibility: false,
      imgFile: null
    }
  },
  computed: {
    photoNotNull() {
      if (this.photo != null) {
        return true
      } else {
        return false
      }
    },
    nameInitials() {
      let name = this.name.split(' ')
      let ret = ''
      if (name.length > 1) {
        // console.log(name[0].charAt(0) + name[1].charAt(0))
        ret = name[0].charAt(0) + name[name.length - 1].charAt(0)
        return ret.toUpperCase()
      } else {
        ret = name[0].charAt(0)
        return ret
      }
    }
  },
  methods: {
    publish() {
      if (this.text.trim() != '') {
        let publication = {
          text: this.text,
          uid: this.$store.state.users.loggedUser.uid,
          file: this.imgFile
        }
        this.$emit('publish', publication)
        this.text = ''
      }
    },
    cancel() {
      this.text = ''
    },
    toggleTextVisibility() {
      this.textVisibility = !this.textVisibility
    },
    toggleImgVisibility() {
      this.imgVisibility = !this.imgVisibility
    }
  }
}
</script>
