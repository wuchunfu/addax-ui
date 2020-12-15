<style scoped lang="less">
  .login {
    img {
      -webkit-user-drag: none;
    }
    background: url("~@img/login-bg.jpg") center center no-repeat;
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    @media screen and (min-width: 1200px) {

    }
    .login-content {

      position: relative;
      left: 50%;
      top: 50%;
      height: 60vh;
      min-height: 580px;
      max-height: 720px;
      width: 90vh;
      min-width: 700px;
      max-width: 1000px;
      /*padding: 2.6vw 2vw 2.6vw 2vw;*/
      display: flex;
      transform: translate(-50%, -50%);
      align-items: center;
      .left-pic {
        height: 100%;
        width: 65%;
        position: absolute;
        left: 0;
        & > img {
          height: 100%;
          width: 100%;
        }
      }
      .right-cont {
        display: flex;
        position: absolute;
        right: 0px;
        height: 100%;
        width: 45%;
        min-width: 380px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        background: rgba(255,255,255);
        .form-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          .logo {
            width: 80px;
          }
          .title {
            font-size: 20px;
            font-weight:600;
            color: #333;
            line-height:28px;
            margin: 20px 0 35px;
          }
          .back {
            font-weight: 500;
            color: rgba(51,51,51,1);
            width: 100%;
            display: flex;
            cursor: pointer;
            align-items: center;
            margin-bottom: 50px;
            .back-icon {
              margin-right: 10px;
              font-weight: normal;
            }
          }
          .login-info {
            .hander-pwd {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              cursor: pointer;
              color: #B1B9C8;
            }
          }
          .retrieve-info {
            .input-item.code {
              display: flex;
              align-items: center;
              input {
                padding-right: 100px;
              }
              .send-code {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 20px;
                color: #34CB7A;
                cursor: pointer;
              }
              .count-down {
                color: #B1B9C8;
              }
              .send-code:before {
                content: '';
                display: block;
                width: 1px;
                height: 16px;
                background: #C2C6CE;
                position: absolute;
                left: -20px;
                top: 2px;
              }
            }
          }
          .info {
            .input-item {
              position: relative;
              margin-bottom: 20px;
              &:last-child, &.last {
                margin-bottom: 0px;
              }
              i {
                position: absolute;
                left:16px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
          .error-tip {
            margin: 16px 0 0;
            width: 100%;
            color: #F44336;
            background: rgba(255,239,240,1);
            border: 1px solid rgba(254,212,212,1);
            text-align: left;
          }
          .btn-oper {
            font-size: 20px;
            width: 340px;
            height: 50px;
            border-radius:4px;
            color: #FFF;
            border: none;
            outline: none;
            cursor: pointer;
            margin-top: 1.8vw;
            background: linear-gradient(0deg,rgba(46,202,168,1),rgba(53,203,123,1));
          }
        }
      }
    }
  }
  .primary {
    background: #34CB7A;
    color: #FFF;
  }
  .gray {
    background: #F7F7F7;
    color: #B1B9C8;
  }
  .footer {
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-size:15px;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  // 浏览器不兼容的弹框
  .bad-browser {
    position: fixed;
    right: 0px;
    bottom: 0px;
    width: 500px;
    height: 300px;
    padding: 20px;
    background: #fff;
    /*border-radius: 8px;*/
    .browser-box {
      display: inline-block;
      text-align: center;
      margin-top: 20px;
      width: 50%;
      img {
        width: 60px;
      }
      a {
        color: #237BAD;
      }
      img {
        cursor: pointer;
      }
    }
    .browser-close {
      position: absolute;
      right: 4px;
      top: 4px;
      cursor: pointer;
    }
    img {
      width: 80px;
      margin: 10px auto;
    }
    p {
      text-align: center;
    }
  }
</style>

<template>
  <div class="login">
    <div class="login-content">
      <div class="left-pic select-none">
        <!-- <img src="@/assets/img/login.png" alt=""> -->
      </div>
      <div class="right-cont">
        <div class="form-box">
          <div class="logo" v-if="window_type === 0">
            <!-- <img src="@/assets/img/logo_login.png" alt="" class="select-none" style="width: 100%;"> -->
          </div>
          <div class="back" @click="backLogin" v-else>
            <i class="el-icon-arrow-left"></i>返回登录
          </div>
          <h1 class="title">{{title}}</h1>
          <div class="login-info info" v-if="window_type === 0">
            <el-form :model="login.query" ref="loginForm" label-width="0px" label-position="left" class="transition-el-form mt25" :rules="rules">
              <el-form-item class="input-box" prop="userName">
                <el-input @keyup.enter.native="doLogin" v-model="login.query.userName" placeholder="请输入账号" prefix-icon="">
                </el-input>
              </el-form-item>
              <el-form-item class="input-box" prop="password">
                <el-input v-model="login.query.password" placeholder="请输入密码" type="password" style="width: 340px;"></el-input>
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
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login2',
    data () {
      return {
        title: '数据交换管理平台',
        window_type: 0,
        login: {
          query: {
            userName: '',
            password : ''
          }
        },
        rules: {
          userName: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }],
          password : [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
        logging: false
      }
    },
    methods: {
      backLogin() {
        this.window_type = 0
      },
      doLogin () {

      },
      regPwd () {
        this.window_type = 1
      }
    }
  }
</script>

