<template>
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">类型</span>
      <el-select v-model="form.claimsType" placeholder="请选择类型" style="width:100%">
        <el-option
          v-for="item in highlightList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">描述</span>
      <el-input v-model="form.describes" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">亮点价值</span>
      <el-input v-model="form.value" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">依据</span>
      <el-input v-model="form.basis" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addlight">保存</el-button>
      <el-button type="warning" @click="updatelight">更改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      activeName: "first",
      act: "first",
      acte: "first",
      form: {
        lightId: "",
        highlightList: "",
        describes: "",
        value: "",
        basis: "",
        claimsNumber: "",
        claimsType: "",
      },
      highlightList:[],
    };
  },
  props: ["logo"],
  created() {
    this.form.claimsNumber = this.logo;
    $.addInit().then(res => {
      if (res.success) {
        this.highlightList = res.data.highlightList;
      }
    });
  },
   methods: {
    addlight() {
      if (!this.validate()) return;
      $.addlight(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "信息已存在"
          });
        } else {
          this.form.lightId = response.data;
          // console.log(response.data)
          this.$message({
            message: "信息已添加"
          });
        }
      });
    },
    updatelight() {
      if (!this.validate()) return;
      $.updatelight(this.form).then(response => {
        if (response.data == "无此信息") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            message: "该信息已更改"
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.claimsType.length == 0) {
        error = "类型必选\n";
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

<style>
</style>