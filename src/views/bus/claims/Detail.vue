<template>
  <div class="app-container">
    <div style="border-bottom:1px dashed #999999;">
      <h2 align="center">借款基本信息</h2>
      <el-form :model="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="借款人名称:">{{form.borrowers}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地:">{{form.city+" "+form.address}}</el-form-item>
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
            <el-form-item label="联系人:">{{form.contact}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原始债权人:">{{form.origCreditors}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="基准日:">{{form.baseDay}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="item in borrowList" :key="item">
      <h2 align="center">借款人合同</h2>
      <el-item :model="item">
        <el-row>
          <el-col :span="8">
            <el-item-item label="借款合同编号:">{{item.contNum}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="合同本金:">{{item.principal}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="借款期限:">{{item.beginTime+"~"+item.endTime}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="本金余额:">{{item.prinBalance}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="利息余额">{{item.interBalance}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="其他金额">{{item.otherMoney}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="诉讼有效期:">{{item.litigationBegin+"~"+item.litigationEnd}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="签署时间">{{item.signTime}}</el-item-item>
          </el-col>
        </el-row>
      </el-item>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="item in guaranteeList" :key="item">
      <h2 align="center">保证合同</h2>
      <el-item :model="item">
        <el-row>
          <el-col :span="8">
            <el-item-item label="对应借款合同:">{{item.loanContract}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="合同类型:">{{item.type}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="保证方式:">{{item.guarantee}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="保证人金额:">{{item.guarantorAmount}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="保证合同编号">{{item.contractNum}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="保证期间">{{item.guaranteedBegin+"~"+item.guaranteedEnd}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="保证人名称:">{{item.guarantorName}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="保证人类型">{{item.guarantorType}}</el-item-item>
          </el-col>
        </el-row>
        <h3>自然人</h3>
        <el-row>
          <el-col :span="8">
            <el-item-item label="性别:">{{item.sex}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="身份证号:">{{item.naturalId}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="地址:">{{item.naturalCity+" "+item.naturalAddress}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="联系方式:">{{item.naturalContact}}</el-item-item>
          </el-col>
        </el-row>
        <h3>法人</h3>
        <el-row>
          <el-col :span="8">
            <el-item-item label="法定代表人:">{{item.corporateRepresent}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="企业性质:">{{item.corporateNature}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="企业所在地址:">{{item.corporateCity+" "+item.corporateAddress}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="注册资金:">{{item.corporateMoney}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="与借款人关系:">{{item.relation}}</el-item-item>
          </el-col>
        </el-row>
      </el-item>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="item in collcontractList" :key="item">
      <h2 align="center">抵押物合同</h2>
      <el-item :model="item">
        <el-row>
          <el-col :span="8">
            <el-item-item label="抵押物合同编号:">{{item.collateralNumber}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="合同类型:">{{item.collateralType}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="抵押金额:">{{item.collateralMoney}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="抵押期限:">{{item.collateralBegin+"~"+item.collateralEnd}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="主债权合同期限">{{item.principalBegin+"~"+item.principalEnd}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="合同签订时间">{{item.signedTime}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="关联借款合同:">{{item.collateralLink}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="备注">{{item.note}}</el-item-item>
          </el-col>
        </el-row>
      </el-item>
    </div>

    <div style="border-bottom:1px dashed #999999;" v-for="item in collateralList" :key="item">
      <h2 align="center">抵押物信息</h2>
      <el-item :model="item">
        <el-row>
          <el-col :span="8">
            <el-item-item label="关联抵押物合同:">{{item.loanCont}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="抵（质）押合同编号:">{{item.noContract}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="抵质押类型:">{{item.mortType}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="担保的主债权发生期间:">{{item.prinBegin+"~"+item.prinEnd}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="地址（包含楼盘信息）:">{{item.city+" "+item.address}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="地图链接:">{{item.mapLink}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="所在地:">{{item.home}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="所有权人:">{{item.owner}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="资产类型:">{{item.assetType}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="最高额抵押金额:">{{item.maxMort}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="抵押顺位:">{{item.seqMort}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="前序抵押金额:">{{item.orderMort}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="查封顺位:">{{item.sequenceSei}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="查封法院:">{{item.courtSeizureCity+" "+item.courtSei}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="需核实信息:">{{item.verifyInfo}}</el-item-item>
          </el-col>
        </el-row>
        <h3>房产信息</h3>
        <div>
        <el-row>
          <el-col :span="8">
            <el-item-item label="产证号:">{{item1.houseProdu}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="建筑类型:">{{item1.buildType}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="建造时间:">{{item1.buildTime}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="首层层高（工业资产）:">{{item1.fishHigh}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="总层数:">{{item1.layer}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="所在层数:">{{item1.inLayer}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="出租情况:">{{item1.rentState}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="是否为抵押前租赁:">{{item1.preMort}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="是否唯一住房:">{{item1.onlyHouse}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="建筑面积:">{{item1.structArea}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="备注:">{{item1.newNess}}</el-item-item>
          </el-col>
        </el-row>
        </div>
        <h3>土地信息</h3>
        <div>
        <el-row>
          <el-col :span="8">
            <el-item-item label="产证号:">{{item2.landProdu}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="土地用途:">{{item2.landUse}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="土地性质:">{{item2.landStat}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="获得方式:">{{item2.wayObt}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="剩余使用年限:">{{item2.servLife}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="面积:">{{item2.area}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="土地市场单价:">{{item2.landPrice}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="备注:">{{item2.note}}</el-item-item>
          </el-col>
        </el-row>
        </div>
        <h3>其他信息</h3>
        <div>
        <el-row>
          <el-col :span="8">
            <el-item-item label="产证号:">{{item3.otherProd}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="类型:">{{item3.otherType}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="描述:">{{item3.describe}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="数量:">{{item3.number}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="备注:">{{item3.note}}</el-item-item>
          </el-col>
        </el-row>
        </div>
      </el-item>
    </div>

    <div v-for="item in lightList" :key="item">
      <h2 align="center">亮点信息</h2>
      <el-item :model="item">
        <el-row>
          <el-col :span="8">
            <el-item-item label="类型:">{{item.claimsType}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="描述:">{{item.describes}}</el-item-item>
          </el-col>
          <el-col :span="8">
            <el-item-item label="亮点价值:">{{item.value}}</el-item-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-item-item label="依据:">{{item.basis}}</el-item-item>
          </el-col>
        </el-row>
      </el-item>
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
      borrowList: [],
      guaranteeList: [],
      collcontractList: [],
      lightList: [],
      collateralList: [],
      propertyList: [],
      landList: [],
      otherList: [],
      claimsNumber: ""
    };
  },
  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
     $.mapAll({claimsNumber:this.claimsNumber}).then(response => {
        if(response.success){
            console.log(response.data)
        }
      });
  }
};
</script>

<style>
</style>