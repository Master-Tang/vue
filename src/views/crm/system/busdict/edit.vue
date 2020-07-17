<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="分组名称">
        <el-select v-model="form.groupName" placeholder="请选择" disabled>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签名称">
        <el-input v-model="form.dicKey"></el-input>
      </el-form-item>
      <el-form-item label="标签值">
        <el-input v-model="form.dicValue"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData()">确定</el-button>
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
      id: "",
      form: {
        id: "",
        dicKey: "",
        dicValue: "",
        groupName: ""
      },
      options: []
    };
  },
  created() {
    (this.id = this.$route.query.id),
      // this.fetchData()
      this.getData();
  },
  methods: {
    getData() {
      // console.log(this.form.id);
      $.getbusDict({ id: this.id }).then(response => {
        this.form.groupName = response.data.dict.groupName;
        this.form.dicKey = response.data.dict.dicKey;
        this.form.dicValue = response.data.dict.dicValue;
        // console.log(response.data.dict);
      });
    },
    updateData() {
      if (this.form.dicKey.length > 0 && this.form.dicValue.length > 0) {
        $.updatebus({
          id: this.id,
          dicKey: this.form.dicKey,
          dicValue: this.form.dicValue,
          groupName: this.form.groupName
        }).then(response => {
          if (response.success) {
            this.$router.replace("/system/dict");
          }
        });
      } else {
        this.$message({
          type: "fail",
          message: "标签名称和标签值不能为空!"
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