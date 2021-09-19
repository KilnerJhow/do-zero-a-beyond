<template>
    <div class="navbar">
        <v-app-bar flat class="grey lighten-2">
            <!-- <v-app-bar-nav-icon @click="leftDrawer = !leftDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon> -->
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">Vuetify</span>
                <span>Social</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog_delete_toolbar" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                  <v-card-title>
                      Deseja excluir todas as publicações?
                  </v-card-title>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="deleteAllPublications()"> Sim </v-btn>
                      <v-btn text color="red" @click="closeDialog()">Não</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- <v-btn plain fab left class="hidden-md-and-up" @click="rightDrawer = !rightDrawer">
                <v-icon>mdi-chat</v-icon>
            </v-btn> -->
        </v-app-bar>
        <!-- <v-navigation-drawer v-model="leftDrawer" absolute class="indigo hidden-md-and-up">
            <v-list>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon class="white--text">dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer v-model="rightDrawer" absolute right>
            <v-list>
                <v-list-item>
                    <v-list-item-action>
                        <v-icon>mdi-send</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Fulano</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->

    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog_delete_toolbar: false
            // leftDrawer: false,
            // rightDrawer: false
        }
    },
    methods: {
        deleteAllPublications(){
            this.$emit('delete-all', 'y')
            this.dialog_delete_toolbar = false
        },
        closeDialog(){
            this.dialog_delete_toolbar = false
        }
    }
}
</script>
