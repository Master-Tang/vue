<template>
  <div style="margin : 2rem 1rem 2rem 1rem;padding: 2rem 1rem 2rem 1rem">
    <div
      style="border-top:1px solid #000;border-bottom:1px solid #000;margin : 0rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem ;"
      align="center"
    >
      <h2>基本信息</h2>
      <el-form ref="form" :model="form" label-width="5rem">
        <el-form-item>
          <span slot="label">
            借款人名称
            <span class="red">*</span>
          </span>
          <el-input v-model="form.borrowers" type="text" placeholder="请输入借款人名称"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            所在地
            <span class="red">*</span>
          </span>
          <el-cascader
            style="width:100%"
            placeholder="请搜索或选择地区"
            v-model="form.city"
            :options="provinceList"
            :props="{value:'regionId',label:'regionName',children:'children' }"
            filterable
          ></el-cascader>
          <el-input v-model="form.address" type="text" placeholder="请输入具体地址"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">行业</span>
          <el-input v-model="form.industry" type="text" placeholder="请输入行业"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">经营情况</span>
          <el-select v-model="form.situation" placeholder="请选择经营情况" style="width:100%">
            <el-option
              v-for="item in businessList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label">企业性质</span>
          <el-select v-model="form.properties" placeholder="请选择企业性质" style="width:100%">
            <el-option
              v-for="item in natureList"
              :key="item.dicValue"
              :label="item.dicKey"
              :value="item.dicValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label">联系方式</span>
          <el-input v-model="form.telephone" type="text" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            债权所在机构
            <span class="red">*</span>
          </span>
          <el-input v-model="form.institutions" type="text" placeholder="请输入债权所在机构"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            联系人
            <span class="red">*</span>
          </span>
          <el-input v-model="form.contact" type="text" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            原始债权人
            <span class="red">*</span>
          </span>
          <el-input v-model="form.origCreditors" type="text" placeholder="请输入原始债权人"></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">基准日</span>
          <el-date-picker
            v-model="form.baseDay"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyy年MM月dd日"
            placeholder="请选择基准日"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div
      style="border-bottom:1px solid #000;margin : 2rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem"
      align="center"
    >
      <h2>借款合同</h2>
      <el-table
        id="myform"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.a }}</template>
        </el-table-column>
        <el-table-column label="债权编号" align="center">
          <template slot-scope="scope">{{ scope.row.claimsNumber}}</template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">{{ scope.row.borrowers }}</template>
        </el-table-column>
        <el-table-column label="本金金额" align="center">
          <template slot-scope="scope">{{ scope.row.prinTotal }}</template>
        </el-table-column>
        <el-table-column label="利息余额" align="center">
          <template slot-scope="scope">{{ scope.row.interTotal }}</template>
        </el-table-column>
        <el-table-column label="代垫费用" align="center">
          <template slot-scope="scope">{{ scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="本息合计" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.prinTotal+scope.row.interTotal+scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{ scope.row.institutions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150rem">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.claimsNumber)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row.claimsNumber)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div
      style="border-bottom:1px solid #000;margin : 2rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem"
      align="center"
    >
      <h2>抵押物合同</h2>
      <el-table
        id="myform"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.a }}</template>
        </el-table-column>
        <el-table-column label="债权编号" align="center">
          <template slot-scope="scope">{{ scope.row.claimsNumber}}</template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">{{ scope.row.borrowers }}</template>
        </el-table-column>
        <el-table-column label="本金金额" align="center">
          <template slot-scope="scope">{{ scope.row.prinTotal }}</template>
        </el-table-column>
        <el-table-column label="利息余额" align="center">
          <template slot-scope="scope">{{ scope.row.interTotal }}</template>
        </el-table-column>
        <el-table-column label="代垫费用" align="center">
          <template slot-scope="scope">{{ scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="本息合计" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.prinTotal+scope.row.interTotal+scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{ scope.row.institutions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150rem">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.claimsNumber)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row.claimsNumber)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div
      style="border-bottom:1px solid #000;margin : 2rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem"
      align="center"
    >
      <h2>保证人合同</h2>
      <el-table
        id="myform"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.a }}</template>
        </el-table-column>
        <el-table-column label="债权编号" align="center">
          <template slot-scope="scope">{{ scope.row.claimsNumber}}</template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">{{ scope.row.borrowers }}</template>
        </el-table-column>
        <el-table-column label="本金金额" align="center">
          <template slot-scope="scope">{{ scope.row.prinTotal }}</template>
        </el-table-column>
        <el-table-column label="利息余额" align="center">
          <template slot-scope="scope">{{ scope.row.interTotal }}</template>
        </el-table-column>
        <el-table-column label="代垫费用" align="center">
          <template slot-scope="scope">{{ scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="本息合计" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.prinTotal+scope.row.interTotal+scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{ scope.row.institutions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150rem">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.claimsNumber)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row.claimsNumber)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div
      style="border-bottom:1px solid #000;margin : 2rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem"
      align="center"
    >
      <h2>抵质押物</h2>
      <el-table
        id="myform"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.a }}</template>
        </el-table-column>
        <el-table-column label="债权编号" align="center">
          <template slot-scope="scope">{{ scope.row.claimsNumber}}</template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">{{ scope.row.borrowers }}</template>
        </el-table-column>
        <el-table-column label="本金金额" align="center">
          <template slot-scope="scope">{{ scope.row.prinTotal }}</template>
        </el-table-column>
        <el-table-column label="利息余额" align="center">
          <template slot-scope="scope">{{ scope.row.interTotal }}</template>
        </el-table-column>
        <el-table-column label="代垫费用" align="center">
          <template slot-scope="scope">{{ scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="本息合计" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.prinTotal+scope.row.interTotal+scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{ scope.row.institutions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150rem">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.claimsNumber)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row.claimsNumber)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div
      style="margin : 2rem 1rem 2rem 1rem;padding: 0rem 1rem 2rem 1rem"
      align="center"
    >
      <h2>亮点</h2>
      <el-table
        id="myform"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.row.a }}</template>
        </el-table-column>
        <el-table-column label="债权编号" align="center">
          <template slot-scope="scope">{{ scope.row.claimsNumber}}</template>
        </el-table-column>
        <el-table-column label="借款人" align="center">
          <template slot-scope="scope">{{ scope.row.borrowers }}</template>
        </el-table-column>
        <el-table-column label="本金金额" align="center">
          <template slot-scope="scope">{{ scope.row.prinTotal }}</template>
        </el-table-column>
        <el-table-column label="利息余额" align="center">
          <template slot-scope="scope">{{ scope.row.interTotal }}</template>
        </el-table-column>
        <el-table-column label="代垫费用" align="center">
          <template slot-scope="scope">{{ scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="本息合计" align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.prinTotal+scope.row.interTotal+scope.row.balanTotal }}</template>
        </el-table-column>
        <el-table-column label="所在机构" align="center">
          <template slot-scope="scope">{{ scope.row.institutions }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150rem">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.claimsNumber)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row.claimsNumber)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      form: {
        borrowers: "测试",
        city: [],
        address: "测试",
        industry: "",
        situation: "",
        properties: "",
        telephone: "",
        institutions: "测试",
        contact: "测试",
        origCreditors: "测试",
        baseDay: ""
      },
      businessList: [],
      natureList: [],
      provinceList: []
    };
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>