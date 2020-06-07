<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="伙伴名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item >
        <span slot="label">手机号<span class="red">*</span></span>
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
      <el-form-item label="债权属性">
        <el-select v-model="form.assetAttr" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in assetAttrList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="覆盖地区">
          <el-cascader style="width:100%"
    placeholder="试试搜索：指南"
     v-model="form.overArea"
    :options="provinceList"
    :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
    filterable></el-cascader>
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
        overArea:[],
      },
       assetAttrList:[],
       provinceList:[]
    };
  },
  created() {

    var _this=this;
     $.findInit().then(res=>{

        if(res.success)
       {
        // console.log(res.data)
         this.assetAttrList=res.data.source;
         this.provinceList=res.data.province;
         console.log(this.provinceList)
       }
     })
 
  },
  methods: {
    addData() {
      console.log(this.form.overArea);
      var areas=[]
      for(let row of this.form.overArea)
      {
          let obj={province:row[0],city:row[1]}
          areas.push(obj)
      }
     $.insert({
        partnerType: "资产伙伴",
        name: this.form.name,
        sex: this.form.sex,
        telephone: this.form.telephone,
        weixin: this.form.weixin,
        email: this.form.email,
        company: this.form.company,
        department: this.form.department,
        post: this.form.post,
        source: this.form.source,
        item: this.form.item,
        debt: this.form.debt,
        address: this.form.address,
        partnerRemark: this.form.partnerRemark,
        assetAttr: this.form.assetAttr,
        overArea:areas
      }).then(response => {
        if (response.success) {
          this.$router.replace("/partner/assets");
        }
      });
    }
  }
};
</script>
<style scoped>
.add {
  padding: 1rem;
}
.red{
  color: red;
  font-size:1.5rem;

  vertical-align:middle;
}
</style>