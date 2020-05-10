<!--填写招聘信息（技术员）-->
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
          prop="depId"
          label="申请部门"
          width="150">
        </el-table-column>
        <el-table-column
          prop="artisanId"
          label="申请人"
          width="150">
        </el-table-column>
        <el-table-column
          prop="recruitTime"
          label="招聘时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="issueStatus"
          label="审核/发布状态"
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
      title="添加招聘信息"
      :visible.sync="list_addDialog"
      width="50%">
        <span>
          <div style="margin-left: 20px;">
            <el-form ref="form" label-width="100px" >
              <el-form-item label="招聘计划编号">
                <el-input v-model="recruitId"></el-input>
              </el-form-item>
              <el-form-item label="计划名称">
                <el-input v-model="recruitName"></el-input>
              </el-form-item>
              <el-form-item label="岗位要求">
                <el-input v-model="jobRequire"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数">
                <el-input v-model="recruitNum"></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input v-model="artisanName"></el-input>
              </el-form-item>
              <el-form-item label="招聘时间">
                <div class="block">
                  <el-date-picker
                    v-model="recruitTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
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
      title="编辑招聘信息"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="120px" >
              <el-form-item label="计划名称">
                <el-input v-model="recruitName"></el-input>
              </el-form-item>
              <el-form-item label="岗位要求">
                <el-input v-model="jobRequire"></el-input>
              </el-form-item>
              <el-form-item label="招聘人数">
                <el-input v-model="recruitNum"></el-input>
              </el-form-item>
              <el-form-item label="申请人">
                <el-input v-model="artisanName"></el-input>
              </el-form-item>
              <el-form-item label="招聘时间">
                <div class="block">
                  <el-date-picker
                    v-model="recruitTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="审核/发布状态">
                <el-input v-model="issueStatus"></el-input>
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
      recruitName: '',
      jobRequire: '',
      recruitTime: '',
      artisanName: '',
      recruitNum: '',
      recruitId: '',
      issueStatus: '',
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
