<template>
  <div class="login">
    <div class="login-content">
      <div class="left-pic select-none">
        <!-- <img src="@/assets/img/login.png" alt=""> -->
      </div>
      <div class="right-cont">
        <div class="form-box">
          <div class="logo">
            <img src="~@img/l-logo.png" alt="" class="select-none" style="width: 100%;">
          </div>
          <h1 class="title">{{title}}</h1>
          <div class="login-info info" v-if="window_type === 0">
            <el-form :model="login.query" ref="loginForm" label-width="0px" label-position="left" class="transition-el-form mt25" :rules="rules">
              <el-form-item class="input-box" prop="userName">
                <el-input @keyup.enter.native="doLogin" v-model="login.query.userName" placeholder="请输入账号" prefix-icon="">
                  <i slot="prefix" class="iconfont"> 
                    {{'\ue660'}}
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item class="input-box" prop="password">
                <el-input v-model="login.query.password" placeholder="请输入密码" type="password" style="width: 340px;">
                  <i slot="prefix" class="iconfont"> 
                    {{'\ue635'}}
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button :loading="logging" @click="doLogin" style="width: 100%; margin-top: 20px;background: #2E323F;color: #fff">登录</el-button>
              </el-form-item>
            </el-form>
            <div class="hander-pwd">
              <span></span>
              <p @click="regPwd">还没有账号？去注册>></p>
            </div>
          </div>
          <div class="retrieve-info info" v-else-if="window_type === 1">
            <el-form :model="register" ref="regForm" label-width="0px" label-position="left" class="transition-el-form mt25" :rules="regrules">
              <el-form-item class="input-box" prop="reguserName">
                <el-input v-model="register.reguserName" placeholder="请输入账号">
                  <i slot="prefix" class="iconfont"> 
                    {{'\ue660'}}
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item class="input-box" prop="regpassword">
                <el-input v-model="register.regpassword" placeholder="请输入密码" type="password" style="width: 340px;">
                  <i slot="prefix" class="iconfont"> 
                    {{'\ue635'}}
                  </i>
                </el-input>    
              </el-form-item>
              <el-form-item>
                <el-button :loading="logging" @click="doReg" style="width: 100%; margin-top: 20px;background: #2E323F;color: #fff">注册</el-button>
              </el-form-item>
            </el-form>
            <div class="hander-pwd">
              <span></span>
              <div @click="backLogin">
                <i class="el-icon-arrow-left"></i>返回登录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: '数据交换管理平台',
        window_type: 0,
        logging: false,
        login: {
          query: {
            userName: '',
            password: ''
          }
        },
        register: {
          reguserName: '',
          regpassword: '',
          regnewpassword: ''
        },
        rules: {
          userName: [{
              required: true,
              message: '请输入用户名',
              trigger: ['blur', 'change']
            }],
          password : [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }],
        },
        regrules: {
          reguserName: [{
              required: true,
              message: '请输入账号',
              trigger: ['blur', 'change']
            }],
          regpassword : [{
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          }]
        }
      }
    },
    methods: {
      doLogin () {
        // console.log(location.host.startsWith('localhost'));
         this.$refs.loginForm.validate(async(valid) => {
           if (valid) {
            try {
              this.logging = true
              let query = this.login.query
              let info = await this.$post(this.$apis.login, query)
              console.log(info)
              let userInfo = info.data
              let token = info.data.token
              sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
              sessionStorage.setItem('token', token)
              this.limitRouter(userInfo.userType)
              this.logging = false
              this.$notify.success({
                title: '成功',
                // message: info.returnMsg
                message: '登录成功'
              })
            } catch(e) {
              console.log(e)
            }
           } else {
             return false
           }
         })
      },
      doReg () {
        this.$refs.regForm.validate(async(valid) => {
          if (valid) {
            console.log(this.register)
            let rxp = this.$config.regexp.password
            if (rxp.test(this.register.regpassword)) {
              try{
                this.logging = true
                let obj = {
                  userName: this.register.reguserName,
                  password: this.register.regpassword
                }
                await this.$post(this.$apis.register, obj)
                this.$message.success('注册成功')
                this.logging = false
                this.window_type = 0
              } catch(e) {
                console.log(e)
              }
            } else {
              this.$message.warning('请输入8-20位字母+数字密码')
              return false
            }
            
          } else {
            return false
          }
        })
      },
      limitRouter (userType) { //菜单权限 前端写死 只有管理员和用户两个角色
        // console.log(this.$router.options, userType)
        let allRouters = this.$router.options.routes
        let userRouters = allRouters.filter(item => item.meta.power === userType)
        // userRouters.forEach(item => {
        //   item.children
        // })
        userRouters = userRouters.sort((a, b) => { 
          if (!a.meta.sort) {
            a.meta.sort = 0
          }
          if (!b.meta.sort) {
            b.meta.sort = 0
          }
          return b.meta.sort -  a.meta.sort
        })
        console.log(userRouters)
        sessionStorage.setItem('userRouters', JSON.stringify(userRouters))
        let path = userRouters[0].path
        if (userRouters[0].children && userRouters[0].children.length > 0) {
          path = path + '/' + userRouters[0].children[0].path
        }
        this.$router.replace({path: path})
      },
      backLogin() {
        this.title="数据交换管理平台"
        this.window_type = 0
        this.$refs.loginForm &&this.$refs.loginForm.resetFields()
        this.$refs.regForm && this.$refs.regForm.resetFields()
      },
      regPwd () {
        this.register = {
          reguserName: '',
          regpassword: ''
        }
        this.title="用户注册"
        this.window_type = 1
        this.$refs.loginForm &&this.$refs.loginForm.resetFields()
        this.$refs.regForm && this.$refs.regForm.resetFields()
      }
    },
    mounted () {
    //  console.log(this.$route)
    }
  }
