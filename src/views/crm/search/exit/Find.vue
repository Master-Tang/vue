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

      <el-form-item label="退出类型:">
        <el-select v-model="form.orgType" placeholder style="width:100%" disabled>
          <el-option
            v-for="item in exitTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用途偏好">
        <el-select v-model="form.exitInfo.usage" multiple placeholder style="width:100%" disabled="">
          <el-option
            v-for="item in usageList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="投资规模:">
        <el-select v-model="form.exitInfo.abilityMin" placeholder  disabled>
          <el-option
            v-for="item in abilityList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
        {{"~"}}
        <el-select v-model="form.exitInfo.abilityMax" placeholder  disabled>
          <el-option
            v-for="item in abilityList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="覆盖地区:">
        <el-cascader
          style="width:100%"
          placeholder
          v-model="form.overArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
          disabled
        ></el-cascader>
      </el-form-item>

      <div id="aaa" v-for="(item, index) in form.exitInfo.fancyList" :key="index">
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
        partnerType: 3,
        name: "",
        sex: "",
        telephone: "",
        weixin: "",
        email: "",
        company: "",
        department: "",
        post: "",
        orgType: "",
        source: "",
        item: "",
        debt: "",
        address: "",
        overArea: [],
        exitInfo: {
          usage: [],
          ability: "",
          fancyList: []
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
        let partner = res.data.partner;
        this.form = partner;
        // console.log(this.form)
      }
    });
  },
  methods: {
    addItem() {
      this.form.exitInfo.fancyList.push({
        typeId: "",
        typeName: ""
      });
    },
    deleteItem(item, index) {
      this.form.exitInfo.fancyList.splice(index, 1);
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