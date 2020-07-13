<template>
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">借款合同编号</span>
      <el-input v-model="form.contNum" type="text" placeholder="请输入借款合同编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">合同本金</span>
      <el-input v-model="form.principal" type="text" placeholder="请输入合同本金"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">借款期限</span>
      <el-date-picker
        v-model="form.beginTime"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择借款起始期限"
      ></el-date-picker>
      {{"~"}}
      <el-date-picker
        v-model="form.endTime"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择借款终止期限"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        本金余额
        <span class="red">*</span>
      </span>
      <el-input v-model="form.prinBalance" type="text" placeholder="请输入本金余额"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">利息余额</span>
      <el-input v-model="form.interBalance" type="text" placeholder="请输入利息余额"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">其他金额</span>
      <el-input v-model="form.otherMoney" type="text" placeholder="请输入其他金额"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">诉讼有效期</span>
      <el-date-picker
        v-model="form.litigationBegin"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择诉讼有效期起始时间"
      ></el-date-picker>
      {{"~"}}
      <el-date-picker
        v-model="form.litigationEnd"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择诉讼有效期结束时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">签署时间</span>
      <el-date-picker
        v-model="form.signTime"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择签署时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addborrow">保存</el-button>
      <el-button type="warning" @click="updateborrow">更改</el-button>
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
        contNum: "",
        principal: 0,
        beginTime: "",
        endTime: "",
        prinBalance: 0,
        interBalance: 0,
        otherMoney: 0,
        litigationBegin: "",
        litigationEnd: "",
        signTime: "",
        claimsNumber: "",
        borrowId:""
      },
      
    };
  },
  props: ["logo"],
  created() {
    this.form.claimsNumber = this.logo;
    
  },
  methods: {
    addborrow() {
      if (!this.validate()) return;
      $.addborrow(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该合同已存在"
          });
        } else {
          this.form.borrowId=response.data
          this.$message({
            message: "该合同已添加"
          });
        }
      });
    },
    updateborrow(){
      if (!this.validate()) return;
      $.updateborrow(this.form).then(response =>{
        if (response.data == "无此合同") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            message: "该合同已更改"
          });
        }
      })
    },
     validate() {
      let error = "";
      if (this.form.contNum.length == 0) {
        error = "借款合同编号必填\n";
      } else if (this.form.prinBalance.length == 0) {
        error = "本金余额必填\n";
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
 <style scoped>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>