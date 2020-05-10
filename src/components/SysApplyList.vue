<!--报名人员名单-->
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
    </template>
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
