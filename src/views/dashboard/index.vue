<template>
  <div class="dashboard-container" align="center">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="open">修改密码</el-button>
      </div>
      <div class="text item">姓名: {{ trueName }}</div>
      <div class="text item">手机号码: {{ telephone }}</div>
      <div class="text item">用户名: {{ loginName }}</div>
      <div class="text item">部门: {{ depName }}</div>
      <div class="text item">共录入伙伴数: {{ countPartner }}</div>
    </el-card>
  </div>
</template>

<script>
import $ from "@/api/assets";

export default {
  data() {
    return {
      loginName: "",
      countPartner: "",
      trueName: "",
      telephone: "",
      dingDing: "",
      depName: ""
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
    open() {
      this.$prompt("请输入新密码", "密码更改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value.length < 6) {
            this.$message({
              type: "error",
              message: "新密码不能少于6位"
            });
          } else {
            $.updatePassword({
              loginName: this.loginName,
              loginPass: value
            }).then(res => {
              if (res.success) {
                this.$message({
                  type: "success",
                  message: "修改成功,你的新密码是: " + value
                });
              }
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更改"
          });
        });
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
