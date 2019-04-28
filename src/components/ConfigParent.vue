<template>
  <div class="wrapper">
    <GlobalHeader></GlobalHeader>
    <b-row>
      <b-col class="col-sm-3 hidden-xs">
        <div class="sidebar">
          <b-list-group>
            <b-list-group-item href="#/config/">Config</b-list-group-item>
            <b-list-group-item href="#/config/editor-theme" disable>Editor Theme</b-list-group-item>
            <b-list-group-item href="#/config/snippets">Snippets</b-list-group-item>
            <b-list-group-item href="#/config/about">About</b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col class="col-sm-9 col-sm-offset-3">
        <br> 
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
export default {
  components: {
    GlobalHeader,
  }
};
</script>

<style>
.sidebar {
  display: none;
  background-color:#f3f3f3;
  width:20%;
}

@media screen and (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    display: block;
    overflow-x: hidden;
    overflow-y: auto
  }

  .content {
    width:80%;
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 22%;
    /* right:80%; */
    /* display: block; */
    /* overflow-x: hidden; */
    overflow-y: auto
  }
}
</style>
