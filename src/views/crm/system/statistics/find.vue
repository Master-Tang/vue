<template>
  <div class="app-container">
    <div class="button">
      <span class="demonstration">请选择阶段:</span>
      <el-select v-model="value" placeholder="请选择阶段">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 季度 -->
      <Quarter
        @toFind="getData"
        style="display:inline-block;margin-top:1.1rem"
        v-if="value=='first'"
      ></Quarter>
      <!-- 月度 -->
      <el-date-picker
        style="margin-bottom:1.4rem;margin-top:1.1rem"
        v-model="value1"
        type="month"
        placeholder="选择月度"
        value-format="yyyy年MM月"
        format="yyyy年MM月"
        v-if="value=='second'"
      ></el-date-picker>
      <!-- 周度 -->
      <el-button-group style="margin-bottom:1.4rem;margin-top:1.1rem;" v-if="value=='third'">
        <el-button
          type="info"
          plain
          icon="el-icon-arrow-left"
          :disabled="backabled"
          @click="back"
        >上一周</el-button>
        <el-button type="info" plain :disabled="nextabled" @click="next">
          下一周
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
      <el-button-group style="margin-bottom:1.4rem;margin-top:1.1rem;">
        <el-button type="primary" v-if="value!='third'" @click="findAll">统计</el-button>
        <el-button type="primary" @click="exportExcel" v-if="value!='third'">导出excel</el-button>
        <el-button type="primary" @click="exportWeekExcel" v-if="value=='third'">导出excel</el-button>
      </el-button-group>
      <el-switch
        style="display: block"
        v-model="sw"
        active-color="#13ce66"
        inactive-color="#1E90FF"
        active-text="部门报表"
        inactive-text="个人报表"
      ></el-switch>
      <div style="float:left;color:blue" v-if="value=='third'">{{zhou}}</div>
    </div>

    <!-- 个人 -->
    <el-table
      id="myform"
      :data="list1"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      highlight-current-row
      v-if="sw==false"
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
      <el-table-column label="周新增" align="center">
        <template slot-scope="scope">{{ scope.row.counts }}</template>
      </el-table-column>
      <el-table-column label="资产伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.asset }}</template>
      </el-table-column>
      <el-table-column label="资金伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.fund }}</template>
      </el-table-column>
      <el-table-column label="司法伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.justice }}</template>
      </el-table-column>
      <el-table-column label="政府伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.gov }}</template>
      </el-table-column>
      <el-table-column label="退出伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.exits }}</template>
      </el-table-column>
      <el-table-column label="同业伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.peer }}</template>
      </el-table-column>
    </el-table>
    <!-- 部门 -->
    <el-table
      id="myform"
      :data="list2"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%"
      highlight-current-row
      v-if="sw==true"
    >
      <el-table-column label="名次" align="center">
        <template slot-scope="scope">{{ scope.row.a }}</template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">{{ scope.row.depName }}</template>
      </el-table-column>
      <el-table-column label="周新增" align="center">
        <template slot-scope="scope">{{ scope.row.counts }}</template>
      </el-table-column>
      <el-table-column label="资产伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.asset }}</template>
      </el-table-column>
      <el-table-column label="资金伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.fund }}</template>
      </el-table-column>
      <el-table-column label="司法伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.justice }}</template>
      </el-table-column>
      <el-table-column label="政府伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.gov }}</template>
      </el-table-column>
      <el-table-column label="退出伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.exits }}</template>
      </el-table-column>
      <el-table-column label="同业伙伴" align="center">
        <template slot-scope="scope">{{ scope.row.peer }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//自定义季度选择器
import Quarter from "./Quarter";
import $ from "@/api/sysuser";

export default {
  data() {
    return {
      //下一周开关
      nextabled: true,
      //上一周开关
      backabled: false,
      //个人部门切换开关
      sw: true,
      listLoading: false,
      value: "third",
      value1: "",
      daytime: 0,
      zhou: "本周",
      //个人
      list1: [],
      //部门
      list2: [],
      //季度时间
      quarterTime: "",
      options: [
        { label: "季度统计", value: "first" },
        { label: "月度统计", value: "second" },
        { label: "周度统计", value: "third" }
      ]
    };
  },
  components: {
    Quarter
  },
  created() {
    this.fetchdata();
  },
  methods: {
    exportExcel() {
      if (this.value == "first" && this.sw == false) {
        if (this.quarterTime == "") {
          this.$message({
            type: "error",
            message: "请先选择季度"
          });
          return;
        }
        //季度+个人
        $.exportQuqrter({ times: this.quarterTime, name: "个人" }).then(
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
      } else if (this.value == "first" && this.sw == true) {
        if (this.quarterTime == "") {
          this.$message({
            type: "error",
            message: "请先选择季度"
          });
          return;
        }
        //季度+部门
        $.exportQuqrter({ times: this.quarterTime, name: "部门" }).then(
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
      } else if (this.value == "second" && this.sw == false) {
        if (this.value1 == "") {
          this.$message({
            type: "error",
            message: "请先选择月度"
          });
          return;
        }
        //月度+个人
        $.exportMouth({ times: this.value1, name: "个人" }).then(
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
      } else if (this.value == "second" && this.sw == true) {
        if (this.value1 == "") {
          this.$message({
            type: "error",
            message: "请先选择月度"
          });
          return;
        }
        //月度+部门
        $.exportMouth({ times: this.value1, name: "部门" }).then(
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
    },
    exportWeekExcel() {
      if (this.daytime == 0 && this.sw == false) {
        //本周+个人
        // console.log(this.daytime)
        $.exportWeek({ times: 0, name: "个人" }).then(
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
      } else if (this.daytime == 0 && this.sw == true) {
        //本周+部门
        $.exportWeek({ times: 0, name: "部门" }).then(
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
      } else if (this.daytime == 1 && this.sw == false) {
        //上周+个人
        $.exportWeek({ times: 1, name: "个人" }).then(
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
      } else if (this.daytime == 1 && this.sw == true) {
        //上周+部门
        $.exportWeek({ times: 1, name: "部门" }).then(
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
      } else if (this.daytime == 2 && this.sw == false) {
        //上2周+个人
        $.exportWeek({ times: 2, name: "个人" }).then(
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
      } else if (this.daytime == 2 && this.sw == true) {
        //上2周+部门
        $.exportWeek({ times: 2, name: "部门" }).then(
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
      } else if (this.daytime == 3 && this.sw == false) {
        //上3周+个人
        $.exportWeek({ times: 3, name: "个人" }).then(
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
      } else if (this.daytime == 3 && this.sw == true) {
        //上3周+部门
        $.exportWeek({ times: 3, name: "部门" }).then(
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
      } else if (this.daytime == 4 && this.sw == false) {
        //上4周+个人
        $.exportWeek({ times: 4, name: "个人" }).then(
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
      } else if (this.daytime == 4 && this.sw == true) {
        //上4周+部门
        $.exportWeek({ times: 4, name: "部门" }).then(
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
    },
    getData(data) {
      this.quarterTime = data;
      console.log()
    },
    fetchdata() {
      $.rankWeek({ times: 0, name: "部门" }).then(res => {
        this.list2 = res.data;
        for (var i = 1; i <= this.list2.length; i++) {
          this.$set(this.list2[i - 1], "a", i);
        }
      });
      $.rankWeek({ times: 0, name: "个人" }).then(res => {
        this.list1 = res.data;
        for (var i = 1; i <= this.list1.length; i++) {
          this.$set(this.list1[i - 1], "a", i);
        }
      });
    },
    findAll() {
      if (this.value == "first" ) {
        if (this.quarterTime == "") {
          this.$message({
            type: "error",
            message: "请先选择季度"
          });
          return;
        }
        //季度+个人
        this.list1 = null;
        $.rankQuqrter({ times: this.quarterTime, name: "个人" }).then(res => {
          this.list1 = res.data;
          for (var i = 1; i <= this.list1.length; i++) {
            this.$set(this.list1[i - 1], "a", i);
          }
        });
        //季度+部门
        this.list2 = null;
        $.rankQuqrter({ times: this.quarterTime, name: "部门" }).then(res => {
          this.list2 = res.data;
          for (var i = 1; i <= this.list2.length; i++) {
            this.$set(this.list2[i - 1], "a", i);
          }
        });
      } else if (this.value == "second") {
        if (this.value1 == "") {
          this.$message({
            type: "error",
            message: "请先选择月度"
          });
          return;
        }
        //月度+个人
        this.list1 = null;
        $.rankMouth({ times: this.value1, name: "个人" }).then(res => {
          this.list1 = res.data;
          for (var i = 1; i <= this.list1.length; i++) {
            this.$set(this.list1[i - 1], "a", i);
          }
        });
        //月度+部门
        this.list2 = null;
        $.rankMouth({ times: this.value1, name: "部门" }).then(res => {
          this.list2 = res.data;
          for (var i = 1; i <= this.list2.length; i++) {
            this.$set(this.list2[i - 1], "a", i);
          }
        });
      }
    },
    back() {
      this.daytime++;
      this.nextabled = false;
      if (this.daytime == 0) this.zhou = "本周";
      else if (this.daytime == 1) this.zhou = "前1周";
      else if (this.daytime == 2) this.zhou = "前2周";
      else if (this.daytime == 3) this.zhou = "前3周";
      else if (this.daytime == 4) this.zhou = "前4周";
      if (this.daytime == 4) {
        this.backabled = true;
      }
      //周度+个人
      this.list1 = null;
      $.rankWeek({ times: this.daytime, name: "个人" }).then(res => {
        this.list1 = res.data;
        for (var i = 1; i <= this.list1.length; i++) {
          this.$set(this.list1[i - 1], "a", i);
        }
      });
      //周度+部门
      this.list2 = null;
      $.rankWeek({ times: this.daytime, name: "部门" }).then(res => {
        this.list2 = res.data;
        for (var i = 1; i <= this.list2.length; i++) {
          this.$set(this.list2[i - 1], "a", i);
        }
      });
    },
    next() {
      this.daytime--;
      this.backabled = false;
      if (this.daytime == 0) this.zhou = "本周";
      else if (this.daytime == 1) this.zhou = "上周";
      else if (this.daytime == 2) this.zhou = "上2周";
      else if (this.daytime == 3) this.zhou = "上3周";
      else if (this.daytime == 4) this.zhou = "上4周";
      if (this.daytime == 0) {
        this.nextabled = true;
      }
      //月度+个人
      this.list1 = null;
      $.rankWeek({ times: this.daytime, name: "个人" }).then(res => {
        this.list1 = res.data;
        for (var i = 1; i <= this.list1.length; i++) {
          this.$set(this.list1[i - 1], "a", i);
        }
      });
      //月度+部门
      this.list2 = null;
      $.rankWeek({ times: this.daytime, name: "部门" }).then(res => {
        this.list2 = res.data;
        for (var i = 1; i <= this.list2.length; i++) {
          this.$set(this.list2[i - 1], "a", i);
        }
      });
    }
  }
};
</script>
<style  scoped>
.button {
  padding: 1rem;
  text-align: center;
}
</style>