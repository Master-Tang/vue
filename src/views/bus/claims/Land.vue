<template>
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">产证号<span class="red">*</span></span>
      <el-input v-model="form.landProdu" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">土地用途</span>
      <el-select v-model="form.landUse" placeholder="请选择建筑类型" style="width:100%">
        <el-option
          v-for="item in landuseList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">土地性质</span>
      <el-select v-model="form.landStat" placeholder="请选择建筑类型" style="width:100%">
        <el-option
          v-for="item in landList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">获得方式</span>
      <el-select v-model="form.wayObt" placeholder="请选择建筑类型" style="width:100%">
        <el-option
          v-for="item in gettypeList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">剩余使用年限</span>
      <el-input v-model="form.servLife" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">面积</span>
      <el-input v-model="form.area" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">土地市场单价</span>
      <el-input v-model="form.landPrice" type="text" placeholder="请输入债权编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">备注</span>
      <el-input v-model="form.note" type="text" placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addland">保存</el-button>
      <el-button type="warning" @click="updateland">更改</el-button>
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
        busType: "01",
        landId:"",
        landProdu: "",
        landUse: "",
        landStat: "",
        wayObt: "",
        servLife: "",
        area: "",
        landPrice: "",
        collateralId:"",
        note:""
      },
      landuseList: [],
      landList: [],
      gettypeList: []
    };
  },
  props: ["logo"],
  created() {
    this.form.collateralId = this.logo;
    $.addInit().then(res => {
      if (res.success) {
        this.landuseList = res.data.landuseList;
        this.landList = res.data.landList;
        this.gettypeList = res.data.gettypeList;
      }
    });
  },
  methods: {
     addland() {
      if (!this.validate()) return;
      $.addland(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "土地信息已存在"
          });
        } else {
          this.form.propertyId = response.data;
          // console.log(response.data)
          this.$message({
            message: "土地信息已添加"
          });
        }
      });
    },
    updateland() {
      if (!this.validate()) return;
      $.updateland(this.form).then(response => {
        if (response.data == "无此信息") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            message: "该土地信息已更改"
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.landProdu.length == 0) {
        error = "产证号必填\n";
      } 
      if (error) {
        this.$message({
          message: error,
          type: "error"
        });
        return false;
      }
      return true;
    },
  }
};
</script>

<style>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>