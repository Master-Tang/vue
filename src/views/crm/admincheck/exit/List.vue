<template>
  <div class="app-container">
    <div class="button">
      <el-collapse v-model="activeName" accordion >
        <el-collapse-item title="退出伙伴查询" name="1">
          <el-form :inline="true">
            <el-form-item label="退出类型">
              <el-select v-model="orgType" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in exitTypeList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他机构" v-if="orgType==='26'">
              <el-input v-model="orgRemark"></el-input>
            </el-form-item>
            <el-form-item label="用途偏好">
              <el-select v-model="usage" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in usageList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资规模">
              <el-row>
                <el-col :span="6">
                  <el-select v-model="abilityMin" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="item in abilityList"
                      :key="item.dicValue"
                      :label="item.dicKey"
                      :value="item.dicValue"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="1">
                  <div align="center">{{" ~ "}}</div>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="abilityMax" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="item in abilityList"
                      :key="item.dicValue"
                      :label="item.dicKey"
                      :value="item.dicValue"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="资产类型">
              <el-select v-model="typeId" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in assetsTypeList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他资产类型" v-if="typeId==='09'">
              <el-input v-model="typeName"></el-input>
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

      <el-table-column label="单位名称" align="center">
        <template slot-scope="scope">{{ scope.row.company }}</template>
      </el-table-column>
      <el-table-column label="部门岗位" align="center">
        <template slot-scope="scope">{{ scope.row.department+" "+scope.row.post }}</template>
      </el-table-column>
    
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.partnerId)">编辑</el-button>
          <el-button type="success" size="small" @click="handleDel(scope.row.partnerId)">恢复</el-button>
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
import qs from "querystring"
export default {
  data() {
    return {
      activeName: '1',
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
      usage: "",
      abilityMin:"",
      abilityMax: "",
      typeId: "",
      typeName: "",
      cities: [],
      options: [],
      usageList: [],
      assetsTypeList: [],
      abilityList: [],
      provinceList:[],
      exitTypeList:[]
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
        this.exitTypeList = res.data.exitTypeList;
        this.usageList = res.data.usageList;
        this.abilityList = res.data.abilityList;
        this.assetsTypeList = res.data.assetsTypeList;
      }
    });
  },
  methods: {
    reset(){
       this.orgType="",
      this.orgRemark="",
      this.usage="",
      this.abilityMin="",
      this.abilityMax="",
      this.typeId="",
      this.typeName="",
      this.cities=[]
    },
    find() {
      this.listLoading = true;
      this.list = null;
      // console.log(this.overArea)
      this.pushcities = [];
      for (let i in this.cities) {
        this.pushcities.push(this.cities[i][1]);
      }
      let params = qs.stringify({
        partnerType: 3,
        "cities[]": this.pushcities.length>0?this.pushcities:null,
        orgType: this.orgType,
        orgRemark: this.orgRemark,
        usage: this.usage,
        abilityMin: this.abilityMin,
        abilityMax:this.abilityMax,
        typeId: this.typeId,
        typeName: this.typeName,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      });
      // console.log(params);
      $.findExitInfo(params).then(response => {
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
        partnerType: 3,
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
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //console.log(id)
          $.remove({ partnerId:id }).then(response => {
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
