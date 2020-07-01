<template>
  <div class="app-container">
    <div class="button">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="司法伙伴查询" name="1">
          <el-form :inline="true">
            <el-form-item label="用户选择">
              <el-cascader
                style="width:100%"
                placeholder="请选择用户"
                v-model="users"
                :options="userList"
                :props="{value:'depId',label:'depName',children:'userList'}"
                collapse-tags
                filterable
                @change="handleUser"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="机构名称">
              <el-input v-model="company"></el-input>
            </el-form-item>
            <el-form-item label="职务">
              <el-input v-model="post"></el-input>
            </el-form-item>
            <el-form-item label="覆盖地区">
              <el-cascader
                style="width:100%"
                placeholder="试试搜索：无锡"
                v-model="cities"
                :options="provinceList"
                :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
                collapse-tags
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content bg-purple-dark">
                    <el-button type="primary" @click="find()">查找</el-button>
                    <el-button type="primary" @click="reset()">重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
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
      <el-table-column label="录入人" align="center">
        <template slot-scope="scope">{{ scope.row.trueName }}</template>
      </el-table-column>
      <el-table-column label="录入时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime.substring(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="伙伴姓名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="机构名称" align="center">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column label="部门岗位" align="center">
        <template slot-scope="scope">{{ scope.row.department+" "+scope.row.post }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            v-if="scope.row.disabled==0"
            @click="handleEdit(scope.row.partnerId)"
          >编辑</el-button>
          <el-button
            type="success"
            size="small"
            v-if="scope.row.disabled==1"
            @click="handleDel(scope.row.partnerId)"
          >恢复</el-button>
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
import qs from "querystring";

export default {
  data() {
    return {
      activeName: "1",
      value: "",
      state: 0,
      list: null,
      val: "",
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      company: "",
      post: "",
      cities: [],
      options: [],
      provinceList: [],
      orgTypeList: [],
      sourceList: [],
      relativeList: [],
      userList: [],
      users: []
    };
  },
  created() {
    this.fetchData();
    $.findDepartmentUser().then(res => {
      this.userList = res.data;
    });
    $.addInit1().then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.orgTypeList = res.data.orgTypeList;
        this.relativeList = res.data.relativeList;
      }
    });
  },
  methods: {
    reset() {
      (this.users = []),
        (this.company = ""),
        (this.post = ""),
        (this.cities = []);
    },
    handleUser() {
      this.list = null;
      $.findUserList({
        users: this.users[1],
        partnerType: 4,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data)
      });
    },
    find() {
      this.listLoading = true;
      this.list = null;
      // console.log(this.overArea)
      this.pushcities = [];
      for (let i in this.cities) {
        this.pushcities.push(this.cities[i][2]);
      }
      let params = qs.stringify({
        partnerType: 4,
        "cities[]": this.pushcities.length > 0 ? this.pushcities : null,
        company: this.company,
        post: this.post
      });
      // console.log(params);
      $.findJusticeInfo(params).then(response => {
        // console.log(response.data);
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data.list);
      });
    },

    fetchData() {
      this.listLoading = true;
      $.findByNameTelHide({
        partnerType: 4,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      }).then(response => {
        // console.log(response.data);
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data.list);
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
    handleEdit(id) {
      this.$router.push({
        path: "edit",
        query: { id: id }
      });
    },
    handleDel(id) {
      this.$confirm("是否恢复?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.reductions({ partnerId: id }).then(response => {
            // console.log(response)
            this.$message({
              type: "success",
              message: "已恢复!"
            });
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "不恢复"
          });
        });
    }
  }
};
</script>
