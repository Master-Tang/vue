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
        <el-input v-model="form.orgRemark"></el-input>
      </el-form-item>

      <div v-for="(item, index) in form.peerInfo.bizList" :key="'travel'+index">
        <el-form-item label="同业业务类型">
          <el-select v-model="item.typeId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in peerTypeList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他业务类型" v-if="item.typeId==='11'">
          <el-input v-model="item.typeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem1(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="同业业务类型">
        <el-button @click="addItem1()" type>同业业务类型</el-button>
      </el-form-item>

      <div v-for="(item, index) in form.peerInfo.coopList" :key="index">
        <el-form-item label="同业合作方式">
          <el-select v-model="item.typeId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in peerBizList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他合作方式" v-if="item.typeId==='13'">
          <el-input v-model="item.typeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type @click="deleteItem(item, index)">删除</el-button>
        </el-form-item>
      </div>
      <el-form-item label="同业合作方式">
        <el-button @click="addItem()" type>同业合作方式</el-button>
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
        partnerType: 5,
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
        orgType:"",
        orgRemark:"",
        overArea: [],
         peerInfo: {
          bizList: [],
          coopList: []
        }
      },
      assetAttrList: [],
      provinceList: [],
      sourceList: [],
      bizTypeList: [],
      orgTypeList: [],
      peerTypeList: [],
      peerBizList: [],
      sexList: [
        { label: "男", value: "男" },
        { label: "女", value: "女" }
      ]
    };
  },
  created() {
   $.editInit({partnerId:this.$route.query.id}).then(res => {
      if (res.success) {
        this.sourceList = res.data.source;
        this.provinceList = res.data.province;
        this.assetAttrList = res.data.attr;
        this.bizTypeList = res.data.bizTypeList;
        this.orgTypeList = res.data.orgTypeList;
        this.peerTypeList = res.data.peerTypeList;
        this.peerBizList = res.data.peerBizList;
        let partner= res.data.partner;
        this.form=partner
      }
    });
  },
  methods: {
    addItem1() {
      this.form.peerInfo.bizList.push({
        typeId: "",
        typeName: ""
      });
    },
    deleteItem1(item, index) {
      this.form.peerInfo.bizList.splice(index, 1);
    },
    addItem() {
      this.form.peerInfo.coopList.push({
        typeId: "",
        typeName: ""
      });
    },
    deleteItem(item, index) {
      this.form.peerInfo.coopList.splice(index, 1);
    },
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