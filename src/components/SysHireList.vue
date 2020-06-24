<!--录用名单（技术员）-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" @click="getData" round>查询</el-button>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="labId"
          label="所属实验室">
        </el-table-column>
        <el-table-column
          prop="stuId"
          label="学生学号">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="学生姓名">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
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
      // 数据绑定
      ruleForm: {
        labId: '',
        stuId: '',
        stuName: '',
        major: '',
        grade: '',
        className: '',
        telephone: '',
        email: '',
        photo: ''
      },
      // 校验绑定
      rules: {
        labId: [
          // 校验规则required: true(是否为必填项)，message(提示信息),trigger: 'blur'(触发事件)
          {required: true, message: '请输入实验室编号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        stuId: [
          {required: true, message: '请输入学生学号', trigger: 'change'}
        ],
        stuName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        major: [
          {required: true, message: '请输入学生专业', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        grade: [
          {required: true, message: '请输入年级', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        className: [
          {required: true, message: '请输入班级名称', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        photo: [
          {required: true, message: '请上传照片', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ]
      },
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: null
    }
  },
  methods: {
    // 列表显示
    getData () {
      const _this = this
      // eslint-disable-next-line eqeqeq
      // 获取当前登入用户的id
      let account = JSON.parse(localStorage.getItem('user'))
      console.log(account)
      const url = `http://localhost:8181/assistant/findByStuId/1/6/` + account.username
      axios.get(url).then(resp => {
        console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/assistant/findByLabId/` + currentPage + `/6`).then(resp => {
        _this.tableData = resp.data.content
        _this.total = Number(resp.data.totalElements)
      })
    },
    edit (row) {
      const _this = this
      axios.get(`http://localhost:8181/assistant/findById/` + row.id).then(function (resp) {
        _this.ruleForm = resp.data
        console.log('wo' + resp.data)
      })
      this.list_updateDialog = true
      _this.getData()
    },
    // 修改
    updateSubmitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.put(`http://localhost:8181/assistant/update`, this.ruleForm).then(function (resp) {
            if (resp.data === 'success') {
              _this.$notify({
                title: '成功',
                message: '数据修改成功',
                type: 'success'
              })
              _this.list_updateDialog = false
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: '数据修改失败',
            type: 'warning'
          })
          return false
        }
      })
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
      axios.delete(`http://localhost:8181/assistant/delete/` + ids).then(function (resp) {
        if (resp.data === 'success') {
          _this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          _this.getData()
        }
      })
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
