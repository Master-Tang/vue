<template>
  <div class="app-container">

    <el-table
      id="myform"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="伙伴类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="总数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本月新增" align="center">
        <template slot-scope="scope">{{ scope.row.count }}</template>
      </el-table-column>

    </el-table>
   
  </div>
</template>

<script>
import $ from "@/api/assets";

export default {
  data() {
    return {
      list: null,
      listLoading: true,

    };
  },
  created() {
      this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      $.homeList({
      }).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

  }
};
</script>
