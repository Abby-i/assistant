<!--实验技术员列表-->
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
          prop="artisanId"
          label="技术员编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="artisanName"
          label="技术员姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式"
          width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="150">
        </el-table-column>
        <el-table-column
          prop="depId"
          label="所属部门"
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
      title="添加技术员信息"
      :visible.sync="list_addDialog"
      width="50%">
        <span>
          <div>
           <el-form ref="form" label-width="100px" >
              <el-form-item label="技术员编号" >
                <el-input v-model="artisanId"></el-input>
              </el-form-item>
              <el-form-item label="技术员姓名">
                <el-input v-model="artisanName"></el-input>
              </el-form-item>
               <el-form-item label="联系方式">
                <el-input v-model="telephone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="email"></el-input>
              </el-form-item>
               <el-form-item label="所属部门">
                <el-input v-model="depId"></el-input>
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
      title="编辑技术员信息"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="100px" >
              <el-form-item label="技术员编号" >
                <el-input v-model="artisanId" readonly></el-input>
              </el-form-item>
              <el-form-item label="技术员姓名">
                <el-input v-model="artisanName"></el-input>
              </el-form-item>
               <el-form-item label="联系方式">
                <el-input v-model="telephone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="email"></el-input>
              </el-form-item>
               <el-form-item label="所属部门">
                <el-input v-model="depId"></el-input>
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
      artisanId: '',
      artisanName: '',
      telephone: '',
      email: '',
      depId: '',
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: [{
        artisanId: '111',
        artisanName: '小王',
        depId: 'C1'
      }, {
        artisanId: '111',
        artisanName: '小王',
        depId: 'C1'
      }, {
        artisanId: '111',
        artisanName: '小王',
        depId: 'C1'
      }, {
        artisanId: '111',
        artisanName: '小王',
        depId: 'C1'
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
