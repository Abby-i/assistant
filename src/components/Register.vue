<template>
  <el-dialog
    title="用户注册"
    :visible.sync="registerVisible"
    :modal="false"
    width="50%">
    <div id="register">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <table class="table" border cellspacing= 0>
          <tr>
            <td align="right">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</td>
            <td><input type="text" name="stuId"  v-model="ruleForm.stuId"></td>
            <td colspan=2 rowspan=3>
              <span>个人照片</span>
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8181/user/image"
                :show-file-list="false"
                name="file"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </td>
          </tr>

          <tr>
            <td align="right">个人密码：</td>
            <td><input  type="password" name="password" v-model="ruleForm.password"></td>
          </tr>

          <tr>
            <td align="right">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>
            <td><input type="text" name="stuName"  v-model="ruleForm.stuName"></td>
          </tr>

          <tr>
            <td align="right">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</td>
            <td><input type="text" name="depName"  v-model="ruleForm.depName"></td>
            <td align="right">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</td>
            <td><input type="text" name="major"  v-model="ruleForm.major"></td>
          </tr>

          <tr>
            <td align="right">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</td>
            <td><input type="text" name="className"  v-model="ruleForm.className"></td>
            <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</td>
            <td><input type="text" name="grade"   v-model="ruleForm.grade"></td>
          </tr>

          <tr>
            <td align="right">联系电话：</td>
            <td><input type="text" name="telephone"  v-model="ruleForm.telephone"></td>
            <td align="right">电子邮箱：</td>
            <td><input type="text" name="email" v-model="ruleForm.email"></td>
          </tr>

          <tr>
            <td align="center" colspan="2"><el-button type="primary">重置</el-button></td>
            <td align="center" colspan="2"><el-button type="primary"  @click="submitForm">提交</el-button></td>
          </tr>

        </table>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      ruleForm: {
        stuId: '',
        password: '',
        stuName: '',
        depName: '',
        major: '',
        className: '',
        photo: '',
        grade: '',
        telephone: '',
        email: ''
      },
      registerVisible: false,
      imageUrl: ''
    }
  },
  methods: {
    // 添加
    submitForm () {
      const _this = this
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 直接传入封装数据
          axios.post(`http://localhost:8181/user/register`, this.ruleForm).then(function (resp) {
            console.log('resp=' + JSON.stringify(resp))
            if (resp.data.code === 0) {
              _this.$notify({
                title: '成功',
                message: '数据添加成功',
                type: 'success'
              })
              _this.registerVisible = false
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
    init () {
      this.registerVisible = true
    },
    // 上传成功的钩子函数
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res.filePath)
      this.ruleForm.photo = res.filePath
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
  #register{
    background:url("../assets/night.jpg");
    width:100%;
    height:100%;
    /*position:fixed;*/
    background-size:100% 100%;
  }
  .table {
    color: #F7F7F7;
    /*height: 600px;*/
    width: 100%;
    /*position: absolute;*/
    /*left: 50%;*/
    /*top: 50%;*/
    /*transform: translate(-50%,-50%);*/
    background-color: rgba(0,0,0,0.4);
  }
  .table td{
    /*width: 120px;*/
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 140px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 140px;
    display: block;
  }
</style>
