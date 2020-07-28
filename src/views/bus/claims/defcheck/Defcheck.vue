<template>
  <el-table :data="tableData" border style="width: 60%;margin:0 auto" @row-dblclick="dbclick">
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template slot-scope="scope">
        <el-form :model="scope.row">
          <el-form-item size="mini" label-width="66px">
            <el-input v-if="scope.row.isOK" v-model="scope.row.name" style="width:100%;hight:100%"></el-input>
            <span v-else>{{scope.row.name}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址">
      <template slot-scope="scope">
        <el-form :model="scope.row">
          <el-form-item size="mini" label-width="66px">
            <el-input
              v-if="scope.row.isOK"
              v-model="scope.row.address"
              style="width:100%;hight:100%"
            ></el-input>
            <span v-else>{{scope.row.address}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          isOK: true,
          name: "张三",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          isOK: false,
          name: "李四",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods:{
      dbclick(row, event, column){
      row.isOK =!row.isOK

    }
  }
};
</script>
<style scoped>
</style>