<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="伙伴名称">
        <el-input v-model="form.name"></el-input>
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
        <el-input v-model="form.telephone"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.weixin"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="岗位职务">
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
      <el-form-item label="伙伴备注">
        <el-input v-model="form.partnerRemark"></el-input>
      </el-form-item>

      <el-form-item label="管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.orgInfo.relativeOver"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>

      <!-- 动态增加项目 -->
      <div class="aaa" v-for="(item, index) in form.orgResume" :key="index" >
        <el-form-item label="机构名称">
          <el-input v-model="item.resumeOrg"></el-input>
        </el-form-item>
        <el-form-item label="管辖区域">
          <el-cascader
            style="width:100%"
            placeholder="试试搜索：无锡"
            v-model="item.resumeOver"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="岗位职务">
          <el-input v-model="item.resumePos"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="履历">
        <el-button @click="addItem()" type>添加履历</el-button>
      </el-form-item>

      <el-form-item label="关系人姓名">
        <el-input v-model="form.orgInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="关系人联系方式">
        <el-input v-model="form.orgInfo.telephone"></el-input>
      </el-form-item>
      <el-form-item label="与其关系">
        <el-select v-model="form.orgInfo.relative" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in relativeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.orgInfo.relativeRemark"></el-input>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-select v-model="form.orgInfo.orgType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构" v-if="form.orgInfo.orgType==='26'">
        <el-input v-model="form.orgInfo.orgRemark"></el-input>
      </el-form-item>
      <el-form-item label="所在机构名称">
        <el-input v-model="form.orgInfo.relativeOrg"></el-input>
      </el-form-item>
      <el-form-item label="管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.orgInfo.relativeOver"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="岗位职务">
        <el-input v-model="form.orgInfo.relativePos"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addData()">立即创建</el-button>
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
        partnerType:6,
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
        address: "",
        partnerRemark: "",
        assetAttr: "",
        orgInfo: {
          name: "",
          telephone: "",
          relative: "",
          relativeRemark: "",
          orgType: "",
          orgRemark: "",
          relativeOrg: "",
          relativeOver: [],
          relativePos: ""
        },
        orgResume: []
      },

      provinceList: [],
      orgTypeList: [],
      sourceList: [],
      relativeList: []
    };
  },
  created() {
    $.addInit().then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.orgTypeList = res.data.orgTypeList;
        this.relativeList = res.data.relativeList;
      }
    });
  },
  methods: {
    addItem() {
      this.form.orgResume.push({
        resumeOrg: "",
        resumeOver: [],
        resumePos: ""
      });
    },
    deleteItem(item, index) {
      this.form.orgResume.splice(index, 1);
    },
    addData() {
      // console.log(this.orgResumeList);
      if (!this.validate()) return;
      $.add(this.form).then(response => {
        if (response.success) {
          this.$router.replace("index");
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.name.length <= 1) {
        error = "姓名至少两位\n";
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

.aaa{
    padding-top: 1rem;
    border:1px solid #ddd;
}
</style>