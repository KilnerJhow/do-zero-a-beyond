import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Users from './pages/Users.vue'
import Profiles from './pages/Profiles.vue'
import Home from './pages/Home.vue'
import UserPublication from './pages/UserPublications.vue'

Vue.use(Vuex)
Vue.use(VueRouter)

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: 'Fulano da Silva',
        id: 0
      },
      {
        name: 'Beltrano dos Santos',
        id: 2
      },
      {
        name: 'Cicrano Zezinho',
        id: 3
      }
    ]
  }
}

const content = {
  namespaced: true,
  state: {
    publications: [
      {
        text:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae eleifend nibh. Donec volutpat tellus vel maximus scelerisque. Curabitur mattis odio lectus, non lacinia nisl imperdiet a. Pellentesque consectetur sapien lorem, id porta purus luctus nec. Aliquam sodales risus at lobortis dignissim. Mauris consectetur consectetur leo varius dictum. Sed euismod massa et arcu interdum interdum. Nulla ac sapien dolor. Maecenas id tortor urna. In mattis suscipit cursus. In eget accumsan tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse volutpat fringilla erat, a convallis nulla efficitur id. Morbi placerat luctus diam, placerat hendrerit est laoreet at.',
        name: 'Jonathan Kilner',
        id: 0
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        name: 'Fulano da silva',
        id: 1
      }
    ],
    id: 2
  },
  actions: {
    addPublication({ commit }, payload) {
      commit('addContent', payload)
    },
    deletePublication({ commit }, payload) {
      commit('deleteContent', payload)
    },
    changePublication({ commit }, payload) {
      commit('changeContent', payload)
    },
    deleteAllPublication({ commit }) {
      commit('deletePublications')
      commit('restartID')
    },
    increaseID({ commit }) {
      commit('addID')
    }
  },
  mutations: {
    //Atomica, sempre muda um valor por vez de state
    addContent(state, publication) {
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
      commit('changeLightMode', payload)
    }
  },
  mutations: {
    changeLightMode(state, payload) {
      state.dark_mode = payload
    }
  },
  plugins: [new VuexPersistence().plugin]
})

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profiles',
    component: Profiles
  },
  {
    path: '/users/:id',
    component: Users
  },
  {
    path: '/publication',
    component: UserPublication
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
