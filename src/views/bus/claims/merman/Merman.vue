<template>
  <div class="my-padding">
    <el-button @click="back">退出</el-button>
    <el-divider content-position="center">招商管理</el-divider>
    <div style="margin-top: 1rem;border: 1px solid #000;padding: 1rem">
      <h3 style="padding-bottom: 0.5rem" v-if="kaiguan==false">添加招商管理信息</h3>
      <h3 style="padding-bottom: 0.5rem" v-if="kaiguan==true">修改招商管理信息</h3>
      <el-form :model="form">
        <el-row style="padding-bottom: 1rem">
          <el-col :span="12">
            <span>
              意向客户
              <span style="color: red">*</span>:
            </span>
            <el-input v-model="form.intentClient" style="width: 59.5%" placeholder="请输入意向客户"></el-input>
          </el-col>
          <el-col :span="12">
            <span>合作方式:</span>
            <el-select v-model="form.cooperateType" placeholder="请选择合作方式" style="width: 55%">
              <el-option
                v-for="item in investwayList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="padding-bottom: 1rem">
          <el-col :span="12">
            <span>报价更新(元):</span>
            <el-input
              v-model="form.quoteUpdate"
              style="width: 57%"
              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
              placeholder="请输入报价更新"
            ></el-input>
          </el-col>
          <el-col :span="12">
            <span>每周更新:</span>
            <el-input v-model="form.weekUpdate" style="width: 52.5%" placeholder="请输入每周更新"></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" @click="addMerman" v-if="kaiguan==false">添加</el-button>
        <el-button type="warning" @click="updateMerman" v-if="kaiguan==true">更改</el-button>
        <el-button @click="cencle" v-if="kaiguan==true">取消</el-button>
      </el-form>
    </div>
    <el-table :data="mermanList" border style="width: 100% ;padding-top: 2rem;">
      <el-table-column prop="a" label="序号" align="center" width="50rem"></el-table-column>
      <el-table-column prop="intentClient" align="center" label="意向客户"></el-table-column>
      <el-table-column prop="cooperateType" align="center" label="合作方式"></el-table-column>
      <el-table-column prop="quoteUpdate" align="center" label="报价更新(元)"></el-table-column>
      <el-table-column prop="weekUpdate" align="center" label="每周更新"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            circle
            @click="changemerman(scope.row.merchantId)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
            @click="deletemerman(scope.row.merchantId)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import $ from "@/api/merman";

export default {
  data() {
    return {
      form: {
        intentClient: "",
        cooperateType: "",
        quoteUpdate: "",
        weekUpdate: "",
        claimsNumber: "",
      },
      kaiguan: false,
      investwayList: [],
      mermanList: [],
    };
  },
  created() {
    this.form.claimsNumber = this.$route.query.claimsNumber;
    this.fetchData();
    $.addInit().then((res) => {
      if (res.success) {
        this.investwayList = res.data.investwayList;
      }
    });
  },
  methods: {
    fetchData() {
      $.merchantList({ claimsNumber: this.$route.query.claimsNumber }).then(
        (res) => {
          this.mermanList = res.data;
          // console.log(res.data)
          for (var i = 1; i <= this.mermanList.length; i++) {
            this.$set(this.mermanList[i - 1], "a", i);
          }
        }
      );
    },
    changemerman(id) {
      $.merchantSelect({ merchantId: id }).then((res) => {
        if (res.success) {
          this.form = res.data;
          this.kaiguan = true;
        }
      });
    },
    deletemerman(id) {
      $.merchantFake({ merchantId: id }).then((res) => {
        if (res.success) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fetchData();
        }
      });
    },
    addMerman() {
      if (this.form.intentClient.length < 2) {
        this.$message({
          message: "意向客户填写 不能少于两个字符",
          type: "error",
        });
        return;
      }
      $.merchantAdd(this.form).then((res) => {
        if (res.success) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.form.intentClient = "";
          this.form.cooperateType = "";
          this.form.quoteUpdate = "";
          this.form.weekUpdate = "";
          this.fetchData();
        }
      });
    },
    updateMerman() {
      if (this.form.intentClient.length < 2) {
        this.$message({
          message: "意向客户填写 不能少于两个字符",
          type: "error",
        });
        return;
      }
      $.merchantUpdate(this.form).then((res) => {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.form.intentClient = "";
        this.form.cooperateType = "";
        this.form.quoteUpdate = "";
        this.form.weekUpdate = "";
        this.kaiguan = false;
        this.fetchData();
      });
    },
    cencle() {
      this.form.intentClient = "";
      this.form.cooperateType = "";
      this.form.quoteUpdate = "";
      this.form.weekUpdate = "";
      this.kaiguan = false;
    },
    back() {
      this.$router.push({
        path: "/bus/claims/edit/index",
        query: { claimsNumber: this.$route.query.claimsNumber },
      });
    },
  },
};
</script>
<style scoped>
</style>
