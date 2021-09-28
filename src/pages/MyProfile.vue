<template>
  <v-container>
    <tool-bar />
    <v-row align="center" justify="center">
      <v-col>
        <v-row justify="center" class="mt-4 mb-1">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                width="auto"
                height="auto"
                class="mt-10"
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar v-if="true" color="primary white--text" size="100">
                  <span style="font-size:36px">JK</span>
                </v-avatar>
                <v-avatar v-else>
                  <img :src="this.imageFile" alt="" />
                </v-avatar>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>Alterar Foto</v-card-title>
              <v-file-input
                v-model="uploadedPhoto"
                prepend-icon="mdi-camera"
                accept="image/*"
                label="Escolha um arquivo"
                class="pa-5"
              >
              </v-file-input>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="acceptFile()" color="primary">
                  Sim
                </v-btn>
                <v-btn text @click="closeDialog()" color="red">Não</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-card>
            <v-card-title>
              Jonathan Kilner
            </v-card-title>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ToolBar from '../components/ToolBar.vue'
export default {
  data() {
    return {
      dialog: false,
      uploadedPhoto: null,
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },
    acceptFile() {
      let file = new FileReader()

      file.readAsDataURL(this.uploadedPhoto)
      file.addEventListener('load', () => {
        this.imageUrl = file.result
      })

      console.log('Image url: ' + this.imageUrl)

      this.dialog = false
    }
  },
  computed: {
    photoNotNull() {
      if (this.uploadedPhoto) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    ToolBar
  }
}
</script>
