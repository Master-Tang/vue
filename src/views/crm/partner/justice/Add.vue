<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="伙伴名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
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
      <el-form-item label="单位名称">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-input v-model="form.post"></el-input>
      </el-form-item>
      <el-form-item label="伙伴来源">
        <el-input v-model="form.source"></el-input>
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

      <el-form-item label="机构类型">
        <el-select v-model="form.justiceInfo.orgType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构" v-if="form.justiceInfo.orgType==='26'">
        <el-input v-model="form.justiceInfo.orgRemark"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.justiceInfo.relativeOrg"></el-input>
      </el-form-item>
      <el-form-item label="管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.justiceInfo.relativeOver"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="岗位职务">
        <el-input v-model="form.justiceInfo.relativePos"></el-input>
      </el-form-item>

      <!-- 固定项目 -->
      <el-form-item label="履历">
        <el-button @click="addItem()" type>添加履历</el-button>
      </el-form-item>
      <!-- 动态增加项目 -->
      <div v-for="(item, index) in form.justiceResume" :key="index">
        <el-form-item label="机构类型">
          <el-select v-model="form.justiceResume.orgType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in orgTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他机构" v-if="form.justiceResume.orgType==='26'">
          <el-input v-model="form.justiceResume.orgRemark"></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="form.justiceResume.resumeOrg"></el-input>
        </el-form-item>
        <el-form-item label="管辖区域">
          <el-cascader
            style="width:100%"
            placeholder="试试搜索：无锡"
            v-model="form.justiceResume.resumeOver"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="岗位职务">
          <el-input v-model="form.justiceResume.resumePos"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>

      <el-form-item label="关系人姓名">
        <el-input v-model="form.justiceInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="关系人联系方式">
        <el-input v-model="form.justiceInfo.telephone"></el-input>
      </el-form-item>
      <el-form-item label="与其关系">
        <el-select v-model="form.justiceInfo.relative" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in relativeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.justiceInfo.relativeRemark"></el-input>
      </el-form-item>
      <el-form-item label="机构类型">
        <el-select v-model="form.justiceInfo.orgType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构" v-if="form.justiceInfo.orgType==='26'">
        <el-input v-model="form.justiceInfo.orgRemark"></el-input>
      </el-form-item>
      <el-form-item label="所在机构名称">
        <el-input v-model="form.justiceInfo.relativeOrg"></el-input>
      </el-form-item>
      <el-form-item label="管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.justiceInfo.relativeOver"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="岗位职务">
        <el-input v-model="form.justiceInfo.relativePos"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addData()">立即创建</el-button>
        <el-button>取消</el-button>
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
        justiceInfo: {
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
        justiceResume: [
          {
            resumeType: "",
            resumeRemark: "",
            resumeOrg: "",
            resumeOver: [],
            resumePos: ""
          }
        ]
      },
      assetAttrList: [],
      provinceList: [],
      orgTypeList: [],
      relativeList: []
    };
  },
  created() {
    var _this = this;
    $.addInit().then(res => {
      if (res.success) {
        // console.log(res.data)
        this.assetAttrList = res.data.source;
        this.provinceList = res.data.province;
        this.orgTypeList = res.data.orgTypeList;
        this.relativeList = res.data.relativeList;
        // console.log(this.provinceList);
      }
    });
  },
  methods: {
    addItem() {
      this.form.justiceResume.push({
        resumeOrg: "",
        resumeOver: [],
        resumePos: ""
      });
    },
    deleteItem(item, index) {
      this.form.justiceResume.splice(index, 1);
    },
    addData() {
      if (!this.validate()) return;
      console.log(this.form)
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
</style>