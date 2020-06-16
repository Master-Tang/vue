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
import department from '../../../../api/department';
export default {
  data() {
    return {
      form: {
        loginName: "",
        loginPass: "",
        depId: "",
        telephone: "",
        dingDing: "",
        trueName: "",
        roleId:"",
        roleIdList:[],
        departmentList:[]
      },
      options: []
    };
  },
  created() {
    $.getRoleList().then(response=>{
      if(response.success){
        // console.log(response.data)
        this.form.roleIdList=response.data.list
      }
    });
    department.getList().then(response=>{
      if(response.success){
        // console.log(response.data.list)
        this.form.departmentList=response.data.list
      }
    });
  },
  methods: {
    addData() {
      // console.log(this.departmentList)
      // console.log(this.form.depId);
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
              this.$router.replace('index')
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