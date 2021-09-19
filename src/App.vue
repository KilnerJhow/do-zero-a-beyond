<template>
  <v-app>
    <v-main class="grey lighten-4">
      <tool-bar @delete-all="deleteAllContent($event)" />
      <add-publication @publish="addContent($event)" />
      <div v-for="(publication, index) in reversePublication" :key="index">
        <!-- <div v-for="(publication, index) in publications.slice().reverse()" :key="index"> -->
        <publications
          :publicationProp="publication"
          @change-content="changeContent($event)"
          @remove-content="removeContent($event)"
        />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import Publications from './components/Publications.vue'
import AddPublication from './components/AddPublication.vue'

export default {
  name: 'App',

  computed: {
    reversePublication() {
      return this.publications.slice().reverse()
    }
  },

  components: {
    ToolBar,
    Publications,
    AddPublication
  },

  data() {
    return {
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
    }
  },
  methods: {
    changeContent(content) {
      console.log('Retornou: ' + content.text)
      console.log('Retornou: ' + content.index)
      let objIndex = this.publications.findIndex(
        (obj) => obj.id == content.index
      )
      this.publications[objIndex].text = content.text
    },
    removeContent(index) {
      let objIndex = this.publications.findIndex((obj) => obj.id == index)
      this.publications.splice(objIndex, 1)
    },
    addContent(content) {
      let temp = {
        name: content.name,
        text: content.text,
        id: this.id
      }
      this.publications.push(temp)
      this.id += 1
    },
    deleteAllContent(content) {
      if (content == 'y') {
        this.publications = []
        this.id = 0
      }
    }
  }
}
</script>

<style scoped></style>
