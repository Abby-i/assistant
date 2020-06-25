<!--系统用户报名信息列表-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round @click="getData">查询</el-button>
    <template>
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
          label="招聘计划编号">
        </el-table-column>
        <el-table-column
          prop="recruit_name"
          label="计划名称">
        </el-table-column>
        <el-table-column
          prop="job_require"
          label="岗位要求">
        </el-table-column>
        <el-table-column
          prop="recruit_num"
          label="招聘人数">
        </el-table-column>
        <el-table-column
          prop="labId"
          label="实验室">
        </el-table-column>
        <el-table-column
          prop="recruit_start"
          label="招聘开始时间">
        </el-table-column>
        <el-table-column
          prop="recruit_end"
          label="招聘结束时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-check" circle @click="apply(scope.row)">报名</el-button>
          </template>
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
    <el-dialog
      title="填写报名信息信息"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
               <el-form-item label="招聘计划编号" prop="recruit_id">
                <el-input v-model="ruleForm.recruit_id"></el-input>
              </el-form-item>
                <el-form-item label="计划名称" prop="recruit_name">
                <el-input v-model="ruleForm.recruit_name"></el-input>
              </el-form-item>
              <el-form-item label="学生姓名" prop="stuName">
                <el-input v-model="ruleForm.stuName"></el-input>
              </el-form-item>
              <el-form-item label="学生学号" prop="stuId">
                <el-input v-model="ruleForm.stuId"></el-input>
              </el-form-item>
              <el-form-item label="实验室" prop="labId">
                <el-input v-model="ruleForm.labId"></el-input>
              </el-form-item>
              <el-form-item label="技能描述" prop="skill">
               <el-input v-model="ruleForm.skill"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重 置</el-button>
    <el-button type="success" @click="addSubmitForm('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      ruleForm: {
        recruit_id: '',
        recruit_name: '',
        recruitTime: '',
        labId: '',
        artisanId: '',
        stuId: '',
        stuName: '',
        skill: ''
      },
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,
      tableData: null,
      multipleSelection: [],
      // 总页数
      total: null
    }
  },
  methods: {
    apply (row) {
      const _this = this
      let account = JSON.parse(localStorage.getItem('user'))
      axios.get(`http://localhost:8181/recruit/findById/` + row.id + '/' + account.username).then(function (resp) {
        console.log(resp.data)
        _this.ruleForm = resp.data.recruit
        _this.ruleForm.stuName = resp.data.systemUser.stuName
        _this.ruleForm.stuId = resp.data.systemUser.stuId
        console.log('wo' + resp.data)
      })
      this.list_updateDialog = true
      _this.getData()
    },
    // 添加报名信息
    addSubmitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.post(`http://localhost:8181/apply/save`, this.ruleForm).then(function (resp) {
            if (resp.data === 'success') {
              _this.$notify({
                title: '成功',
                message: '报名成功',
                type: 'success'
              })
              _this.list_updateDialog = false
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: '报名失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 列表显示
    getData () {
      const _this = this
      // eslint-disable-next-line eqeqeq
      // 获取当前登入用户的id
      let account = JSON.parse(localStorage.getItem('user'))
      console.log(account)
      const url = `http://localhost:8181/recruit/findAll/1/6` + '?status=' + 2
      axios.get(url).then(resp => {
        console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/recruit/findAll/` + currentPage + `/6`).then(resp => {
        _this.tableData = resp.data.content
        _this.total = Number(resp.data.totalElements)
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
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
