<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="用户名">
        <el-input disabled v-model="form.loginName"></el-input>
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
      <el-form-item label="姓名">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="钉钉号">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="form.roleId" placeholder="请选择">
          <el-option
            v-for="item in roleIdList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData()">确定</el-button>
        <el-button type="warning" @click="opendialog">重置密码</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="重置密码"
      :visible.sync="dialogTableVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="50%"
    >
      <el-form>
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
import $ from "@/api/sysuser";
import department from "../../../../api/department";
export default {
  data() {
    return {
      id: "",
      dialogTableVisible: false,
      newpassword: "",
      confirmpassword: "",
      form: {
        loginName: "",
        depId: "",
        telephone: "",
        dingDing: "",
        roleId: "",
        trueName: "",
        departmentList: []
      },
      options: [],
      roleIdList: []
    };
  },
  created() {
    (this.id = this.$route.query.id),
      $.getRoleList().then(response => {
        if (response.success) {
          // console.log(response.data)
          this.roleIdList = response.data.list;
        }
      });
    department.getList().then(response => {
      if (response.success) {
        // console.log(response.data.list)
        this.form.departmentList = response.data.list;
      }
    });
    this.getData();
  },
  methods: {
    opendialog() {
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
        $.updatePassword({
          loginName: this.form.loginName,
          loginPass: this.confirmpassword
        }).then(res => {
          if (res.success) {
            this.dialogTableVisible = false;
            this.$message({
              type: "success",
              message: "重置成功,新密码为"+this.confirmpassword
            });
          }
        });
      }
    },
    getData() {
      // console.log(this.id);
      $.getByUserId({ userId: this.id }).then(response => {
        // console.log(response.data);
        this.form.loginName = response.data.loginName;
        this.form.depId = response.data.depId;
        this.form.trueName = response.data.trueName;
        this.form.telephone = response.data.telephone;
        this.form.dingDing = response.data.dingDing;
        this.form.roleId = response.data.roleId;
      });
    },
    updateData() {
      if (!this.validate()) return;
      $.update({
        loginName: this.form.loginName,
        depId: this.form.depId,
        telephone: this.form.telephone,
        dingDing: this.form.dingDing,
        roleId: this.form.roleId,
        trueName: this.form.trueName
      }).then(response => {
        if (response.success) {
          this.$router.replace("index");
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.trueName.length <= 1) {
        error = "姓名至少两位\n";
      } else if (!/^1\d{10}$/.test(this.form.telephone)) {
        error = "请输入正确的手机号码\n";
      } else if (this.form.dingDing.length == 0) {
        error = "钉钉不能为空\n";
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