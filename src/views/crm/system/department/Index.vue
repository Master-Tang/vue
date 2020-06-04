<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
     
      <el-table-column label="分组名称">
        <template slot-scope="scope">
          {{ scope.row.groupName }}
        </template>
      </el-table-column>
      <el-table-column label="标签名称" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dicKey }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签值" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.dicValue }}
        </template>
      </el-table-column>
       <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
           <el-button type="danger" size="small" @click="handleDel(scope.row.id)">删除</el-button>
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
       :total="total">   
       </el-pagination>
  </div>
</template>

<script>
import  $ from '@/api/dict'

export default {

  data() {
    return {
      list: null,
      listLoading: true,
      currentPage:1,
      pageSize:10,
      total:0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      $.getList({pageIndex:this.currentPage,pageSize:this.pageSize})
      .then(response => {
       // console.log(response.data)
        this.list = response.data.list
        this.total=response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val){
      this.pageSize=val;
      this.currentPage=1;
      this.fetchData()
    },
    handleCurrentChange(val)
    {
      this.currentPage=val;
      this.fetchData()
    },
    handlelEdit(id)
    {

    },
    handleDel(id)
    {
     
      this.$confirm('此操作将删除该字典项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           //console.log(id)
          $.removeDict({id}).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
               this.fetchData()
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>
