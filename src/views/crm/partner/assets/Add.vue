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
          placeholder="11位数字"
          onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.weixin" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="单位名称">
        <el-input v-model="form.company" placeholder="单位名称"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="工作部门">
        <el-input v-model="form.department" placeholder="工作部门"></el-input>
      </el-form-item>
      <el-form-item label="工作岗位">
        <el-input v-model="form.post" placeholder="工作岗位"></el-input>
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
      <el-form-item label="债权属性">
        <el-select v-model="form.assetInfo.belong" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in assetAttrList"
            :key="item.dicValue"
            :label="item.dicKey"
            :value="item.dicValue"
          ></el-option>
        </el-select>
      </el-form-item>

      <div id="aaa" v-for="(item, index) in form.assetInfo.businessTypes" :key="index">
        <el-form-item label="业务类型">
          <el-select v-model="item.typeId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in bizTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他业务类型" v-if="item.typeId==='09'">
          <el-input v-model="item.typeName" placeholder="其他业务类型"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="业务类型">
        <el-button @click="addItem()" type>业务类型</el-button>
      </el-form-item>

      <el-form-item>
        <span slot="label">
          覆盖地区
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
      <el-form-item>
        <el-button type="primary" @click="addData()">保存</el-button>
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
        partnerType: 1,
        name: "",
        sex: "",
        telephone: "",
        weixin: "",
        email: "",
        company: "",
        department: "",
        post: "",
        orgType: "",
        orgRemark: "",
        source: "",
        item: "",
        debt: "",
        address: "",
        orgType: "",
        orgRemark: "",
        overArea: [],
        assetInfo: {
          belong: "",
          businessTypes: []
        }
      },
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      sexList: [
        { label: "男", value: "男" },
        { label: "女", value: "女" }
      ]
    };
  },
  created() {
    $.addInit().then(res => {
      if (res.success) {
        // console.log(res.data)
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
      }
    });
  },
  methods: {
    selectNum() {
      if (!/^1\d{10}$/.test(this.form.telephone)) {
        return;
      }
      
      $.matchNumber({
        telephone: this.form.telephone,
        create_user_id: this.$route.query.id
      }).then(res => {
        // console.log(res);
        if (res.data != null) {
          this.form.name = res.data.name;
          this.form.sex = res.data.sex;
          this.form.weixin = res.data.weixin;
          this.form.email = res.data.email;
          this.form.company = res.data.company;
          this.form.department = res.data.department;
          this.form.post = res.data.post;
          this.form.orgType = res.data.orgType;
          this.form.source=res.data.source;
        }
      });
    },
    addItem() {
      this.form.assetInfo.businessTypes.push({
        typeId: "",
        typeName: ""
      });
    },
    deleteItem(item, index) {
      this.form.assetInfo.businessTypes.splice(index, 1);
    },
    addData() {
      if (!this.validate()) return;
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
      } else if (this.form.overArea.length == 0) {
        error = "请选择区域\n";
      } else if (this.form.email.length!=0&&!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)
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