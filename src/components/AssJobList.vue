<!--助理填写工作内容（学生助理）-->
<!--助理工作内容信息（技术员）-->
<template>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round>查询</el-button>
    <el-button type="success" round @click="list_addDialog=true">添加</el-button>
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
            <el-button type="text" size="small" @click="list_updateDialog=true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog
      title="添加工作内容"
      :visible.sync="list_addDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="120px" >
              <el-form-item label="周次">
                <el-input v-model="weekTimes"></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-input v-model="time"></el-input>
              </el-form-item>
              <el-form-item label="星期">
                <el-input v-model="week"></el-input>
              </el-form-item>
              <el-form-item label="实验室">
                <el-input v-model="labId"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="stuId"></el-input>
              </el-form-item>
              <el-form-item label="工作内容">
                <el-input v-model="jobContent"></el-input>
              </el-form-item>
              <el-form-item label="系统时间">
                <el-input v-model="systemTime"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_addDialog = false">取 消</el-button>
    <el-button type="primary" @click="list_addDialog = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑工作内容"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="120px" >
              <el-form-item label="周次">
                <el-input v-model="weekTimes"></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-input v-model="time"></el-input>
              </el-form-item>
              <el-form-item label="星期">
                <el-input v-model="week"></el-input>
              </el-form-item>
              <el-form-item label="实验室">
                <el-input v-model="labId"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="stuId"></el-input>
              </el-form-item>
              <el-form-item label="工作内容">
                <el-input v-model="jobContent"></el-input>
              </el-form-item>
              <el-form-item label="系统时间">
                <el-input v-model="systemTime"></el-input>
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
      weekTimes: '',
      time: '',
      week: '',
      labId: '',
      stuId: '',
      jobContent: '',
      systemTime: '',
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
