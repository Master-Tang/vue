<template>
  <div class="app-container">
    <div class="button">
      <el-form :inline="true">
        <el-form-item label="伙伴类型">
          <el-select v-model="type" @change="select()" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in partnerTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-cascader
            style="width:100%"
            placeholder="试试搜索：无锡"
            v-model="cities"
            :options="provinceList" collapse-tags="true"
            :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
            filterable
          ></el-cascader>
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

      <el-table-column label="伙伴来源" align="center">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template>
          <el-button type="primary" size="small" >查看</el-button>
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
import qs from 'querystring';

export default {
  data() {
    return {
      type: "资产伙伴",
      value: "",
      state: 0,
      list: null,
      val: "",
      cities: [],
      pushcities:[],
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: [],
      partnerTypeList: [],
      provinceList: []
    };
  },
  created() {
    this.fetchData();

    $.addInit().then(res => {
      if (res.success) {
        this.partnerTypeList = res.data.partnerTypeList;
        this.provinceList = res.data.province;
        // console.log(this.partnerTypeList);
      }
    });
  },
  methods: {
    select() {
      console.log(this.type);
      this.list = null;
      this.findcha();
    },
    find() {
      this.listLoading = true;
      this.list = null;
      console.log(this.cities)
      this.pushcities=[]
      for(let i in this.cities)
      {
        this.pushcities.push(this.cities[i][1])

      }

      let params=qs.stringify({
        partnerType: 2,
        "cities[]":this.pushcities,
        pageSize:this.pageSize,
        pageIndex:this.currentPage
        });
      console.log(params)
      
      //console.log(this.pushcities)
      $.findByCity(params).then(response => {
        // console.log(response.data);
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        // console.log(response.data.list);
      });
     },
    
    showMore(id) {
      this.$router.push({
        path: "find",
        query: { id: id }
      });
    },
    findcha() {
      this.listLoading = true;
      $.findchaxun({
        partnerType: this.type,
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
    fetchData() {
      this.listLoading = true;
      $.findchaxun({
        partnerType: 1,
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
    }
  }
};
</script>
