<template lang="pug">
  div
    transition(name='el-fade-in', mode='out-in')
      .mask(v-show='visible', @click='onMaskClick')
    transition(name='slide', mode='out-in')
      .right-popup(:id='id', :style='{width: width}', v-show='visible')
        el-scrollbar.right-popup__scrollbar(ref='scrollbar')
          //- .right-popup__title(v-if='title')
          //-   | {{title}}
          sub-title(:name="title" v-if="title")
          .right-popup__body
            slot(name="body")
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    // 点击背景默认不关闭right-popup
    closeOnClickMask: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loadingInstance: null,
      appGather: [],
      isDetail: true,
      appIds: []
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  created () {
    // this.getAppWithUser()
  },
  methods: {
    close () {
      // 每次关闭把滚动条移动到顶部
      this.$refs.scrollbar.wrap.scrollTop = 0
      this.$emit('change', false)
    },
    onMaskClick () {
      this.$emit('mask-click')
      if (this.closeOnClickMask) this.$emit('change', false)
    },
    getAppWithUser () { //获取user应用名称
      this.$get(this.$apis.getAppWithUser).then((res)=>{
        console.log(res)
        this.appGather = res.data
      })
    }
  },
  watch: {
    loading: function (val) {
      if (val) {
        this.loadingInstance = this.$loading({
          target: '.right-popup',
          text: '数据加载中...'
        })
      } else {
        this.loadingInstance.close()
      }
    },
    visible: function (newVal, oldVal) {
      if (!newVal && newVal !== oldVal) {
        this.close()
      }
    }
  }
}
</script>

<!--@formatter:off-->
<style lang='sass'>
  .mask
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .4)
    z-index: 2000
  .right-popup
    position: fixed
    right: 0
    top: 0
    height: 100%
    background: #fff
    z-index: 2000
    // box-shadow: 0 0 5px rgba(0, 0, 0, .4)
    &__scrollbar
      height: 100vh
    &__title
      line-height: 40px
      text-align: center
      font-size: $fontNormal + 1px
      font-weight: bold
      letter-spacing: 4px
      color: #fff
      background: $primaryColor
    &__body
      padding: 0 30px 0 $defaultGap
    &__subtitle
      margin-bottom: $defaultGap
      padding-bottom: 15px
      font-size: $fontNormal + 1px
      color: $primaryColor
      border-bottom: 1px solid #ccc
</style>
