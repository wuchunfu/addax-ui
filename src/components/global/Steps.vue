<template lang="pug">
   .step-box
      el-steps(:active="active" finish-status="success" :space="300")
        el-step(:title="item" v-for="(item, index) in labels" :key="index")
</template>

<script>
  export default {
    props: {
        active: {
            type: Number,
            default: 1
        },
        labels: {
          type: Array,
          require: true
        }
    },
    data () {
      return {}
    }
  }
</script>

<style lang='sass' scoped>
.step-box
    height: 96px
    background: #ffffff
    padding: 20px 20px
    /deep/ .el-step__head.is-success
      color: #138BED
      border-color: #138BED
    /deep/ .el-step__title.is-success
      color: #138BED
    /deep/ .el-step__description.is-success
      color: #138BED
</style>