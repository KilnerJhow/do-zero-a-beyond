<template>
  <v-container fluid>
    <v-row justify="center" no-gutters>
      <v-col lg="8" class="mt-4">
        <v-card outlined class="pa-5">
          <v-avatar color="primary white--text">JK</v-avatar>
          <span class="pa-3">Jonathan Kilner</span>
          <v-textarea
            v-model="text"
            auto-grow
            placeholder="Bora postar?"
            class="pa-3"
            height="1%"
          ></v-textarea>
          <v-card-actions>
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
      text: ''
    }
  },
  methods: {
    publish() {
      if (this.text.trim() != '') {
        let publication = {
          text: this.text,
          name: 'Jonathan Kilner'
        }
        // console.log("Adicionando " + this.text)
        this.$emit('publish', publication)
        this.text = ''
      }
    },
    cancel() {
      this.text = ''
    }
  }
}
</script>
