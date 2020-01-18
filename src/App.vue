<template>
  <div id="app">
    <Stats />
  </div>
</template>

<script>
import Stats from './components/Stats.vue'

export default {
  name: 'app',
  components: {
    Stats
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 30px;
}
</style>