</script>

<style lang='sass' scoped>
.login
    img
      -webkit-user-drag: none
    background: url("~@img/login-bg.jpg") center center no-repeat
    background-size: cover
    position: fixed
    left: 0
    top: 0
    bottom: 0
    right: 0
    .login-content
      position: fixed
      left: 50%
      top: 50%
      height: 60vh
      min-height: 580px
      max-height: 720px
      width: 90vh
      min-width: 700px
      max-width: 1000px
      /*padding: 2.6vw 2vw 2.6vw 2vw;*/
      display: flex
      transform: translate(-50%, -50%)
      align-items: center
      .left-pic
        height: 100%
        width: 65%
        position: absolute
        left: 0
        & > img
          height: 100%
          width: 100%
      .right-cont
        display: flex
        position: absolute
        right: 0px
        height: 100%
        width: 45%
        min-width: 380px
        flex-direction: column
        align-items: center
        justify-content: center
        border-radius: 6px
        background: #ffffff
        .form-box
          display: flex
          flex-direction: column
          align-items: center
          .logo
            width: 80px
          .title
            font-size: 20px
            font-weight: 600
            color: #333
            line-height: 28px
            margin: 20px 0 35px
          .back
            font-weight: 500
            color: rgba (51,51,51,1)
            width: 100%
            display: flex
            cursor: pointer
            align-items: center
            margin-bottom: 50px
            .back-icon
              margin-right: 10px
              font-weight: normal
          .info
            .hander-pwd
              display: flex
              justify-content: space-between
              margin-top: 10px
              cursor: pointer
              color: #B1B9C8
          .retrieve-info
            .input-item.code
              display: flex
              align-items: center
              input
                padding-right: 100px
              .send-code
                position: absolute
                top: 50%
                transform: translateY(-50%)
                right: 20px
                color: #34CB7A
                cursor: pointer
              .count-down
                color: #B1B9C8
              .send-code:before
                content: ''
                display: block
                width: 1px
                height: 16px
                background: #C2C6CE
                position: absolute
                left: -20px
                top: 2px
          .info
            .input-item
              position: relative
              margin-bottom: 20px
              &:last-child, &.last
                margin-bottom: 0px
              i
                position: absolute
                left: 16px
                top: 50%
                transform: translateY(-50%)
          .error-tip
            margin: 16px 0 0
            width: 100%
            color: #F44336
            background: rgba (255,239,240,1)
            border: 1px solid rgba (254,212,212,1)
            text-align: left
          .btn-oper
            font-size: 20px
            width: 340px
            height: 50px
            border-radius: 4px
            color: #FFF
            border: none
            outline: none
            cursor: pointer
            margin-top: 1.8vw
            // background: linear-gradient(0deg, rgba(46,202,168,1), rgba(53,203,123,1))
</style>