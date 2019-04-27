<template>
  <div class="wrapper">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="header">
      <b-navbar-brand href="#">AtCoder-JsDebugger</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>
                <i class="fas fa-bars"></i>
              </em>
            </template>
            <b-dropdown-item href="#">
              <i class="fas fa-cog"></i>
              settings
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-row>
      <b-col class="col-sm-3 hidden-xs">
        <div class="sidebar">
        </div>
      </b-col>
      <b-col class="col-sm-9 col-sm-offset-3">
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  components: {}
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

  header {
    position: fixed;
    /* top: 56px;
    bottom: 0;
    left: 0; */
    display: block;
    overflow-x: hidden;
    overflow-y: auto  
  }

  content {
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto  
  }
}
</style>
