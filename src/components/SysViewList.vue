<!--面试名单-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round @click="getData">查询</el-button>
    <el-button type="warning" @click="recruitDelete"  round>删除</el-button>
    <template>
<!--      <template>-->
<!--        <el-radio v-model="radio" label="0">备选项</el-radio>-->
<!--        <el-radio v-model="radio" label="1">备选项</el-radio>-->
<!--        <el-radio v-model="radio" label="2">备选项</el-radio>-->
<!--      </template>-->
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="recruit_id"
          label="招聘计划编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recruit_name"
          label="计划名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="applyId"
          label="报名编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="学生姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuId"
          label="学生学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="skill"
          label="技能描述"
          width="150">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          label="报名时间"
          width="150">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=6
        :total="total"
        @current-change="page">
      </el-pagination>
    </template>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      input: '',
      radio: '',
      tableData: null
    }
  },
  methods: {
    employed (row) {
      const _this = this
      axios.get(`http://localhost:8181/recruit/findById/` + row.id).then(function (resp) {
        _this.ruleForm = resp.data
        console.log('wo' + resp.data)
      })
      this.list_updateDialog = true
      _this.getData()
    },
    // 列表显示
    getData () {
      const _this = this
      // eslint-disable-next-line eqeqeq
      // 获取当前登入用户的id
      let account = JSON.parse(localStorage.getItem('user'))
      console.log(account)
      const url = `http://localhost:8181/apply/findByStuId/1/6/` + account.username + '?status=' + 1
      axios.get(url).then(resp => {
        console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/apply/findAll/` + currentPage + `/6`).then(resp => {
        _this.tableData = resp.data.content
        _this.total = Number(resp.data.totalElements)
      })
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除
    recruitDelete () {
      const _this = this
      // 判断是否有选中
      if (this.multipleSelection.length < 1) {
        this.$message.error('请选中记录')
        return false
      }
      // 拼接记录ID
      let ids = '' // 要删除的所有id
      for (let i = 0; i < _this.multipleSelection.length; i++) {
        ids = ids + _this.multipleSelection[i].id + ','
      }
      // let data = {ids: ids.toString()}
      // console.log(ids)
      // 发送所有id到后台删除
      axios.delete(`http://localhost:8181/apply/delete/` + ids).then(function (resp) {
        if (resp.data === 'success') {
          _this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          _this.getData()
        }
      })
    }
  },
  created () {
    this.getData()
  }
}

</script>
<style lang="less">
  .list_title {
    padding-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .el-input {
    width: 300px;
    margin-right: 20px;
  }
  .el-pagination{
    text-align: center;
  }
</style>
