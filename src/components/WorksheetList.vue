<!--助理填写工作内容（学生助理）-->
<!--助理工作内容信息（技术员）-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" @click="getData" round>查询</el-button>
    <el-button type="success" round @click="list_addDialog=true">添加</el-button>
    <el-button type="warning" @click="AssJobDelete" round>删除</el-button>
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
          prop="weekTimes"
          label="周次"
          width="150">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="week"
          label="星期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="labId"
          label="实验室"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuId"
          label="学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="jobContent"
          label="工作内容"
          width="150">
        </el-table-column>
        <el-table-column
          prop="systemTime"
          label="系统时间"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small"  @click="edit(scope.row)">编辑</el-button>
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
      title="添加工作内容"
      :visible.sync="list_addDialog"
      width="50%">
        <span>
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
              <el-form-item label="周次" prop="weekTimes">
                <el-input v-model="ruleForm.weekTimes"></el-input>
              </el-form-item>
              <el-form-item label="时间" prop="time">
                <el-input v-model="ruleForm.time"></el-input>
              </el-form-item>
              <el-form-item label="星期" prop="week">
                <el-input v-model="ruleForm.week"></el-input>
              </el-form-item>
              <el-form-item label="实验室" prop="labId">
                <el-input v-model="ruleForm.labId"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="stuId">
                <el-input v-model="ruleForm.stuId"></el-input>
              </el-form-item>
              <el-form-item label="工作内容" prop="jobContent">
                <el-input v-model="ruleForm.jobContent"></el-input>
              </el-form-item>
              <el-form-item label="系统时间" prop="systemTime">
                <el-input v-model="ruleForm.systemTime"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
     <el-button @click="list_addDialog = false">取 消</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重 置</el-button>
    <el-button type="success" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑工作内容"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
              <el-form-item label="周次" prop="weekTimes">
                <el-input v-model="ruleForm.weekTimes"></el-input>
              </el-form-item>
              <el-form-item label="时间" prop="time">
                <el-input v-model="ruleForm.time"></el-input>
              </el-form-item>
              <el-form-item label="星期" prop="week">
                <el-input v-model="ruleForm.week"></el-input>
              </el-form-item>
              <el-form-item label="实验室" prop="labId">
                <el-input v-model="ruleForm.labId"></el-input>
              </el-form-item>
              <el-form-item label="学号" prop="stuId">
                <el-input v-model="ruleForm.stuId"></el-input>
              </el-form-item>
              <el-form-item label="工作内容" prop="jobContent">
                <el-input v-model="ruleForm.jobContent"></el-input>
              </el-form-item>
              <el-form-item label="系统时间" prop="systemTime">
                <el-input v-model="ruleForm.systemTime"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重 置</el-button>
    <el-button type="success" @click="updateSubmitForm('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      // 数据绑定
      ruleForm: {
        weekTimes: '',
        time: '',
        week: '',
        labId: '',
        stuId: '',
        jobContent: '',
        systemTime: ''
      },
      // 校验绑定
      rules: {
        weekTimes: [
          // 校验规则required: true(是否为必填项)，message(提示信息),trigger: 'blur'(触发事件)
          {required: true, message: '请输入部门编号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        time: [
          {required: true, message: '请输入部门名称', trigger: 'change'}
        ],
        week: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        labId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        stuId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        jobContent: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        systemTime: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ]
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
    edit (row) {
      const _this = this
      axios.get(`http://localhost:8181/assJob/findById/` + row.id).then(function (resp) {
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
          axios.put(`http://localhost:8181/assJob/update`, this.ruleForm).then(function (resp) {
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
    // 列表显示
    getData () {
      const _this = this
      // eslint-disable-next-line eqeqeq
      // 获取当前登入用户的id
      let account = JSON.parse(localStorage.getItem('user'))
      console.log(account)
      const url = `http://localhost:8181/assJob/findByLabId/1/6/` + account.username
      axios.get(url).then(resp => {
        console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/assJob/findByLabId/` + currentPage + `/6`).then(resp => {
        _this.tableData = resp.data.content
        _this.total = Number(resp.data.totalElements)
      })
    },
    // 添加
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
        // 直接传入封装数据
          axios.post(`http://localhost:8181/assJob/save`, this.ruleForm).then(function (resp) {
            if (resp.data === 'success') {
              _this.$notify({
                title: '成功',
                message: '数据添加成功',
                type: 'success'
              })
              _this.list_addDialog = false
              _this.getData()// ref list data
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: '数据添加失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 删除
    AssJobDelete () {
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
      axios.delete(`http://localhost:8181/assJob/delete/` + ids).then(function (resp) {
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
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
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
