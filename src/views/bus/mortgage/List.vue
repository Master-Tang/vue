<template>
  <div class="app-container">
    <div class="button" style="padding-bottom:1rem">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="handleAdd" >添加</el-button>
          </div>
    </div>
    <el-table
      id="myform"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="序号" align="center" width="50rem">
        <template slot-scope="scope">{{ scope.row.a }}</template>
      </el-table-column>
      <el-table-column label="债权编号" align="center">
        <template slot-scope="scope">{{ scope.row.number}}</template>
      </el-table-column>
      <el-table-column label="借款人" align="center">
        <template slot-scope="scope">{{ scope.row.borrowers }}</template>
      </el-table-column>
      <el-table-column label="本金余额/代偿余额" align="center">
        <template slot-scope="scope">{{ scope.row.prinBalance }}</template>
      </el-table-column>
      <el-table-column label="当前利息" align="center">
        <template slot-scope="scope">{{ scope.row.curInter }}</template>
      </el-table-column>
      <el-table-column label="罚息（滞纳金）" align="center">
        <template slot-scope="scope">{{ scope.row.lateFee }}</template>
      </el-table-column>
      <el-table-column label="债权进额" align="center">
        <template
          slot-scope="scope"
        >{{ scope.row.prinBalance+scope.row.curInter+scope.row.lateFee }}</template>
      </el-table-column>
      <el-table-column label="所在机构" align="center">
        <template slot-scope="scope">{{ scope.row.institutions }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150rem">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="small" @click="handleEdit(scope.row.number)"></el-button>
          <el-button type="info" icon="el-icon-search" circle  size="small" @click="detailFind(scope.row.number)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small" @click="handleDel(scope.row.number)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import asstes from "@/api/assets";
import $ from "@/api/bus";

export default {
  data() {
    return {
      value: "",
      state: 0,
      list: null,
      val: "",
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      $.mortgageList().then(response => {
        // console.log(response.data)
        this.list = response.data;
        for (var i = 1; i <= this.list.length; i++) {
          this.$set(this.list[i - 1], "a", i);
        }
        // console.log(response)
      });
    },

    handleAdd() {
      this.$router.push({
        path: "add"
      });
      
    },
    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { claimsNumber: id }
      });
    },
    detailFind(id){
      this.$router.push({
        path: "detail",
        query: { claimsNumber: id }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.mortgageFake({ number: id }).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
