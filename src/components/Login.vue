<template>
    <div id="building">
      <div class="login_box">
        <div class="login_title">
          <h1>实验室助理工作系统</h1>
        </div>
        <el-form label-width="100px" class="login_form">
          <el-form-item>
            <el-input prefix-icon="iconfont icon-zhanghu" v-model="loginForm.username" placeholder="请输入用户名"  ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input  type="password" prefix-icon="iconfont icon-mima" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_button" @click="login">登录</el-button>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () { // 登录方法
      const _this = this
      axios.post(`http://localhost:8181/login`, this.loginForm).then(function (resp) {
        console.log(resp.data.code === 500)
        if (resp.data.code === 0) {
          _this.$notify({
            title: '登入成功',
            message: '登入成功',
            type: 'success'
          })
          // 登入成功将用户消息保存(以便根据角色显示数据库)
          _this.$store.commit('ACCOUNTS', resp.data.user)
          localStorage.setItem('user', JSON.stringify(resp.data.user))
          _this.$router.replace('/main')
        } else if (resp.data.code === 500) {
          _this.$notify.error({
            title: '登入失败',
            message: resp.data.msg
          })
          console.log('error')
        }
      })
    },
    register () {
      this.$router.replace('/register')
    }
  }
}
</script>
<style lang="less" scoped>
#building{
  background:url("../assets/night.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.login_box{
  width: 550px;
  height: 400px;
  background-color: rgba(0,0,0,0.4);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login_title{
  text-align: center;
  position: relative;
  padding-top: 20px;
  }
.login_form{
  text-align: center;
  padding-right: 80px;
  margin-top: 50px;
  }
.login_button{
  margin-right: 60px;
}
  .el-button{
    padding-right: 30px;
    padding-left: 30px;
  }
  .el-form-item{
    margin-bottom: 40px;
  }
  .dialog{
    width: 500px;
    > .el-form-item{
      width: 100px;
    }
  }
</style>
