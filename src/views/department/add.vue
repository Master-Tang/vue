<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="部门名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData()">立即创建</el-button>
        <el-button>取消</el-button>
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
        name: "",
      },
      value: "",
    };
  },
  methods: {
    addData() {
      console.log( this.form.name);
      $.add({
        depName: this.form.name
      }).then(response => {
        if(response.success)
          {
            this.$router.replace('/system/dep')
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