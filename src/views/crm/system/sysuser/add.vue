<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="用户名">
        <el-input v-model="form.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.loginPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.confirmPass"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-select v-model="form.depId" placeholder="请选择">
          <el-option
            v-for="item in form.departmentList"
            :key="item.id"
            :label="item.depName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="钉钉号">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.roleId" placeholder="请选择">
          <el-option
            v-for="item in form.roleIdList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData()">创建新员工</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import $ from "@/api/sysuser";
import department from "../../../../api/department";
export default {
  data() {
    return {
      form: {
        loginName: "",
        loginPass: "",
        confirmPass: "",
        depId: "",
        telephone: "",
        dingDing: "",
        trueName: "",
        roleId: "",
        roleIdList: [],
        departmentList: []
      },
      options: []
    };
  },
  created() {
    $.getRoleList().then(response => {
      if (response.success) {
        // console.log(response.data)
        this.form.roleIdList = response.data.list;
      }
    });
    department.getList().then(response => {
      if (response.success) {
        // console.log(response.data.list)
        this.form.departmentList = response.data.list;
      }
    });
  },
  methods: {
    addData() {
      // console.log(this.departmentList)
      // console.log(this.form.depId);
      if (!this.validate()) return;
      $.add({
        loginName: this.form.loginName,
        loginPass: this.form.loginPass,
        depId: this.form.depId,
        telephone: this.form.telephone,
        dingDing: this.form.dingDing,
        roleId: this.form.roleId,
        trueName: this.form.trueName
      }).then(response => {
        if (response.success) {
          if (response.data === 0) {
            this.$message({
              message: "用户名或手机号或钉钉号重复"
            });
            
          } else {
            this.$router.replace("index");
          }
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.loginName.length == 0) {
        error = "用户名不能为空\n";
      } else if (this.form.loginPass.length == 0) {
        error = "密码不能为空\n";
      } else if (this.form.confirmPass.length == 0) {
        error = "确认密码错误\n";
      } else if (this.form.loginPass != this.form.confirmPass) {
        error = "确认密码错误\n";
      } else if (this.form.depId.length == 0) {
        error = "请选择部门\n";
      } else if (!/^1\d{10}$/.test(this.form.telephone)) {
        error = "请输入正确的手机号码\n";
      } else if (this.form.dingDing.length == 0) {
        error = "钉钉不能为空\n";
      } else if (this.form.trueName.length <= 1) {
        error = "姓名至少两位\n";
      } else if (this.form.roleId.length == 0) {
        error = "请赋予权限\n";
      }

      if (error) {
        this.$message({
          message: error,
          type: "error"
        });
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>