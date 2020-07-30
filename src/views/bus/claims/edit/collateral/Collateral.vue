<template>
  <div class="my-padding">
    <el-tabs v-model="act" stretch>
      <el-tab-pane label="抵质押物基本信息" name="first">
        <el-form ref="form" :model="form" label-width="10.5rem">
          <el-form-item>
            <span slot="label">关联抵（质）押物合同</span>
            <el-select v-model="form.loanCont" placeholder="请选择关联抵押物合同" style="width:100%">
              <el-option
                v-for="item in mapList"
                :key="item.collateralNumber"
                :label="item.collateralNumber"
                :value="item.collateralNumber"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">抵（质）押物编号</span>
            <el-input v-model="form.noContract" type="text" placeholder="请输入债权编号"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">抵质押类型</span>
            <el-select v-model="form.mortType" placeholder="请选择抵质押类型" style="width:100%">
              <el-option
                v-for="item in coupleList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              地址（包含楼盘信息）
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
            <el-input v-model="form.cityAddress" type="text" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">地图链接</span>
            <el-input v-model="form.mapLink" type="text" placeholder="请输入地图链接"></el-input>
            <el-button @click="openDialog">地图</el-button>
          </el-form-item>
          <el-form-item>
            <span slot="label">所有权人</span>
            <el-input v-model="form.owner" type="text" placeholder="请输入所有权人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              资产类型
              <span class="red">*</span>
            </span>
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
            <span slot="label">最高额抵押金额(元)</span>
            <el-input
              v-model="form.maxMort"
              type="text"
              placeholder="请输入最高额抵押金额"
              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">抵押顺位</span>
            <el-select v-model="form.seqMort" placeholder="请选择抵押顺位" style="width:100%">
              <el-option
                v-for="item in mortgageList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">前序抵押金额(元)</span>
            <el-input
              v-model="form.orderMort"
              type="text"
              placeholder="请输入前序抵押金额"
              oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">查封顺位</span>
            <el-select v-model="form.sequenceSei" placeholder="请选择查封顺位" style="width:100%">
              <el-option
                v-for="item in seizureList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">查封法院</span>
            <el-cascader
              style="width:100%"
              placeholder="请搜索或选择地区"
              v-model="form.courtSeizureCity"
              :options="provinceList"
              :props="{value:'regionId',label:'regionName',children:'children' }"
              filterable
            ></el-cascader>
            <el-input v-model="form.courtSei" type="text" placeholder="请输入查封法院"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">备注</span>
            <el-input v-model="form.verifyInfo" type="text" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addcollateral" v-if="form.collId==null">保存</el-button>
            <el-button type="warning" @click="updatecollateral" v-if="form.collId!=null">更改</el-button>
            <el-button @click="cencelcollateral">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="抵押物房产信息" name="second" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toproperty">添加</el-button>
          <el-button @click="back" style="float:right">返回抵押物信息</el-button>
        </div>
        <el-table
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
            <template slot-scope="scope">{{ scope.row.houseProdu }}</template>
          </el-table-column>
          <el-table-column label="建筑类型" align="center">
            <template slot-scope="scope">{{ scope.row.buildType}}</template>
          </el-table-column>
          <el-table-column label="建造时间" align="center">
            <template slot-scope="scope">{{ scope.row.buildTime }}</template>
          </el-table-column>
          <el-table-column label="首层层高（工业资产）" align="center">
            <template slot-scope="scope">{{ scope.row.fishHigh +"米"}}</template>
          </el-table-column>
          <el-table-column label="总层数" align="center">
            <template slot-scope="scope">{{ scope.row.layer }}</template>
          </el-table-column>
          <el-table-column label="所在层数" align="center">
            <template slot-scope="scope">{{ scope.row.inLayer }}</template>
          </el-table-column>
          <el-table-column label="建筑面积" align="center">
            <template slot-scope="scope">{{ scope.row.structArea +"m²"}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150rem">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="propertyEdit(scope.row.propertyId)">编辑</el-button>
              <el-button type="danger" size="small" @click="propertyDel(scope.row.propertyId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="抵押物土地信息" name="third" v-if="judge">
        <div style="padding-bottom:1rem">
          <el-button type="primary" @click="Toland">添加</el-button>
          <el-button @click="back" style="float:right">返回抵押物信息</el-button>
        </div>
        <el-table
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
            <template slot-scope="scope">{{ scope.row.wayObt }}</template>
          </el-table-column>
          <el-table-column label="剩余使用年限" align="center">
            <template slot-scope="scope">{{ scope.row.servLife +"年"}}</template>
          </el-table-column>
          <el-table-column label="面积" align="center">
            <template slot-scope="scope">{{ scope.row.area +"m²"}}</template>
          </el-table-column>
          <el-table-column label="土地市场单价(元)" align="center">
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
          <el-button @click="back" style="float:right">返回抵押物信息</el-button>
        </div>
        <el-table
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
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">{{ scope.row.number }}</template>
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
      <el-drawer title="地图" align="center" :visible.sync="dialogstate" size="50%">
        <div class="app-container">
          <el-autocomplete
            v-model="form.mapLocation.address"
            :fetch-suggestions="querySearch"
            placeholder="请输入详细地址"
            style="width: 100%"
            :trigger-on-focus="false"
            @select="handleSelect"
          />
          <div style="margin: 1rem">
            <baidu-map class="bm-view" :center="mapCenter" :zoom="mapZoom" :scroll-wheel-zoom="true" ak="baidu-ak"
                       @ready="handlerBMap"/>
          </div>
        </div>
      </el-drawer>

    </el-tabs>
  </div>
</template>

<script>
  import $ from "@/api/bus";
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'

  export default {
    components: {
      BaiduMap
    },
    data() {
      return {
        mapZoom: 15,
        mapCenter: {lng: 0, lat: 0},
        dialogstate: false,
        judge: true,
        activeName: "first",
        act: "first",
        acte: "first",
        list1: [],
        list2: [],
        list3: [],
        form: {
          loanCont: "",
          city: [],
          courtSeizureCity: [],
          noContract: "",
          mortType: "",
          prinBegin: "",
          prinEnd: "",
          cityAddress: "",
          mapLink: "",
          home: "",
          owner: "",
          assetType: "",
          maxMort: "",
          seqMort: "",
          orderMort: "",
          sequenceSei: "",
          courtSei: "",
          verifyInfo: "",
          mapLocation: {
            address: "江苏省无锡市滨湖区家乐福",
            coordinate: {
              lat:31.555396,
              lng:120.267897
            }
          },
          collId: "",
          claimsNumber: "",
        },
        mapList: [],
        coupleList: [],
        assetList: [],
        mortgageList: [],
        seizureList: [],
        provinceList: [],
      };
    },

    created() {
      this.form.claimsNumber = this.$route.query.id;
      this.form.collId = this.$route.query.collId;
      if (this.$route.query.activeName == null) {
        this.act = "first";
      } else {
        this.act = this.$route.query.activeName;
      }
      $.mapList({claimsNumber: this.form.claimsNumber}).then((res) => {
        if (res.success) {
          this.mapList = res.data.contractMap;
        }
      });
      $.addInit().then((res) => {
        if (res.success) {
          this.provinceList = res.data.province;
          this.coupleList = res.data.coupleList;
          this.assetList = res.data.assetList;
          this.mortgageList = res.data.mortgageList;
          this.seizureList = res.data.seizureList;
        }
      });
      $.collateral({collId: this.$route.query.collId}).then((res) => {
        if (res.success) {
          if (res.data != null) {
            // console.log(res.data)
            this.form = res.data;
          }
        }
      });
      //房产
      $.propertyList({
        collateralId: this.$route.query.collId,
        busType: "01",
      }).then((res) => {
        if (res.success) {
          this.list1 = res.data;
          // console.log(this.list1)
          for (var i = 1; i <= this.list1.length; i++) {
            this.$set(this.list1[i - 1], "a", i);
          }
        }
      });
      //土地
      $.landList({collateralId: this.$route.query.collId, busType: "01"}).then(
        (res) => {
          if (res.success) {
            this.list2 = res.data;
            // console.log(this.list3)
            for (var i = 1; i <= this.list2.length; i++) {
              this.$set(this.list2[i - 1], "a", i);
            }
          }
        }
      );
      //其他
      $.otherList({collateralId: this.$route.query.collId, busType: "01"}).then(
        (res) => {
          if (res.success) {
            this.list3 = res.data;
            // console.log(this.list1)
            for (var i = 1; i <= this.list3.length; i++) {
              this.$set(this.list3[i - 1], "a", i);
            }
          }
        }
      );
    },

    methods: {
      handlerBMap({BMap, map}) {
        this.BMap = BMap
        this.map = map
        if (this.form.mapLocation.coordinate && this.form.mapLocation.coordinate.lng) {
          this.mapCenter.lng = this.form.mapLocation.coordinate.lng
          this.mapCenter.lat = this.form.mapLocation.coordinate.lat
          this.mapZoom = 15
          map.addOverlay(new this.BMap.Marker(this.form.mapLocation.coordinate))
        }
        // else {
        //   this.mapCenter.lng = 120.267897
        //   this.mapCenter.lat = 31.555396
        //   this.mapZoom = 20
        // }
      },
      querySearch(queryString, cb) {
        var that = this
        var myGeo = new this.BMap.Geocoder()
        myGeo.getPoint(queryString, function (point) {
          if (point) {
            that.form.mapLocation.coordinate = point
            that.makerCenter(point)
          } else {
            that.form.mapLocation.coordinate = null
          }
        }, this.locationCity)
        var options = {
          onSearchComplete: function (results) {
            if (local.getStatus() === 0) {
              // 判断状态是否正确
              var s = []
              for (var i = 0; i < results.getCurrentNumPois(); i++) {
                var x = results.getPoi(i)
                var item = {value: x.address + x.title, point: x.point}
                s.push(item)
                cb(s)
                console.log(item)
              }
            } else {
              cb()
            }
          }
        }
        var local = new this.BMap.LocalSearch(this.map, options)
        local.search(queryString)
      },
      handleSelect(item) {
        var {point} = item
        console.log(point)
        this.form.mapLocation.coordinate = point
        this.makerCenter(point)
      },
      makerCenter(point) {
        if (this.map) {
          this.map.clearOverlays()
          this.map.addOverlay(new this.BMap.Marker(point))
          this.mapCenter.lng = point.lng
          this.mapCenter.lat = point.lat
          this.mapZoom = 15
        }
      },
      openDialog() {
        this.dialogstate = true;
      },
      back() {
        this.$router.push({
          path: "/bus/claims/add/index",
          query: {activeName: "forth", claimsNumber: this.form.claimsNumber},
        });
      },
      addcollateral() {
        if (!this.validate()) return;
        $.addcollateral(this.form).then((response) => {
          if (response.data == "已存在") {
            this.$message({
              type: "error",
              message: "该信息已存在,请勿重复添加",
            });
          } else {
            this.form.collId = response.data;
            // console.log(response.data)
            this.judge = true;
            this.$message({
              type: "success",
              message: "添加成功",
            });
          }
        });
      },
      cencelcollateral() {
        this.$router.push({
          path: "/bus/claims/add/index",
          query: {activeName: "forth", claimsNumber: this.form.claimsNumber},
        });
      },
      updatecollateral() {
        if (!this.validate()) return;
        $.updatecollateral(this.form).then((response) => {
          if (response.data == "无此信息") {
            this.$message({
              type: "error",
              message: "请先保存",
            });
          } else {
            this.$message({
              type: "success",
              message: "更改成功",
            });
          }
        });
      },
      validate() {
        let error = "";
        if (this.form.city.length == 0) {
          error = "地址所在城市必选\n";
        } else if (this.form.assetType.length == 0) {
          error = "资产类型必选\n";
        }

        if (error) {
          this.$message({
            message: error,
            type: "error",
          });
          return false;
        }
        return true;
      },
      Toproperty() {
        if (this.$route.query.collId == null) {
          this.$router.push({
            path: "property",
            query: {collId: this.form.collId, id: this.form.claimsNumber},
          });
        } else {
          this.$router.push({
            path: "property",
            query: {collId: this.$route.query.collId, id: this.$route.query.id},
          });
        }
      },
      propertyEdit(id) {
        this.$router.push({
          path: "property",
          query: {
            collId: this.$route.query.collId,
            propertyId: id,
            id: this.$route.query.id,
          },
        });
      },
      propertyDel(id) {
        this.$confirm("此操作将删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // console.log(id);
            $.propertyFake({propertyId: id}).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              $.propertyList({
                collateralId: this.$route.query.collId,
                busType: "01",
              }).then((res) => {
                if (res.success) {
                  this.list1 = res.data;
                  // console.log(this.list1)
                  for (var i = 1; i <= this.list1.length; i++) {
                    this.$set(this.list1[i - 1], "a", i);
                  }
                }
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },

      Toland() {
        if (this.$route.query.collId == null) {
          this.$router.push({
            path: "land",
            query: {collId: this.form.collId, id: this.form.claimsNumber},
          });
        } else {
          this.$router.push({
            path: "land",
            query: {collId: this.$route.query.collId, id: this.$route.query.id},
          });
        }
      },
      landEdit(id) {
        this.$router.push({
          path: "land",
          query: {
            collId: this.$route.query.collId,
            landId: id,
            id: this.$route.query.id,
          },
        });
      },
      landDel(id) {
        this.$confirm("此操作将删除该伙伴, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // console.log(id);
            $.landFake({landId: id}).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              $.landList({
                collateralId: this.$route.query.collId,
                busType: "01",
              }).then((res) => {
                if (res.success) {
                  this.list2 = res.data;
                  // console.log(this.list3)
                  for (var i = 1; i <= this.list2.length; i++) {
                    this.$set(this.list2[i - 1], "a", i);
                  }
                }
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },

      Toother() {
        if (this.$route.query.collId == null) {
          this.$router.push({
            path: "other",
            query: {collId: this.form.collId, id: this.form.claimsNumber},
          });
        } else {
          this.$router.push({
            path: "other",
            query: {collId: this.$route.query.collId, id: this.$route.query.id},
          });
        }
      },
      otherEdit(id) {
        this.$router.push({
          path: "other",
          query: {
            collId: this.$route.query.collId,
            otherId: id,
            id: this.$route.query.id,
          },
        });
      },
      otherDel(id) {
        this.$confirm("此操作将删除该信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // console.log(id);
            $.otherFake({otherId: id}).then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              $.otherList({
                collateralId: this.$route.query.collId,
                busType: "01",
              }).then((res) => {
                if (res.success) {
                  this.list3 = res.data;
                  // console.log(this.list1)
                  for (var i = 1; i <= this.list3.length; i++) {
                    this.$set(this.list3[i - 1], "a", i);
                  }
                }
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
    },
  };
</script>

<style>
  .red {
    color: red;
    font-size: 1.5rem;
    vertical-align: middle;
  }

  .bm-view {
    width: 100%;
    height: 30rem;
  }
</style>
