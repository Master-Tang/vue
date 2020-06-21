<template>
  <div class="dashboard-container">
    <div class="dashboard-text">姓名: {{ trueName }}</div>
    <div class="dashboard-text">手机号码: {{ telephone }}</div>
    <div class="dashboard-text">用户名: {{ loginName }}</div>
    <div class="dashboard-text">部门: {{ depName }}</div>
    <div class="dashboard-text">共录入伙伴数: {{ countPartner }}</div>

  </div>
</template>

<script>
import $ from "@/api/assets";

export default {
   data() {
    return {
      loginName:"",
      countPartner:"",
      trueName:"",
      telephone:"",
      dingDing:"",
      depName:""
    };
  },
   created() {
    $.countCreateId().then(response => {
      if(response.success){
        this.countPartner=response.data
      }
    });
    $.findFromUserID().then(response => {
      if(response.success){
        this.trueName=response.data.trueName
        this.telephone=response.data.telephone
        this.loginName=response.data.loginName
        this.depName=response.data.depName
      }
    });
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
