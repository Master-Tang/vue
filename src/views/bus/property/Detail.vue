<template>
  <div class="app-container">
    <el-button
      type="primary"
      plain
      @click="$router.push('/bus/property/index')"
      style="float:right"
    >退出</el-button>
    <div style="border-bottom:1px solid #999999;">
      <h2 align="center">资产信息</h2>
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="地址:">{{form.city+" "+form.address}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地图:">{{form.baiduMap}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所有权人:">{{form.owner}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产类型:">{{form.assetType}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需要核实信息:">{{form.info}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注:">{{form.note}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="(item,i) in propertyList" :key="i+'a'">
      <h2 align="center">房产信息{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"产证号: "+item.houseProdu}}</el-col>
        <el-col :span="8">{{"建筑类型: "+item.buildType}}</el-col>
        <el-col :span="8">{{"建造时间: "+item.buildTime}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"成新度: "+item.newNess}}</el-col>
        <el-col :span="8">{{"总层数: "+item.layer}}</el-col>
        <el-col :span="8">{{"所在层数: "+item.inLayer}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"建筑面积: "+item.structArea}}</el-col>
      </el-row>
    </div>


    <div
      style="border-bottom:1px dashed #999999;"
      v-for="(item,i) in landList"
      :key="i+'c'"
    >
      <h2 align="center">土地信息{{i}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"产证号: "+item.landProdu}}</el-col>
        <el-col :span="8">{{"土地用途: "+item.landUse}}</el-col>
        <el-col :span="8">{{"土地性质: "+item.landStat}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"获得方式: "+item.wayObt}}</el-col>
        <el-col :span="8">{{"剩余使用年限: "+item.servLife}}</el-col>
        <el-col :span="8">{{"面积: "+item.area}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"土地市场单价: "+item.landPrice}}</el-col>
        <el-col :span="8">{{"备注: "+item.note}}</el-col>
      </el-row>
    </div>


    <div v-for="(item,i) in otherList" :key="i+'e'">
      <h2 align="center">其他资产{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"产证号: "+item.otherProd}}</el-col>
        <el-col :span="8">{{"类型: "+item.otherType}}</el-col>
        <el-col :span="8">{{"描述: "+item.describe}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"备注: "+item.note}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      form: {
        city: [],
        address: "测试",
        owner: "",
        assetType: "",
        info: "",
        state: "",
        note: "",
        baiduMap: ""
      },
      
      propertyList: [],
      landList: [],
      otherList: [],
      claimsNumber: ""
    };
  },
  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
    $.mapproAll({ number: this.claimsNumber }).then(response => {
      if (response.success) {
        // console.log(response.data)
        this.form = response.data.prorig;
        this.propertyList = response.data.properties;
        this.landList = response.data.lands;
        this.otherList = response.data.otherList;
      }
    });
  }
};
</script>

<style>
</style>