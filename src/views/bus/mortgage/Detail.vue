<template>
  <div class="app-container">
    <el-button
      type="primary"
      plain
      @click="$router.push('/bus/mortgage/index')"
      style="float:right"
    >退出</el-button>
    <div style="border-bottom:1px solid #999999;">
      <h2 align="center">借款基本信息</h2>
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="借款人名称:">{{form.borrowers}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地:">{{form.city+""}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行业:">{{form.industry}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="经营情况:">{{form.situation}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业性质:">{{form.properties}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:">{{form.telephone}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="债权所在机构:">{{form.institutions}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合作单位:">{{form.address}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人:">{{form.contact}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="基准日:">{{form.baseDay}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本金余额/代偿余额:">{{form.prinBalance}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前利息:">{{form.curInter}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="罚息（滞纳金）:">{{form.lateFee}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="(item,i) in borrowList" :key="i+'a'">
      <h2 align="center">借款合同{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"借款合同编号: "+item.contNum}}</el-col>
        <el-col :span="8">{{"合同本金: "+item.principal}}</el-col>
        <el-col :span="8">{{"借款期限: "+item.beginTime+"~"+item.endTime}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"本金余额/代偿余额: "+item.prinBalance}}</el-col>
        <el-col :span="8">{{"当前利息: "+item.interBalance}}</el-col>
        <el-col :span="8">{{"罚息（滞纳金）: "+item.otherMoney+" "+item.note}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"诉讼有效期: "+item.litigationBegin+"~"+item.litigationEnd}}</el-col>
      </el-row>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="(item,i) in guaranteeList" :key="i+'b'">
      <h2 align="center">保证合同{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"对应借款合同: "+item.loanContract}}</el-col>
        <el-col :span="8">{{"合同类型: "+item.type}}</el-col>
        <el-col :span="8">{{"保证人金额: "+item.guarantorAmount}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"保证合同编号: "+item.contractNum}}</el-col>
        <el-col :span="8">{{"保证期间: "+item.guaranteedBegin+"~"+item.guaranteedEnd}}</el-col>
      </el-row>

      <div v-for="(item1,k) in naturalList[i].naturalList" :key="k+'h'">
        <h3>自然人{{k+1}}</h3>
        <el-row style="height:3rem">
          <el-col :span="8">{{"名字: "+item1.corporateRepresent}}</el-col>
          <el-col :span="8">{{"性别: "+item1.naturalSex}}</el-col>
          <el-col :span="8">{{"身份证号: "+item1.naturalCard}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"地址: "+item1.corporateCity+" "+item1.address}}</el-col>
          <el-col :span="8">{{"联系方式: "+item1.contact}}</el-col>
          <el-col :span="8">{{"与借款人关系: "+item1.relation}}</el-col>
        </el-row>
      </div>

      <div v-for="(item1,k) in legalList[i].legalList" :key="k+'i'">
        <h3>法人{{k+1}}</h3>
        <el-row style="height:3rem">
          <el-col :span="8">{{"法定代表人: "+item1.corporateRepresent}}</el-col>
          <el-col :span="8">{{"企业性质: "+item1.corporateNature}}</el-col>
          <el-col :span="8">{{"企业所在地址: "+item1.corporateCity+" "+item1.address}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"注册资金: "+item1.money}}</el-col>
          <el-col :span="8">{{"与借款人关系: "+item1.relation}}</el-col>
        </el-row>
      </div>
    </div>

    <div
      style="border-bottom:1px dashed #999999;"
      v-for="(item,i) in collcontractList"
      :key="i+'c'"
    >
      <h2 align="center">抵押物合同{{i}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"抵押物合同编号: "+item.collateralNumber}}</el-col>
        <el-col :span="8">{{"合同类型: "+item.collateralType}}</el-col>
        <el-col :span="8">{{"抵押金额: "+item.collateralMoney}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"抵押期限: "+item.collateralBegin+"~"+item.collateralEnd}}</el-col>
        <el-col :span="8">{{"关联借款合同: "+item.collateralLink}}</el-col>
        <el-col :span="8">{{"备注: "+item.note}}</el-col>
      </el-row>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="(item,i) in collateralList" :key="i+'d'">
      <h2 align="center">抵押物信息{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"关联抵押物合同: "+item.loanCont}}</el-col>
        <el-col :span="8">{{"抵（质）押信息编号: "+item.noContract}}</el-col>
        <el-col :span="8">{{"抵质押类型: "+item.mortType}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"地址（包含楼盘信息）: "+item.city+" "+item.address}}</el-col>
        <el-col :span="8">{{"地图链接: "+item.mapLink}}</el-col>
        <el-col :span="8">{{"所有权人: "+item.owner}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"资产类型: "+item.assetType}}</el-col>
        <el-col :span="8">{{"最高额抵押金额: "+item.maxMort}}</el-col>
        <el-col :span="8">{{"抵押顺位: "+item.seqMort}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"前序抵押金额: "+item.orderMort}}</el-col>
        <el-col :span="8">{{"查封顺位: "+item.sequenceSei}}</el-col>
        <el-col :span="8">{{"查封法院: "+item.courtSeizureCity+" "+item.courtSei}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"备注: "+item.verifyInfo}}</el-col>
      </el-row>

      <div v-for="(item1,k) in propertyList[i].properties" :key="k+'f'">
        <h3>房产信息{{k+1}}</h3>
        <el-row style="height:3rem">
          <el-col :span="8">{{"产证号: "+item1.houseProdu}}</el-col>
          <el-col :span="8">{{"建筑类型: "+item1.buildType}}</el-col>
          <el-col :span="8">{{"建造时间: "+item1.buildTime}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"首层层高（工业资产）: "+item1.fishHigh}}</el-col>
          <el-col :span="8">{{"总层数: "+item1.layer}}</el-col>
          <el-col :span="8">{{"所在层数: "+item1.inLayer}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"出租情况: "+item1.rentState}}</el-col>
          <el-col :span="8">{{"是否为抵押前租赁: "+item1.preMort}}</el-col>
          <el-col :span="8">{{"是否唯一住房: "+item1.onlyHouse}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"建筑面积: "+item1.structArea}}</el-col>
          <el-col :span="8">{{"备注: "+item1.newNess}}</el-col>
        </el-row>
      </div>

      <div v-for="(item2,g) in landList[i].lands" :key="g+'g'">
        <h3>土地信息{{g+1}}</h3>
        <el-row style="height:3rem">
          <el-col :span="8">{{"产证号: "+item2.landProdu}}</el-col>
          <el-col :span="8">{{"土地用途: "+item2.landUse}}</el-col>
          <el-col :span="8">{{"土地性质: "+item2.landStat}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"获得方式: "+item2.wayObt}}</el-col>
          <el-col :span="8">{{"剩余使用年限: "+item2.servLife}}</el-col>
          <el-col :span="8">{{"面积: "+item2.area}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"土地市场单价: "+item2.landPrice}}</el-col>
          <el-col :span="8">{{"备注: "+item2.note}}</el-col>
        </el-row>
      </div>

      <div v-for="(item3,l) in otherList[i].others" :key="l+'h'">
        <h3>其他信息{{l+1}}</h3>
        <el-row style="height:3rem">
          <el-col :span="8">{{"产证号: "+item3.otherProd}}</el-col>
          <el-col :span="8">{{"类型: "+item3.otherType}}</el-col>
          <el-col :span="8">{{"描述: "+item3.describe}}</el-col>
        </el-row>
        <el-row style="height:3rem">
          <el-col :span="8">{{"数量: "+item3.number}}</el-col>
          <el-col :span="8">{{"备注: "+item3.note}}</el-col>
        </el-row>
      </div>
    </div>

    <div v-for="(item,i) in lightList" :key="i+'e'">
      <h2 align="center">亮点信息{{i+1}}</h2>
      <el-row style="height:3rem">
        <el-col :span="8">{{"类型: "+item.claimsType}}</el-col>
        <el-col :span="8">{{"描述: "+item.describes}}</el-col>
        <el-col :span="8">{{"亮点价值: "+item.value}}</el-col>
      </el-row>
      <el-row style="height:3rem">
        <el-col :span="8">{{"依据: "+item.basis}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import $ from "@/api/bus";

export default {
  data() {
    return {
      form: {
        borrowers: "",
        city: [],
        //合作单位
        address: "",
        industry: "",
        situation: "",
        properties: "",
        telephone: "",
        institutions: "",
        contact: "",
        origCreditors: "",
        baseDay: "",
        interestEnd: "",
        claimType: "",
        lendBank:"",
        lateBegin:"",
        lateEnd:"",
        lateIntRates:"",
        prinBalance:"",
        curInter:"",
        lateFee:"",
        credits:"",
      },
      borrowList: [],
      guaranteeList: [],
      collcontractList: [],
      lightList: [],
      collateralList: [],
      propertyList: [],
      landList: [],
      otherList: [],
      naturalList: [],
      legalList: [],
      claimsNumber: ""
    };
  },
  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
    $.mapLists({ number: this.claimsNumber }).then(response => {
      if (response.success) {
        // console.log(response.data)
        this.form = response.data.mortgage;
        this.borrowList = response.data.borrow;
        for (let index = 0; index < response.data.guarantor.length; index++) {
          this.guaranteeList.push(response.data.guarantor[index].guarantor);
        }
        this.naturalList = response.data.guarantor;
        this.legalList = response.data.guarantor;
        this.collcontractList = response.data.contract;
        this.lightList = response.data.light;
        for (let index = 0; index < response.data.collateral.length; index++) {
          this.collateralList.push(response.data.collateral[index].collateral);
        }
        this.propertyList = response.data.collateral;
        this.landList = response.data.collateral;
        this.otherList = response.data.collateral;
      }
    });
  }
};
</script>

<style>
</style>