<template lang="pug">
  .layout
    navigation
      transition(mode="out-in", name="el-fade-in-linear")
        router-view.layout__router
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang='sass'>
  .layout__router
    width: 100%
    min-height: calc(100vh - #{$headerHeight + $breadcrumbHeight + $defaultGap * 3})
    background: #fff
    border-radius: 8px
    //box-shadow: 0 0 8px 0 rgba(229,229,229,0.9)
    overflow: hidden
    padding: 15px
    // margin-top: 66px
</style>
