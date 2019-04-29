<template>
  <div class="wrapper">
    <GlobalHeader></GlobalHeader>
    <b-row>
      <b-col class="col-sm-3 hidden-xs">
        <div class="sidebar">
          <b-list-group>
            <b-list-group-item v-for="(item, key) in configs" :key="key" :href="item.url">
              <strong>{{item.title}}</strong><br>
              <small>{{item.desc}}</small>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
      <b-col class="col-sm-9 col-sm-offset-3 content">
        <br>
        <b-container fluid>
          <h2>{{mainTitle}}</h2>
          <p>{{mainDesc}}</p>
          <hr>
        </b-container>
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
import ConfigPagesConf from "@/libs/ConfigPagesConf"

export default {
  components: {
    GlobalHeader,
    mainTitle:'',
    mainDesc:'',
  },
  beforeRouteUpdate(to, from, next) {
    // URLが変わった時モデルを更新する
    this.renderHeader()
    next();
  },
  data() {
    return {
      configs:ConfigPagesConf,
    }
  },
  methods:{
    renderHeader() {
      let url = location.href.split("#")[1]
      ConfigPagesConf.forEach(e => {
        if (e.url.split("#")[1] == url) {
          this.mainTitle = e.title
          this.mainDesc = e.desc
        }
      });
    }
  },
  created() {
    this.renderHeader()
  }
};
</script>

<style>
.sidebar {
  display: none;
  background-color:#f3f3f3;
  width:20%;
}

.content {
  width:100%;
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0%;
  overflow-y: auto;
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
    overflow-y: auto;
  }
}
</style>
