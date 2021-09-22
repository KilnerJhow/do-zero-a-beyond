<template>
  <v-main>
    <v-app-bar flat plain class="transparent">
      <v-spacer></v-spacer>
      <v-btn text @click="darkMode()">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container class="fill-height" fluid>
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
                    label="Digite seu login"
                    :rules="newEmailRules"
                    class="pa-5"
                    clearable
                    v-model="newAccEmailField"
                  ></v-text-field>
                  <v-text-field
                    ref="newPassword"
                    :rules="newPasswordRules"
                    label="Digite sua senha"
                    type="password"
                    class="pa-5"
                    v-model="newAccPasswordField"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn text color="primary" @click="createAccount()">
                      Criar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="red">
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
      dialog: false,
      newPasswordRules: [(v) => !!v || 'É preciso uma senha!'],
      newEmailRules: [(v) => !!v || 'Digite seu email']
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
        password: this.newAccPasswordField
      })
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this.$store.dispatch('lightMode', this.$vuetify.theme.dark)
    }
  }
}
</script>
