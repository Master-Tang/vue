<template>
  <div class="my-padding">
    <el-tabs v-model="act" stretch>
      <el-tab-pane label="保证人估值" name="first">
        <el-form ref="form1" :model="form1" label-width="7rem">
          <el-form-item>
            <span slot="label">保证人</span>
            <el-select v-model="form1.legalId" placeholder="请选择保证人" style="width:100%">
              <el-option
                v-for="item in borrowers"
                :key="item.legalId"
                :label="item.corporateRepresent"
                :value="item.legalId"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">保守回现(万元)</span>
            <el-input v-model="form1.conservativeMoney" placeholder="保守回现(万元)"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">乐观回现(万元)</span>
            <el-input v-model="form1.optimisticMoney" placeholder="乐观回现(万元)"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">依据</span>
            <el-input v-model="form1.basis" placeholder="依据"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="guaval">加入估值</el-button>
          </el-form-item>
        </el-form>
        <el-table id="myform" :data="guavalList" border fit show-summary style="width: 100%">
          <el-table-column prop="a" align="center"></el-table-column>
          <el-table-column prop="name" label="保证人" align="center"></el-table-column>
          <el-table-column prop="conservativeMoney" label="保守回现(万元)" sortable align="center"></el-table-column>
          <el-table-column prop="optimisticMoney" label="乐观回现(万元)" sortable align="center"></el-table-column>
          <el-table-column label="依据" align="center">
            <template slot-scope="scope">{{ scope.row.basis }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="资产估值" name="second"></el-tab-pane>
      <el-tab-pane label="项目估值" name="third"></el-tab-pane>
      <el-tab-pane label="项目信息" name="forth">
        <div class="my-padding">
          <el-form v-model="form">
            <el-row style="margin-bottom:2rem">
              <el-col :span="8">
                <span>本金(万元):</span>
                {{form.balanTotal}}
              </el-col>
              <el-col :span="8">
                <span>利息(万元):</span>
                {{form.interTotal}}
              </el-col>
              <el-col :span="8">
                <span>其他(万元):</span>
                {{form.otherAmo}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="8" style="margin-top:0.7rem">
                <span>合计金额(万元):</span>
                {{form.subToal}}
              </el-col>
              <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" style="margin-top:0.7rem">
                <span>包内现金(万元):</span>
              </el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="5" :xl="11">
                <el-input placeholder="请输入包内现金(万元)"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span>担保人:</span>
                <el-button type="text" @click="promise = true">查看所有担保人</el-button>
              </el-col>
            </el-row>
          </el-form>

          <div>
            <h2 align="center">保证人估值</h2>
            <el-table id="myform" :data="guavalList" border fit show-summary style="width: 100%">
              <el-table-column prop="a" align="center"></el-table-column>
              <el-table-column prop="name" label="保证人" align="center"></el-table-column>
              <el-table-column prop="conservativeMoney" label="保守回现(万元)" sortable align="center"></el-table-column>
              <el-table-column prop="optimisticMoney" label="乐观回现(万元)" sortable align="center"></el-table-column>
              <el-table-column label="依据" align="center">
                <template slot-scope="scope">{{ scope.row.basis }}</template>
              </el-table-column>
            </el-table>
          </div>

          <el-drawer :visible.sync="promise" size="20%">
            <el-table
              id="myform"
              :data="borrowers"
              element-loading-text="Loading"
              border
              fit
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column label="担保人名称" align="center">
                <template slot-scope="scope">{{ scope.row.corporateRepresent }}</template>
              </el-table-column>
            </el-table>
          </el-drawer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import $ from "@/api/valuation";

export default {
  data() {
    return {
      promise: false,
      act: "first",
      claimsNumber: "",
      //项目信息
      form: {
        //本金余额
        balanTotal: "",
        //利息余额
        interTotal: "",
        //其他金额
        otherAmo: "",
        //合计
        subToal: ""
      },
      //保证人估值
      form1: {
        //保证人id
        legalId: "",
        //保守回现
        conservativeMoney: "",
        //乐观回现
        optimisticMoney: "",
        //依据
        basis: "",
        claimsNumber: ""
      },
      borrowers: [],
      guavalList: []
    };
  },

  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
    this.form1.claimsNumber = this.$route.query.claimsNumber;
    // console.log(this.claimsNumber);
    $.packeValue({ claimsNumber: this.claimsNumber }).then(res => {
      if (res.success) {
        this.form = res.data;
        // console.log(res.data);
      }
    });
    $.guarantorList({ claimsNumber: this.claimsNumber }).then(res => {
      if (res.success) {
        // console.log(res.data);
        this.borrowers = res.data;
      }
    });
    this.valueList();
  },

  methods: {
    valueList() {
      $.valueList({ claimsNumber: this.$route.query.claimsNumber }).then(
        res => {
          if (res.success) {
            // console.log(res.data);
            this.guavalList = res.data;
            for (var i = 1; i <= this.guavalList.length; i++) {
              this.$set(this.guavalList[i - 1], "a", "保证人" + i);
            }
          }
        }
      );
    },
    //保证人估值
    guaval() {
    //   if (this.guavalList == null) {
    //     $.valueAdd(this.form1).then(res => {
    //       if (res.success) {
    //         this.form1.legalId = "";
    //         this.form1.conservativeMoney = "";
    //         this.form1.optimisticMoney = "";
    //         this.form1.basis = "";
    //         this.$message({
    //           message: "估值成功",
    //           type: "success"
    //         });
    //         this.valueList();
    //       }
    //     });
    //   }
      var a = false;
      for (let iterator of this.guavalList) {
        if (this.form1.legalId == iterator.legalId) {
          a = true;
        }
      }
      if (a == true) {
        console.log("更新");
        console.log(this.form1);
        $.valueUpdate(this.form1).then(res => {
          if (res.success) {
            this.form1.legalId = "";
            this.form1.conservativeMoney = "";
            this.form1.optimisticMoney = "";
            this.form1.basis = "";
            this.$message({
              message: "估值成功",
              type: "success"
            });
            this.guavalList = null;
            this.valueList();
          }
        });
      } else {
        console.log("插入");
        console.log(this.form1);
        $.valueAdd(this.form1).then(res => {
          if (res.success) {
            this.form1.legalId = "";
            this.form1.conservativeMoney = "";
            this.form1.optimisticMoney = "";
            this.form1.basis = "";
            this.$message({
              message: "估值成功",
              type: "success"
            });
            this.guavalList = null;
            this.valueList();
          }
        });
      }
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