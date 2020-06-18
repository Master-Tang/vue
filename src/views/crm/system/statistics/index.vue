<template>
  <div class="app-container">
    <div class="button">
      <span class="demonstration">请选择日期</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      {{"-"}}
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      ></el-date-picker>

      <el-button type="primary" @click="handle()">查看</el-button>
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
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">{{ scope.row.a }}</template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trueName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">{{ scope.row.depName }}</template>
      </el-table-column>

      <el-table-column label="资产伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.assetNum }}</template>
      </el-table-column>
      <el-table-column label="资金伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.fundNum }}</template>
      </el-table-column>
      <el-table-column label="司法伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.justiceNum }}</template>
      </el-table-column>
      <el-table-column label="政府伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.orgNum }}</template>
      </el-table-column>
      <el-table-column label="退出伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.exitNum }}</template>
      </el-table-column>
      <el-table-column label="同业伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.peerNum }}</template>
      </el-table-column>
      <el-table-column label="总计" align="center">
        <template slot-scope="scope">{{ scope.row.sum }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $ from "@/api/sysuser";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      value1: "",
      value2: "",
    };
  },
  created() {
    this.getTime()
    $.getStatList({
      begin: this.value1,
      end: this.value2
    }).then(res => {
      if (res.success) {
          // console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            for (var n = 0; n < res.data[i].length; n++) {
              this.list.push(res.data[i][n])
              // console.log(this.list)
            }
          }
          this.listLoading = false;
          for (var i = 1; i <= this.list.length; i++) {
            this.$set(this.list[i-1], "a", i);
          }
          // var n=[]
          for (var n = 0; n < this.list.length; n++) {
            var sum =
              this.list[n].justiceNum +
              this.list[n].assetNum +
              this.list[n].fundNum +
              this.list[n].orgNum +
              this.list[n].exitNum +
              this.list[n].peerNum;
            this.$set(this.list[n], "sum", sum);
          }
        }
    });
  },
  methods: {
    getTime(){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var yesterday=date.getDate()-7;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      var currentdate1 = year + seperator1 + month + seperator1 + yesterday;
      this.value1=currentdate1
      this.value2=currentdate
      
    },
    handle() {
      this.list = [];
      // console.log(this.value2);
      $.getStatList({
        begin: this.value1,
        end: this.value2
      }).then(res => {
        if (res.success) {
          // console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            for (var n = 0; n < res.data[i].length; n++) {
              this.list.push(res.data[i][n])
              // console.log(this.list)
            }
          }
         
          this.listLoading = false;
          for (var i = 1; i <= this.list.length; i++) {
            this.$set(this.list[i-1], "a", i);
          }
          // var n=[]
          for (var n = 0; n < this.list.length; n++) {
            var sum =
              this.list[n].justiceNum +
              this.list[n].assetNum +
              this.list[n].fundNum +
              this.list[n].orgNum +
              this.list[n].exitNum +
              this.list[n].peerNum;
            this.$set(this.list[n], "sum", sum);
          }
        }
      });
    }
  }
};
</script>
<style  scoped>
.button {
  padding: 1rem;
}
</style>
