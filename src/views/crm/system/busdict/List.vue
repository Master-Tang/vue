<template>
  <div class="app-container">
    <div class="button">
      <el-form :inline="true">
        <el-form-item label="分组名称">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="vvv(),find()">查询</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="float:right">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="$router.push('add')">添加</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      id="myform"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="分组名称" fixed>
        <template slot-scope="scope">{{ scope.row.groupName }}</template>
      </el-table-column>
      <el-table-column label="标签名称" width align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dicKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签值" width align="center">
        <template slot-scope="scope">{{ scope.row.dicValue }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import $ from "@/api/dict";

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
      options: []
    };
  },
  created() {
    this.fetchData(), this.findData();
  },
  methods: {
    vvv() {
      this.currentPage = 1;
    },
    find() {
      if (this.value==null) {
        this.fetchData()
      } else {
        $.buslistByGroupName({
          groupName: this.value,
          pageIndex: this.currentPage,
          pageSize: this.pageSize
        }).then(response => {
          this.list = null;
          this.total = 0;
          this.listLoading = true;
          this.pageSize = 10;
          this.state = 1;
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          //console.log(response.data)
        });
      }
    },
    findData() {
      this.options.splice(0, this.options.length);
      $.getbusGroupName().then(response => {
        // console.log(response.data);
        for (let s of response.data) {
          this.options.push({ label: s.groupName, value: s.groupKey });
        }
      });
    },
    fetchData() {
      this.listLoading = true;
      $.getbusList({ pageIndex: this.currentPage, pageSize: this.pageSize }).then(
        response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.listLoading = false;
          // console.log(response.data)
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      // console.log(this.currentPage)
      if (this.state == 1) {
        this.find();
        //console.log(this.currentPage)
      } else this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //console.log(val)
      if (this.state == 1) {
        this.find();
      } else this.fetchData();
    },

    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { id: id }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将删除该字典项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //console.log(id)
          $.removebusDict({ id }).then(response => {
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
<style scoped>
.button {
  padding-left: 1rem;
}
</style>
