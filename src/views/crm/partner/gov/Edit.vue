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
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item>
        <span slot="label">
          手机号
        </span>
        <el-input
          v-model="form.telephone"
          placeholder="请输入11位数字"
          onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span slot="label">其他联系方式</span>
        <el-row>
          <el-col :span="2">
            <el-button  plain @click="addtelephoneItem()">添加</el-button>
          </el-col>
          <el-col :span="18">
            <div v-for="(item, index) in form.telephoneList" :key="index">
              <div style="width:60%">
                <el-row>
                  <el-col :span="15">
                    <el-input v-model="item.telephones" placeholder="请输入联系方式"></el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-button
                      icon="el-icon-delete"
                      circle
                      @click="deletetelephoneItem(item, index)"
                    ></el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="form.weixin" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="form.email" placeholder="电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="机构名称">
        <el-input v-model="form.company" placeholder="机构名称"></el-input>
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.address" placeholder="联系地址"></el-input>
      </el-form-item>
      <el-form-item label="工作部门">
        <el-input v-model="form.department" placeholder="工作部门"></el-input>
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

      <el-form-item label="管辖区域">
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

      <div id="aaa" v-for="(item, index) in form.orgInfo.resumeList" :key="index">
        <el-form-item label="机构名称">
          <el-input v-model="item.resumeOrg" placeholder="机构名称"></el-input>
        </el-form-item>
        <el-form-item label="管辖区域">
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
        <el-input v-model="form.orgInfo.name" placeholder="请输入中文名"></el-input>
      </el-form-item>
      <el-form-item label="关系人联系方式">
        <el-input 
        v-model="form.orgInfo.telephone" 
        placeholder="请输入11位数字"
        onkeyup="value=value.replace(/\D/g,'')"
          onchange="value=value.replace(/\D/g,'')"
        ></el-input>
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
      <el-form-item label="关系备注">
        <el-input v-model="form.orgInfo.relativeRemark" placeholder="关系备注"></el-input>
      </el-form-item>
      <el-form-item label="关系人机构类型">
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
        <el-input v-model="form.orgInfo.orgRemark" placeholder="其他机构"></el-input>
      </el-form-item>
      <el-form-item label="关系人所在机构名称">
        <el-input v-model="form.orgInfo.relativeOrg" placeholder="关系人所在机构名称"></el-input>
      </el-form-item>
      <el-form-item label="关系人管辖区域">
        <el-cascader
          style="width:100%"
          placeholder="试试搜索:江苏"
          v-model="form.orgInfo.relativeArea"
          :options="provinceList"
          :props="{value:'regionId',label:'regionName',children:'children', multiple: true }"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="关系人岗位职务">
        <el-input v-model="form.orgInfo.pos" placeholder="关系人岗位职务"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="form.note" placeholder="备注"></el-input>
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
        partnerType: 6,
        name: "",
        sex: "",
        telephone: "",
        telephoneList: [],
        weixin: "",
        email: "",
        company: "",
        department: "",
        post: "",
        source: "",
        item: "",
        debt: "",
        address: "",
        note:"",
        partnerRemark: "",
        assetAttr: "",
        overArea: [],
        orgInfo: {
          name: "",
          telephone: "",
          relative: "",
          relativeRemark: "",
          orgType: "",
          orgRemark: "",
          relativeOrg: "",
          relativeArea: [],
          pos: "",
          resumeList: []
        }
      },
      sourceList: [],
      provinceList: [],
      orgTypeList: [],
      relativeList: []
    };
  },
  created() {
    $.editInit1({ partnerId: this.$route.query.id }).then(res => {
      if (res.success) {
        // console.log(res.data)
        this.sourceList = res.data.source;
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
     addtelephoneItem() {
      this.form.telephoneList.push({
        telephones: "",
      });
    },
    deletetelephoneItem(item, index) {
      this.form.telephoneList.splice(index, 1);
    },
    addItem() {
      this.form.orgInfo.resumeList.push({
        resumeOrg: "",
        resumePos: "",
        resumeOver: []
      });
    },
    deleteItem(item, index) {
      this.form.orgInfo.resumeList.splice(index, 1);
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
      } else if (!/^1\d{10}$/.test(this.form.telephone)&&this.form.telephone.replace(" ","")!="") {
        error = "手机号码不正确\n";
      } else if (this.form.overArea.length == 0) {
        error = "请选择区域\n";
      }else if (this.form.email.length!=0&&!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)
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