<!--助理填写 维修表（学生助理）-->
<template>
  <div>
  <div class="list_title">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="info" round>查询</el-button>
    <el-button type="success" round @click="addRepairDialog=true">添加</el-button>
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
          prop="stuName"
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
            <el-button type="text" size="small" >查看</el-button>
            <el-button type="text" size="small" @click="list_updateDialog=true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
    <el-dialog
      title="添加维修信息:"
      :visible.sync="addRepairDialog"
      width="70%">
    <span>
       <table class="tableDialog" border cellspacing= 0 >
      <tr>
        <td align="right">维修表编号:</td>
        <td><input type="text" name="repairId"  value=""></td>
        <td align="right">设备名称：</td>
        <td><input type="text" name="equipName"  value=""></td>
        <td align="right">设备型号：</td>
        <td><input  type="text" name="equipId" value=""></td>
      </tr>
      <tr>
        <td align="right">设备所在实验室：</td>
        <td><input type="text" name="labName"  value=""></td>
        <td align="right">报修人：</td>
        <td><input type="text" name="stuName"  value=""></td>
        <td align="right">保修时间：</td>
        <td><input type="text" name="repairTime"  value=""></td>
      </tr>

      <tr>
        <td align="right">故障现象描述：</td>
        <td colspan=5><input type="text" name="labName"  value=""></td>
      </tr>
       </table>
    </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addRepairDialog= false">取 消</el-button>
    <el-button type="primary" @click="addRepairDialog= false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑维修信息:"
      :visible.sync="list_updateDialog"
      width="70%"
       class="bg">
    <span>
       <table class="tableDialog" border cellspacing= 0 >
      <tr>
        <td align="right">维修表编号：</td>
        <td><input type="text" name="repairId"  value=""></td>
        <td align="right">设备名称：</td>
        <td><input type="text" name="equipName"  value=""></td>
        <td align="right">设备型号：</td>
        <td><input  type="text" name="equipId" value=""></td>
      </tr>
      <tr>
        <td align="right">设备所在实验室：</td>
        <td><input type="text" name="labId"  value=""></td>
        <td align="right">报修人：</td>
        <td><input type="text" name="stuName"  value=""></td>
        <td align="right">保修时间：</td>
        <td><input type="text" name="repairTime"  value=""></td>
      </tr>

      <tr>
        <td align="right">故障现象描述：</td>
        <td colspan=5><input type="text" name="faultAnalysis"  value=""></td>
      </tr>
       </table>
    </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="list_updateDialog= false">取 消</el-button>
    <el-button type="primary" @click="list_updateDialog= false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addRepairDialog: false,
      list_updateDialog: false,
      labId: '',
      stuName: '',
      faultAnalysis: '',

      tableData: [{
        labId: '111',
        stuName: '小白',
        faultAnalysis: '死机'
      }, {
        labId: '111',
        stuName: '小白',
        faultAnalysis: '死机'
      }, {
        labId: '111',
        stuName: '小白',
        faultAnalysis: '死机'
      }, {
        labId: '111',
        stuName: '小白',
        faultAnalysis: '死机'
      }]
    }
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
