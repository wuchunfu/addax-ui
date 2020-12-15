<template lang="pug">
  .sidebar
    .sidebar-header
      img.header-img(src="~@img/homelogotext.png")
    el-scrollbar.sidebar-body(tag="ul")
      li.sidebar-body__li(
      v-for="(item, idx) in menus.filter(t => !$_.isEmpty(t))",
      :key="idx",
      :class="{'sidebar-body__li--active': idx === curIdx}")
        //- span.sidebar-body__icon(:class="item.icon")
        img.sidebar-body__icon(:src="item.iconUrl")
        span.sidebar-body__label(@click="onMenuItemClick(item, idx)") {{item.name}}
        span.el-icon-arrow-right.sidebar-body__arrow(
        v-if="!$_.isEmpty(item.elementList)",
        :class="{'sidebar-body__arrow--active': item.isExpand}")
        // span.sidebar-body__badge(v-if="!isCompany && item.sign && badge[item.sign]") {{ badge[item.sign] }}
        el-collapse-transition
          ul.sidebar-submenu(v-if="!$_.isEmpty(item.elementList)", v-show="item.isExpand")
            li.sidebar-submenu__li(
            v-for="(child, childIdx) in item.elementList",
            v-if="!child.hide"
            :key="childIdx",
            :class="{'sidebar-submenu__li--active': curSubIdx === childIdx}",
            @click="onSubMenuItemClick(child, childIdx)")
              el-tooltip(effect="dark" :content="child.name" placement="right-start")
                span.sidebar-submenu__label {{child.name}}
            //- li.sidebar-submenu__dot(v-show="dotVisible", :style="{transform: 'translateY(' + 40 * curSubIdx + 'px)'}")
      // li.sidebar-body__line(:style="{transform: 'translateY(' + 66 * curIdx +'px)'}")
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

