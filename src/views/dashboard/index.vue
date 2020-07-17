<template>
  <div class="dashboard-container" align="center">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="handleSelectionChange"
        >修改密码</el-button>
      </div>
      <div class="text item">姓名: {{ trueName }}</div>
      <div class="text item">手机号码: {{ telephone }}</div>
      <div class="text item">用户名: {{ loginName }}</div>
      <div class="text item">部门: {{ depName }}</div>
      <div class="text item">共录入伙伴数: {{ countPartner }}</div>
    </el-card>

    <el-dialog
      title="更改密码"
      :visible.sync="dialogTableVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="50%"
    >
      <el-form>
        <el-form-item>
          <span slot="label">原密码</span>
          <el-input v-model="password" type="text" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">新密码</span>
          <el-input v-model="newpassword" type="text" placeholder="请输入至少六位的新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">确认密码</span>
          <el-input v-model="confirmpassword" type="text" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="open">确认更改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import $ from "@/api/assets";

export default {
  data() {
    return {
      dialogTableVisible: false,
      loginName: "",
      countPartner: "",
      trueName: "",
      telephone: "",
      dingDing: "",
      depName: "",
      password: "",
      confirmpassword: "",
      newpassword: ""
    };
  },
  created() {
    $.countCreateId().then(response => {
      if (response.success) {
        this.countPartner = response.data;
      }
    });
    $.findFromUserID().then(response => {
      if (response.success) {
        this.trueName = response.data.trueName;
        this.telephone = response.data.telephone;
        this.loginName = response.data.loginName;
        this.depName = response.data.depName;
      }
    });
  },
  methods: {
    handleSelectionChange() {
      this.dialogTableVisible = true;
    },
    open() {
      if (this.newpassword.length < 6) {
        this.$message({
          type: "error",
          message: "新密码不能少于6位"
        });
      } else if (this.newpassword != this.confirmpassword) {
        this.$message({
          type: "error",
          message: "确认密码不一致"
        });
        this.password = "";
        this.newpassword = "";
        this.confirmpassword = "";
      } else {
        $.updatePass({
          loginName: this.loginName,
          loginPass: this.newpassword,
          passOld: this.password
        }).then(res => {
          if (res.data == "旧密码错误") {
            this.password = "";
            this.newpassword = "";
            this.confirmpassword = "";
            this.$message({
              type: "error",
              message: "原密码不正确"
            });
          } else {
            this.dialogTableVisible = false;
            this.$message({
              type: "success",
              message: "修改成功,你的新密码是: " + this.newpassword
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
