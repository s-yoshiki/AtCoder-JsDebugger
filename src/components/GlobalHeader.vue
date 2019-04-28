<template>
    <b-navbar toggleable="lg" type="dark"  class="global-header">
      <b-navbar-brand href="#/">AtCoder-JsDebugger</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>
                <i class="fas fa-bars"></i>
              </em>
            </template>
            <b-dropdown-item href="#/">
              <i class="fas fa-code"></i>
              editor
            </b-dropdown-item>
            <b-dropdown-item href="#/config/">
              <i class="fas fa-cog"></i>
              config
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>
<style>
.global-header {
  background-color:#1f1f1f;
}
</style>