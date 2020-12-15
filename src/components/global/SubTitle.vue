<template lang="pug">
    .sub-title
      p {{name}}
      span
        slot
</template>

<script>
  export default {
    props: {
        name: {
            type: String,
            require: true
        }
    },
    data () {
      return {}
    }
  }
</script>

<style lang='sass' scoped>
.sub-title
  padding: 10px 0
  margin-bottom: 10px
  @extend %clearfix
  p
    font-size: $fontMiddle
    padding: 1px 0
    border-left: 6px solid $blue
    text-indent: 10px
    font-weight: bold
    float: left
  span
    float: right
</style>