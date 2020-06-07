<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="用户名">
        <el-input v-model="form.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.loginPass"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="form.depId"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="钉钉号">
        <el-input v-model="form.dingDing"></el-input>
      </el-form-item>
      <el-form-item label="角色号">
      
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData()">创建新员工</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import $ from "@/api/sysuser";
export default {
  data() {
    return {
      form: {
        loginName: "",
        loginPass: "",
        depId: "",
        telephone: "",
        dingDing: "",
        roleId: "",
        trueName: ""
      },
      options: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    addData() {
      console.log(this.value, this.form.loginName, this.form.telephone);
      $.add({
        loginName: this.form.loginName,
        loginPass: this.form.loginPass,
        depId: this.form.depId,
        telephone: this.form.telephone,
        dingDing: this.form.dingDing,
        roleId: this.form.roleId,
        trueName: this.form.trueName
      }).then(response => {
        if(response.success)
          {
            this.$router.replace('/system/user')
          }
      });
    },

  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>