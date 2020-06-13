<template>
  <div class="app-container">
    <div class="button">
      <el-collapse>
        <el-collapse-item title="退出伙伴查询" name="1">
          <el-form :inline="true">
            <el-form-item label="机构类型">
              <el-select v-model="orgType" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in orgTypeList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他机构" v-if="orgType==='26'">
              <el-input v-model="orgRemark"></el-input>
            </el-form-item>
            <el-form-item label="同业业务类型">
              <el-select v-model="bizListId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in peerTypeList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他业务类型" v-if="bizListId==='11'">
              <el-input v-model="bizListName"></el-input>
            </el-form-item>
            <el-form-item label="同业合作方式">
              <el-select v-model="coopListId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in peerBizList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他合作方式" v-if="coopListId==='13'">
              <el-input v-model="coopListName"></el-input>
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
import qs from "querystring";

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
      orgType: "",
      orgRemark: "",
      bizListId: "",
      bizListName: "",
      coopListId: "",
      coopListName: "",
      cities: [],
      options: [],
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      peerTypeList: [],
      peerBizList: []
    };
  },
  created() {
    this.fetchData();
    $.addInit().then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
        this.peerTypeList = res.data.peerTypeList;
        this.peerBizList = res.data.peerBizList;
      }
    });
  },
  methods: {
    find() {
      this.listLoading = true;
      this.list = null;
      // console.log(this.overArea)
      this.pushcities = [];
      for (let i in this.cities) {
        this.pushcities.push(this.cities[i][1]);
      }
      let params = qs.stringify({
        partnerType: 5,
        "cities[]": this.pushcities.length > 0 ? this.pushcities : null,
        orgType: this.orgType,
        orgRemark: this.orgRemark,
        bizListId: this.bizListId,
        bizListName: this.bizListName,
        coopListId: this.coopListId,
        coopListName: this.coopListName
      });
      console.log(params);
      $.findPeerInfo(params).then(response => {
        console.log(response.data);
        this.list = response.data.list;
        this.total = response.data.total;
        this.listLoading = false;
        console.log(response.data.list);
      });
    },

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
    }
  }
};
</script>
