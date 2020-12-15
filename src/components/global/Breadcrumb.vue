<template lang="pug">
  .breadcrumb
    span.breadcrumb__title 当前位置:
    span.breadcrumb__router(
    v-for="(t, i) in breadcrumb",
    :key="i",
    @click="go(t.value)"
    ) {{isCompany ? t.label : (t.adminLabel ? t.adminLabel : t.label)}}
</template>

<script>
  export default {
    data () {
      const vm = this
      // const isCompany = this.$userInfo().isCompany
      const isCompany = false
      return {
        isCompany,
        breadcrumb: vm.$route.meta.breadcrumb
      }
    },
    watch: {
      '$route': {
        handler: function (val) {
          this.breadcrumb = val.meta.breadcrumb
        }
      },
      immediate: true
    },
    methods: {
      go (path) {
        if (!path) return
        if (path === -1) return this.$router.back()
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang='sass'>
  .breadcrumb
    height: $breadcrumbHeight
    // margin-bottom: $defaultGap
    font-size: 14px
    // margin-top: 42px
    &__title
      color: #fff
      margin-right: 8px
    &__router
      margin-left: 5px
      color: #fff
      cursor: pointer
      user-select: none
      &:after
        content: '\E600'
        font-family: 'iconfont', sans-serif !important
        display: inline-block
        margin-left: 5px
      &:last-child:after
        content: ''
</style>
