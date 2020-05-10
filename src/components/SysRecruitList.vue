<!--系统用户报名信息列表-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round>查询</el-button>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="recruitId"
          label="招聘计划编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recruitName"
          label="计划名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="jobRequire"
          label="岗位要求"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recruitNum"
          label="招聘人数"
          width="150">
        </el-table-column>
        <el-table-column
          prop="artisanId"
          label="发布人"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recruitTime"
          label="招聘时间"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-check" circle @click="list_updateDialog">报名</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="填写报名信息信息"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="120px" >
              <el-form-item label="计划编号">
                <el-input v-model="recruitId"></el-input>
              </el-form-item>
               <el-form-item label="计划名称">
                <el-input v-model="recruitName"></el-input>
              </el-form-item>
              <el-form-item label="学生姓名">
                <el-input v-model="stuName"></el-input>
              </el-form-item>
              <el-form-item label="学生学号">
                <el-input v-model="stuId"></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input v-model="artisanId"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
               <el-input v-model="skill"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog = false">取 消</el-button>
    <el-button type="primary" @click="list_updateDialog = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      recruitId: '',
      recruitName: '',
      recruitTime: '',
      artisanId: '',
      stuId: '',
      stuName: '',
      skill: '',
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: [{
        depId: '王小虎',
        depName: '上海',
        depUserId: '普陀区'
      }, {
        depId: '王小虎',
        depName: '上海',
        depUserId: '普陀区'
      }, {
        depId: '王小虎',
        depName: '上海',
        depUserId: '普陀区'
      }, {
        depId: '王小虎',
        depName: '上海',
        depUserId: '普陀区'
      }]
    }
  },
  methods: {}
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
</style>
