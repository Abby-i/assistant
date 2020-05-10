<!--面试人员名单（技术员）-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round>查询</el-button>
    <el-button type="warning" round>删除</el-button>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 30px">
        @selection-change="handleSelectionChange">
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
        <el-table-column
          prop="viewStatus"
          label="录用情况"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-check" circle>录用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: [{
        recruitId: '王小虎',
        recruitName: '上海',
        applyId: '普陀区'
      }, {
        recruitId: '王小虎',
        recruitName: '上海',
        applyId: '普陀区'
      }, {
        recruitId: '王小虎',
        recruitName: '上海',
        applyId: '普陀区'
      }, {
        recruitId: '王小虎',
        recruitName: '上海',
        applyId: '普陀区'
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
