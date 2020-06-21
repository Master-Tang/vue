<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item>
        <span slot="label">
          伙伴姓名
          <span class="red">*</span>
        </span>
        <el-input
          v-model="form.name"
          type="text"
          placeholder="请输入中文名"
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
        @change="selectNum()"
          v-model="form.telephone"
          placeholder="请输入11位手机号"
          onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <span slot="label">
          微信号
          <span class="red">*</span>
        </span>
        <el-input v-model="form.weixin" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <span slot="label">
          电子邮箱
          <span class="red">*</span>
        </span>
        <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.company" placeholder="机构名称"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="岗位职务">
        <el-input v-model="form.post" placeholder="岗位职务"></el-input>
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
        <el-input v-model="form.item" placeholder="伙伴对应项目"></el-input>
      </el-form-item>
      <el-form-item label="伙伴对应债权">
        <el-input v-model="form.debt" placeholder="伙伴对应债权"></el-input>
      </el-form-item>
      <el-form-item label="伙伴备注">
        <el-input v-model="form.partnerRemark" placeholder="伙伴备注"></el-input>
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
        <el-input v-model="form.orgRemark" placeholder="其他机构"></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          管辖区域
          <span class="red">*</span>
        </span>
        <el-cascader
          style="width:100%"
          placeholder="试试搜索:江苏"
          v-model="form.overArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>

      <div id="aaa" v-for="(item, index) in form.justiceInfo.resumeList" :key="index">
        <el-form-item label="机构类型">
          <el-select v-model="item.resumeType" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in orgTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他机构" v-if="item.resumeType==='26'">
          <el-input v-model="item.resumeRemark" placeholder="其他机构"></el-input>
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="item.resumeOrg" placeholder="机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            管辖区域
            <span class="red">*</span>
          </span>
          <el-cascader
            style="width:100%"
            placeholder="试试搜索:江苏"
            v-model="item.resumeOver"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="岗位职务">
          <el-input v-model="item.resumePos" placeholder="岗位职务"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="履历">
        <el-button @click="addItem()" type>添加履历</el-button>
      </el-form-item>

      <el-form-item label="关系人姓名">
        <el-input v-model="form.justiceInfo.name" placeholder="关系人姓名"></el-input>
      </el-form-item>
      <el-form-item label="关系人联系方式">
        <el-input 
        v-model="form.justiceInfo.telephone"
         placeholder="请输入11位数字"
         onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
         ></el-input>
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
      <el-form-item label="关系备注">
        <el-input v-model="form.justiceInfo.relativeRemark" placeholder="关系备注"></el-input>
      </el-form-item>
      <el-form-item label="关系人机构类型">
        <el-select v-model="form.justiceInfo.orgType" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in orgTypeList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关系人机构类型备注" v-if="form.justiceInfo.orgType==='26'">
        <el-input v-model="form.justiceInfo.orgRemark" placeholder="关系人机构类型备注"></el-input>
      </el-form-item>
      <el-form-item label="关系人所在机构名称">
        <el-input v-model="form.justiceInfo.orgName" placeholder="关系人所在机构名称"></el-input>
      </el-form-item>
      <el-form-item label="关系人管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索:江苏"
          v-model="form.justiceInfo.area"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="关系人岗位职务">
        <el-input v-model="form.justiceInfo.pos" placeholder="关系人岗位职务"></el-input>
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
        address: "",
        orgType: "",
        orgRemark: "",
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
    $.addInit1().then(res => {
      if (res.success) {
        // console.log(res.data)
        this.sourceList = res.data.source;
        this.assetAttrList = res.data.source;
        this.provinceList = res.data.province;
        this.orgTypeList = res.data.orgTypeList;
        this.relativeList = res.data.relativeList;
        // console.log(this.provinceList);
      }
    });
  },
  methods: {
    selectNum(){
      if (!/^1\d{10}$/.test(this.form.telephone)) {
      }
      return;
      $.matchNumber({telephone:this.form.telephone,create_user_id:this.$route.query.id}).then(res=>{
         if (res.data!=null) {
          // console.log(res.data)
          this.form.name=res.data.name
          this.form.sex=res.data.sex
          this.form.weixin=res.data.weixin
          this.form.email=res.data.email
          this.form.company=res.data.company
          this.form.department=res.data.department
          this.form.post=res.data.post
          this.form.orgType=res.data.orgType
        }
      });
    },
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
    addData() {
      if (!this.validate()) return;
      // console.log(this.form);
      $.add(this.form).then(response => {
        if (response.success) {
          //console.log(response.data);
          if (response.data === 0) {
            this.$message({
              message: "手机号,邮箱号或微信号重复"
            });
            this.$router.push("add");
          } else {
            this.$router.replace("index");
          }
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
      } else if (this.form.overArea.length==0){
        error = "请选择区域\n";
      }else if (
        !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)
      ) {
        error = "邮箱不正确\n";
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