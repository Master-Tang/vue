<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="分组名称">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标签值">
        <el-input v-model="form.region"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData()">立即创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import $ from "@/api/dict";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
      },
      value: "",
      options: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    addData() {
     // console.log(this.value, this.form.name, this.form.region);
      $.add({
        dicKey: this.form.name,
        dicValue: this.form.region,
        groupName: this.value
      }).then(response => {
        if(response.success)
          {
            this.$router.replace('/system/dict')
          }
      });
    },
    fetchData() {
      this.options.splice(0,this.options.length)
      $.getGroupName().then(response=>{
        console.log(response.data)
        this.options=response.data;
     
      })
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
</style>