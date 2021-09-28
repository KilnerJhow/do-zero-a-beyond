<template>
  <v-main>
    <v-app-bar flat class="transparent">
      <v-spacer></v-spacer>
      <v-btn text @click="darkMode()">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container class="ma-0 pa-0 fill-height" fluid>
      <v-row no-gutters class="d-flex justify-center alignt-center">
        <v-col lg="4" md="6" sm="8">
          <div class="d-flex justify-center">
            <span class="font-weight-light">Vuetify</span>
            <span>Social</span>
          </div>
          <v-card flat outlined class="pa-5">
            <v-text-field
              label="Login"
              class="pb-5"
              clearable
              v-model="emailField"
            >
            </v-text-field>
            <v-text-field
              type="password"
              label="Password"
              class="pb-5"
              v-model="passwordField"
              clearable
            >
            </v-text-field>
            <v-card-actions>
              <v-btn @click="login()">Login</v-btn>
              <v-btn @click="loginGoogle()">
                <v-icon>
                  mdi-google
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="pink" dark v-bind="attrs" v-on="on">
                    Criar nova conta
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="info white--text">
                    Criar nova conta
                  </v-card-title>
                  <v-text-field
                    v-model="displayName"
                    label="Digite seu nome"
                    class="pa-5"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Digite seu login"
                    :rules="newEmailRules"
                    class="pa-5"
                    clearable
                    v-model="newAccEmailField"
                  ></v-text-field>
                  <v-text-field
                    ref="newPassword"
                    :rules="[rules.required, rules.password]"
                    label="Digite sua senha"
                    :type="marker ? 'text' : 'password'"
                    class="pa-5"
                    v-model="newAccPasswordField"
                    append-icon="mdi-eye"
                    @click:append="togglePasswordVisibility"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn text color="primary" @click="createAccount()">
                      Criar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="red" @click="closeDialog()">
                      Cancelar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      emailField: '',
      passwordField: '',
      newAccEmailField: '',
      newAccPasswordField: '',
      displayName: '',
      dialog: false,
      marker: false,
      rules: {
        required: (value) => !!value || 'Required.',
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/
          return (
            pattern.test(value) ||
            'Min. 8 characters with at least one capital letter, a number and a special character.'
          )
        }
      },
      newPasswordRules: [(v) => !!v || 'É preciso uma senha!'],
      newEmailRules: [
        (v) => !!v || 'Digite seu email',
        (v) =>
          (!!v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) ||
          'O e-mail precisa ser válido'
      ]
    }
  },
  methods: {
    async loginGoogle() {
      console.log('Logando com o google')
      this.$store.dispatch('users/authenticateGoogle')
    },
    async login() {
      console.log('Logando com as credenciais')
      this.$store.dispatch('users/authenticate', {
        email: this.emailField,
        password: this.passwordField
      })
    },
    async createAccount() {
      console.log('Criando nova conta')
      this.$store.dispatch('users/createAccount', {
        email: this.newAccEmailField,
        password: this.newAccPasswordField,
        displayName: this.displayName
      })
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.dispatch('lightMode', this.$vuetify.theme.dark)
    },
    togglePasswordVisibility() {
      // console.log(this.marker)
      this.marker = !this.marker
    },
    closeDialog() {
      this.dialog = false
      this.newAccPasswordField = ''
      this.newAccEmailField = ''
    }
  }
}
</script>
