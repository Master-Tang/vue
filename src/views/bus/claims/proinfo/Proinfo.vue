<template>
  <div style="my-padding">
    <el-button @click="back">退出</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    back() {
      this.$router.push({
        path: "/bus/claims/edit/index",
        query: { claimsNumber: this.$route.query.claimsNumber },
      });
    },
  },
};
</script>
<style scoped>
</style>