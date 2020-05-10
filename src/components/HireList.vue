<!--录用名单（技术员）-->
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
          prop="labId"
          label="所属实验室"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuId"
          label="学生学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuName"
          label="学生姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="major"
          label="专业"
          width="150">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="150">
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级"
          width="150">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
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
      title="编辑招聘信息"
      :visible.sync="list_updateDialog"
      width="50%">
        <span>
          <div>
            <el-form ref="form" label-width="120px" >
              <el-form-item label="所属实验室">
                <el-input v-model="labId"></el-input>
              </el-form-item>
              <el-form-item label="学生学号">
                <el-input v-model="stuId"></el-input>
              </el-form-item>
              <el-form-item label="学生姓名">
                <el-input v-model="stuName"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="major"></el-input>
              </el-form-item>
              <el-form-item label="年级">
                <el-input v-model="grade"></el-input>
              </el-form-item>
              <el-form-item label="班级">
                <el-input v-model="className"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="telephone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="email"></el-input>
              </el-form-item>
               <el-form-item label="个人照片">
                <el-input v-model="photo"></el-input>
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
      labId: '',
      stuId: '',
      stuName: '',
      major: '',
      grade: '',
      className: '',
      telephone: '',
      email: '',
      photo: '',
      input: '',
      // 弹出层
      list_addDialog: false,
      list_updateDialog: false,

      tableData: [{
        labId: '111',
        stuId: '22',
        stuName: '小王',
        major: '软件工程',
        grade: '17级'
      }, {
        labId: '111',
        stuId: '22',
        stuName: '小王',
        major: '软件工程',
        grade: '17级'
      }, {
        labId: '111',
        stuId: '22',
        stuName: '小王',
        major: '软件工程',
        grade: '17级'
      }, {
        labId: '111',
        stuId: '22',
        stuName: '小王',
        major: '软件工程',
        grade: '17级'
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
