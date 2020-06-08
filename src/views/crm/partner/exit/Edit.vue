<template>
  <div class="my-padding">
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
      <el-form-item label="退出类型">
        <el-select v-model="form.exitInfo.exitType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in exitTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用途偏好">
        <el-select v-model="form.exitInfo.usage" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in usageList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投资规模">
        <el-select v-model="form.exitInfo.ability" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in abilityList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资产类型">
        <el-select v-model="form.exitInfo.preferences" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in assetsTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData()">保存</el-button>
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
        partnerType:1,
        name: "1",
        sex: "男",
        telephone: "1",
        weixin: "1",
        email: "1",
        company: "1",
        department: "1",
        post: "1",
        source: "1",
        item: "1",
        debt: "1",
        address: "1",
        overArea: [],
        exitInfo:{
          exitType:"01",
          usage:"",
          ability:"",
          preferences:""
        }
      },
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      exitTypeList: [],
      usageList:[],
      abilityList:[],
      assetsTypeList:[],
       sexList:[{label:'男',value:'男'},{label:'女',value:'女'}],
    };
  },
  created() {
    $.editInit({partnerId:this.$route.query.id}).then(res => {
      console.log(res.data.partner)
      if (res.success) {
         this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
        this.exitTypeList=res.data.exitTypeList;
        this.usageList=res.data.usageList;
        this.abilityList=res.data.abilityList;
        this.assetsTypeList=res.data.assetsTypeList;
        let partner= res.data.partner;
        this.form=partner
      }
    });
  },
  methods: {
    updateData() {

      $.update(this.form).then(response => {
        if (response.success) {
          this.$router.replace("index");
        }
      });
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