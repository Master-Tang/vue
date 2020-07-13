<template>
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">
        抵押物合同编号
        <span class="red">*</span>
      </span>
      <el-input v-model="form.collateralNumber" type="text" placeholder="请输入抵押物合同编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        合同类型
        <span class="red">*</span>
      </span>
      <el-select v-model="form.collateralType" placeholder="请选择抵押物合同类型" style="width:100%">
        <el-option
          v-for="item in procolList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        抵押金额
        <span class="red">*</span>
      </span>
      <el-input v-model="form.collateralMoney" type="text" placeholder="请输入抵押金额"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">抵押期限</span>
      <el-date-picker
        v-model="form.collateralBegin"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择抵押起始期限"
      ></el-date-picker>
      {{"~"}}
      <el-date-picker
        v-model="form.collateralEnd"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择抵押终止期限"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">主债权合同期限</span>
      <el-date-picker
        v-model="form.principalBegin"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择主债权发生起始期限"
      ></el-date-picker>
      {{"~"}}
      <el-date-picker
        v-model="form.principalEnd"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择主债权发生终止期限"
      ></el-date-picker>
    </el-form-item>

    <el-form-item>
      <span slot="label">合同签订时间</span>
      <el-date-picker
        v-model="form.signedTime"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择合同签订时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">关联借款合同</span>
      <el-select v-model="form.properties" placeholder="请选择关联借款合同" style="width:100%">
        <el-option
          v-for="item in collateralContract"
          :key="item.contNum"
          :label="item.contNum"
          :value="item.contNum"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">备注</span>
      <el-input v-model="form.note" type="text" placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addcontract">保存</el-button>
      <el-button type="warning" @click="updatecontract">更改</el-button>
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
        collateralNumber: "",
        collateralType: "",
        collateralMoney: "",
        collateralBegin: "",
        collateralEnd: "",
        principalBegin: "",
        principalEnd: "",
        signedTime: "",
        note: "",
        collateralLink: "",
        claimsNumber: "",
        contractId: ""
      },
      procolList: [],
      collateralContract: []
    };
  },
  props: ["logo"],
  created() {
    this.form.claimsNumber = this.logo;
    $.contractList({ claimsNumber: this.form.claimsNumber }).then(res => {
      if (res.success) {
        this.collateralContract = res.data.collateralContract;
      }
    });
    $.addInit().then(res => {
      if (res.success) {
        this.procolList = res.data.procolList;
      }
    });
  },
  methods: {
    addcontract() {
      if (!this.validate()) return;
      $.addcontract(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该合同已存在"
          });
        } else {
          this.form.contractId = response.data;
          this.$message({
            message: "该合同已添加"
          });
        }
      });
    },
    updatecontract() {
      if (!this.validate()) return;
      $.updatecontract(this.form).then(response => {
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
      });
    },
    validate() {
      let error = "";
      if (this.form.collateralNumber.length == 0) {
        error = "抵质押合同编号必填\n";
      } else if (this.form.collateralType.length == 0) {
        error = "抵质押合同类型必选\n";
      } else if (this.form.collateralMoney.length == 0) {
        error = "抵质押金额\n";
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