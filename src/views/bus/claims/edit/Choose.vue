<template>
  <div style="align:center">
    <div>
      <div class="centerall"><button class="button1" @click="toBasInfo">债权基本信息</button></div>
      <div class="centerall"><button class="button1" @click="toJudPro">债权司法流程</button></div>
      <div class="centerall"><button class="button1" @click="toAssVal">债权资产估值</button></div>
    </div>
    <div>
      <div class="centerall"><button class="button1" @click="toSitPos">债权现场尽调情况</button></div>
      <div class="centerall"><button class="button1" @click="toDefChe">债权瑕疵排查</button></div>
      <div class="centerall"><button class="button1" @click="toMerMan">债权招商管理</button></div>
    </div>
    <div>
      <div class="centerall"><button class="button1" @click="toProInfo">债权财产信息</button></div>
      <div class="centerall"><button class="button1" @click="toExitPlan">债权退出预案</button></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      claimsNumber: ""
    };
  },
  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
  },
  methods: {
    //债权基本信息
    toBasInfo() {
      this.$router.push({
        path: "add",
        query: { claimsNumber: this.claimsNumber }
      });
    },
    //债权司法流程
    toJudPro() {},
    // 债权资产估值
    toAssVal() {
      this.$router.push({
        path: "../valuation/index",
        query: { claimsNumber: this.claimsNumber }
      });
    },
    //债权现场尽调情况
    toSitPos() {},
    //债权瑕疵排查
    toDefChe() {
      this.$router.push({
        path: "../defcheck/index",
        query: { claimsNumber: this.claimsNumber }
      });
    },
    //债权招商管理
    toMerMan() {
      this.$router.push({
        path: "../merman/index",
        query: { claimsNumber: this.claimsNumber }
      });
    },
    //债权财产信息
    toProInfo() {
      this.$router.push({
        path: "../proinfo/index",
        query: { claimsNumber: this.claimsNumber }
      });
    },
    //债权退出预案
    toExitPlan() {
      this.$router.push({
        path: "../exitplan/index",
        query: { claimsNumber: this.claimsNumber }
      });
    }
  }
};
</script>
<style>
.button1{
  text-align: center;
  color: aliceblue;
  font-family: "华文楷体";
  font-size: 2.5rem;
  width: 100%;
  height: 100%;
  background:url("../../../../assets/images/31.gif");
}
.centerall {
  float: left;
  background-color: #7fffd4;
  margin-top: 2%;
  margin-left: 2.5%;
  width: 30%;
  height: 200px;
}
.centerall:hover {
  -webkit-box-shadow: #ccc 0px 10px 10px;

  -moz-box-shadow: #ccc 0px 10px 10px;

  box-shadow: #ccc 0px 10px 10px;
}
</style>