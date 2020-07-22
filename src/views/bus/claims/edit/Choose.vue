<template>
  <div>
    <el-button @click="toBasInfo">债权基本信息</el-button>
    <el-button @click="toJudPro">债权司法流程</el-button>
    <el-button @click="toAssVal">债权资产估值</el-button>
    <el-button @click="toSitPos">债权现场尽调情况</el-button>
    <el-button @click="toDefChe">债权瑕疵排查</el-button>
    <el-button @click="toMerMan">债权招商管理</el-button>
    <el-button @click="toProInfo">债权财产信息</el-button>
    <el-button @click="toExitPlan">债权退出预案</el-button>
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
    toAssVal() {},
    //债权现场尽调情况
    toSitPos() {},
    //债权瑕疵排查
    toDefChe() {},
    //债权招商管理
    toMerMan() {},
    //债权财产信息
    toProInfo() {},
    //债权退出预案
    toExitPlan() {}
  }
};
</script>
<style scoped>
.orange {
  color: #fef4e9;

  border: solid1px#da7c0c;

  background: #f78d1d;

  background: -webkit-gradient(
    linear,
    lefttop,
    leftbottom,
    from(#faa51a),
    to(#f47a20)
  );

  background: -moz-linear-gradient(top, #faa51a, #f47a20);

  filter:   progid:DXImageTransform.Microsoft.gradient(startColorstr='#faa51a', endColorstr='#f47a20');
}

.orange:hover {
  background: #f47c20;

  background: -webkit-gradient(
    linear,
    lefttop,
    leftbottom,
    from(#f88e11),
    to(#f06015)
  );

  background: -moz-linear-gradient(top, #f88e11, #f06015);

  filter:   progid:DXImageTransform.Microsoft.gradient(startColorstr='#f88e11', endColorstr='#f06015');
}

.orange:active {
  color: #fcd3a5;

  background: -webkit-gradient(
    linear,
    lefttop,
    leftbottom,
    from(#f47a20),
    to(#faa51a)
  );

  background: -moz-linear-gradient(top, #f47a20, #faa51a);

  filter:   progid:DXImageTransform.Microsoft.gradient(startColorstr='#f47a20', endColorstr='#faa51a');
}
</style>