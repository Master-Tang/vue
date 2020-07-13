<template>
  <el-tabs v-model="act" type="card" stretch>
    <el-tab-pane label="抵押物基本信息" name="first">
      <el-form ref="form" :model="form" label-width="5rem">
        <el-form-item>
          <span slot="label">
            关联抵押物合同
            <span class="red">*</span>
          </span>
          <el-select v-model="form.loanCont" multiple placeholder="请选择关联抵押物合同" style="width:100%">
            <el-option
              v-for="item in mapList"
              :key="item.collateralNumber"
              :label="item.collateralNumber"
              :value="item.collateralNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            抵（质）押合同编号
            <span class="red">*</span>
          </span>
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
          <span slot="label">担保的主债权发生期间</span>
          <el-date-picker
            v-model="form.prinBegin"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyy年MM月dd日"
            placeholder="请选择主权起始期限"
          ></el-date-picker>
          {{"~"}}
          <el-date-picker
            v-model="form.prinEnd"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyy年MM月dd日"
            placeholder="请选择主权终止期限"
          ></el-date-picker>
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
          <el-input v-model="form.address" type="text" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">地图链接</span>
          <el-input v-model="form.mapLink" type="text" placeholder="请输入地图链接"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">所在地</span>
          <el-input v-model="form.home" type="text" placeholder="请输入所在地"></el-input>
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
          <span slot="label">最高额抵押金额</span>
          <el-input v-model="form.maxMort" type="text" placeholder="请输入最高额抵押金额"></el-input>
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
          <span slot="label">前序抵押金额</span>
          <el-input v-model="form.orderMort" type="text" placeholder="请输入前序抵押金额"></el-input>
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
          <span slot="label">需核实信息</span>
          <el-input v-model="form.verifyInfo" type="text" placeholder="请输入需核实信息"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addcollateral">保存</el-button>
          <el-button type="warning" @click="updatecollateral">更改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="抵押物房产信息" name="second" align="center" v-if="judge">
      <div>
        <el-button type="text" @click="addTab3(editableTabsValue3)">添加</el-button>
      </div>
      <el-tabs v-model="editableTabsValue3" type="card" stretch>
        <el-tab-pane
          v-for="item in editableTabs3"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <Property :logo="form.collId"></Property>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="抵押物土地信息" name="third" align="center" v-if="judge">
      <div>
        <el-button type="text" @click="addTab4(editableTabsValue4)">添加</el-button>
      </div>
      <el-tabs v-model="editableTabsValue4" type="card" stretch>
        <el-tab-pane
          v-for="item in editableTabs4"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <Land :logo="form.collId"></Land>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="其他资产信息" name="forth" align="center" v-if="judge">
      <div>
        <el-button type="text" @click="addTab5(editableTabsValue5)">添加</el-button>
      </div>
      <el-tabs v-model="editableTabsValue5" type="card" stretch>
        <el-tab-pane
          v-for="item in editableTabs5"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          <Other :logo="form.collId"></Other>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import $ from "@/api/bus";
import property from "@/views/bus/claims/Property.vue";
import land from "@/views/bus/claims/Land.vue";
import other from "@/views/bus/claims/Other.vue";

export default {
  data() {
    return {
      judge: true,
      i: 0,
      c: 0,
      d: 0,
      e: 0,
      activeName: "first",
      act: "first",
      acte: "first",
      editableTabsValue3: "1",
      editableTabsValue4: "1",
      editableTabsValue5: "1",
      editableTabs3: [],
      editableTabs4: [],
      editableTabs5: [],
      tabIndex3: 1,
      tabIndex4: 1,
      tabIndex5: 1,
      form: {
        loanCont: [],
        city: [],
        courtSeizureCity: [],
        noContract: "",
        mortType: "",
        prinBegin: "",
        prinEnd: "",
        address: "",
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
        collId: "",
        claimsNumber: ""
      },
      mapList: [],
      coupleList: [],
      assetList: [],
      mortgageList: [],
      seizureList: [],
      provinceList: []
    };
  },
  props: ["logo"],
  created() {
    this.form.claimsNumber = this.logo;
    $.mapList({ claimsNumber: this.form.claimsNumber }).then(res => {
      if (res.success) {
        this.mapList = res.data.contractMap;
      }
    });
    $.addInit().then(res => {
      if (res.success) {
        this.provinceList = res.data.province;
        this.coupleList = res.data.coupleList;
        this.assetList = res.data.assetList;
        this.mortgageList = res.data.mortgageList;
        this.seizureList = res.data.seizureList;
      }
    });
  },
  components: {
    Property: property,
    Land: land,
    Other: other
  },

  methods: {
    addcollateral() {
      if (!this.validate()) return;
      $.addcollateral(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "基础信息已存在"
          });
        } else {
          this.form.collId = response.data;
          // console.log(response.data)
          this.judge = true;
          this.$message({
            message: "基础信息已添加"
          });
        }
      });
    },
    updatecollateral() {
      if (!this.validate()) return;
      $.updatecollateral(this.form).then(response => {
        if (response.data == "无此信息") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            message: "该合同已更改"
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.loanCont.length == 0) {
        error = "对应借款合同必选\n";
      } else if (this.form.noContract.length == 0) {
        error = "抵（质）押合同编号必填\n";
      } else if (this.form.city.length == 0) {
        error = "地址所在城市必选\n";
      } else if (this.form.address.length == 0) {
        error = "详细地址必填\n";
      } else if (this.form.assetType.length == 0) {
        error = "资产类型必选\n";
      }

      if (error) {
        this.$message({
          message: error,
          type: "error"
        });
        return false;
      }
      return true;
    },

    addTab3(targetName) {
      let newTabName = ++this.tabIndex3 + "";
      this.c++;
      this.editableTabs3.push({
        title: "房产信息" + this.c,
        name: newTabName
      });
      this.editableTabsValue3 = newTabName;
    },
    addTab4(targetName) {
      let newTabName = ++this.tabIndex4 + "";
      this.d++;
      this.editableTabs4.push({
        title: "土地信息" + this.d,
        name: newTabName
      });
      this.editableTabsValue4 = newTabName;
    },
    addTab5(targetName) {
      let newTabName = ++this.tabIndex5 + "";
      this.e++;
      this.editableTabs5.push({
        title: "其他资产" + this.e,
        name: newTabName
      });
      this.editableTabsValue5 = newTabName;
    }
  }
};
</script>

<style>
</style>