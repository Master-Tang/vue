<template>
<div class="my-padding">
  <el-form ref="form" :model="form" label-width="7rem">
    <el-form-item>
      <span slot="label">
        对应借款合同
        <span class="red">*</span>
      </span>
      <el-select v-model="form.loanContract" multiple placeholder="请选择关联借款合同" style="width:100%">
        <el-option
          v-for="item in collateralContract"
          :key="item.contNum"
          :label="item.contNum"
          :value="item.contNum"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">合同类型</span>
      <el-select v-model="form.type" placeholder="请选择保证方式" style="width:100%">
        <el-option
          v-for="item in guacolList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">保证方式</span>
      <el-select v-model="form.guarantee" placeholder="请选择保证方式" style="width:100%">
        <el-option
          v-for="item in guaranteeList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        保证人金额
        <span class="red">*</span>
      </span>
      <el-input
        v-model="form.guarantorAmount"
        type="text"
        placeholder="请输入保证人金额"
        onkeyup="value=value.replace(/\D/g,'')"
        onchange="value=value.replace(/\D/g,'')"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        保证合同编号
        <span class="red">*</span>
      </span>
      <el-input v-model="form.contractNum" type="text" placeholder="请输入保证合同编号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">保证期间</span>
      <el-date-picker
        v-model="form.guaranteedBegin"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择保证起始期限"
      ></el-date-picker>
      {{"~"}}
      <el-date-picker
        v-model="form.guaranteedEnd"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyy年MM月dd日"
        placeholder="请选择保证终止期限"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <span slot="label">
        保证人名称
        <span class="red">*</span>
      </span>
      <el-input v-model="form.guarantorName" type="text" placeholder="请输入保证人名称"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">保证人类型</span>
      <el-select v-model="form.guarantorType" placeholder="请选择类型" style="width:100%">
        <el-option
          v-for="item in guarantorList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-tabs v-model="acte" type="card" stretch>
      <el-tab-pane label="自然人" name="first" v-if="form.guarantorType=='01'">
        <el-form ref="form" :model="form" label-width="5rem">
          <el-form-item>
            <span slot="label">性别</span>
            <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
              <el-option
                v-for="item in sexList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">身份证号</span>
            <el-input v-model="form.naturalId" type="text" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">地址</span>
            <el-cascader
              style="width:100%"
              placeholder="请搜索或选择地区"
              v-model="form.naturalCity"
              :options="provinceList"
              :props="{value:'regionId',label:'regionName',children:'children' }"
              filterable
            ></el-cascader>
            <el-input v-model="form.naturalAddress" type="text" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">联系方式</span>
            <el-input
              v-model="form.naturalContact"
              type="text"
              placeholder="请输入联系方式"
              onkeyup="value=value.replace(/\D/g,'')"
              onchange="value=value.replace(/\D/g,'')"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="法人" name="first" v-if="form.guarantorType=='02'">
        <el-form ref="form" :model="form" label-width="5rem">
          <el-form-item>
            <span slot="label">法定代表人</span>
            <el-input v-model="form.corporateRepresent" type="text" placeholder="请输入法定代表人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">企业性质</span>
            <el-select v-model="form.corporateNature" placeholder="请选择企业性质" style="width:100%">
              <el-option
                v-for="item in natureList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">企业所在地址</span>
            <el-cascader
              style="width:100%"
              placeholder="请搜索或选择地区"
              v-model="form.corporateCity"
              :options="provinceList"
              :props="{value:'regionId',label:'regionName',children:'children' }"
              filterable
            ></el-cascader>
            <el-input v-model="form.corporateAddress" type="text" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">注册资金</span>
            <el-input
              v-model="form.corporateMoney"
              type="text"
              placeholder="请输入注册资金"
              onkeyup="value=value.replace(/\D/g,'')"
              onchange="value=value.replace(/\D/g,'')"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-form-item>
      <span slot="label">与借款人关系</span>
      <el-select v-model="form.relation" placeholder="请选择关系" style="width:100%">
        <el-option
          v-for="item in relationshipList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addguarantee" v-if="form.guarantorId==null">保存</el-button>
      <el-button type="warning" @click="updateguarantee" v-if="form.guarantorId!=null">更改</el-button>
      <el-button @click="cencelguarantee">取消</el-button>
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
        guarantorId: "",
        loanContract: [],
        guarantee: "",
        guarantorAmount: "",
        contractNum: "",
        guaranteedBegin: "",
        guaranteedEnd: "",
        guarantorName: "",
        guarantorType: "",
        sex: "",
        type: "",
        naturalId: "",
        naturalCity: [],
        naturalAdress: "",
        naturalContact: "",
        corporateRepresent: "",
        corporateNature: "",
        corporateCity: [],
        corporateAddress: "",
        corporateMoney: "",
        relation: "",
        claimsNumber: ""
      },
      collateralContract: [],
      guaranteeList: [],
      sexList: [],
      natureList: [],
      relationshipList: [],
      provinceList: [],
      guarantorList: [],
      guacolList: []
    };
  },

  created() {
    this.form.claimsNumber = this.$route.query.id;
    this.form.guarantorId = this.$route.query.guarantorId;
    $.mapBorrow({ claimsNumber: this.form.claimsNumber }).then(res => {
      if (res.success) {
        this.collateralContract = res.data.collateralContract;
      }
    });
    $.addInit().then(res => {
      if (res.success) {
        this.provinceList = res.data.province;
        this.guaranteeList = res.data.guaranteeList;
        this.sexList = res.data.sexList;
        this.natureList = res.data.natureList;
        this.relationshipList = res.data.relationshipList;
        this.guarantorList = res.data.guarantorList;
        this.guacolList = res.data.guacolList;
      }
    });
    $.guarantor({ guarantorId: this.$route.query.guarantorId }).then(res => {
      if (res.success) {
        if (res.data != null) {
          // console.log(res.data)
          this.form = res.data;
        }
      }
    });
  },
  methods: {
    cencelguarantee() {
      this.$router.push({
        path: "index",
        query: { activeName: "sixth", claimsNumber: this.form.claimsNumber }
      });
    },
    addguarantee() {
      // console.log(this.form);
      if (!this.validate()) return;
      $.addguarantee(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该编号已存在,请勿重复添加"
          });
        } else {
          this.form.guarantorId = response.data;
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "sixth",
              claimsNumber: this.form.claimsNumber
            }
          });
        }
      });
    },
    updateguarantee() {
      if (!this.validate()) return;
      $.updateguarantee(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该合同编号已存在,请重新更改"
          });
        } else {
          this.$message({
            type: "success",
            message: "更改成功"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "sixth",
              claimsNumber: this.form.claimsNumber
            }
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.loanContract.length == 0) {
        error = "对应借款合同必选\n";
      } else if (this.form.guarantorAmount.length == 0) {
        error = "保证人金额必填\n";
      } else if (this.form.contractNum.length == 0) {
        error = "保证人合同编号必填\n";
      } else if (this.form.guarantorName.length == 0) {
        error = "保证人名称必填\n";
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