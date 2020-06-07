<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
     <el-form-item label="部门编号">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门名称">
        <el-input v-model="form.depName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveData()">保存</el-button>
        <el-button type="default" @click="back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import $ from "@/api/department";
export default {
  data() {
    return {
      form: {
        id: "",
        depName:""
      },
     
    };
  },
  created(){
   $.get({id:this.$route.query.id}).then(response=>{
     if(response.success)
     {
       this.form=response.data
     }
   })
  },
  methods: {
    saveData() {
    
      $.save(this.form).then(response => {
        if(response.success)
          {
            this.$router.replace('index')
          }
      });
    },
    back()
    {
      this.$router.back()
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>