<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    padding: 0;
    display: block;
    overflow: hidden;
    position: relative;
}
#app {
  color: #2c3e50;
  height:100%;
  overflow: hidden;
}
</style>
