<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="用户名">
        <el-input disabled="" v-model="form.loginName"></el-input>
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
      <el-form-item>
        <el-button type="primary" @click="updateData()">确定</el-button>
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
      id: "",
      form: {
        loginName: "",
        depId: "",
        telephone: "",
        dingDing: "",
        roleId: "",
        trueName: "",
        departmentList:[]
      },
      options: []
    };
  },
  created() {
      this.id = this.$route.query.id,
       department.getList().then(response=>{
      if(response.success){
        console.log(response.data.list)
        this.form.departmentList=response.data.list
      }
    });
      this.getData();
  },
  methods: {
    getData() {
      console.log(this.id);
      $.getByUserId({ userId: this.id }).then(response => {
        console.log(response.data);
        this.form.loginName = response.data.loginName
        this.form.depId = response.data.depId
        this.form.trueName = response.data.trueName
        this.form.telephone = response.data.telephone
        this.form.dingDing = response.data.dingDing
        this.form.roleId = response.data.roleId
        
      });
    },
    updateData() {
      if (this.form.depId.length > 0 && this.form.telephone.length > 0
          && this.form.dingDing.length > 0) {
        $.update({
          loginName:this.form.loginName,
          depId: this.form.depId,
          telephone: this.form.telephone,
          dingDing: this.form.dingDing,
          roleId: "11",
          trueName: this.form.trueName,
        }).then(response => {
          if (response.success) {
            this.$router.replace("index");
          }
        });
      } else {
        this.$message({
          type: "fail",
          message: "值不能为空!"
        });
      }
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>