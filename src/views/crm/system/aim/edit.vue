<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="姓名">
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
      <el-form-item label="第一季度">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="第二季度">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="第三季度">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item label="第四季度">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData()">确定</el-button>
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
      id: "",
      form: {
        loginName: "",
        depId: "",
        telephone: "",
        dingDing: "",
        roleId: "",
        trueName: "",
        departmentList: []
      },
      options: []
    };
  },
  created() {
    (this.id = this.$route.query.id),
      $.findAim({userId:this.id,time:"2020"}).then(response => {
        if (response.success) {
          console.log(response)
          // this.form.departmentList = response.data.list;
        }
      });
    this.getData();
  },
  methods: {
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