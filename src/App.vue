<template lang="pug">
  #app.app
    div(v-if="!isLogin")
      sidebar.app-sidebar
      el-scrollbar.app-body
        v-header.app-body__header
        transition(mode="out-in", name="el-fade-in-linear")
            router-view.app-body__router
    div(v-else)
      transition(mode="out-in", name="el-fade-in-linear")
        router-view
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    isLogin () {
      return this.$route && (this.$route.name === 'Login' || this.$route.name === 'DataScreen' || this.$route.name === 'Blank')
    }
  }
}
</script>
<style lang="sass">
.app
  width: 100%
  min-height: 100vh
  // background: #f1f1f1
  &-sidebar
    float: left
  &-body
    float: left
    width: calc(100% - #{$sidebarWidth})
    height: 100vh
    &__router
      padding: $defaultGap
</style>
