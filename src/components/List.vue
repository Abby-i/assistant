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
      prop="depId"
      label="部门编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="depName"
      label="部门名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="depUserId"
      label="登录账号"
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
        title="添加部门信息"
        :visible.sync="list_addDialog"
        width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="100px" >
              <el-form-item label="部门名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="登录账号">
                <el-input></el-input>
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
        title="修改部门信息"
        :visible.sync="list_updateDialog"
        width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="100px" >
              <el-form-item label="部门名称">
                <el-input v-model="depName"></el-input>
              </el-form-item>
              <el-form-item label="登录账号">
                <el-input v-model="depUserId"></el-input>
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
      input: '',
      depUserId: '',
      depName: '',
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
  methods: {
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
</style>
