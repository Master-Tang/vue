<template>
  <div class="app-container">
    <div class="button">
      <span class="demonstration">请选择年份</span>
      <el-select v-model="value" placeholder="请选择" @change="find(value)">
        <el-option
          v-for="item in options"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="handleExport()">导出excel</el-button>
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
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">{{ scope.row.trueName }}</template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">{{ scope.row.depName }}</template>
      </el-table-column>
      <el-table-column label="第一季度" align="center">
        <template slot-scope="scope">{{ scope.row.quarter1 }}</template>
      </el-table-column>

      <el-table-column label="第二季度" align="center">
        <template slot-scope="scope">{{ scope.row.quarter2 }}</template>
      </el-table-column>
      <el-table-column label="第三季度" align="center">
        <template slot-scope="scope">{{ scope.row.quarter3 }}</template>
      </el-table-column>
      <el-table-column label="第四季度" align="center">
        <template slot-scope="scope">{{ scope.row.quarter4 }}</template>
      </el-table-column>
      <el-table-column label="年度" align="center">
        <template slot-scope="scope">{{ scope.row.yr }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" v-if="value==now">
        <template slot-scope="scope" >
          <el-button type="primary" size="small" @click="handleEdit(scope.row.userId)">更改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $ from "@/api/sysuser";
import { options } from 'runjs';

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      value:"",
      now:"",
      options:[]
    };
  },
  created() {
    var nowDate = new Date();
    this.value=String(nowDate.getFullYear())
    this.now=String(nowDate.getFullYear())
    $.homeList({time:String(nowDate.getFullYear())}).then(res => {
      this.list = res.data;
      for(let i=parseInt(this.list[0].minTime);i<=this.list[0].maxTime;i++){
        this.options.push({value1:i,label1:i})
      }
      this.listLoading = false;
    });
  },
  methods: {
    handleEdit(id){
      this.$router.push({
        path: "edit",
        query: { id: id }
      });
    },
    find(value){
      this.list=null
      $.yearAim({time:value}).then(res=>{
        this.list = res.data;
        this.listLoading = false;
      })
    },
    handleExport() {
      $.export({
        begin: this.value1,
        end: this.value2
      }).then(
        response => {
          // resolve(response.data)
          let blob = new Blob([response.data], {
            type: "application/vnd.ms-excel"
          });

          let fileName = decodeURI(
            response.headers["content-disposition"].split("=")[1]
          );
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
          } else {
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        },
        err => {
          // reject(err)
          //console.log(err)
        }
      );
    }
  }
};
</script>
<style  scoped>
.button {
  padding: 1rem;
}
</style>
