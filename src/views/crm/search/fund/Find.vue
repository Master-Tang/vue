<template>
  <div class="my-padding">
    <el-collapse accordion>
      <el-collapse-item title="伙伴基础信息" name="1">
        <el-form ref="form" :model="form" label-width="8rem">
          <el-form-item label="伙伴姓名:">{{form.name}}</el-form-item>
          <el-form-item label="性别:">{{form.sex}}</el-form-item>
          <el-form-item label="手机号:">{{form.telephone}}</el-form-item>
          <el-form-item label="微信号:">{{form.weixin}}</el-form-item>
          <el-form-item label="电子邮件:">{{form.email}}</el-form-item>
          <el-form-item label="单位名称:">{{form.company}}</el-form-item>
          <el-form-item label="联系地址:">{{form.address}}</el-form-item>
          <el-form-item label="工作部门:">{{form.department}}</el-form-item>
          <el-form-item label="工作岗位:">{{form.post}}</el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="伙伴来源:">
        <el-select v-model="form.source" placeholder style="width:100%" disabled>
          <el-option
            v-for="item in sourceList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="伙伴对应项目:">{{form.item}}</el-form-item>
      <el-form-item label="伙伴对应债权:">{{form.debt}}</el-form-item>

      <el-form-item label="机构类型:">
        <el-select v-model="form.orgType" placeholder style="width:100%" disabled>
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构:" v-if="form.orgType==='26'">
        <el-input v-model="form.orgRemark" disabled></el-input>
      </el-form-item>

      <div id="aaa" v-for="(item, index) in form.fundInfo.structList" :key="'travel'+index">
        <el-form-item label="资金类型:">
          <el-select v-model="item.currency" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in currencyList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资结构:">
          <el-select v-model="item.struct" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in structList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资比例:">{{item.min+"%~"+item.max+"%"}}</el-form-item>
        <el-form-item label="投资规模:">
          <el-row>
            <el-col :span="4">
              <el-select v-model="item.scaleMin" placeholder="请选择" style="width:100%" disabled>
                <el-option
                  v-for="item in abilityList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="1  ">
              <div align="center">{{" ~ "}}</div>
            </el-col>
            <el-col :span="4">
              <el-select v-model="item.scaleMax" placeholder="请选择" style="width:100%" disabled>
                <el-option
                  v-for="item in abilityList"
                  :key="item.dicValue"
                  :label="item.dicKey"
                  :value="item.dicValue"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="投资期限:">
          <el-select v-model="item.deadline" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in deadlineList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收益类型:">
          <el-select v-model="item.incomeType" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in incomeTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收益率:">{{item.incomeRate+"%"}}</el-form-item>
      </div>

      <el-form-item label="覆盖地区:">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.overArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
          disabled
        ></el-cascader>
      </el-form-item>

      <div id="aaa" v-for="(item,index) in form.fundInfo.fancyList" :key="index">
        <el-form-item label="资产类型:">
          <el-select v-model="item.typeId" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in assetsTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型其它:" v-if="item.typeId==='20'">
          <el-input v-model="item.typeName" disabled></el-input>
        </el-form-item>
      </div>

      <el-form-item label="其他要求:">{{form.fundInfo.otherMark}}</el-form-item>

      <el-form-item>
        <el-button @click="$router.push('index')">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  
<script>
import $ from "@/api/assets";

export default {
  data() {
    return {
      form: {
        partnerType: 2,
        name: "",
        sex: "",
        telephone: "",
        weixin: "",
        email: "",
        company: "",
        department: "",
        post: "",
        source: "",
        item: "",
        orgType: "",
        orgRemark: "",
        debt: "",
        address: "",
        overArea: [],
        fundInfo: {
          structList: [],
          fancyList: [],
          otherMark: ""
        }
      },
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      exitTypeList: [],
      usageList: [],
      abilityList: [],
      assetsTypeList: [],
      incomeTypeList: [],
      currencyList: [],
      structList: [],
      deadlineList: [],
      sexList: [
        { label: "男", value: "男" },
        { label: "女", value: "女" }
      ]
    };
  },
  created() {
    $.findInit({ partnerId: this.$route.query.id }).then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
        this.exitTypeList = res.data.exitTypeList;
        this.usageList = res.data.usageList;
        this.abilityList = res.data.abilityList;
        this.assetsTypeList = res.data.assetsTypeList;
        this.incomeTypeList = res.data.incomeTypeList;
        this.currencyList = res.data.currencyList;
        this.structList = res.data.structList;
        this.deadlineList = res.data.deadlineList;
        let partner = res.data.partner;
        // console.log(partner);
        this.form = partner;
      }
    });
  },
  methods: {
    addItem1() {
      this.form.fundInfo.structList.push({
        currency: "",
        struct: "",
        min: "",
        max: "",
        scaleMin: "",
        scaleMax: "",
        deadline: "",
        incomeType: "",
        incomeRate: ""
      });
    },
    deleteItem1(item, index) {
      this.form.fundInfo.structList.splice(index, 1);
    },
    addItem() {
      this.form.fundInfo.fancyList.push({
        typeId: "",
        typeName: ""
      });
    },
    deleteItem(item, index) {
      this.form.fundInfo.fancyList.splice(index, 1);
    },

    validate() {
      let error = "";
      if (this.form.name.length <= 1) {
        error = "姓名至少两位\n";
      } else if (!/^1\d{10}$/.test(this.form.telephone)) {
        error = "手机号码不正确\n";
      } else if (this.form.weixin.length == 0) {
        error = "微信不能为空\n";
      } else if (this.form.overArea.length == 0) {
        error = "请选择区域\n";
      }

      if (error) {
        this.$message({
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