<template>
  <div class="app-container">
    <div class="button">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="请输入伙伴姓名或手机号" v-model="value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="find()">查找</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="float:right">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary" @click="handleAdd(createUserId)">添加</el-button>
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
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column label="伙伴姓名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">{{ scope.row.telephone }}</template>
      </el-table-column>

      <el-table-column label="单位名称" align="center">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column label="岗位" align="center">
        <template slot-scope="scope">{{ scope.row.post }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.partnerId)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.row.partnerId)">删除</el-button>
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
import $ from "@/api/assets";

export default {
  data() {
    return {
      createUserId: "",
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
    $.getCreateUserId().then(response => {
      this.createUserId = response.createId;
      this.listLoading = false;
      this.fetchData();
    });
  },
  methods: {
    find() {
      this.listLoading = true;
      this.list = null;
      $.findByBlurry({
        partnerType: 6,
        createId: this.createUserId,
        value: this.value,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        // console.log(response.data)
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        //  console.log(response.data.list)
      });
    },

    fetchData() {
      this.listLoading = true;
      $.findAll({
        partnerType: 6,
        createId: this.createUserId,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        // console.log(response.data)
        this.list = response.data.list;
        this.total = response.data.total;
        this.createUserId = response.data.list[0].createUserId;
        this.listLoading = false;
        //  console.log(response.data.list)
      });
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
    handleAdd(id) {
      this.$router.push({
        path: "add",
        query: { id: id }
      });
    },
    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { id: id }
      });
    },
    handleDel(id) {
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id)
          $.remove({ partnerId: id }).then(response => {
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
