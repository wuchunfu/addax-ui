<template lang="pug">
  .header
    // img.header__logo(src="@img/logo.png")
    .left-box
      span.header__title Addax 管理系统
      breadcrumb
    .header-user
      img.header-user__avatar(:src="userInfo.avatar")
      span.header-user__name {{userInfo.userName}}
      el-popover(placement='bottom', width='210', trigger='hover')
        .user-info
          span.user-info__name {{userInfo.userName}}
          //- span.user-info__role {{$userInfo().userName}}
        .user-info__btns(style="text-align:right")
          //- el-button(type='primary', size='mini', @click="doChangePhone") 修改密码
          el-button(size='mini', :loading="loading", @click="doLoginOut") 退出登录
        span.user-info__more.el-icon-caret-bottom(slot='reference')
</template>

<script>
export default {
  name: 'Header',
  data () {
    const validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwd.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwd.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else callback()
    }
    return {
      pwd: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      },
      rules: {
        oldPassword: {
          required: true,
          message: '请输原密码',
          trigger: 'blur'
        },
        newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }, {
          validator: validateNewPwd,
          trigger: 'blur'
        }],
        confirmPassword: [{
          required: true,
          message: '请输入确认密码',
          trigger: 'blur'
        }, {
          validator: validateConfirmPwd,
          trigger: 'blur'
        }]
      },
      adminHeadImg: require('@img/admin-headimg.png'),
      userHeadImg: require('@img/user-headimg.png'),
      dialogVisible: false,
      submitting: false,
      loading: false,
      userInfo: {
        avatar: '',
        nickName: '吴彦祖'
      }
    }
  },
  mounted () {
    this.userInfo = this.$userInfo()
    // console.log(this.userInfo)
    if (this.userInfo.userType === 1) {
      this.userInfo.avatar = this.adminHeadImg
    } else {
      this.userInfo.avatar = this.userHeadImg
    }
  },
  methods: {
    doCancel () {
      this.resetForm()
      this.dialogVisible = false
    },
    doUpdatePwd () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.submitting = true
        try {
          await this.$api.modifyPassword(this.pwd)
          this.$router.replace({
            name: 'Login'
          })
          this.$notify.success({
            title: '成功',
            message: '密码修改成功, 请重新登录'
          })
        } catch (e) {console.log(e) }
        this.submitting = false
      })
    },
    resetForm () {
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },
    onDialogClose (done) {
      this.resetForm()
      done()
    },
    doChangePhone () {
      this.dialogVisible = true
    },
    async doLoginOut () {  //退出登录
      this.loading = true
      // try {
      //   await this.$api('/auth/logout')
      //   this.$router.replace({
      //     name: 'Login'
      //   })
      // } catch (e) { console.log(e)}
      let userInfo =  JSON.parse(sessionStorage.getItem('userInfo'))
      let userType = userInfo.userType
      // console.log(userType)
      if (userType == 1) {
        // sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userRouters')
        sessionStorage.removeItem('token')
        this.$router.replace({
          name: 'Login'
        })
      } else {
        try{
          let resp = await this.$get(this.$apis.logout)
          let url = resp.data
          // sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('userRouters')
          sessionStorage.removeItem('token')
          window.location.replace(url)
        } catch(e) {
          console.log(e)
        }
      }
      this.loading = false
    }
  }
}
</script>

<!--@formatter:off-->
<style lang='sass'>
  .header
    width: 100%
    height: $headerHeight
    padding: 0 $defaultGap
    font-size: $fontLarge + 2px
    display: flex
    justify-content: space-between
    // background: #2E323F
    // position: fixed
    // top: 0
    // left: 0
    // right: 0
    &__logo
      $logoW: 33px
      @include circle($logoW)
      float: left
      margin-top: ($headerHeight - $logoW) / 2
      margin-right: 6px
    &__title
      // line-height: $headerHeight
      color: #fff
      letter-spacing: 2px
      font-size: 30px
    &__icon
      float: right
      line-height: $headerHeight
      text-align: center
      font-size: $fontLarger
      color: $primaryColor
      cursor: pointer
    &-user
      float: right
      font-size: 14px
      color: #fff
      line-height: $headerHeight
      .user-info__more
        margin-left: 9px
      &__name
        color: #fff
      &__avatar
        width: 40px
        height: 40px
        border-radius: 50%
        border: 2px solid #ffffff
        vertical-align: middle
        margin-right: 15px
</style>
