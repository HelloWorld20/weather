<template>
    <div id="app">
        <head-vue></head-vue>
        <router-view></router-view>
        <player></player>
    </div>
</template>

<script>
import headVue from './components/childComponents/header.vue'
import player from './components/childComponents/player.vue'

export default {
    name: 'app',
    components: {
        headVue,
        player
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
    padding-bottom: 150px;
}

th{
    text-align: center
}
.fl{
    float: left;
}
.fr{
    float: right;
}
</style>
