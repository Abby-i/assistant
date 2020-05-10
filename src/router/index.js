import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../components/Login.vue'
import List from '../components/List'
import RecruitList from '../components/RecruitList'
import ApplyList from '../components/ApplyList'
import IntervieweeList from '../components/IntervieweeList'
import HireList from '../components/HireList'
import WorksheetList from '../components/WorksheetList'
import EquipList from '../components/EquipList'
import LabList from '../components/LabList'
import ArtisanList from '../components/ArtisanList'
import SysApplyList from '../components/SysApplyList'
import SysViewList from '../components/SysViewList'
import SysRecruitList from '../components/SysRecruitList'
import Register from '../components/Register'
import AssRequireList from '../components/AssRequireList'
import AssJobList from '../components/AssJobList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/main',
      component: Main,
      children: [ //
        {
          path: '/list', //  部门管理（超级管理员）
          component: List
        },
        {
          path: '/recruit', // 招聘信息表（技术员）
          component: RecruitList
        },
        {
          path: '/apply', // 报名人员信息（技术员）
          component: ApplyList
        },
        {
          path: '/interviewee', // 面试名单（技术员）
          component: IntervieweeList
        },
        {
          path: '/hire', // 录用名单（技术员）
          component: HireList
        },
        {
          path: '/worksheet', // 助理工作内容详情（技术员）
          component: WorksheetList
        },
        {
          path: '/equip', // 设备维修申请表（技术员）
          component: EquipList
        },
        {
          path: '/lab', // 实验室详情（部门）
          component: LabList
        },
        {
          path: '/artisan', // 实验技术员详情（部门）
          component: ArtisanList
        },
        {
          path: '/sysApply', // 报名名单（系统用户）
          component: SysApplyList
        },
        {
          path: '/sysView', // 面试名单（系统用户）
          component: SysViewList
        },
        {
          path: '/sysRecruit', // 招聘信息详情（系统用户）
          component: SysRecruitList
        },
        {
          path: '/assRequireList', // 工作内容填写（实验室助理）
          component: AssRequireList
        },
        {
          path: '/assJobList', // 维修表填写（实验室助理）
          component: AssJobList
        }
      ]
    }
  ]

})
