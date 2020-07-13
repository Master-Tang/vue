<template>
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">产证号<span class="red">*</span></span>
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
      <span slot="label">首层层高（工业资产）</span>
      <el-input v-model="form.fishHigh" type="text" placeholder="请输入首层层高（工业资产）"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">总层数</span>
      <el-input v-model="form.layer" type="text" placeholder="请输入总层数"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">所在层数</span>
      <el-input v-model="form.inLayer" type="text" placeholder="请输入所在层数"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">出租情况</span>
      <el-select v-model="form.rentState" placeholder="请选择出租情况" style="width:100%">
        <el-option
          v-for="item in rentalsList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">是否为抵押前租赁</span>
      <el-select v-model="form.preMort" placeholder="是否为抵押前租赁" style="width:100%">
        <el-option
          v-for="item in isRentalsList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">是否唯一住房</span>
      <el-select v-model="form.onlyHouse" placeholder="是否唯一住房" style="width:100%">
        <el-option
          v-for="item in isSinglehouseList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">建筑面积</span>
      <el-input v-model="form.structArea" type="text" placeholder="请输入建筑面积"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">备注</span>
      <el-input v-model="form.newNess" type="text" placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addproperty">保存</el-button>
      <el-button type="warning" @click="updateproperty">更改</el-button>
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
      buildingList: [],
      rentalsList: [],
      isRentalsList: [],
      isSinglehouseList: []
    };
  },
  props: ["logo"],
  created() {
    this.form.collateralId = this.logo;
    $.addInit().then(res => {
      if (res.success) {
        this.buildingList = res.data.buildingList;
        this.rentalsList = res.data.rentalsList;
        this.isRentalsList = res.data.isRentalsList;
        this.isSinglehouseList = res.data.isSinglehouseList;
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
            message: "房产信息已存在"
          });
        } else {
          this.form.propertyId = response.data;
          // console.log(response.data)
          this.$message({
            message: "房产信息已添加"
          });
        }
      });
    },
    updateproperty() {
      if (!this.validate()) return;
      $.updateproperty(this.form).then(response => {
        if (response.data == "无此信息") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            message: "该房产已更改"
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