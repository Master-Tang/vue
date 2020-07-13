<template>
  <div>
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="借款基本信息" name="first">
        <el-form ref="form" :model="form" label-width="5rem">
          <el-form-item>
            <span slot="label">
              借款人名称
              <span class="red">*</span>
            </span>
            <el-input v-model="form.borrowers" type="text" placeholder="请输入借款人名称"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              所在地
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
            <el-input v-model="form.address" type="text" placeholder="请输入具体地址"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">行业</span>
            <el-input v-model="form.industry" type="text" placeholder="请输入行业"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">经营情况</span>
            <el-select v-model="form.situation" placeholder="请选择经营情况" style="width:100%">
              <el-option
                v-for="item in businessList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">企业性质</span>
            <el-select v-model="form.properties" placeholder="请选择企业性质" style="width:100%">
              <el-option
                v-for="item in natureList"
                :key="item.dicValue"
                :label="item.dicKey"
                :value="item.dicValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">联系方式</span>
            <el-input v-model="form.telephone" type="text" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              债权所在机构
              <span class="red">*</span>
            </span>
            <el-input v-model="form.institutions" type="text" placeholder="请输入债权所在机构"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              联系人
              <span class="red">*</span>
            </span>
            <el-input v-model="form.contact" type="text" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">
              原始债权人
              <span class="red">*</span>
            </span>
            <el-input v-model="form.origCreditors" type="text" placeholder="请输入原始债权人"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">基准日</span>
            <el-date-picker
              v-model="form.baseDay"
              type="date"
              format="yyyy年MM月dd日"
              value-format="yyyy年MM月dd日"
              placeholder="请选择基准日"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addclaims">保存</el-button>
            <el-button @click="$router.push('index')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="借款人合同" name="second" align="center" v-if="judge" >
        <div style="align:center">
          <el-button type="text" @click="addTab()">添加</el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" stretch>
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Borrowing :logo="claimsNumber"></Borrowing>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="抵押物合同" name="sixth" align="center" v-if="judge" >
        <div style="align:center">
          <el-button type="text" @click="addTab4()">添加</el-button>
        </div>
        <el-tabs v-model="editableTabsValue4" type="card" stretch>
          <el-tab-pane
            v-for="item in editableTabs4"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Collcontract :logo="claimsNumber"></Collcontract>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="保证人合同" name="third" align="center" v-if="judge">
        <div style="align:center">
          <el-button type="text" @click="addTab1()">添加</el-button>
        </div>
        <el-tabs v-model="editableTabsValue1" type="card"  stretch>
          <el-tab-pane
            v-for="item in editableTabs1"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Guarantee :logo="claimsNumber"></Guarantee>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="抵押物信息" name="forth" align="center" v-if="judge">
        <div>
          <el-button type="text" @click="addTab3()">添加</el-button>
        </div>
        <el-tabs v-model="editableTabsValue3" type="card"  stretch>
          <el-tab-pane
            v-for="item in editableTabs3"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Collateral :logo="claimsNumber"></Collateral>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="亮点信息" name="fifth" align="center" v-if="judge">
        <div>
          <el-button type="text" @click="addTab2(editableTabsValue2)">添加</el-button>
        </div>
        <el-tabs v-model="editableTabsValue2" type="card" stretch>
          <el-tab-pane
            v-for="item in editableTabs2"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <Light :logo="claimsNumber"></Light>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import $ from "@/api/bus";
import borrowing from "@/views/bus/claims/Borrowing.vue";
import guarantee from "@/views/bus/claims/Guarantee.vue";
import light from "@/views/bus/claims/Light.vue";
import collateral from "@/views/bus/claims/Collateral.vue"
import collcontract from "@/views/bus/claims/Collcontract.vue"


export default {
  data() {
    return {
      judge:true,
      i: 0,
      a:0,
      b:0,
      c:0,
      e:0,
      activeName: "first",
      act: "first",
      acte: "first",
      form1: {},
      editableTabsValue: "1",
      editableTabsValue1: "1",
      editableTabsValue2: "1",
      editableTabsValue3: "1",
      editableTabsValue4: "1",
      editableTabs: [],
      editableTabs1: [],
      editableTabs2: [],
      editableTabs3: [],
      editableTabs4: [],
      tabIndex: 1,
      tabIndex1: 1,
      tabIndex2: 1,
      tabIndex3: 1,
      tabIndex4: 1,
      form: {
        borrowers: "测试",
        city: [],
        address: "测试",
        industry: "",
        situation: "",
        properties: "",
        telephone: "",
        institutions: "测试",
        contact: "测试",
        origCreditors: "测试",
        baseDay: "",
      },
      claimsNumber:"",
      businessList: [],
      natureList: [],
      provinceList: []
    };
  },
  created() {
    $.addInit().then(res => {
      if (res.success) {
        this.businessList = res.data.businessList;
        this.natureList = res.data.natureList;
        this.provinceList = res.data.province;
      }
    });
  },
  components: {
    Borrowing: borrowing,
    Guarantee: guarantee,
    Light: light,
    Collateral:collateral,
    Collcontract:collcontract,
  },
  methods: {
    addclaims() {
      if (!this.validate()) return;
      $.addclaims(this.form).then(response => {
        if (response.data=="已存在") {
          this.$message({
              message: "基础信息已存在"
            });
        }else{
          this.claimsNumber=response.data
          // console.log(response.data)
          this.judge=true
          this.$message({
              message: "基础信息已添加"
            });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.borrowers.length == 0) {
        error = "借款人名称必填\n";
      } else if (this.form.city.length == 0) {
        error = "地区必选\n";
      } else if (this.form.address.length == 0) {
        error = "地址必填\n";
      } else if (this.form.institutions.length == 0) {
        error = "债权所在机构必填\n";
      } else if (this.form.contact.length == 0) {
        error = "联系人必填\n";
      } else if (this.form.origCreditors.length == 0) {
        error = "原始债权人必填\n";
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

    addTab() {
      let newTabName = ++this.tabIndex + "";
      this.i++;
      this.editableTabs.push({
        title: "借款合同" + this.i,
        name: newTabName
      });
      this.editableTabsValue = newTabName;
    },
    addTab1() {
      let newTabName = ++this.tabIndex1 + "";
      this.a++;
      this.editableTabs1.push({
        title: "合同" + this.a,
        name: newTabName
      });
      this.editableTabsValue1 = newTabName;
    },
    addTab2() {
      let newTabName = ++this.tabIndex2 + "";
      this.b++;
      this.editableTabs2.push({
        title: "合同" + this.b,
        name: newTabName
      });
      this.editableTabsValue2 = newTabName;
    },
    addTab3() {
      let newTabName = ++this.tabIndex3 + "";
      this.c++;
      this.editableTabs3.push({
        title: "抵押物" + this.c,
        name: newTabName
      });
      this.editableTabsValue3 = newTabName;
    },
    addTab4() {
      let newTabName = ++this.tabIndex4 + "";
      this.e++;
      this.editableTabs4.push({
        title: "抵押物合同" + this.e,
        name: newTabName
      });
      this.editableTabsValue4 = newTabName;
    },
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