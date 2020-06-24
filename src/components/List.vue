<!--部门信息-->
<template>
    <div class="list_title">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="info" round @click="getData">查询</el-button>
      <el-button type="success" round @click="list_addDialog=true">添加</el-button>
      <el-button type="warning" round>删除</el-button>
    <div>
  <template>
    <el-table
    border
    :data="tableData"
    style="width: 100%; margin-top: 30px">
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      >
    </el-table-column>
      <el-table-column
        prop="id"
        label="记录数"
        >
      </el-table-column>
    <el-table-column
      prop="dep_id"
      label="部门编号"
      >
    </el-table-column>
    <el-table-column
      prop="dep_name"
      label="部门名称"
      >
    </el-table-column>
    <el-table-column
      prop="user_id"
      label="登录账号"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="edit(scope.row)"  style="color: red;">编辑</el-button>
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
    </div>
      <el-dialog
        title="添加部门信息"
        :visible.sync="list_addDialog"
        width="50%">
        <span>
          <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
              <el-form-item label="部门编号" prop="dep_id">
                <el-input v-model="ruleForm.dep_id"></el-input>
              </el-form-item>
              <el-form-item label="部门名称" prop="dep_name">
                <el-input v-model="ruleForm.dep_name"></el-input>
              </el-form-item>
              <el-form-item label="登录账号" prop="user_id">
                <el-input v-model="ruleForm.user_id"></el-input>
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
        title="修改部门信息"
        :visible.sync="list_updateDialog"
        width="50%">
        <span>
           <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
              <el-form-item label="部门编号" prop="dep_id">
                <el-input v-model="ruleForm.dep_id" readonly></el-input>
              </el-form-item>
              <el-form-item label="部门名称" prop="dep_name">
                <el-input v-model="ruleForm.dep_name"></el-input>
              </el-form-item>
              <el-form-item label="登录账号" prop="user_id">
                <el-input v-model="ruleForm.user_id"></el-input>
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
        dep_id: '',
        dep_name: '',
        user_id: ''
      },
      // 校验绑定
      rules: {
        dep_id: [
          // 校验规则required: true(是否为必填项)，message(提示信息),trigger: 'blur'(触发事件)
          {required: true, message: '请输入部门编号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        dep_name: [
          {required: true, message: '请输入部门名称', trigger: 'change'}
        ],
        user_id: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ]
      },
      input: '',
      depUserId: '',
      depName: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: null,
      // 总页数
      total: null
    }
  },
  methods: {
    edit  (row) {
      const _this = this
      axios.get(`http://localhost:8181/department/findById/` + row.id).then(function (resp) {
        _this.ruleForm = resp.data
        console.log('wo' + resp.data)
      })
      this.list_updateDialog = true
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/department/findAll/` + currentPage + `/6`).then(resp => {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 列表显示
    getData () {
      const _this = this
      // eslint-disable-next-line eqeqeq
      var url = _this.input != '' ? `http://localhost:8181/department/findByName/1/6` + `&name=` + _this.input : `http://localhost:8181/department/findAll/1/6`
      axios.get(url).then(resp => {
        // console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 修改
    updateSubmitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.put(`http://localhost:8181/department/update`, this.ruleForm).then(function (resp) {
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
    // 添加
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.post(`http://localhost:8181/department/save`, this.ruleForm).then(function (resp) {
            if (resp.data === 'success') {
              _this.$notify({
                title: '成功',
                message: '数据添加成功',
                type: 'success'
              })
              _this.list_addDialog = false
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
