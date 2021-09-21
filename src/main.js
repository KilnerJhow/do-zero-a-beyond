import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'
import Users from './pages/Users.vue'
import Profiles from './pages/Profiles.vue'
import Home from './pages/Home.vue'
import colors from 'vuetify/lib/util/colors'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(Vuetify)

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: 'Fulano da Silva',
        id: 0,
        public: false
      },
      {
        name: 'Beltrano dos Santos',
        id: 2,
        public: false
      },
      {
        name: 'Cicrano Zezinho',
        id: 3,
        public: false
      },
      {
        name: 'Jonathan Kilner',
        id: 4,
        public: true
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
        user_id: 4,
        id: 0
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        name: 'Fulano da silva',
        user_id: 0,
        id: 1
      },
      {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        name: 'Fulano da silva',
        user_id: 0,
        id: 2
      }
    ],
    id: 2
  },
  actions: {
    addPublication({ commit }, payload) {
      commit('addContent', payload)
      commit('addID')
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
    path: '/',
    component: Home
  },
  {
    path: '/profiles/:id',
    component: Profiles
  },
  {
    path: '/users',
    component: Users
  }
]

const router = new VueRouter({
  routes
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
