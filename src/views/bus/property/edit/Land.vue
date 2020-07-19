<template>
<div class="my-padding">
  <el-form ref="form" :model="form" label-width="6rem">
    <el-form-item>
      <span slot="label">
        产证号
        <span class="red">*</span>
      </span>
      <el-input v-model="form.landProdu" type="text" placeholder="请输入产证号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">土地用途</span>
      <el-select v-model="form.landUse" placeholder="请选择土地用途" style="width:100%">
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
      <el-select v-model="form.landStat" placeholder="请选择土地性质" style="width:100%">
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
      <el-select v-model="form.wayObt" placeholder="请选择获得方式" style="width:100%">
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
      <el-input
        v-model="form.servLife"
        type="text"
        placeholder="请输入剩余使用年限"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">面积</span>
      <el-input
        v-model="form.area"
        type="text"
        placeholder="请输入土地面积"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">土地市场单价</span>
      <el-input
        v-model="form.landPrice"
        type="text"
        placeholder="请输入土地市场单价"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">备注</span>
      <el-input v-model="form.note" type="text" placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addland" v-if="form.landId==null">保存</el-button>
      <el-button type="warning" @click="updateland" v-if="form.landId!=null">更改</el-button>
      <el-button @click="cencelland">取消</el-button>
    </el-form-item>
  </el-form>
</div>
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
        landId: "",
        landProdu: "",
        landUse: "",
        landStat: "",
        wayObt: "",
        servLife: "",
        area: "",
        landPrice: "",
        collateralId: "",
        note: ""
      },
      claimsNumber: "",
      landuseList: [],
      landList: [],
      gettypeList: []
    };
  },
  created() {
    this.claimsNumber = this.$route.query.id;
    this.form.collateralId = this.$route.query.id;
    this.form.landId = this.$route.query.landId;
    $.addInit().then(res => {
      if (res.success) {
        this.landuseList = res.data.landuseList;
        this.landList = res.data.landList;
        this.gettypeList = res.data.gettypeList;
      }
    });
    $.land({ landId: this.$route.query.landId}).then(res => {
      if (res.success) {
        if(res.data!=null){
        // console.log(res.data)
        this.form = res.data;
        }
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
            message: "该产证号已存在请勿重复添加"
          });
        } else {
          this.form.propertyId = response.data;
          // console.log(response.data)
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "third",
              claimsNumber: this.claimsNumber
            }
          });
        }
      });
    },
    cencelland() {
      this.$router.push({
        path: "index",
        query: {
          activeName: "third",
          claimsNumber: this.claimsNumber
        }
      });
    },
    updateland() {
      if (!this.validate()) return;
      $.updateland(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该产证号已存在,请重新更改"
          });
        } else {
          this.$message({
            type:"success",
            message: "该土地信息已更改"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "third",
              claimsNumber: this.claimsNumber
            }
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
    }
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