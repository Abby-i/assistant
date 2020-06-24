<template>
  <div id="app">
    <!--Router占位符-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  saveState () {
    sessionStorage.setItem('state', JSON.stringify(this.$store.state))
  }
}
</script>

<style>
.el-dialog{
  background: #eef1f9 !important;
}
</style>
