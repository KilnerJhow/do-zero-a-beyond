<template>
  <v-main>
    <v-app-bar flat plain>
      <v-spacer></v-spacer>
      <v-btn text>
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
            <v-text-field label="Login" class="pb-5"> </v-text-field>
            <v-text-field label="Password" class="pb-5"> </v-text-field>
            <v-card-actions>
              <v-btn>Login</v-btn>
              <v-btn>
                <v-icon>
                  mdi-google
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {}
</script>
