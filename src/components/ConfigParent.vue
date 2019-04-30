<template>
  <div class="wrapper">
    <GlobalHeader></GlobalHeader>
    <b-row>
      <b-col>
        <div class="sidebar">
          <b-list-group>
            <b-list-group-item v-for="(item, key) in configs" :key="key" :href="item.url">
              <strong>{{item.title}}</strong><br>
              <small>{{item.desc}}</small>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col cols="9">
        <br>
          <br>
          <b-container fluid>
            <div class="content">
              <h3>{{mainTitle}}</h3>
              <p>{{mainDesc}}</p>
              <hr>
              <router-view/>
            </div>
          </b-container>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GlobalHeader from './GlobalHeader'
import ConfigPagesConf from '@/libs/ConfigPagesConf'

export default {
  components: {
    GlobalHeader,
    mainTitle:'',
    mainDesc:'',
  },
  beforeRouteUpdate (to, from, next) {
    // URLが変わった時モデルを更新する
    this.renderHeader()
    next()
  },
  data () {
    return {
      configs:ConfigPagesConf,
    }
  },
  methods:{
    renderHeader () {
      let url = location.href.split("#")[1]
      ConfigPagesConf.forEach(e => {
        if (e.url.split("#")[1] == url) {
          this.mainTitle = e.title
          this.mainDesc = e.desc
        }
      })
    }
  },
  created () {
    this.renderHeader()
  }
}
</script>

<style>
.sidebar {
  display: none;
  background-color:#f3f3f3;
  width:20%;
}

/* .content {
  width:100%;
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0%;
  overflow-y: auto;
} */

@media screen and (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    display: block;
    /* overflow-x: hidden; */
    overflow-y: auto;
    width:18%;
  }

  .content {
    width:70%;
    position: fixed;
    top: 80px;
    bottom: 0;
    display: block;
    overflow-y: auto;
  }
}
</style>
