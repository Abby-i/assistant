<template>
  <el-container class="main_container">
    <!--头部区域-->
    <el-header style="height: 80px">
      <div>
        <img id="img" src="../assets/logo.jpg" alt=""  style="height: 50px ;width: 50px">
        <span>实验室助理工作系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
    <!--侧边栏菜单区域-->
      <el-aside width="300px">
        <el-menu
          :default-active="$route.path"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened6>
          <div class="menu">
            <i class="iconfont icon-icon"></i>
            <span>菜单列表</span>
          </div>
          <!--一级菜单--><!--超级管理员-->
          <el-submenu index="1" v-if="this.account.user_type === 'E' ">
            <!--一级菜单模板区域-->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>部门管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
              <router-link  to="/list" >部门详情</router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <!--实验技术员-->
          <el-submenu index="2" v-if="this.account.user_type === 'B' ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>助理招聘</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/recruit" >填写招聘信息</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/apply">报名信息详情</router-link>
              </template>
              </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3"  v-if="this.account.user_type === 'B' ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>助理筛选</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/interviewee" >面试名单</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/hire">录用名单</router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4"  v-if="this.account.user_type === 'B' ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>助理工作详细内容</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/worksheet">助理工作内容</router-link>
              </template>
            </el-menu-item>
            <el-menu-item index="4-2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/equip">设备维修申请</router-link>
              </template>
            </el-menu-item>
          </el-submenu>

          <!--部门-->
          <el-submenu index="5" v-if="this.account.user_type === 'D'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>专业技术实验室</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/lab" >实验室详情</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/artisan">技术人员详情</router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>

          <!--系统用户-->
          <el-submenu index="6" v-if="this.account.user_type === 'A' ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>招聘信息</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/sysRecruit">招聘信息详情</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/sysApply">报名信息列表</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/sysView">面试名单</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/sysHireList">录用名单</router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>

          <!--学生助理-->
          <el-submenu index="7" v-if="this.account.user_type === 'C' ">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>工作内容</span>
            </template>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/assJobList" >工作内容详情</router-link>
              </template>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">
                <i class="el-icon-document"></i>
                <router-link to="/assRequireList">维修详情</router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
    <!--右侧内容主体-->
      <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        <div  class="router_view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      account: this.$store.state.account,
      department: true,
      artisan: true,
      systemUser: true,
      assistant: true
    }
  },
  methods: {
    logout () {
      this.$store.commit('ACCOUNTS', null)
      localStorage.setItem('user', null)
      this.$router.replace('/login')
    }
  },
  mounted () {
    this.account = JSON.parse(localStorage.getItem('user'))
  }
}
var rotateVal = 0 // 旋转角度
var InterVal // 定时器
window.onload = function () {
  // 网页加载完成后即运行rotate函数
  rotate()
  // 鼠标悬浮在图片上时，停止旋转，即清除定时器
  document.getElementById('img').onmousemove = function () {
    clearInterval(InterVal)
  }
  // 鼠标离开图片时，继续旋转，即继续运行定时器
  document.getElementById('img').onmouseleave = function () {
    rotate()
  }
}

// 设置定时器
function rotate () {
  InterVal = setInterval(function () {
    var img = document.getElementById('img')
    rotateVal += 1
    // 设置旋转属性(顺时针)
    img.style.transform = 'rotate(' + rotateVal + 'deg)'
    // 设置旋转属性(逆时针)
    // img.style.transform = 'rotate(-' + rotateVal + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    img.style.transition = '0.1s linear'
  }, 100)
}
</script>
<style lang="less">
  .main_container{
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main{
    background-color: #eaedf1;
    padding: 0;
  }
  .el-menu {
    border-right: none;
  }
  #img{
    border-radius: 50%;
    cursor: pointer;
  }
  .menu{
    color: #ffffff;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 18px;

  }
  .el-breadcrumb{
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    line-height: 100%;
    background-color: #F7F7F7;
    box-shadow: 3px 3px 5px #888888;
  }
  .router_view{
    height: 600px;
    margin: 20px;
    background-color: #F7F7F7;
    box-shadow: -2px 0px 5px 1px #DDDDDD,0px -2px 5px 1px #DDDDDD,2px 0px 5px 1px #DDDDDD,0px 2px 5px 1px #DDDDDD;
  }
  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 14px;
  }
  .el-submenu span{
    font-size: 16px;
  }
</style>
