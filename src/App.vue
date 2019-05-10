<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  @Component({
    components: {
      Header,
      Footer
    }
  })
  export default class App extends Vue { }

</script>

