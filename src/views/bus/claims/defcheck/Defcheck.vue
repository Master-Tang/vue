<template>
  <div class="my-padding">
    <el-button @click="back">退出</el-button>
    <el-divider content-position="center">瑕疵排查</el-divider>
    <div></div>
    <div>
      <div>
        <el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
        <el-drawer
          title="本周瑕疵"
          :before-close="cancelForm"
          :visible.sync="dialog"
          direction="rtl"
          size="30%"
        >
          <div >
            <el-form :model="form">
              <el-form-item label="被告失联瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="被告对抗瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="立案瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="涉刑瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="执行变更瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="回现周期瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="占用瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="执行对抗瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="查封顺位瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="执行转破产瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="评估瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="人员异动瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="信贷合同瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="信息采集瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="关联方对抗瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="或有负债" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="资产性质瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="损坏瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="灭失瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="使用瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="办证瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="测绘瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="整理处置瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="资产招商瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="资产区域瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="税费瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="水电物业等杂费瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="建筑工程款瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="田租金瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="土地出让金瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="欠付工资瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="保管安置费用瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="政策性瑕疵" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="其他" label-width="7rem">
                <el-input placeholder=""></el-input>
              </el-form-item>
            </el-form>
            <div align="center">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="addForm">确 定</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        defectLostDef: "",
        defectAgainstDef: "",
        defectRecord: "",
        defectPunish: "",
        defectChangePerf: "",
        defectCycle: "",
        defectOccupy: "",
        defectAgainstPer: "",
        defectSeizure: "",
        defectBankTurn: "",
        defectAssess: "",
        defectTransact: "",
        defectCreditCont: "",
        defectCollectInfo: "",
        defectAgainstRel: "",
        defectContinge: "",
        defectAssetNature: "",
        defectDamage: "",
        defectLoss: "",
        defectUse: "",
        defectCertific: "",
        defectSurvey: "",
        defectDisposal: "",
        defectAssetInvest: "",
        defectAssetArea: "",
        defectTaxeFee: "",
        defectMiscellaFee: "",
        defectConstruct: "",
        defectLandRent: "",
        defectLandTrans: "",
        defectBackPay: "",
        defectPlaceFee: "",
        defectPolicy: "",
        defectOther: "",
      },
      claimsNumber: "",
    };
  },
  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
  },
  methods: {
    back() {
      this.$router.push({
        path: "/bus/claims/edit/index",
        query: { claimsNumber: this.$route.query.claimsNumber },
      });
    },
    addForm(){
        this.dialog=false
    },
    cancelForm() {
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
</style>