export default {
  name: 'Sidebar',
  components: {
    'el-collapse-transition': CollapseTransition
  },
  data () {
    return {
      menus: [
        // {
        //   name: '首页',
        //   pageUrl: '/admin',
        //   // icon: 'icon-home'
        //   iconUrl: require('@img/yygl.png')
        // },
        // {
        //   name: '用户首页',
        //   pageUrl: '/user',
        //   // icon: 'icon-home'
        //   iconUrl: require('@img/yygl.png')
        // },
        // {
        //   name: '应用管理',
        //   iconUrl: require('@img/yggl.png'),
        //   pageUrl: '/adminApply',
        //   elementList: [
        //     {
        //     name: '应用列表',
        //     pageUrl: '/adminApply/application'
        //   },{
        //     name: '查看应用',
        //     pageUrl: '/adminApply/message'
        //   },{
        //     name: '编辑应用',
        //     pageUrl: '/adminApply/edit'
        //   }]
        // }, {
        //   name: '接口管理',
        //   iconUrl: require('@img/xzgl.png'),
        //   pageUrl: '/adminInter',
        //   elementList: [
        //     {
        //       name: '接口列表',
        //       pageUrl: '/adminInter/interlist'
        //     },
        //     {
        //       name: '添加接口',
        //       pageUrl: '/adminInter/interadd'
        //     },
        //     {
        //       name: '编辑接口',
        //       pageUrl: '/adminInter/interedit'
        //     }]
        // },
        // {
        //   name: '数据源管理',
        //   iconUrl: require('@img/xzgl.png'),
        //   pageUrl: '/adminSource',
        //   elementList: [
        //     {
        //       name: '数据源列表',
        //       pageUrl: '/adminSource/sourcelist'
        //     }
        //   ]
        // },
        // {
        //   name: '日志管理',
        //   iconUrl: require('@img/xzgl.png'),
        //   pageUrl: '/journal',
        //   elementList: [
        //     {
        //       name: '访问日志',
        //       pageUrl: '/journal/list'
        //     }
        //   ]
        // },
        // {
        //   name: '用户管理',
        //   iconUrl: require('@img/xzgl.png'),
        //   pageUrl: '/usermag',
        // },
        // {
        //   name: '个人中心',
        //   iconUrl: require('@img/xzgl.png'),
        //   pageUrl: '/usercenter',
        //   elementList: [
        //     {
        //       name: '个人信息',
        //       pageUrl: '/usercenter/index'
        //     }
        //   ]
        // }
      ],
      curIdx: 0,
      curSubIdx: 0,
      curSubMenuId: 0,
      dialogVisible: false,
      getVerifyCodeAble: true,
      getVerifyCodeTime: 60,
      submitting: false,
      badge: {},
      // 控制小圆点的显示与隐藏
      dotVisible: false,
      loading: false,
      pwd: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }
    }
  },
  async created () {
    // if (sessionStorage.getItem('userInfo')) {
    //   this.loading = true
    //   this.menus = await this.$api('/element/query', {})
    //   if (this.menus && this.menus.length !== 0) {
    //     this.menus.forEach(t => {
    //       this.$set(t, 'isExpand', false)
    //     })
    //   }
    //   this.loading = false
    // }
    // this.menus.forEach(t => {
    //   this.$set(t, 'isExpand', false)
    // })
    this.limitRouterShow()
    this.resetMenuIdx()
  },
  watch: {
    '$route': {
      handler: function () {
        this.resetMenuIdx()
      }
    }
  },
  methods: {
    limitRouterShow () {  //menu
      let userRouters = sessionStorage.getItem('userRouters')
      userRouters = JSON.parse(userRouters)
      // console.log(userRouters)
      let menu = []
      userRouters.forEach(item => {
        let obj = {}
        obj.name = item.meta.label || ''
        obj.pageUrl = item.path || ''
        obj.iconUrl = item.meta.icon || ''
        if (item.children && item.children.length > 0) {
          // item.children = item.children.filter(_c => _c.path)
          // let elementList = item.children.map(_c => {
          //   return {
          //     name: _c.meta.breadcrumb[_c.meta.breadcrumb.length - 1].label || '',
          //     pageUrl: item.path + '/' + _c.path
          //   }
          // })
          // obj.elementList = elementList
          item.children = item.children.filter(_=>!_.meta.hide)  //最后判断是否显示出来 hide
          if (item.children.length !== 1 || item.children[0].path) { //如果子路由只有一个且！path 没有二级菜单                                   
              let elementList = item.children.map(_c => {
                let c_path = _c.path ? item.path + '/' + _c.path : item.path
                return {
                  name: _c.meta.breadcrumb[_c.meta.breadcrumb.length - 1].label || '',
                  pageUrl: c_path,
                  hide: _c.meta.hide || false
                }
              })
              obj.elementList = elementList
          }
        }
        menu.push(obj)
      })
      // console.log(menu)
      this.menus = menu
      if (this.menus && this.menus.length !== 0) {
        this.menus.forEach(t => {
          this.$set(t, 'isExpand', false)
        })
      }
    },
    resetMenuIdx () {
      // const val = this.$route
      // let curIdx = this.menus.findIndex(t => t.path === val.path)
      // if (curIdx === -1) {
      //   curIdx = this.menus.findIndex(t => t.path === '/' + val.path.split('/')[1])
      //   this.curIdx = curIdx
      //   if (!this.$_.isEmpty(this.menus[curIdx].children)) {
      //     this.menus[curIdx].isExpand = true
      //     this.curSubIdx = this.menus[curIdx].children.findIndex(t => t.path === val.path)
      //     this.dotVisible = this.curSubIdx !== -1
      //   }
      // } else {
      //   this.curIdx = curIdx
      // }
      if (!(this.menus.length > 0)) {
        return
      }
      const curRoute = this.$route
      // console.log(curRoute.path.split('/'))
      // 找到curIdx值
      // let curIdx = -1
      // let curSubIdx = -1
      // console.log(this.menus)
      this.menus.map((n, i) => {
        // 一级菜单
        if (n.pageUrl && n.pageUrl  === '/' + curRoute.path.split('/')[1]) {
          this.curIdx = i
          this.curSubIdx = -1
          n.isExpand = true
        }
        if (!this.$_.isEmpty(n.elementList)) {
          // 二级菜单
          n.elementList.map((m, j) => {
            if (m.pageUrl && (m.pageUrl === curRoute.path)) {
              // console.log(11111111111111111111111)
              this.curIdx = i
              this.curSubIdx = j
              n.isExpand = true
            }
            if (!this.$_.isEmpty(m.elementList)) {
              // 三级菜单
              m.elementList.map((o, k) => {
                console.log(k)
                if (o.pageUrl && o.pageUrl === '/' + curRoute.path.split('/')[1]) {
                  this.curIdx = i
                  this.curSubIdx = j
                  n.isExpand = true
                }
              })
            }
          })
        }
      })
      // this.curIdx = curIdx
      // this.curSubIdx = curSubIdx
      this.dotVisible = this.curSubIdx !== -1
    },
    resetForm () {
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },
    doCancel () {
      this.resetForm()
      this.dialogVisible = false
    },
    onDialogClose (done) {
      this.resetForm()
      done()
    },
    onMenuItemClick (item, idx) {
      let path = item.pageUrl
      // console.log(path)
      // sessionStorage.setItem('menuIdx', idx)
      // sessionStorage.setItem('subMenuIdx', 0)
      // this.curSubIdx = -1
      // 没有二级子菜单
      if (this.$_.isEmpty(item.elementList)) {
        // this.curSubIdx = -1
        // 点了没有二级菜单的一级菜单, 关闭所有二级菜单, 然后跳转路由
        this.menus.forEach(t => {
          if (t.isExpand) {
            t.isExpand = false
          }
        })
        if (path === '/data_screen') {
          window.open(window.location.origin + window.location.pathname + '#' + path)
        } else {
          this.$router.push(path)
        }
      } else {
        // 点了有二级菜单一级菜单
        if (this.curIdx === idx) {
          item.isExpand = !item.isExpand
        } else {
          this.menus.forEach(t => {
            if (t.isExpand) {
              t.isExpand = false
            }
          })
          item.isExpand = true
        }
      }
      if (this.curIdx !== idx) {
        this.curSubIdx = -1
        // 将小圆点给隐藏, 不让它运动
        this.dotVisible = false
      }
      this.curIdx = idx
      setTimeout(() => {
        this.dotVisible = true
      }, 300)
    },
    onSubMenuItemClick (item, idx) {
      if (!item.pageUrl) return
      this.curSubIdx = idx
      // sessionStorage.setItem('subMenuIdx', idx)
      this.$router.push({
        path: item.pageUrl
      })
    },
    doChangePhone () {
      this.dialogVisible = true
    },
    async doLoginOut () {
      this.loading = true
      try {
        await this.$api('/auth/logout')
        this.$router.replace({
          name: 'Login'
        })
      } catch (e) { console.log(e)}
      this.loading = false
    }
  }
}
</script>

