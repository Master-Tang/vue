<template>
  <div class="my-padding">
    <el-button @click="$router.push('/bus/property/index')">退出</el-button>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="资产信息" name="first">
        <el-form ref="form" :model="form" label-width="7rem">
          <el-form-item>
            <span slot="label">
              地址
              <span class="red">*</span>
            </span>
            <el-cascader
              style="width:100%"
              placeholder="请搜索或选择地区"
              v-model="form.city"
              :options="provinceList"
              :props="{value:'regionId',label:'regionName',children:'children' }"
              filterable
            ></el-cascader>
            <el-input v-model="form.address" type="text" placeholder="请输入详细地址（包含楼盘信息）"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">地图</span>
            <el-input v-model="form.baiduMap" type="text" placeholder="请输入行业"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">所有权人</span>
            <el-input v-model="form.owner" type="text" placeholder="请输入所有权人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">资产类型</span>
            <el-select v-model="form.assetType" placeholder="请选择资产类型" style="width:100%">
              <el-option
                v-for="item in assetList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">需要核实信息</span>
            <el-input v-model="form.info" type="text" placeholder="请输入需要核实信息"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">备注</span>
            <el-input v-model="form.note" type="text" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addProperty" v-if="claimsNumber==''">保存</el-button>
            <el-button type="warning" @click="updateProperty" v-if="claimsNumber!=''">更改</el-button>
            <el-button @click="$router.push('/bus/property/index')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="房产信息" name="second" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toproperty()">添加</el-button>
          <el-button @click="$router.push('/bus/property/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list1"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="产证号" align="center">
            <template slot-scope="scope">{{ scope.row.houseProdu}}</template>
          </el-table-column>
          <el-table-column label="建筑类型" align="center">
            <template slot-scope="scope">{{ scope.row.buildType }}</template>
          </el-table-column>
          <el-table-column label="建造时间" align="center">
            <template slot-scope="scope">{{ scope.row.buildTime }}</template>
          </el-table-column>
          <el-table-column label="成新度" align="center">
            <template slot-scope="scope">{{ scope.row.newNess }}</template>
          </el-table-column>
          <el-table-column label="总层数" align="center">
            <template slot-scope="scope">{{ scope.row.layer }}</template>
          </el-table-column>
          <el-table-column label="所在层数" align="center">
            <template slot-scope="scope">{{ scope.row.inLayer }}</template>
          </el-table-column>
          <el-table-column label="建筑面积" align="center">
            <template slot-scope="scope">{{ scope.row.structArea }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="propertyEdit(scope.row.propertyId)">编辑</el-button>
              <el-button type="danger" size="small" @click="propertyDel(scope.row.propertyId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="土地信息" name="third" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toland">添加</el-button>
          <el-button @click="$router.push('/bus/property/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list2"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="产证号" align="center">
            <template slot-scope="scope">{{ scope.row.landProdu }}</template>
          </el-table-column>
          <el-table-column label="土地用途" align="center">
            <template slot-scope="scope">{{ scope.row.landUse}}</template>
          </el-table-column>
          <el-table-column label="土地性质" align="center">
            <template slot-scope="scope">{{ scope.row.landStat }}</template>
          </el-table-column>
          <el-table-column label="获得方式" align="center">
            <template slot-scope="scope">{{ scope.row.wayObt}}</template>
          </el-table-column>
          <el-table-column label="剩余使用年限" align="center">
            <template slot-scope="scope">{{scope.row.servLife }}</template>
          </el-table-column>
          <el-table-column label="面积" align="center">
            <template slot-scope="scope">{{ scope.row.area }}</template>
          </el-table-column>
          <el-table-column label="土地市场单价" align="center">
            <template slot-scope="scope">{{ scope.row.landPrice }}</template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="landEdit(scope.row.landId)">编辑</el-button>
              <el-button type="danger" size="small" @click="landDel(scope.row.landId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="其他资产信息" name="forth" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toother">添加</el-button>
          <el-button @click="$router.push('/bus/property/index')" style="float:right">退出</el-button>
        </div>
        <el-table
          id="myform"
          :data="list3"
          element-loading-text="Loading"
          border
          fit
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column label="序号" align="center" width="50rem">
            <template slot-scope="scope">{{ scope.row.a }}</template>
          </el-table-column>
          <el-table-column label="产证号" align="center">
            <template slot-scope="scope">{{ scope.row.otherProd }}</template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">{{ scope.row.otherType}}</template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">{{ scope.row.describe }}</template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">{{ scope.row.note }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="otherEdit(scope.row.otherId)">编辑</el-button>
              <el-button type="danger" size="small" @click="otherDel(scope.row.otherId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      judge: true,
      activeName: "",
      act: "first",
      acte: "first",
      list1: [],
      list2: [],
      list3: [],
      form: {
        city: [],
        address: "测试",
        owner: "",
        assetType: "",
        info: "",
        state: "",
        note: "",
        baiduMap: ""
      },
      claimsNumber: "",
      businessList: [],
      natureList: [],
      provinceList: [],
      claimList: [],
      instituList: [],
      assetList: []
    };
  },
  created() {
    // console.log(this.$route.path)
    if (this.$route.query.activeName == null) {
      this.activeName = "first";
    } else {
      this.activeName = this.$route.query.activeName;
    }
    $.addInit().then(res => {
      if (res.success) {
        this.businessList = res.data.businessList;
        this.natureList = res.data.natureList;
        this.provinceList = res.data.province;
        this.claimList = res.data.claimList;
        this.instituList = res.data.instituList;
        this.assetList = res.data.assetList;
      }
    });

    $.prorig({ number: this.$route.query.claimsNumber }).then(res => {
      if (res.success) {
        if (res.data != null) {
          this.form = res.data;
        }
      }
    });
    //房产信息
    $.propertyList({
      collateralId: this.$route.query.claimsNumber,
      busType: "01"
    }).then(res => {
      if (res.success) {
        // console.log(res.data)
        this.list1 = res.data;
        for (var i = 1; i <= this.list1.length; i++) {
          this.$set(this.list1[i - 1], "a", i);
        }
      }
    });
    //土地信息
    $.landList({
      collateralId: this.$route.query.claimsNumber,
      busType: "01"
    }).then(res => {
      if (res.success) {
        this.list2 = res.data;
        for (var i = 1; i <= this.list2.length; i++) {
          this.$set(this.list2[i - 1], "a", i);
        }
      }
    });
    //其他资产信息
    $.otherList({
      collateralId: this.$route.query.claimsNumber,
      busType: "01"
    }).then(res => {
      if (res.success) {
        this.list3 = res.data;
        for (var i = 1; i <= this.list3.length; i++) {
          this.$set(this.list3[i - 1], "a", i);
        }
      }
    });
  },

  methods: {
    addProperty() {
      if (!this.validate()) return;
      // console.log(this.form);
      $.prorigAdd(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            duration: 800,
            message: "资产信息已存在,请勿重复添加"
          });
        } else {
          this.claimsNumber = response.data;
          // console.log(response.data)
          this.judge = true;
          this.$message({
            duration: 800,
            type: "success",
            message: "添加成功"
          });
        }
      });
    },
    updateProperty() {
      if (!this.validate()) return;
      $.prorigUpdate(this.form).then(response => {
        this.$message({
          duration: 800,
          message: "基本信息已更改"
        });
      });
    },

    Toproperty() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "property",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "property",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    propertyEdit(id) {
      this.$router.push({
        path: "property",
        query: { id: this.$route.query.claimsNumber, propertyId: id }
      });
    },
    propertyDel(id) {
      this.$confirm("此操作将删除该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.propertyFake({ propertyId: id }).then(response => {
            this.$message({
              duration: 1000,
              type: "success",
              message: "删除成功!"
            });
            $.propertyList({
              claimsNumber: this.$route.query.claimsNumber
            }).then(res => {
              if (res.success) {
                this.list1 = res.data;
                for (var i = 1; i <= this.list1.length; i++) {
                  this.$set(this.list1[i - 1], "a", i);
                }
              }
            });
          });
        })
        .catch(() => {
          this.$message({
            duration: 800,
            type: "info",
            message: "已取消删除"
          });
        });
    },

    Toland() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "land",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "land",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    landEdit(id) {
      this.$router.push({
        path: "land",
        query: { id: this.$route.query.claimsNumber, landId: id }
      });
    },
    landDel(id) {
      this.$confirm("此操作将删除该合同, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.landFake({ landId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.landList({ claimsNumber: this.$route.query.claimsNumber }).then(
              res => {
                if (res.success) {
                  this.list2 = res.data;
                  for (var i = 1; i <= this.list2.length; i++) {
                    this.$set(this.list2[i - 1], "a", i);
                  }
                }
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 800,
            message: "已取消删除"
          });
        });
    },

    Toother() {
      if (this.$route.query.claimsNumber == null) {
        this.$router.push({
          path: "other",
          query: { id: this.claimsNumber }
        });
      } else {
        this.$router.push({
          path: "other",
          query: { id: this.$route.query.claimsNumber }
        });
      }
    },
    otherEdit(id) {
      this.$router.push({
        path: "other",
        query: { id: this.$route.query.claimsNumber, otherId: id }
      });
    },
    otherDel(id) {
      this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          $.otherFake({ otherId: id }).then(response => {
            this.$message({
              type: "success",
              duration: 800,
              message: "删除成功!"
            });
            $.otherList({ claimsNumber: this.$route.query.claimsNumber }).then(
              res => {
                if (res.success) {
                  this.list3 = res.data;
                  for (var i = 1; i <= this.list3.length; i++) {
                    this.$set(this.list3[i - 1], "a", i);
                  }
                }
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            duration: 800,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    validate() {
      let error = "";
      if (this.form.city.length == 0) {
        error = "地址必填\n";
      }

      if (error) {
        this.$message({
          duration: 800,
          message: error,
          type: "error"
        });
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>