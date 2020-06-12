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

      <el-table-column label="查看信息" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.partnerId)">查看</el-button>
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
    this.fetchData();
  },
  methods: {
    // find() {
    //   this.listLoading = true;
    //   this.list = null;
    //   $.findByNameTel({
    //     partnerType: 1,
    //     name: this.value,
    //     telephone: "",
    //     pageIndex: this.currentPage,
    //     pageSize: this.pageSize
    //   }).then(response => {
    //     console.log(response.data);
    //     this.list = response.data.list;
    //     this.total = response.data.total;
    //     this.listLoading = false;
    //     console.log(response.data.list);
    //   });
    // },
    fetchData() {
      this.listLoading = true;
      $.findByNameTel({
        partnerType: 5,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        console.log(response.data);
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        console.log(response.data.list);
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

   
  }
};
</script>