<!--@formatter:off-->
<style lang='sass'>
  .user-info
    margin-bottom: 10px
    &__name
      color: $black
      margin-right: 10px
    &__role
      color: #ccc
      font-size: $fontSmall
      margin-top: 5px
    &__btns
      white-space: nowrap
  .bigZIndex
    z-index: 3000 !important
  .sidebar
    width: $sidebarWidth
    height: 100vh
    // background: #2E323F
    color: #fff
    .bigZIndex
      z-index: 3000 !important
    &-header
      background: url("~@img/homelogobg.png") no-repeat
      background-size: 100% 100%
      height: $sidebarHeaderHeight
      color: #fff
      box-shadow: 0 7px 25px 0 #2E323F
      $avatarMl: 30px
      $nameMl: 16px
      $moreMl: 18px
      display: flex
      align-items: center
      text-align: center
      .header-img
        width: 150px
        margin: 0 auto
      &__avatar
        float: left
        margin-left: $avatarMl
        margin-top: ($sidebarHeaderHeight - $sidebarAvatarWidth) / 2
        line-height: $sidebarAvatarWidth
        text-align: center
        font-size: $fontLarger
        color: $primaryColor
        background: #fff
        @include circle($sidebarAvatarWidth)
      &__name
        float: left
        width: ($sidebarWidth - $sidebarAvatarWidth - $sidebarMoreWidth - $avatarMl - $nameMl - $moreMl)
        margin-left: 16px
        line-height: $sidebarHeaderHeight
        @include text-overflow
      &__more
        float: right
        width: $sidebarMoreWidth
        margin-right: $moreMl
        margin-top: ($sidebarHeaderHeight - $fontLarger) / 2
        font-size: $fontLarger
        color: #fff
        transform: rotate(90deg)
        cursor: pointer
    &-body
      position: relative
      height: calc(100vh - #{$sidebarHeaderHeight})
      @extend %hide-scroll
      // 一级菜单样式
      &__li
        padding: 0 30px
        line-height: $sidebarItemHeight
        font-size: $fontNormal
        font-weight: 500
        user-select: none
        cursor: pointer
        transition: border .68s ease
        &--active
          color: $primaryColor
          // border-left: 5px solid $primaryColor
      &__icon
        margin-right: 20px
        line-height: $sidebarItemHeight
        // font-size: $fontNormal + 2px
        width: 17px
        height: 17px
        vertical-align: text-bottom
      &__label
        display: inline-block
        height: $sidebarItemHeight
        width: 90px
      &__arrow
        float: right !important
        margin-left: 10px !important
        text-align: right !important
        line-height: $sidebarItemHeight !important
        font-weight: bold !important
        transition: transform .3s ease
        &--active
          color: $primaryColor
          transform: rotate(90deg)
      &__line
        $offset: 10px
        position: absolute
        left: 0
        top: $offset
        width: 5px
        height: $sidebarItemHeight - $offset * 2
        background: $primaryColor
        transition: transform .3s ease
      &__badge
        $h: 18px
        float: right
        padding: 0 6px
        margin-top: ($sidebarItemHeight - $h) / 2
        height: $h
        line-height: $h
        text-align: center
        font-size: 12px
        color: #FFF
        background-color: #f56c6c
        border-radius: 10px
        white-space: nowrap

    // 二级菜单样式
    &-submenu
      $submenuItemHeight: 40px
      position: relative
      padding-left: 45px
      font-size: $fontNormal - 1px
      color: #fff
      border-top: 1px solid #CCC
      overflow: hidden
      &__li
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        line-height: $submenuItemHeight
        font-weight: normal
        &--active
          color: $primaryColor
      &__dot
        $w: 8px
        position: absolute
        left: 18px
        top: 0
        @include circle(8px)
        margin-top: ($submenuItemHeight - $w) / 2
        background: $primaryColor
        transition: transform .3s ease
</style>
