<!--填写招聘信息（学生工作处）-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round @click="getData">查询</el-button>
    <el-button type="warning" round @click="recruitDelete">删除</el-button>
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
          prop="issueStatus"
          label="审核/发布状态">
          <template slot-scope="scope">
            <span v-if="scope.row.issueStatus==='1'">未审核</span>
            <span v-if="scope.row.issueStatus==='2'">已审核</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.issueStatus === '2'" plain @click="apply(scope.row)">已审核</el-button>
            <el-button type="success" v-if="scope.row.issueStatus === '1'" plain @click="apply(scope.row)">未审核</el-button>
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
      title="添加招聘信息"
      :visible.sync="list_addDialog"
      width="50%">
        <span>
          <div style="margin-left: 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" >
              <el-form-item label="招聘计划编号" prop="recruit_id">
                <el-input v-model="ruleForm.recruit_id"></el-input>
              </el-form-item>
              <el-form-item label="计划名称" prop="recruit_name">
                <el-input v-model="ruleForm.recruit_name"></el-input>
              </el-form-item>
              <el-form-item label="岗位要求" prop="job_require">
                <el-input v-model="ruleForm.job_require"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数" prop="recruit_num">
                <el-input v-model="ruleForm.recruit_num"></el-input>
              </el-form-item>
              <el-form-item label="申请实验室" prop="labId">
                <el-input v-model="ruleForm.labId"></el-input>
              </el-form-item>
              <el-form-item label="招聘开始时间" prop="recruit_start">
                <div class="block">
                  <el-date-picker
                    v-model="ruleForm.recruit_start"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
                <el-form-item label="招聘结束时间" prop="recruit_end">
                <div class="block">
                  <el-date-picker
                    v-model="ruleForm.recruit_end"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
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
      title="编辑招聘信息"
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
              <el-form-item label="岗位要求" prop="job_require">
                <el-input v-model="ruleForm.job_require"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数" prop="recruit_num">
                <el-input v-model="ruleForm.recruit_num"></el-input>
              </el-form-item>
              <el-form-item label="申请实验室" prop="labId">
                <el-input v-model="ruleForm.labId"></el-input>
              </el-form-item>
             <el-form-item label="招聘开始时间" prop="recruit_start">
                <div class="block">
                  <el-date-picker
                    v-model="ruleForm.recruit_start"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
                <el-form-item label="招聘结束时间" prop="recruit_end">
                <div class="block">
                  <el-date-picker
                    v-model="ruleForm.recruit_end"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="resetForm('ruleForm')">重 置</el-button>
    <el-button type="success" @click="updateSubmitForm('ruleForm')">提 交</el-button>
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
        recruit_id: '',
        recruit_name: '',
        recruit_num: '',
        labId: '',
        job_require: '',
        recruit_start: '',
        recruit_end: '',
        issueStatus: ''
      },
      // 校验绑定
      rules: {
        recruit_id: [
          // 校验规则required: true(是否为必填项)，message(提示信息),trigger: 'blur'(触发事件)
          {required: true, message: '请输入部门编号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        recruit_name: [
          {required: true, message: '请输入部门名称', trigger: 'change'}
        ],
        recruit_num: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        labId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        job_require: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        recruit_start: [
          {required: true, message: '请输入登录账户', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        recruit_end: [
          {required: true, message: '请输入登录账户', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
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
      axios.get(`http://localhost:8181/recruit/findById/` + row.id).then(function (resp) {
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
          axios.put(`http://localhost:8181/recruit/updateStatus`, this.ruleForm).then(function (resp) {
            if (resp.data === 'success') {
              _this.$notify({
                title: '成功',
                message: '数据提交成功',
                type: 'success'
              })
              _this.list_updateDialog = false
            }
          })
        } else {
          this.$notify({
            title: '失败',
            message: '数据提交失败',
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
      const url = `http://localhost:8181/recruit/findAll/1/6/` + '?status=' + 1
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
    // 添加
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.post(`http://localhost:8181/recruit/save`, this.ruleForm).then(function (resp) {
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
      axios.delete(`http://localhost:8181/recruit/delete/` + ids).then(function (resp) {
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
    },
    // 发送post请求
    apply (value) {
      axios.post(`http://localhost:8181/recruit/apply`, {
        'id': value.id,
        'status': 2
      }).then(function (response) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        console.log(response)
      })
      this.getData()
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
