<template>
  <div class="my-padding">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item>
        <span slot="label">对应借款合同</span>
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
        <span slot="label">
          保证人金额(元)
          <span class="red">*</span>
        </span>
        <el-input
          v-model="form.guarantorAmount"
          type="text"
          placeholder="请输入保证人金额"
          oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
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
      <el-form-item align="center">
        <div style="padding-bottom:1rem">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-circle-plus"
            @click="addNature"
          >添加自然人</el-button>
          <el-table
            id="myform"
            :data="naturedList"
            element-loading-text="Loading"
            border
            fit
            style="width: 100%;"
            highlight-current-row
          >
            <el-table-column label="保证人类型" align="center">
              <template slot-scope="scope">{{ scope.row.contractType }}</template>
            </el-table-column>
            <el-table-column label="保证人名字" align="center">
              <template slot-scope="scope">{{ scope.row.corporateRepresent }}</template>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">{{ scope.row.naturalSex}}</template>
            </el-table-column>
            <el-table-column label="身份证号" align="center">
              <template slot-scope="scope">{{ scope.row.naturalCard}}</template>
            </el-table-column>
            <el-table-column label="地址" align="center">
              <template slot-scope="scope">{{ scope.row.corporateCity+" "+scope.row.address}}</template>
            </el-table-column>
            <el-table-column label="联系方式" align="center">
              <template slot-scope="scope">{{ scope.row.contact}}</template>
            </el-table-column>
            <el-table-column label="与借款人关系" align="center">
              <template slot-scope="scope">{{ scope.row.relation}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150rem">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="small"
                  @click="handleNatureEdit(scope.row.legalId)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="handleNatureDel(scope.row.legalId)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-circle-plus"
            @click="addCorporte"
          >添加法人</el-button>
          <el-table
            id="myform"
            :data="corporateList"
            element-loading-text="Loading"
            border
            fit
            style="width: 100%"
            highlight-current-row
          >
            <el-table-column label="保证人类型" align="center">
              <template slot-scope="scope">{{ scope.row.contractType }}</template>
            </el-table-column>
            <el-table-column label="法定代表人" align="center">
              <template slot-scope="scope">{{ scope.row.corporateRepresent}}</template>
            </el-table-column>
            <el-table-column label="企业性质" align="center">
              <template slot-scope="scope">{{ scope.row.corporateNature}}</template>
            </el-table-column>
            <el-table-column label="企业所在地址" align="center">
              <template slot-scope="scope">{{ scope.row.corporateCity+" "+scope.row.address}}</template>
            </el-table-column>
            <el-table-column label="注册资金(元)" align="center">
              <template slot-scope="scope">{{ scope.row.money}}</template>
            </el-table-column>
            <el-table-column label="与借款人关系" align="center">
              <template slot-scope="scope">{{ scope.row.relation}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150rem">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  size="small"
                  @click="handleCorporteEdit(scope.row.legalId)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  size="small"
                  @click="handleCorporteDel(scope.row.legalId)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addguarantee" v-if="form.guarantorId==null">保存</el-button>
        <el-button type="primary" @click="updateguarantee" v-if="form.guarantorId!=null">保存</el-button>
        <el-button @click="cencelguarantee">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="添加自然人"
      :visible.sync="dialogTableVisible1"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="50%"
    >
      <el-form :model="form1" label-width="6rem">
        <el-form-item>
          <span slot="label">姓名</span>
          <el-input v-model="form1.corporateRepresent" type="text" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">性别</span>
          <el-select v-model="form1.naturalSex" placeholder="请选择性别" style="width:100%">
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
          <el-input v-model="form1.naturalCard" type="text" 
          placeholder="请输入身份证号"
          onkeyup="value=value.replace(/([^0-9Xx])+/g,'')"
            onchange="value=value.replace(/([^0-9Xx])+/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">地址</span>
          <el-cascader
            style="width:100%"
            placeholder="请搜索或选择地区"
            v-model="form1.corporateCity"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children' }"
            filterable
          ></el-cascader>
          <el-input v-model="form1.address" type="text" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">联系方式</span>
          <el-input
            v-model="form1.contact"
            type="text"
            placeholder="请输入联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">与借款人关系</span>
          <el-select v-model="form1.relation" placeholder="请选择关系" style="width:100%">
            <el-option
              v-for="item in relationshipList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="addNatureData" v-if="form1.legalId==null">添加</el-button>
          <el-button type="primary" @click="handleNatureEditData" v-if="form1.legalId!=null">更改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="添加法人"
      :visible.sync="dialogTableVisible2"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="50%"
    >
      <el-form :model="form1" label-width="6rem">
        <el-form-item>
          <span slot="label">法定代表人</span>
          <el-input v-model="form1.corporateRepresent" type="text" placeholder="请输入法定代表人"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">企业性质</span>
          <el-select v-model="form1.corporateNature" placeholder="请选择企业性质" style="width:100%">
            <el-option
              v-for="item in corporatedList"
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
            v-model="form1.corporateCity"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children' }"
            filterable
          ></el-cascader>
          <el-input v-model="form1.address" type="text" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">注册资金(元)</span>
          <el-input
            v-model="form1.money"
            type="text"
            placeholder="请输入注册资金"
            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">与借款人关系</span>
          <el-select v-model="form1.relation" placeholder="请选择关系" style="width:100%">
            <el-option
              v-for="item in relationshipList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="addCorporteData" v-if="form1.legalId==null">添加</el-button>
          <el-button type="primary" @click="handleCorporteEditData" v-if="form1.legalId!=null">更改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      activeName: "first",
      act: "first",
      acte: "first",
      form: {
        guarantorId: "",
        loanContract: [],
        guarantorAmount: "",
        contractNum: "",
        guaranteedBegin: "",
        guaranteedEnd: "",
        guarantorName: "",
        guarantorType: "",
        type: "",
        relation: "",
        claimsNumber: "",
        guarantorList: []
      },
      form1: {
        legalId: "",
        //公用属性
        //保证人类型
        contractType: "",
        //城市
        corporateCity: [],
        //地址
        address: "",
        //法定代表人或自然人名称
        corporateRepresent: "",
        //与借款人关系
        relation: "",
        //法人独有
        //企业性质
        corporateNature: "",
        //注册资金
        money: "",
        //自然人独有
        //性别
        naturalSex: "",
        //身份证号
        naturalCard: "",
        //联系方式
        contact: "",
        //外键id
        contractId: ""
      },
      collateralContract: [],
      guaranteeList: [],
      sexList: [],
      natureList: [],
      relationshipList: [],
      provinceList: [],
      guarantorList: [],
      guacolList: [],
      naturedList: [],
      corporateList: [],
      corporatedList:[],
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
        this.corporatedList=res.data.corporateList;
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
    $.legalList({ contractId: this.$route.query.guarantorId }).then(res => {
      if (res.success) {
        this.naturedList = res.data.naturalList;
        this.corporateList = res.data.legalList;
      }
    });
  },
  methods: {
    handleNatureDel(id) {
      $.legalFake({ legalId: id }).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          $.legalList({ contractId: this.$route.query.guarantorId }).then(
            res => {
              if (res.success) {
                this.naturedList = res.data.naturalList;
                this.corporateList = res.data.legalList;
                // console.log(res.data);
              }
            }
          );
        }
      });
    },
    handleNatureEdit(id) {
      this.dialogTableVisible1 = true;
      $.legal({ legalId: id }).then(res => {
        this.form1 = res.data;
      });
    },
    handleNatureEditData() {
      this.dialogTableVisible1 = false;
      $.legalUpdate(this.form1).then(res => {
        this.$message({
          type: "success",
          message: "更改成功"
        });
        $.legalList({ contractId: this.$route.query.guarantorId }).then(res => {
          if (res.success) {
            this.naturedList = res.data.naturalList;
            this.corporateList = res.data.legalList;
            // console.log(res.data);
          }
        });
      });
    },
    addNature() {
      this.dialogTableVisible1 = true;
      (this.form1.legalId = null),
        (this.form1.contractType = ""),
        (this.form1.corporateCity = []),
        (this.form1.address = ""),
        (this.form1.corporateRepresent = ""),
        (this.form1.relation = ""),
        (this.form1.corporateNature = ""),
        (this.form1.money = ""),
        (this.form1.naturalSex = ""),
        (this.form1.naturalCard = ""),
        (this.form1.contact = ""),
        (this.form1.contractId = "");
    },
    addNatureData() {
      this.dialogTableVisible1 = false;
      this.form1.contractId = this.form.guarantorId;
      this.form1.contractType = "01";
      $.legalAdd(this.form1).then(response => {
        if (response.success) {
          $.legalList({ contractId: this.$route.query.guarantorId }).then(
            res => {
              if (res.success) {
                this.naturedList = res.data.naturalList;
                this.corporateList = res.data.legalList;
                // console.log(res.data);
              }
            }
          );
        }
      });
    },
    handleCorporteEdit(id) {
      this.dialogTableVisible2 = true;
      $.legal({ legalId: id }).then(res => {
        this.form1 = res.data;
      });
    },
    handleCorporteDel(id) {
      $.legalFake({ legalId: id }).then(res => {
        if (res.success) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          $.legalList({ contractId: this.$route.query.guarantorId }).then(
            res => {
              if (res.success) {
                this.naturedList = res.data.naturalList;
                this.corporateList = res.data.legalList;
                // console.log(res.data);
              }
            }
          );
        }
      });
    },
    handleCorporteEditData() {
      this.dialogTableVisible2 = false;
      // console.log(this.form1)
      $.legalUpdate(this.form1).then(res => {
        this.$message({
          type: "success",
          message: "更改成功"
        });
        $.legalList({ contractId: this.$route.query.guarantorId }).then(res => {
          if (res.success) {
            this.naturedList = res.data.naturalList;
            this.corporateList = res.data.legalList;
            // console.log(res.data);
          }
        });
      });
    },
    addCorporte() {
      this.dialogTableVisible2 = true;
      (this.form1.legalId = null),
        (this.form1.contractType = ""),
        (this.form1.corporateCity = []),
        (this.form1.address = ""),
        (this.form1.corporateRepresent = ""),
        (this.form1.relation = ""),
        (this.form1.corporateNature = ""),
        (this.form1.money = ""),
        (this.form1.naturalSex = ""),
        (this.form1.naturalCard = ""),
        (this.form1.contact = ""),
        (this.form1.contractId = "");
    },
    addCorporteData() {
      this.dialogTableVisible2 = false;
      this.form1.contractId = this.form.guarantorId;
      this.form1.contractType = "02";
      // console.log(this.form1.contractId)
      $.legalAdd(this.form1).then(response => {
        if (response.success) {
          $.legalList({ contractId: this.$route.query.guarantorId }).then(
            res => {
              if (res.success) {
                this.naturedList = res.data.naturalList;
                this.corporateList = res.data.legalList;
                // console.log(res.data);
              }
            }
          );
        }
      });
    },

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
      if (this.form.guarantorAmount.length == 0) {
        error = "保证人金额必填\n";
      } else if (this.form.contractNum.length == 0) {
        error = "保证人合同编号必填\n";
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