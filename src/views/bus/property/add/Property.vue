<template>
<div class="my-padding">
  <el-form ref="form" :model="form" label-width="10rem">
    <el-form-item>
      <span slot="label">
        产证号
        <span class="red">*</span>
      </span>
      <el-input v-model="form.houseProdu" type="text" placeholder="请输入产证号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">建筑类型</span>
      <el-select v-model="form.buildType" placeholder="请选择建筑类型" style="width:100%">
        <el-option
          v-for="item in buildingList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">建造时间</span>
      <el-date-picker
        v-model="form.buildTime"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择建造时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">成新度</span>
      <el-input
        v-model="form.newNess"
        type="text"
        placeholder="请输入首层层高（工业资产）"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">总层数</span>
      <el-input
        v-model="form.layer"
        type="text"
        placeholder="请输入总层数"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">所在层数</span>
      <el-input
        v-model="form.inLayer"
        type="text"
        placeholder="请输入所在层数"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">建筑面积</span>
      <el-input
        v-model="form.structArea"
        type="text"
        placeholder="请输入建筑面积"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addproperty" v-if="form.propertyId==null">保存</el-button>
      <el-button type="warning" @click="updateproperty" v-if="form.propertyId!=null">更改</el-button>
      <el-button @click="cencelproperty">取消</el-button>
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
        propertyId: "",
        houseProdu: "",
        buildType: "",
        buildTime: "",
        fishHigh: "",
        layer: "",
        inLayer: "",
        rentState: "",
        preMort: "",
        onlyHouse: "",
        structArea: "",
        newNess: "",
        collateralId: ""
      },
      claimsNumber: "",
      buildingList: [],
      rentalsList: [],
      isRentalsList: [],
      isSinglehouseList: []
    };
  },
  created() {
    this.claimsNumber = this.$route.query.id;
    this.form.collateralId = this.$route.query.id;
    this.form.propertyId = this.$route.query.propertyId;
    $.addInit().then(res => {
      if (res.success) {
        this.buildingList = res.data.buildingList;
        this.rentalsList = res.data.rentalsList;
        this.isRentalsList = res.data.isRentalsList;
        this.isSinglehouseList = res.data.isSinglehouseList;
      }
    });
    $.property({ propertyId: this.$route.query.propertyId}).then(res => {
      if (res.success) {
        if(res.data!=null){
        // console.log(res.data)
        this.form = res.data;
        }
      }
    });
  },
  methods: {
    addproperty() {
      if (!this.validate()) return;
      $.addproperty(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该产证号已存在,请勿重复添加"
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
              activeName: "second",
              claimsNumber: this.claimsNumber
            }
          });
        }
      });
    },
    cencelproperty() {
      this.$router.push({
        path: "index",
        query: {
          activeName: "second",
          claimsNumber: this.claimsNumber
        }
      });
    },
    updateproperty() {
      if (!this.validate()) return;
      $.updateproperty(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该产证号已存在,请重新更改"
          });
        } else {
          this.$message({
            type:"success",
            message: "更改成功"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "second",
              claimsNumber: this.claimsNumber
            }
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.houseProdu.length == 0) {
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