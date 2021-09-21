<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col lg="8">
        <v-card outlined class="pa-5">
          <v-row>
            <v-avatar color="primary white--text">{{ nameInitials }}</v-avatar>
            <span class="pa-3">{{ publicationProp.name }}</span>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog_edit" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text @click="showContent()">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Editando publicação
                </v-card-title>
                <v-textarea
                  class="ma-3"
                  v-model="textField"
                  auto-grow
                ></v-textarea>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="changeContent()">
                    Confirmar
                  </v-btn>
                  <v-btn color="red" text @click="closeDialogEdit()">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog_delete" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text retain-focus-on-click>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  >Você tem certeza de que deseja excluir?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="removeContent()" color="primary">
                    Sim
                  </v-btn>
                  <v-btn text @click="closeDialogDelete()" color="red"
                    >Não</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row class="pa-3 rounded">
            <v-card flat>
              {{ publicationProp.text }}
            </v-card>
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
</template>

<script>
export default {
  computed: {
    nameInitials() {
      let retName = this.publicationProp.name.split(' ')
      if (retName.length > 1) {
        // console.log(retName[0].charAt(0) + retName[1].charAt(0))
        return retName[0].charAt(0) + retName[1].charAt(0)
      } else {
        return retName[0].charAt(0)
      }
    }
  },
  props: ['publicationProp'],
  data() {
    return {
      dialog_delete: false,
      dialog_edit: false,
      textField: ''
    }
  },
  methods: {
    changeContent() {
      // console.log("Enviado ao main: " + this.textField)
      let content = {
        text: this.textField,
        index: this.publicationProp.id
      }
      this.dialog_edit = false
      this.$emit('change-content', content)
    },
    removeContent() {
      // console.log("Removendo conteúdo " + this.publicationProp.id)
      this.$emit('remove-content', this.publicationProp.id)
      this.dialog_delete = false
    },
    showContent() {
      this.textField = this.publicationProp.text
    },
    closeDialogDelete() {
      this.dialog_delete = false
    },
    closeDialogEdit() {
      this.dialog_edit = false
    }
  }
}
</script>
