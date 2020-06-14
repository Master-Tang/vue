<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="伙伴姓名:">{{form.name}}</el-form-item>
      <el-form-item label="性别:">{{form.sex}}</el-form-item>
      <el-form-item label="手机号:">{{form.telephone}}</el-form-item>
      <el-form-item label="微信号:">{{form.weixin}}</el-form-item>
      <el-form-item label="电子邮件:">{{form.email}}</el-form-item>
      <el-form-item label="机构名称:">{{form.company}}</el-form-item>
      <el-form-item label="联系地址:">{{form.address}}</el-form-item>
      <el-form-item label="岗位职务:">{{form.post}}</el-form-item>
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
      <el-form-item label="伙伴备注:">{{form.partnerRemark}}</el-form-item>
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
      <el-form-item label="管辖区域:">
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

      <div id="aaa" v-for="(item, index) in form.justiceInfo.resumeList" :key="index">
        <el-form-item label="机构类型:">
          <el-select v-model="item.resumeType" placeholder style="width:100%" disabled>
            <el-option
              v-for="item in orgTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他机构:" v-if="item.resumeType==='26'">
          <el-input v-model="item.resumeRemark" disabled></el-input>
        </el-form-item>
        <el-form-item label="机构名称:">{{item.resumeOrg}}</el-form-item>
        <el-form-item label="管辖区域:">
          <el-cascader
            style="width:100%"
            placeholder
            v-model="item.resumeOver"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
            filterable
            disabled
          ></el-cascader>
        </el-form-item>
        <el-form-item label="岗位职务:">{{item.resumePos}}</el-form-item>
      </div>

      <el-form-item label="关系人姓名:">{{form.justiceInfo.name}}</el-form-item>
      <el-form-item label="关系人联系方式:">{{form.justiceInfo.telephone}}</el-form-item>
      <el-form-item label="与其关系:">
        <el-select v-model="form.justiceInfo.relative" placeholder style="width:100%" disabled>
          <el-option
            v-for="item in relativeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关系备注:">{{form.justiceInfo.relativeRemark}}</el-form-item>
      <el-form-item label="关系人机构类型:">
        <el-select v-model="form.justiceInfo.orgType" placeholder style="width:100%" disabled>
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关系人机构类型备注:" v-if="form.justiceInfo.orgType==='26'">
        <el-input v-model="form.justiceInfo.orgRemark" disabled></el-input>
      </el-form-item>
      <el-form-item label="关系人所在机构名称:">{{form.justiceInfo.orgName}}</el-form-item>
      <el-form-item label="关系人管辖区域:">
        <el-cascader
          style="width:100%"
          placeholder
          v-model="form.justiceInfo.area"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
          disabled
        ></el-cascader>
      </el-form-item>
      <el-form-item label="关系人岗位职务:">{{form.justiceInfo.pos}}</el-form-item>

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
        partnerType: 4,
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
        debt: "",
        orgType: "",
        orgRemark: "",
        address: "",
        partnerRemark: "",
        assetAttr: "",
        overArea: [],
        justiceInfo: {
          name: "",
          telephone: "",
          relative: "",
          relativeRemark: "",
          orgType: "",
          orgRemark: "",
          orgName: "",
          area: [],
          pos: "",
          resumeList: []
        }
      },
      assetAttrList: [],
      provinceList: [],
      orgTypeList: [],
      relativeList: [],
      sourceList: [],
      sexList: [
        { label: "男", value: "男" },
        { label: "女", value: "女" }
      ]
    };
  },
  created() {
    $.findInit({ partnerId: this.$route.query.id }).then(res => {
      if (res.success) {
        // console.log(res.data)
        this.sourceList = res.data.source;
        this.assetAttrList = res.data.source;
        this.provinceList = res.data.province;
        this.orgTypeList = res.data.orgTypeList;
        this.relativeList = res.data.relativeList;
        let partner = res.data.partner;
        this.form = partner;
        // console.log(this.provinceList);
      }
    });
  },
  methods: {
    addItem() {
      this.form.justiceInfo.resumeList.push({
        resumeType: "",
        resumeRemark: "",
        resumeOrg: "",
        resumeOver: [],
        resumePos: ""
      });
    },
    deleteItem(item, index) {
      this.form.justiceInfo.resumeList.splice(index, 1);
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