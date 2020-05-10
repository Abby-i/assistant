<template>
    <div id="register">
      <table class="table" border cellspacing= 0>
        <tr>
          <td align="right">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</td>
          <td><input type="text" name="stuId"  value=""></td>
          <td colspan=2 rowspan=3>
            <span>个人照片</span>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
        </tr>

        <tr>
          <td align="right">个人密码：</td>
          <td><input  type="password" name="password" value=""></td>
        </tr>

        <tr>
          <td align="right">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>
          <td><input type="text" name="stuName"  value=""></td>
        </tr>

        <tr>
          <td align="right">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;院：</td>
          <td><input type="text" name="depName" value=""></td>
          <td align="right">专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</td>
          <td><input type="text" name="major"  value=""></td>
        </tr>

        <tr>
          <td align="right">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</td>
          <td><input type="text" name="className"  value=""></td>
          <td align="right">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：</td>
          <td><input type="text" name="grade"   value=""></td>
        </tr>

        <tr>
          <td align="right">联系电话：</td>
          <td><input type="text" name="telephone"  value=""></td>
          <td align="right">电子邮箱：</td>
          <td><input type="text" name="email" value=""></td>
        </tr>

        <tr>
          <td align="center" colspan="2"><el-button type="primary">重置</el-button></td>
          <td align="center" colspan="2"><el-button type="primary">提交</el-button></td>
        </tr>

      </table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
    position:fixed;
    background-size:100% 100%;
  }
  .table {
    color: #F7F7F7;
    height: 600px;
    width: 800px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.4);
  }
  .table td{
    width: 120px;
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
