<template lang="pug">
    ._item
        ._item-left(class="mr20")
            p(class="_num") {{info.num}}
            p(class="mt6") {{info.name}}
        ._item-right
            i(class="iconfont") {{info.icon}}
</template>

<script>
  export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    data () {
      return {}
    }
  }
</script>

<style lang='sass'>
._item
    border: 1px solid $gray-shallow
    background: #ffffff
    border-radius: 5px
    width: 240px
    padding: 12px 0
    display: flex
    justify-content: center
    align-items: center
    p
        font-size: $fontNormal
        text-align: center
    ._num 
        font-size: $fontLarge
    i
        font-size: 32px
        color: $blue
</style>
