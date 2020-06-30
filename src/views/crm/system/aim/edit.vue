<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="姓名">
        <el-input disabled v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-select v-model="form.depId" disabled="" placeholder="请选择">
          <el-option
            v-for="item in form.departmentList"
            :key="item.id"
            :label="item.depName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第一季度">
        <el-input v-model="form.quarter1"></el-input>
      </el-form-item>
      <el-form-item label="第二季度">
        <el-input v-model="form.quarter2"></el-input>
      </el-form-item>
      <el-form-item label="第三季度">
        <el-input v-model="form.quarter3"></el-input>
      </el-form-item>
      <el-form-item label="第四季度">
        <el-input v-model="form.quarter4"></el-input>
      </el-form-item>
      <el-form-item label="年度">
        <el-input v-model="form.yr"></el-input>
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
        quarter1: "",
        quarter2: "",
        quarter3: "",
        quarter4: "",
        depId: "",
        yr: "",
        trueName: "",
        departmentList:[]
      }
    };
  },
  created() {
    (this.id = this.$route.query.id)
    department.getList().then(response => {
        if (response.success) {
          // console.log(response.data.list)
          this.form.departmentList = response.data.list;
        }
      });
    var nowDate = new Date();
    // console.log(String(nowDate.getFullYear()))
    
      $.findAim({ userId: this.id, time: String(nowDate.getFullYear()) }).then(response => {
        if (response.success) {
          console.log(response.data);
          this.form.trueName = response.data.trueName;
          this.form.depId = response.data.depId;
          this.form.quarter1 = response.data.quarter1;
          this.form.quarter2 = response.data.quarter2;
          this.form.quarter3 = response.data.quarter3;
          this.form.quarter4 = response.data.quarter4;
          this.form.yr = response.data.yr;
        }
      });
  },
  methods: {
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
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>