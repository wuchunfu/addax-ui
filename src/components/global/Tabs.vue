<template lang="pug">
  ul.tabs
    li.tabs__li(
    v-for="(t, i) in tabs",
    :key="i",
    :class="{'tabs__li--active': curTabIdx === i}",
    @click="onTabClick(t, i)"
    ) {{t.label}}
    li.tabs__line(:style="{transform: 'translateX(' + offset +'px)'}",)
    span.tabs__slot
      slot
        // el-button(type="primary") 立即申请
</template>

<script>
  export default {
    props: {
      tabs: {
        type: Array,
        required: true
      },
      curTabIdx: {
        type: Number,
        default: 0
      },
      resistChange: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'curTabIdx',
      event: 'update'
    },
    data () {
      return {
        // tabLiWidths: []
      }
    },
    computed: {
      // 这种方式只支持中文!!! 每个字的宽度一样
      tabLiWidths () {
        return this.tabs.map(t => t.label.length * 14)
      },
      offset () {
        if (!this.tabLiWidths.length) return 0
        const curTabLiWidth = this.tabLiWidths[this.curTabIdx]
        const prevTabLiWidthArr = this.tabLiWidths.slice(0, this.curTabIdx)
        const otherWidth = (this.curTabIdx * 60) + 30 + 25 - 10
        if (this.curTabIdx === 0) return otherWidth + curTabLiWidth / 2
        return otherWidth + curTabLiWidth / 2 + prevTabLiWidthArr.reduce((prev, curr) => prev + curr)
      }
    },
    methods: {
      async onTabClick (t, i) {
        if (this.curTabIdx === i) return
        if (this.resistChange) {
          this.$emit('redistedChange', t, i)
          return
        }
        this.$emit('update', i)
        // this.curTabIdx = i
        this.$emit('change', t, i)
      }
      // setOffSet () {
      //   // 60 是margin X方向的值
      //   // 30 是margin-left的值
      //   // 25 是父元素padding-left的值
      //   // return (this.curTabIdx * 60) + 30 + 25 + (document.querySelectorAll('.tabs__li')[this.curTabIdx].clientWidth / 2)
      //   this.offset = (this.curTabIdx * 60) + 55 + (document.querySelectorAll('.tabs__li')[this.curTabIdx].clientWidth / 2) - 10
      // }
    }
  }
</script>

<!--@formatter:off-->
<style lang='sass'>
  .tabs
    position: relative
    width: 100%
    padding: 10px 25px
    line-height: 45px
    background: rgba(247, 248, 250, 0.9)
    @extend %clearfix
    &__li
      float: left
      margin: 0 30px
      color: rgba(155, 155, 155, 1)
      cursor: pointer
      user-select: none
      &--active
        font-weight: 500
        color: $black
    &__line
      position: absolute
      left: 0
      bottom: 12.5px
      width: 20px
      height: 5px
      background: $black
      border-radius: 2px
      transition: transform .2s ease
    &__slot
      float: right
      // text-align: right
</style>
