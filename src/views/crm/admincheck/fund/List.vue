<template>
  <div class="app-container">
    <div class="button">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="资金伙伴查询" name="1">
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
            <el-form-item label="资金类型" style="margin-left:5.2rem">
              <el-select v-model="currency" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in currencyList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投资结构">
              <el-select v-model="struct" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in structList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :inline="true">
            <el-form-item label="投资规模">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="scaleMin" placeholder="请选择" style="width:100%">
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
                <el-col :span="8">
                  <el-select v-model="scaleMax" placeholder="请选择" style="width:100%">
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
            <el-form-item label="投资期限" style="margin-left:-7.5rem">
              <el-select v-model="deadline" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in deadlineList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收益类型">
              <el-select v-model="incomeType" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in incomeTypeList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form :inline="true">
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
            <el-form-item label="资产类型其它" v-if="typeId==='20'">
              <el-input v-model="typeName"></el-input>
            </el-form-item>
            <el-form-item label="收益率" style="margin-left:5.2rem">
              <el-input v-model="incomeRate" placeholder="请输入收益率" style="margin-left:1rem"></el-input>
            </el-form-item>
            <el-form-item label="覆盖地区" style="margin-left:1rem">
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
                    <el-button type="primary" @click="handleSelectionChange">交接</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
<el-dialog
      v-model="userValue"
      title="选择"
      :visible.sync="dialogTableVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="50%"
    >
      <div>
        <el-table
          id="myform"
          v-loading="allLoading"
          :data="allName"
          element-loading-text="Loading"
          border
          fit
          ref="table"
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="转入人" align="center">
            <template slot-scope="scope">{{ scope.row.trueName }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleTransfer(scope.row.userId)">转入</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <el-table
      id="myform"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      ref="table"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column type="selection" align="center"></el-table-column>
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
      userValue: [],
      dialogTableVisible: false,
      activeName: "1",
      value: "",
      state: 0,
      list: null,
      val: "",
      allLoading: true,
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options: [],
      cities: [],
      orgType: "",
      orgRemark: "",
      currency: "",
      struct: "",
      scaleMin: "",
      scaleMax: "",
      deadline: "",
      incomeType: "",
      typeId: "",
      incomeRate: "",
      typeName: "",
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      exitTypeList: [],
      usageList: [],
      abilityList: [],
      assetsTypeList: [],
      incomeTypeList: [],
      currencyList: [],
      structList: [],
      deadlineList: [],
      userList: [],
       users:[],
       allName: []
    };
  },
  created() {
    this.fetchData();
    $.findDepartmentUser().then(res => {
      this.userList=res.data
    });
    $.addInit().then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
        this.exitTypeList = res.data.exitTypeList;
        this.usageList = res.data.usageList;
        this.abilityList = res.data.abilityList;
        this.assetsTypeList = res.data.assetsTypeList;
        this.incomeTypeList = res.data.incomeTypeList;
        this.currencyList = res.data.currencyList;
        this.structList = res.data.structList;
        this.deadlineList = res.data.deadlineList;
      }
    });
  },
  methods: {
    handleTransfer(id) {
      this.dialogTableVisible = false;
      $.updateHandover({ userValue: String(this.userValue), userId: id }).then(
        res => {
          if (res.data == "无数据") {
            this.$message({
              type: "error",
              message: "无数据,转入失败!"
            });
            this.list = null;
            this.$router.go(0)
          } else {
            this.$message({
              type: "success",
              message: "转入成功!"
            });
            this.list = null;
            this.$router.go(0)
          }
        }
      );
    },
    handleSelectionChange() {
      this.dialogTableVisible = true;
      for (var i = 0; i < this.$refs.table.selection.length; i++) {
        this.userValue.push(this.$refs.table.selection[i].partnerId + "");
      }
      $.TransferList().then(response => {
        this.allName = response.data;
        this.allLoading = false;
      });
    },
    reset() {
      (this.users = []),
      (this.cities = []),
        (this.orgType = ""),
        (this.orgRemark = ""),
        (this.currency = ""),
        (this.struct = ""),
        (this.scaleMin = ""),
        (this.scaleMax = ""),
        (this.deadline = ""),
        (this.incomeType = ""),
        (this.typeId = ""),
        (this.incomeRate = ""),
        (this.typeName = "");
    },
     handleUser() {
      this.list = null;
      $.findUserList({
        users: this.users[1],
        partnerType: 2,
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
        this.pushcities.push(this.cities[i][1]);
      }
      let params = qs.stringify({
        partnerType: 2,
        "cities[]": this.pushcities.length > 0 ? this.pushcities : null,
        orgType: this.orgType,
        orgRemark: this.orgRemark,
        currency: this.currency,
        struct: this.struct,
        scaleMin: this.scaleMin,
        scaleMax: this.scaleMax,
        deadline: this.deadline,
        incomeType: this.incomeType,
        typeId: this.typeId,
        incomeRate: this.incomeRate,
        typeName: this.typeName,
        pageSize: this.pageSize,
        pageIndex: this.currentPage
      });
      // console.log(params);
      $.findFundInfo(params).then(response => {
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
        partnerType: 2,
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
