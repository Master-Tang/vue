<template>
  <div class="my-padding">
    <el-button @click="$router.push('/bus/mortgage/index')">退出</el-button>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="债权基本信息" name="first">
        <el-form ref="form" :model="form" label-width="7rem">
          <el-form-item>
            <span slot="label">债权类型</span>
            <el-select v-model="form.claimType" placeholder="请选择经营情况" style="width:100%">
              <el-option
                v-for="item in claimList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              借款人名称
              <span class="red">*</span>
            </span>
            <el-input v-model="form.borrowers" type="text" placeholder="请输入借款人名称"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              放款区域
              <span class="red">*</span>
            </span>
            <el-cascader
              style="width:100%"
              placeholder="请搜索或选择地区"
              v-model="form.city"
              :options="provinceList"
              :props="{value:'regionId',label:'regionName',children:'children' }"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <span slot="label">行业</span>
            <el-input v-model="form.industry" type="text" placeholder="请输入行业"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">经营情况</span>
            <el-select v-model="form.situation" placeholder="请选择经营情况" style="width:100%">
              <el-option
                v-for="item in businessList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">企业性质</span>
            <el-select v-model="form.properties" placeholder="请选择企业性质" style="width:100%">
              <el-option
                v-for="item in natureList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">联系方式</span>
            <el-input v-model="form.telephone" type="text" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              债权所在机构
              <span class="red">*</span>
            </span>
            <el-select v-model="form.institutions" placeholder="请选择债权所在机构" style="width:100%">
              <el-option
                v-for="item in instituList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">联系人</span>
            <el-input v-model="form.contact" type="text" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">合作单位</span>
            <el-input v-model="form.address" type="text" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">基准日</span>
            <el-date-picker
              v-model="form.baseDay"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="请选择基准日"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span slot="label">利息截至时间</span>
            <el-date-picker
              v-model="form.interestEnd"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="请选择利息截至时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span slot="label">贷款行</span>
            <el-input v-model="form.lendBank" type="text" placeholder="请输入贷款行"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">逾期日期/代偿日期</span>
            <el-date-picker
              v-model="form.lateBegin"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="请选择起始日"
            ></el-date-picker>
            {{"~"}}
            <el-date-picker
              v-model="form.lateEnd"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="请选择结束日"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <span slot="label">逾期利率</span>
            <el-input v-model="form.lateIntRates" type="text" placeholder="请输入逾期利率"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addclaims" v-if="form.number==null">保存</el-button>
            <el-button type="warning" @click="updateclaims" v-if="form.number!=null">更改</el-button>
            <el-button @click="$router.push('/bus/mortgage/index')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="借款合同" name="second" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="ToBorrow()">添加</el-button>
          <el-button @click="$router.push('/bus/mortgage/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list1"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="借款合同编号" align="center">
            <template slot-scope="scope">{{ scope.row.contNum}}</template>
          </el-table-column>
          <el-table-column label="借款期限" align="center">
            <template slot-scope="scope">{{ scope.row.beginTime+"~"+scope.row.endTime }}</template>
          </el-table-column>
          <el-table-column label="合同本金" align="center">
            <template slot-scope="scope">{{ scope.row.principal }}</template>
          </el-table-column>
          <el-table-column label="本金余额/代偿余额（元）" align="center">
            <template slot-scope="scope">{{ scope.row.prinBalance }}</template>
          </el-table-column>
          <el-table-column label="当期利息（元）" align="center">
            <template slot-scope="scope">{{ scope.row.interBalance }}</template>
          </el-table-column>
          <el-table-column label="罚息（滞纳金）" align="center">
            <template slot-scope="scope">{{ scope.row.otherMoney }}</template>
          </el-table-column>
          <el-table-column label="诉讼有效期" align="center">
            <template slot-scope="scope">{{ scope.row.litigationBegin+"~"+scope.row.litigationEnd }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="borrowEdit(scope.row.borrowId)">编辑</el-button>
              <el-button type="danger" size="small" @click="borrowDel(scope.row.borrowId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="保证合同" name="sixth" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toguarante">添加</el-button>
          <el-button @click="$router.push('/bus/mortgage/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list2"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="保证合同编号" align="center">
            <template slot-scope="scope">{{ scope.row.contractNum }}</template>
          </el-table-column>
          <el-table-column label="合同类型" align="center">
            <template slot-scope="scope">{{ scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="保证金额" align="center">
            <template slot-scope="scope">{{ scope.row.guarantorAmount }}</template>
          </el-table-column>
          <el-table-column label="保证期间" align="center">
            <template slot-scope="scope">{{ scope.row.guaranteedBegin+"~"+scope.row.guaranteedEnd }}</template>
          </el-table-column>
          <!-- <el-table-column label="法人数量" align="center"> -->
          <!-- <template slot-scope="scope">{{ scope.row.balanTotal }}</template> -->
          <!-- </el-table-column> -->
          <!-- <el-table-column label="自然人数量" align="center"> -->
          <!-- <template slot-scope="scope">{{ scope.row.balanTotal }}</template> -->
          <!-- </el-table-column> -->
          <el-table-column label="对应借款合同" align="center">
            <template
              slot-scope="scope"
            >{{ String(scope.row.loanContract).substring(0, String(scope.row.loanContract).length) }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="guaranteEdit(scope.row.guarantorId)">编辑</el-button>
              <el-button type="danger" size="small" @click="guaranteDel(scope.row.guarantorId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="抵押合同" name="third" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Tocontract">添加</el-button>
          <el-button @click="$router.push('/bus/mortgage/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list3"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="抵押物合同编号" align="center">
            <template slot-scope="scope">{{ scope.row.collateralNumber }}</template>
          </el-table-column>
          <el-table-column label="合同类型" align="center">
            <template slot-scope="scope">{{ scope.row.collateralType}}</template>
          </el-table-column>
          <el-table-column label="抵押金额" align="center">
            <template slot-scope="scope">{{ scope.row.collateralMoney }}</template>
          </el-table-column>
          <el-table-column label="抵押期限" align="center">
            <template slot-scope="scope">{{ scope.row.collateralBegin+"~"+scope.row.collateralEnd }}</template>
          </el-table-column>
          <el-table-column label="对应借款合同" align="center">
            <template slot-scope="scope">{{ scope.row.collateralLink }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="contractEdit(scope.row.contractId)">编辑</el-button>
              <el-button type="danger" size="small" @click="contractDel(scope.row.contractId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="抵质押物信息" name="forth" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Tocoll">添加</el-button>
          <el-button @click="$router.push('/bus/mortgage/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list4"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="抵质押物编号" align="center">
            <template slot-scope="scope">{{ scope.row.noContract}}</template>
          </el-table-column>
          <el-table-column label="所属抵质押合同" align="center">
            <template
              slot-scope="scope"
            >{{ String(scope.row.loanCont).substring(0, String(scope.row.loanCont).length) }}</template>
          </el-table-column>
          <el-table-column label="抵质押类型" align="center">
            <template slot-scope="scope">{{ scope.row.mortType }}</template>
          </el-table-column>
          <el-table-column label="最高额抵押金额" align="center">
            <template slot-scope="scope">{{ scope.row.maxMort }}</template>
          </el-table-column>
          <el-table-column label="抵押顺位" align="center">
            <template slot-scope="scope">{{ scope.row.seqMort }}</template>
          </el-table-column>
          <el-table-column label="前序抵押金额" align="center">
            <template slot-scope="scope">{{ scope.row.orderMort }}</template>
          </el-table-column>
          <el-table-column label="查封顺位" align="center">
            <template slot-scope="scope">{{ scope.row.sequenceSei }}</template>
          </el-table-column>
          <el-table-column label="查封法院" align="center">
            <template slot-scope="scope">{{ scope.row.courtSeizureCity+" "+scope.row.courtSei }}</template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">{{ scope.row.verifyInfo }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="collEdit(scope.row.collId)">编辑</el-button>
              <el-button type="danger" size="small" @click="collDel(scope.row.collId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="亮点信息" name="fifth" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Tolight">添加</el-button>
          <el-button @click="$router.push('/bus/mortgage/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list5"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">{{ scope.row.claimsType }}</template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.describes}}</template>
          </el-table-column>
          <el-table-column label="亮点价值" align="center">
            <template slot-scope="scope">{{ scope.row.value }}</template>
          </el-table-column>
          <el-table-column label="依据" align="center">
            <template slot-scope="scope">{{ scope.row.basis }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="lightEdit(scope.row.lightId)">编辑</el-button>
              <el-button type="danger" size="small" @click="lightDel(scope.row.lightId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      judge: true,
      activeName: "",
      act: "first",
      acte: "first",
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      form: {
        borrowers: "测试",
        city: [],
        //合作单位
        address: "测试",
        industry: "",
        situation: "",
        properties: "",
        telephone: "",
        institutions: "测试",
        contact: "测试",
        origCreditors: "",
        baseDay: "",
        interestEnd: "",
        claimType: "",
        lendBank:"",
        lateBegin:"",
        lateEnd:"",
        lateIntRates:"",
        prinBalance:"",
        curInter:"",
        lateFee:"",
        credits:"",
      },
      claimsNumber: "",
      businessList: [],
      natureList: [],
      provinceList: [],
      claimList: [],
      instituList: [],
      form1: {
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
    };
  },
  created() {
    // console.log(this.$route.path)
    if (this.$route.query.activeName == null) {
      this.activeName = "first";
    } else {
      this.activeName = this.$route.query.activeName;
    }
    $.addInit().then(res => {
      if (res.success) {
        this.businessList = res.data.businessList;
        this.natureList = res.data.natureList;
        this.provinceList = res.data.province;
        this.claimList = res.data.claimList;
        this.instituList = res.data.instituList;
      }
    });
    //债权资本信息(完)
    $.mortgage({ number: this.$route.query.claimsNumber }).then(res => {
      if (res.success) {
        if (res.data != null) {
          // console.log(res.data)
          this.form = res.data;
        }
      }
    });
    //借款合同(完)
    $.borrowList({ claimsNumber: this.$route.query.claimsNumber }).then(res => {
      if (res.success) {
        this.list1 = res.data;
        // console.log(this.list1)
        for (var i = 1; i <= this.list1.length; i++) {
          this.$set(this.list1[i - 1], "a", i);
        }
      }
    });
    //保证人
    $.guarantorList({ claimsNumber: this.$route.query.claimsNumber }).then(
      res => {
        if (res.success) {
          this.list2 = res.data;
          // console.log(this.list1)
          for (var i = 1; i <= this.list2.length; i++) {
            this.$set(this.list2[i - 1], "a", i);
          }
        }
      }
    );
    //抵押物
    $.contractList({ claimsNumber: this.$route.query.claimsNumber }).then(
      res => {
        if (res.success) {
          this.list3 = res.data;
          // console.log(this.list3)
          for (var i = 1; i <= this.list3.length; i++) {
            this.$set(this.list3[i - 1], "a", i);
          }
        }
      }
    );
    //抵押物基本信息
    $.collateralList({ claimsNumber: this.$route.query.claimsNumber }).then(
      res => {
        if (res.success) {
          this.list4 = res.data;
          // console.log(this.list1)
          for (var i = 1; i <= this.list4.length; i++) {
            this.$set(this.list4[i - 1], "a", i);
          }
        }
      }
    );
    //亮点
    $.lightList({ claimsNumber: this.$route.query.claimsNumber }).then(res => {
      if (res.success) {
        this.list5 = res.data;
        // console.log(this.list1)
        for (var i = 1; i <= this.list5.length; i++) {
          this.$set(this.list5[i - 1], "a", i);
        }
      }
    });
  },

  methods: {
    addclaims() {
      if (!this.validate()) return;
      $.addmortgage(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            duration: 800,
            message: "基础信息已存在,请勿重复添加"
          });
        } else {
          this.claimsNumber = response.data;
          // console.log(response.data)
          this.judge = true;
          this.$message({
            duration: 800,
            type: "success",
            message: "添加成功"
          });
        }
      });
    },
    updateclaims() {
      if (!this.validate()) return;
      $.updateclaims(this.form).then(response => {
        this.$message({
          duration: 800,
          message: "基本信息已更改"
        });
      });
    },
    ToBorrow() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "borrow",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "borrow",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    borrowEdit(id) {
      this.$router.push({
        path: "borrow",
        query: { id: this.$route.query.claimsNumber, borrowId: id }
      });
    },
    borrowDel(id) {
      this.$confirm("此操作将删除该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.borrowFake({ borrowId: id }).then(response => {
            this.$message({
              duration: 1000,
              type: "success",
              message: "删除成功!"
            });
            $.borrowList({ claimsNumber: this.$route.query.claimsNumber }).then(
              res => {
                if (res.success) {
                  this.list1 = res.data;
                  // console.log(this.list1)
                  for (var i = 1; i <= this.list1.length; i++) {
                    this.$set(this.list1[i - 1], "a", i);
                  }
                }
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            duration: 800,
            type: "info",
            message: "已取消删除"
          });
        });
    },

    Toguarante() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "guarantee",
          query: { id: this.claimsNumber }
        });
      } else {
        this.form1.claimsNumber=this.$route.query.claimsNumber
        $.addguarantee(this.form1).then(res=>{
          // console.log(res.data)
           this.$router.push({
          path: "guarantee",
          query: { id: this.$route.query.claimsNumber ,guarantorId:res.data}
        });
        })
       
      }
    },
    guaranteEdit(id) {
      this.$router.push({
        path: "guarantee",
        query: { id: this.$route.query.claimsNumber, guarantorId: id }
      });
    },
    guaranteDel(id) {
      this.$confirm("此操作将删除该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.guarantorFake({ guarantorId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.guarantorList({
              claimsNumber: this.$route.query.claimsNumber
            }).then(res => {
              if (res.success) {
                this.list2 = res.data;
                // console.log(this.list1)
                for (var i = 1; i <= this.list2.length; i++) {
                  this.$set(this.list2[i - 1], "a", i);
                }
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 800,
            message: "已取消删除"
          });
        });
    },

    Tocontract() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "collcontract",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "collcontract",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    contractEdit(id) {
      this.$router.push({
        path: "collcontract",
        query: { id: this.$route.query.claimsNumber, contractId: id }
      });
    },
    contractDel(id) {
      this.$confirm("此操作将删除该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.contractFake({ contractId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.contractList({
              claimsNumber: this.$route.query.claimsNumber
            }).then(res => {
              if (res.success) {
                this.list3 = res.data;
                // console.log(this.list3)
                for (var i = 1; i <= this.list3.length; i++) {
                  this.$set(this.list3[i - 1], "a", i);
                }
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 800,
            message: "已取消删除"
          });
        });
    },

    Tocoll() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "collateral",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "collateral",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    collEdit(id) {
      this.$router.push({
        path: "collateral",
        query: { id: this.$route.query.claimsNumber, collId: id }
      });
    },
    collDel(id) {
      this.$confirm("此操作将删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.collateralFake({ collId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.collateralList({
              claimsNumber: this.$route.query.claimsNumber
            }).then(res => {
              if (res.success) {
                this.list4 = res.data;
                // console.log(this.list1)
                for (var i = 1; i <= this.list4.length; i++) {
                  this.$set(this.list4[i - 1], "a", i);
                }
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 800,
            message: "已取消删除"
          });
        });
    },

    Tolight() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "light",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "light",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    lightEdit(id) {
      this.$router.push({
        path: "light",
        query: { id: this.$route.query.claimsNumber, lightId: id }
      });
    },
    lightDel(id) {
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.lightFake({ lightId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.lightList({ claimsNumber: this.$route.query.claimsNumber }).then(
              res => {
                if (res.success) {
                  this.list5 = res.data;
                  // console.log(this.list1)
                  for (var i = 1; i <= this.list5.length; i++) {
                    this.$set(this.list5[i - 1], "a", i);
                  }
                }
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            duration: 800,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    validate() {
      let error = "";
      if (this.form.borrowers.length == 0) {
        error = "借款人名称必填\n";
      } else if (this.form.city.length == 0) {
        error = "放款区域必选\n";
      }  else if (this.form.institutions.length == 0) {
        error = "债权所在机构必填\n";
      }

      if (error) {
        this.$message({
          duration: 800,
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