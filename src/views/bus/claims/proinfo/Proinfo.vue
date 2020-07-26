<template>
  <div class="my-padding">
    <el-button @click="back">退出</el-button>
    <div style="margin-top: 1rem;border: 1px solid #000;padding: 1rem">
      <h3 style="padding-bottom: 0.5rem" v-if="kaiguan==false">添加财产线索信息</h3>
      <h3 style="padding-bottom: 0.5rem" v-if="kaiguan==true">修改财产线索信息</h3>
      <el-form :model="form">
        <el-row style="padding-bottom: 1rem">
          <el-col :span="12">
            <span>资产所有人<span style="color: red">*</span>:</span>
            <el-input v-model="form.assetOwner" style="width: 59.5%" placeholder="请输入资产所有人姓名"></el-input>
          </el-col>
          <el-col :span="12">
            <span>资产类型:</span>
            <el-select v-model="form.assetType" placeholder="请选择资产类型" style="width: 55%">
              <el-option
                v-for="item in proassList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="12">
            <span>财产线索描述:</span>
            <el-input v-model="form.assetDescript" style="width: 57%" placeholder="请输入财产线索描述"></el-input>
          </el-col>
          <el-col :span="12">
            <span>可回收金额:</span>
            <el-input v-model="form.recycleMoney" style="width: 52.5%" placeholder="请输入可回收金额"></el-input>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="12">
            <span>依据:</span>
            <el-input v-model="form.basis" style="width: 67%" placeholder="请输入依据"></el-input>
          </el-col>
          <el-col :span="12">
            <span>与借款人关系:</span>
            <el-select v-model="form.borrowRelate" placeholder="请选择与借款人关系" style="width: 50%">
              <el-option
                v-for="item in relationshipList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addProinfo" v-if="kaiguan==false">添加</el-button>
        <el-button type="warning" @click="updateProinfo" v-if="kaiguan==true">更改</el-button>
        <el-button @click="cencle" v-if="kaiguan==true">取消</el-button>
      </el-form>
    </div>
    <el-table
      :data="proinfoList"
      border
      show-summary
      style="width: 100% ;padding-top: 2rem;"
    >
      <el-table-column
        prop="a"
        label="序号"
        align="center"
        width="50rem">
      </el-table-column>
      <el-table-column
        prop="assetOwner"
        align="center"
        label="资产所有人">
      </el-table-column>
      <el-table-column
        prop="assetType"
        align="center"
        label="资产类型">
      </el-table-column>
      <el-table-column
        prop="assetDescript"
        align="center"
        label="财产线索描述">
      </el-table-column>
      <el-table-column
        prop="recycleMoney"
        sortable
        align="center"
        label="可回收金额">
      </el-table-column>
      <el-table-column
        prop="basis"
        align="center"
        label="依据">
      </el-table-column>
      <el-table-column
        prop="borrowRelate"
        align="center"
        label="与借款人关系">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" circle
                     @click="changeproinfo(scope.row.clueId)"></el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" circle
                     @click="deleteproinfo(scope.row.clueId)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import $ from "@/api/proinfo";

  export default {
    data() {
      return {
        form: {
          assetOwner: "",
          assetType: "",
          assetDescript: "",
          recycleMoney: "",
          basis: "",
          borrowRelate: "",
          claimsNumber: "",
        },
        kaiguan: false,
        proassList: [],
        relationshipList: [],
        proinfoList: []
      };
    },
    created() {
      this.form.claimsNumber = this.$route.query.claimsNumber;
      this.fetchData();
      $.addInit().then(res => {
        if (res.success) {
          this.proassList = res.data.proassList
          this.relationshipList = res.data.relationshipList
        }
      });
    },
    methods: {
      fetchData() {
        $.assetClueList({claimsNumber: this.$route.query.claimsNumber}).then(res => {
          this.proinfoList = res.data
          // console.log(res.data)
          for (var i = 1; i <= this.proinfoList.length; i++) {
            this.$set(this.proinfoList[i - 1], "a", i);
          }
        })
      },
      changeproinfo(id) {
        $.assetClueSelect({clueId: id}).then(res => {
          if (res.success) {
            this.form = res.data
            this.kaiguan = true
          }
        })
      },
      deleteproinfo(id) {
        $.assetClueDelete({clueId: id}).then(res=>{
          if (res.success){
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.fetchData()
          }
        })
      },
      addProinfo() {
        if (this.form.assetOwner.length < 2) {
          this.$message({
            message: "资产所有人不能少于两个字符",
            type: "error",
          })
          return
        }
        $.assetClueAdd(this.form).then(res => {
          if (res.success) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.form.assetOwner = ""
            this.form.assetType = ""
            this.form.assetDescript = ""
            this.form.recycleMoney = ""
            this.form.basis =""
            this.form.borrowRelate = ""
            this.fetchData()
          }
        })
      },
      updateProinfo() {
        if (this.form.assetOwner.length < 2) {
          this.$message({
            message: "资产所有人不能少于两个字符",
            type: "error",
          });
          return
        }
        $.assetClueUpdate(this.form).then(res=>{
          this.$message({
            message: "更新成功",
            type: "success",
          });
          this.form.assetOwner = ""
          this.form.assetType = ""
          this.form.assetDescript = ""
          this.form.recycleMoney = ""
          this.form.basis =""
          this.form.borrowRelate = ""
          this.kaiguan = false
          this.fetchData()
        })
      },
      cencle() {
        this.form.assetOwner = ""
        this.form.assetType = ""
        this.form.assetDescript = ""
        this.form.recycleMoney = ""
        this.form.basis =""
        this.form.borrowRelate = ""
        this.kaiguan = false
      },
      back() {
        this.$router.push({
          path: "/bus/claims/edit/index",
          query: {claimsNumber: this.$route.query.claimsNumber},
        });
      },
    },
  };
</script>
<style scoped>
</style>
