<template>
  <div id="app">
    <head-vue></head-vue>
    <router-view></router-view>
  </div>
</template>

<script>
import headVue from './components/childComponents/header.vue'

export default {
    name: 'app',
    components: {
        headVue
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
