<template>
  <div class="my-padding">
    <el-button @click="back">返回上一级</el-button>

    <div class="my-padding">
      <el-divider content-position="center">退出预案</el-divider>
      <el-button type="primary" @click="addDialog">新增退出预案</el-button>
      <div v-for="(item,index) in exitplanList" :key="index">
        <div class="my-padding">
          <div align="center">
            <h2 v-if="index==0">首推预案</h2>
          </div>
          <p
            style="font-family: '楷体';font-weight: bold;font-size: 150%;color: #000000;opacity: 0.5;"
          >预案{{index+1}}</p>
          <el-row style="padding-bottom: 1rem">
            <el-col :span="2" style="padding-top: 0.5rem">
              <span>回收金额(元)</span>
            </el-col>
            <el-col :span="5">
              <el-input
                size="small"
                v-model="item.money"
                oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                @change="changeMoney(item.money,item.exitId)"
              ></el-input>
            </el-col>
            <div style="float: right">
              <el-popover placement="top" width="300" trigger="hover" :close-delay="200">
                <el-button type="warning" size="small" @click="sticky(item.exitId)">置顶预案</el-button>
                <el-button type="primary" size="small" @click="editExitplan(item.exitId)">编辑预案</el-button>
                <el-button type="danger" size="small" @click="deleteExitplan(item.exitId)">删除预案</el-button>
                <el-button type="text" slot="reference">操作</el-button>
              </el-popover>
            </div>
          </el-row>
          <el-table :data="item.scheme" border style="width: 100% ;padding-top: 2rem;">
            <el-table-column prop="a" label="序号" align="center" width="50rem"></el-table-column>
            <el-table-column prop="guaranteeSolute" align="center" label="保底回收方案" width="200rem"></el-table-column>
            <el-table-column prop="schemeDescirpt" align="center" label="详细方案描述"></el-table-column>
            <el-table-column prop="disposalTime" align="center" label="预计处置时间" width="120rem"></el-table-column>
            <el-table-column align="center" label="回收金额(元)" width="150rem">{{item.money}}</el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog
      title="预案"
      :visible.sync="dialogTableVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="100%"
    >
      <el-row>
        <el-col :span="2">
          <el-button type="info" plain @click="addItem()">添加方案</el-button>
        </el-col>
        <el-col :span="22">
          <div v-for="(item, index) in form.scheme" :key="index">
            <div style="width:110%">
              <el-row style="padding-bottom: 1rem">
                <el-col :span="5" align="center">{{"保底回收方案"}}</el-col>
                <el-col :span="10" align="center">{{"详细方案描述"}}</el-col>
                <el-col :span="5" align="center">{{"预计处置时间"}}</el-col>
              </el-row>
              <el-row style="padding-bottom: 1rem">
                <el-col :span="5">
                  <el-select
                    v-model="item.guaranteeSolute"
                    placeholder="请选择保底回收方案"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in recschList"
                      :key="item.dicValue"
                      :label="item.dicKey"
                      :value="item.dicValue"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <el-input v-model="item.schemeDescirpt" placeholder="请输入详细方案描述"></el-input>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="item.disposalTime" placeholder="请输入预计处置时间"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button icon="el-icon-delete" circle @click="deleteItem(item, index)"></el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <div align="center">
        <el-button type="primary" @click="addExitplan" v-if="form.exitId==''">添加</el-button>
        <el-button type="warning" @click="updateExitplan" v-if="form.exitId!=''">保存</el-button>
        <el-button @click="cencleExitplan">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from "@/api/exitplan";

export default {
  data() {
    return {
      dialogTableVisible: false,
      form: {
        exitId: "",
        //方案
        scheme: [],
        money: 0,
        claimsNumber: "",
      },
      //预案
      exitplanList: [],
      recschList: [],
    };
  },
  created() {
    this.form.claimsNumber = this.$route.query.claimsNumber;
    this.fetchData();
    $.addInit().then((res) => {
      if (res.success) {
        this.recschList = res.data.recschList;
      }
    });
  },
  methods: {
    sticky(id) {
      $.sticky({ exitId: id }).then((res) => {
        if (res.success) {
          this.fetchData();
          this.$message({
            message: "已置顶",
            type: "success",
          });
        }
      });
    },
    addExitplan() {
      if (this.form.scheme.length == 0) {
        this.$message({
          message: "请添加至少一个方案",
          type: "error",
        });
        return;
      }
      $.busExitsAdd(this.form).then((res) => {
        if (res.success) {
          this.form.exitId = "";
          this.form.scheme = [];
          this.dialogTableVisible = false;
          this.fetchData();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      });
    },
    cencleExitplan() {
      this.form.exitId = "";
      this.form.scheme = [];
      this.dialogTableVisible = false;
    },
    changeMoney(money, id) {
      if (money == "") {
        money = 0;
      }
      $.busExitsMoney({ money: money, exitId: id }).then((res) => {
        if (res.success) {
          this.fetchData();
        }
      });
    },
    editExitplan(id) {
      $.busExitsSelect({ exitId: id }).then((res) => {
        if (res.success) {
          this.form = res.data;
          this.dialogTableVisible = true;
        }
      });
    },
    updateExitplan() {
      if (this.form.scheme.length == 0) {
        this.$message({
          message: "请添加至少一个方案",
          type: "error",
        });
        return;
      }
      $.busExitsUpdate(this.form).then((res) => {
        if (res.success) {
          this.form.exitId = "";
          this.form.scheme = [];
          this.dialogTableVisible = false;
          this.fetchData();
          this.$message({
            message: "更改成功",
            type: "success",
          });
        }
      });
    },
    deleteExitplan(id) {
      $.busExitsDelete({ exitId: id }).then((res) => {
        if (res.success) {
          this.fetchData();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    fetchData() {
      $.busExitsList({ claimsNumber: this.$route.query.claimsNumber }).then(
        (res) => {
          this.exitplanList = res.data;
          for (var j = 0; j < this.exitplanList.length; j++) {
            for (var i = 0; i < this.exitplanList[j].scheme.length; i++) {
              this.$set(this.exitplanList[j].scheme[i], "a", i + 1);
            }
          }
          // console.log(res.data)
        }
      );
    },
    back() {
      this.$router.push({
        path: "/bus/claims/edit/index",
        query: { claimsNumber: this.$route.query.claimsNumber },
      });
    },
    addDialog() {
      this.form.exitId = "";
      this.form.scheme = [];
      this.dialogTableVisible = true;
    },
    addItem() {
      this.form.scheme.push({
        //保底回收方案
        guaranteeSolute: "01",
        //详细方案描述
        schemeDescirpt: "",
        //预计处置时间
        disposalTime: "",
      });
    },
    deleteItem(item, index) {
      this.form.scheme.splice(index, 1);
    },
  },
};
</script>
<style scoped>
</style>
