<template>
  <div class="my-padding">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item>
        <span slot="label">
          伙伴姓名
          <span class="red">*</span>
        </span>
        <el-input
          v-model="form.name"
          type="text"
          onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
          onchange="value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          手机号
          <span class="red">*</span>
        </span>
        <el-input
          v-model="form.telephone"
          onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <span slot="label">
          微信号
          <span class="red">*</span>
        </span>
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="工作部门">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="工作岗位">
        <el-input v-model="form.post"></el-input>
      </el-form-item>
      <el-form-item label="伙伴来源">
        <el-select v-model="form.source" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in sourceList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="伙伴对应项目">
        <el-input v-model="form.item"></el-input>
      </el-form-item>
      <el-form-item label="伙伴对应债权">
        <el-input v-model="form.debt"></el-input>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-select v-model="form.orgType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构" v-if="form.orgType==='26'">
        <el-input v-model="form.orgRemark"></el-input>
      </el-form-item>

      <div id="aaa" v-for="(item, index) in form.fundInfo.structList" :key="'travel'+index">
        <el-form-item label="资金类型">
          <el-select v-model="item.currency" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in currencyList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资结构">
          <el-select v-model="item.struct" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in structList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资比例">
          <el-input v-model="item.min"></el-input>
          <el-input v-model="item.max"></el-input>
        </el-form-item>
        <el-form-item label="投资规模">
          <el-select v-model="item.scale" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in abilityList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资期限">
          <el-select v-model="item.deadline" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in deadlineList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收益类型">
          <el-select v-model="item.incomeType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in incomeTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收益率">
          <el-input v-model="item.incomeRate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem1(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="投资结构偏好和收益要求">
        <el-button @click="addItem1()" type>投资结构偏好和收益要求</el-button>
      </el-form-item>

      <el-form-item label="覆盖地区">
        <span slot="label">
          覆盖地区
          <span class="red">*</span>
        </span>
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.overArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>

      <div id="aaa" v-for="(item,index) in form.fundInfo.fancyList" :key="index">
        <el-form-item label="资产类型">
          <el-select v-model="item.typeId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in assetsTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型其它" v-if="item.typeId==='20'">
          <el-input v-model="item.typeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="资产偏好">
        <el-button @click="addItem()" type>资产偏好</el-button>
      </el-form-item>

      <el-form-item label="其他要求">
        <el-input v-model="form.fundInfo.otherMark"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateData()">保存</el-button>
        <el-button @click="$router.push('index')">取消</el-button>
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
    $.editInit({ partnerId: this.$route.query.id }).then(res => {
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
        scale: "",
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

    updateData() {
      if (!this.validate()) return;
      $.update(this.form).then(response => {
        if (response.success) {
          this.$router.replace("index");
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.name.length <= 1) {
        error = "姓名至少两位\n";
      } else if (this.form.telephone.length != 11) {
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