import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Users from './pages/Users.vue'
import Profiles from './pages/Profiles.vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import MyProfile from './pages/MyProfile.vue'
import colors from 'vuetify/lib/util/colors'
import Vuetify from 'vuetify/lib/framework'
import { auth, provider, firestore, timestamp } from './config/firebase.js'
import { getAuth, signOut } from 'firebase/auth'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

const users = {
  namespaced: true,
  state: {
    loggedUser: null
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async createAccount({ commit }, payload) {
      const { email, password } = payload
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user
            .updateProfile({ displayName: payload.displayName, photoURL: null })
            .then((ret) => {
              console.log('Sucesso!')
              console.log(ret)
            })
            .catch((error) => {
              console.log(error)
            })
          console.log('Criacao bem sucedida!')
          let infoUser = {
            displayName: payload.displayName,
            email: payload.email,
            uid: res.user.uid,
            photoURL: null
          }
          console.log('User Data ' + infoUser)
          commit('saveUser', infoUser)
          commit('setUser', infoUser)

          router.push('/home')
        })
        .catch((err) => {
          console.log(err)
          alert(err.message)
        })
    },
    // eslint-disable-next-line no-unused-vars
    authenticate({ commit }, payload) {
      const { email, password } = payload
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res)

          commit('setUser', res.user)
          router.push('/home')
        })
        .catch((err) => {
          console.log(err)
          alert(err.message)
        })
    },

    // eslint-disable-next-line no-unused-vars
    authenticateGoogle({ commit }) {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          // console.log(res.user)
          commit('setUser', res.user)
          commit('saveUser', res.user)

          router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // eslint-disable-next-line no-unused-vars
    signOut({ commit }) {
      let userAuth = getAuth()
      signOut(userAuth)
        .then(() => {
          console.log('Logout bem sucedido')
          commit('setUser', null)
          router.push('/')
        })
        .catch((error) => {
          console.log('Erro')
          console.log(error)
        })
    }
  },
  mutations: {
    setUser(state, user) {
      // console.log('IN USER')
      // console.log(user)
      state.loggedUser = user
    },
    saveUser(state, payload) {
      console.log('Salvando usuario')
      console.log(payload)
      let user = {
        displayName: payload.displayName,
        email: payload.email,
        uid: payload.uid,
        photoURL: payload.photoURL,
        public: true
      }
      try {
        let existentUser = false
        firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data()) {
              existentUser = true
              console.log('Usuário existente')
            } else {
              console.log('Usuário não existente')
            }
          })
          .catch((error) => {
            console.log(error)
          })
        if (!existentUser) {
          // console.log('Tentando salvar no firestore')
          firestore
            .collection('users')
            .doc(user.uid)
            .set(user)
          console.log('Inserido no firestore com sucesso!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const content = {
  namespaced: true,
  state: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async addPublication({ commit }, payload) {
      try {
        payload.createdAt = timestamp
        await firestore.collection('publications').add(payload)
        console.log('Inserido no firestore com sucesso!')
      } catch (error) {
        console.log(error)
      }
    },
    async deletePublication({ commit }, payload) {
      try {
        await firestore
          .collection('publications')
          .doc(payload)
          .delete()
        console.log('Excluido com sucesso')
      } catch (error) {
        console.log(error)
      }
      commit('deleteContent', payload)
    },
    // eslint-disable-next-line no-unused-vars
    async changePublication({ commit }, payload) {
      try {
        await firestore
          .collection('publications')
          .doc(payload.idPublication)
          .update({
            text: payload.text
          })
        console.log('Modificado com sucesso')
      } catch (error) {
        console.log(error)
      }

      // commit('changeContent', payload)
    },
    deleteAllPublication({ commit }) {
      commit('deletePublications')
      commit('restartID')
    }
  },
  mutations: {
    addContent(state, payload) {
      let publication = {
        text: payload.text,
        name: payload.name,
        user_id: payload.user_id,
        id: state.id
      }
      console.log(publication)
      state.publications.unshift(publication)
    },
    deleteContent(state, index) {
      let objIndex = state.publications.findIndex((obj) => obj.id == index)
      state.publications.splice(objIndex, 1)
    },
    changeContent(state, content) {
      let objIndex = state.publications.findIndex(
        (obj) => obj.id == content.index
      )
      state.publications[objIndex].text = content.text
    },
    addID(state) {
      state.id += 1
    },
    deletePublications(state) {
      state.publications = []
    },
    restartID(state) {
      state.id = 0
    }
  }
}

const store = new Vuex.Store({
  state: {
    dark_mode: false
  },
  modules: {
    content: content,
    users: users
  },
  actions: {
    lightMode({ commit }, payload) {
      console.log('Changing light mode')
      commit('changeLightMode', payload)
    }
  },
  mutations: {
    changeLightMode(state, payload) {
      state.dark_mode = payload
      console.log('Dark mode ' + payload)
    }
  },
  plugins: [new VuexPersistence().plugin]
})

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profiles/:id',
    component: Profiles
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/',
    component: Login
  },
  {
    path: '/myprofile/:id',
    component: MyProfile
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && store.state.users.loggedUser === null) {
    next({ path: '/' })
  } else next()
})

Vue.config.productionTip = false

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: colors.lightBlue,
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        error: colors.red.accent3,
        background: colors.indigo.lighten5,
        info: colors.teal.darken1
      },
      dark: {
        primary: colors.blue.darken4,
        background: colors.indigo.base,
        info: colors.teal.lighten1
      }
    }
  }
})

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
