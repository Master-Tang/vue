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
       <el-form-item label="机构类型">
        <el-select v-model="form.fundInfo.orgType" placeholder="请选择" style="width:100%">
          <el-option 
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他机构" v-if="form.fundInfo.orgType==='26'">
        <el-input v-model="form.fundInfo.orgRemark"></el-input>
      </el-form-item>
      <el-form-item label="资产类型">
        <el-select v-model="form.fundInfo.preferences" placeholder="请选择" style="width:100%">
          <el-option 
            v-for="item in assetsTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收益类型">
        <el-select v-model="form.fundInfo.incomesType" placeholder="请选择" style="width:100%">
          <el-option 
            v-for="item in incomeTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收益率">
        <el-input v-model="form.fundInfo.incomeRate"></el-input>
      </el-form-item>
      <el-form-item label="其他要求">
        <el-input v-model="form.fundInfo.otherMark"></el-input>
      </el-form-item>
      <el-form-item label="资金类型" >
        <el-select v-model="form.fundStruct.currency" placeholder="请选择" style="width:100%">
          <el-option 
            v-for="item in currencyList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>

      
      <div v-for="(item,index) in form.fundStruct" :key="index" >

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
      </div>
      <el-form-item>
        <el-button @click="addItem()" type>机构类型</el-button>
      </el-form-item>
      <el-form-item label="覆盖地区">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索：无锡"
          v-model="form.overArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData()">保存</el-button>
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
        partnerType:2,
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
        overArea: [],
        fundInfo:
        {
          orgType:'',
          orgRemark:'',
          preferences:'',
          incomesType:'',
          incomeRate:'',
          otherMark:''
        },


        fundStruct:[]
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
      incomeTypeList:[],
      currencyList:[],
      structList:[],
      deadlineList:[],
       sexList:[{label:'男',value:'男'},{label:'女',value:'女'}],
    };
  },
  created() {
    $.addInit().then(res => {
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
        this.incomeTypeList=res.data.incomeTypeList;
        this.currencyList=res.data.currencyList;
        this.structList=res.data.structList;
        this.deadlineList=res.data.deadlineList;
      }
    });
  },
  methods: {
    addItem(){
     this.form.fundStruct.push({
       curreny:'',
       struct:'',
       min:0,
       max:0,
       scale:'',
       deadline:'',
     })
    },
    addData() {
      console.log(this.form)
      if(!this.validate()) return;
      $.add(this.form).then(response => {
        if (response.success) {
          this.$router.replace("index");
        }
      });
    },
    validate(){
      let error='';
      if(this.form.name.length<=1)
      {
        error='姓名至少两位\n';
      }

     if(error)
     {
       this.$message({
          message: error,
          type: 'error'
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