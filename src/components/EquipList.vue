<template>
  <div>
    <div class="list_title">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="info" round>查询</el-button>
      <el-button type="warning" round>删除</el-button>
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
            prop="repairId"
            label="维修表编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="equipName"
            label="设备名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="equipId"
            label="设备编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="type"
            label="设备型号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="faultAnalysis"
            label="故障现象描述"
            width="150">
          </el-table-column>
          <el-table-column
            prop="repairTime"
            label="报修时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="stuId"
            label="报修人"
            width="150">
          </el-table-column>
          <el-table-column
            prop="labId"
            label="实验室"
            width="150">
          </el-table-column>
          <el-table-column
            prop="repairStatus"
            label="报修状态"
            width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click="edit(scope.row)">查看</el-button>
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
    title="导出维修表"
    :visible.sync="list_updateDialog"
    width="70%">
    <span>
       <table class="tableDialog" border cellspacing= 0 >
      <tr>
         <td align="right">维修表编号：</td>
        <td><input type="text" name="repairId"  v-model="ruleForm.repairId"></td>
        <td align="right">设备名称：</td>
        <td><input type="text" name="equipName"  v-model="ruleForm.equipName"></td>
        <td align="right">设备型号：</td>
        <td><input  type="text" name="equipId" v-model="ruleForm.equipId"></td>
      </tr>

      <tr>
        <td align="right">设备所在实验室：</td>
        <td><input type="text" name="labId"  v-model="ruleForm.labId"></td>
        <td align="right">报修人：</td>
        <td><input type="text" name="stuId"  v-model="ruleForm.stuId"></td>
           <td align="right">设备型号：</td>
        <td><input  type="text" name="type" v-model="ruleForm.type"></td>
      </tr>

      <tr>
        <td align="right">保修时间：</td>
        <td><input type="text" name="repairTime"  v-model="ruleForm.repairTime"></td>
        <td align="right">故障现象描述：</td>
        <td colspan=3><input type="text" name="faultAnalysis"  v-model="ruleForm.faultAnalysis"></td>
      </tr>
       </table>
    </span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog = false">取 消</el-button>
    <el-button type="primary" @click="list_updateDialog = false">导出</el-button>
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
        repairId: '',
        equipName: '',
        equipId: '',
        type: '',
        faultAnalysis: '',
        stuId: '',
        repairTime: '',
        labId: '',
        issueStatus: ''
      },
      // 校验绑定
      rules: {
        repairId: [
          // 校验规则required: true(是否为必填项)，message(提示信息),trigger: 'blur'(触发事件)
          {required: true, message: '请输入部门编号', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        equipName: [
          {required: true, message: '请输入部门名称', trigger: 'change'}
        ],
        equipId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        faultAnalysis: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        stuId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        repairTime: [
          {required: true, message: '请输入登录账户', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        labId: [
          {required: true, message: '请输入登录账户', trigger: 'blur'}
          // {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
        ],
        issueStatus: [
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
      axios.get(`http://localhost:8181/repair/findById/` + row.id).then(function (resp) {
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
          axios.put(`http://localhost:8181/repair/update`, this.ruleForm).then(function (resp) {
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
      const url = `http://localhost:8181/repair/findByLabId/1/6/` + account.username
      axios.get(url).then(resp => {
        console.log(resp.data)
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    },
    // 分页
    page (currentPage) {
      const _this = this
      axios.get(`http://localhost:8181/repair/findAll/` + currentPage + `/6`).then(resp => {
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
          axios.post(`http://localhost:8181/repair/save`, this.ruleForm).then(function (resp) {
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
      axios.delete(`http://localhost:8181/repair/delete/` + ids).then(function (resp) {
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
<style>
  .tableDialog{
    height:400px;
    width: 900px;
    margin-left: 40px;
    text-align: center;
    background-color: #ffffff;
  }
  .tableDialog input {
    width: 99%;
    height: 100%;
    border: 0px;
    cursor: pointer;
    outline: none;
    color: #000;
  }
  .table td{
    width: 100px;
    text-align: center;
  }
  .table td input{
    width: 99%;
    height: 100%;
    border:0px;
    cursor:pointer;
    outline:none;
    color: #F7F7F7;
    background-color: rgba(0,0,0,0.1);
  }
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
