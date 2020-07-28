<template>

  <div class="my-padding">
    <el-button @click="back">退出</el-button>
    <el-divider content-position="center">瑕疵排查</el-divider>
    <div class="my-padding">
      <div>
        <el-row>
          <el-col :span="2" style="padding-top: 0.5rem" align="center">
            <span>每周汇报</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value1"
                :label="item.label1"
                :value="item.value1"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="searchdef(value)">查看汇报</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="dialog=true">新增汇报</el-button>
          </el-col>
        </el-row>
        <el-drawer
          title="周汇报"
          :before-close="cancelForm"
          :visible.sync="dialog"
          direction="rtl"
          size="50%"
        >
          <div>
            <el-form :model="form.defectWeek">
              <el-form-item label="被告失联瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectLostDef" placeholder="请输入被告失联瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="被告对抗瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAgainstDef" placeholder="请输入被告对抗瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="立案瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectRecord" placeholder="请输入立案瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="涉刑瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectPunish" placeholder="请输入涉刑瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="执行变更瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectChangePerf" placeholder="请输入执行变更瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="回现周期瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectCycle" placeholder="请输入回现周期瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="占用瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectOccupy" placeholder="请输入占用瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="执行对抗瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAgainstPer" placeholder="请输入执行对抗瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="查封顺位瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectSeizure" placeholder="请输入查封顺位瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="执行转破产瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectBankTurn" placeholder="请输入执行转破产瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="评估瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAssess" placeholder="请输入评估瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="人员异动瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectTransact" placeholder="请输入人员异动瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="信贷合同瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectCreditCont" placeholder="请输入信贷合同瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="信息采集瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectCollectInfo"
                          placeholder="请输入信息采集瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="关联方对抗瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAgainstRel"
                          placeholder="请输入关联方对抗瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="或有负债" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectContinge" placeholder="请输入或有负债"></el-input>
              </el-form-item>
              <el-form-item label="资产性质瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAssetNature"
                          placeholder="请输入资产性质瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="损坏瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectDamage" placeholder="请输入损坏瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="灭失瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectLoss" placeholder="请输入灭失瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="使用瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectUse" placeholder="请输入使用瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="办证瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectCertific" placeholder="请输入办证瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="测绘瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectSurvey" placeholder="请输入测绘瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="整理处置瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectDisposal" placeholder="请输入整理处置瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="资产招商瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAssetInvest"
                          placeholder="请输入资产招商瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="资产区域瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectAssetArea" placeholder="请输入资产区域瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="税费瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectTaxeFee" placeholder="请输入税费瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="水电物业等杂费瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectMiscellaFee"
                          placeholder="请输入水电物业等杂费瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="建筑工程款瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectConstruct" placeholder="请输入建筑工程款瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="田租金瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectLandRent" placeholder="请输入田租金瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="土地出让金瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectLandTrans" placeholder="请输入土地出让金瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="欠付工资瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectBackPay" placeholder="请输入欠付工资瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="保管安置费用瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectPlaceFee" placeholder="请输入保管安置费用瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="政策性瑕疵" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectPolicy" placeholder="请输入政策性瑕疵"></el-input>
              </el-form-item>
              <el-form-item label="其他" label-width="9rem">
                <el-input type="textarea" v-model="form.defectWeek.defectOther" placeholder="请输入其他"></el-input>
              </el-form-item>
            </el-form>
            <div align="center">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="addForm" v-if="form.weekId==''">确 定</el-button>
              <el-button type="warning" @click="updateForm" v-else>修 改</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
    <div class="my-padding">
      <div id="defecta">
        <table class="table table-bordered" cellpadding="0">
          <thead>
          <tr>
            <th colspan="6" scope="col" style='vertical-align: middle;text-align: center;'>瑕疵管理表</th>
          </tr>
          <tr>
            <th scope="col" style='vertical-align: middle;text-align: center;'>类型</th>
            <th scope="col" style='vertical-align: middle;text-align: center;'>性质</th>
            <th scope="col" style='vertical-align: middle;text-align: center;'>细分</th>
            <th scope="col" style='vertical-align: middle;text-align: center;'>描述</th>
            <th scope="col" style='vertical-align: middle;text-align: center;'>瑕疵排除方案</th>
            <th scope="col" style='vertical-align: middle;text-align: center;'>预计排除时间</th>
          </tr>
          </thead>
          <tbody>
          <!-- 债权瑕疵 -->
          <tr>
            <th rowspan="19">债权瑕疵</th>
          </tr>
          <tr>
            <th rowspan="4">诉讼瑕疵</th>
            <th>被告失联瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectLostDef" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectLostDef" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectLostDef" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>被告对抗瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAgainstDef"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAgainstDef" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAgainstDef" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>立案瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectRecord" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectRecord" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectRecord" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 涉刑瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectPunish" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectPunish" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectPunish" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th rowspan="9">执行瑕疵</th>
          </tr>
          <tr>
            <th> 执行变更瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectChangePerf"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectChangePerf" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectChangePerf" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 回现周期瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectCycle" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectCycle" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectCycle" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 占用瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectOccupy" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectOccupy" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectOccupy" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 执行对抗瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAgainstPer"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAgainstPer" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAgainstPer" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 查封顺位瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectSeizure" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectSeizure" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectSeizure" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 执行转破产瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectBankTurn" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectBankTurn" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectBankTurn" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 评估瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAssess" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAssess" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAssess" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th> 人员异动瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectTransact" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectTransact" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectTransact" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>信贷合同瑕疵</th>
            <th></th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectCreditCont"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectCreditCont" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectCreditCont" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>信息采集瑕疵</th>
            <th></th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectCollectInfo"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectCollectInfo" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectCollectInfo" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th rowspan="3">催收过程瑕疵</th>
          </tr>
          <tr>
            <th>关联方对抗瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAgainstRel"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAgainstRel" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAgainstRel" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>或有负债</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectContinge" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectContinge" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectContinge" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>

          <!-- 抵押物瑕疵 -->
          <tr>
            <th rowspan="21">抵押物瑕疵</th>
          </tr>
          <!-- 抵质押物瑕疵 -->
          <tr>
            <th rowspan="8">抵质押物瑕疵</th>
          </tr>
          <tr>
            <th>资产性质瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAssetNature"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAssetNature" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAssetNature" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>损坏瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectDamage" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectDamage" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectDamage" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>灭失瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectLoss" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectLoss" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectLoss" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>使用瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectUse" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectUse" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectUse" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>办证瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectCertific" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectCertific" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectCertific" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>测绘瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectSurvey" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectSurvey" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectSurvey" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>整理处置瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectDisposal" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectDisposal" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectDisposal" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <!-- 流通性瑕疵 -->
          <tr>
            <th rowspan="3">流通性瑕疵</th>
          </tr>
          <tr>
            <th>资产招商瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAssetInvest"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAssetInvest" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAssetInvest" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>资产区域瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectAssetArea" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectAssetArea" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectAssetArea" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <!-- 运营维护瑕疵 -->
          <tr>
            <th rowspan="8">运营维护瑕疵</th>
          </tr>
          <tr>
            <th>税费瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectTaxeFee" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectTaxeFee" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectTaxeFee" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>水电物业等杂费瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectMiscellaFee"
                          style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectMiscellaFee" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectMiscellaFee" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>建筑工程款瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectConstruct" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectConstruct" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectConstruct" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>田租金瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectLandRent" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectLandRent" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectLandRent" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>土地出让金瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectLandTrans" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectLandTrans" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectLandTrans" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>欠付工资瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectBackPay" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectBackPay" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectBackPay" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>保管安置费用瑕疵</th>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectPlaceFee" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectPlaceFee" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectPlaceFee" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>政策性瑕疵</th>
            <td>
              <div></div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectPolicy" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectPolicy" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectPolicy" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          <tr>
            <th>其他</th>
            <td>
              <div></div>
            </td>
            <td>
              <div></div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectDescribe.defectOther" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input type="textarea" v-model="forms.defectPlan.defectOther" style="width: 100%"></el-input>
              </div>
            </td>
            <td>
              <div>
                <el-input v-model="forms.defectTime.defectOther" style="width: 100%"></el-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <el-button type="primary" @click="defcheckUpdate">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from "@/api/defcheck";

  export default {
    data() {
      return {
        dialog: false,
        loading: false,
        value: "",
        form: {
          weekId: "",
          defectWeek: {
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
        },
        forms: {
          defectDescribe: {
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
          defectPlan: {
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
          defectTime: {
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
        },
        options: []
      };
    },
    created() {
      this.forms.claimsNumber = this.$route.query.claimsNumber;
      this.form.claimsNumber = this.$route.query.claimsNumber;
      this.fetchData()
      this.fetchWeekData()
      const timer = setInterval(()=>{
        this.defcheckUpdate()
      },30000)
      this.$once('hook:beforeDestroy', ()=>{
        clearInterval(timer)
      })
    },
    methods: {
      fetchData() {
        $.defectFind({claimsNumber: this.$route.query.claimsNumber}).then(res => {
          this.forms = res.data
        })
      },
      fetchWeekData() {
        $.weekLists({claimsNumber: this.$route.query.claimsNumber}).then(res => {
          if (res.success) {
            this.options = []
            for (let i = 0; i < res.data.length; i++) {
              // console.log(i+1)
              var a = i + 1
              this.options.push({value1: res.data[i].weekId, label1: "第" + a + "周"})
            }
            // console.log(res.data)
          }

        })
      },
      defcheckUpdate() {
        $.defectUpdate(this.forms).then(res => {
          if (res.success) {
            this.$message({
              message: "保存成功",
            });
          }
        })
      },
      back() {
        this.$router.push({
          path: "/bus/claims/edit/index",
          query: {claimsNumber: this.$route.query.claimsNumber},
        });
      },
      searchdef(id) {
        if (id == "") {
          this.$message({
            message: "请先选择周",
            type: "error",
          });
          return
        }
        $.weekFinds({weekId: id}).then(res => {
          if (res.success) {
            this.form = res.data
          }
        })
        console.log(id)
        this.dialog = true
      },
      updateForm() {
        $.weekUpdates(this.form).then(res => {
          if (res.success) {
            this.dialog = false
            this.form.defectWeek.defectLostDef = ""
            this.form.defectWeek.defectAgainstDef = ""
            this.form.defectWeek.defectRecord = ""
            this.form.defectWeek.defectPunish = ""
            this.form.defectWeek.defectChangePerf = ""
            this.form.defectWeek.defectCycle = ""
            this.form.defectWeek.defectOccupy = ""
            this.form.defectWeek.defectAgainstPer = ""
            this.form.defectWeek.defectSeizure = ""
            this.form.defectWeek.defectBankTurn = ""
            this.form.defectWeek.defectAssess = ""
            this.form.defectWeek.defectTransact = ""
            this.form.defectWeek.defectCreditCont = ""
            this.form.defectWeek.defectCollectInfo = ""
            this.form.defectWeek.defectAgainstRel = ""
            this.form.defectWeek.defectContinge = ""
            this.form.defectWeek.defectAssetNature = ""
            this.form.defectWeek.defectDamage = ""
            this.form.defectWeek.defectLoss = ""
            this.form.defectWeek.defectUse = ""
            this.form.defectWeek.defectCertific = ""
            this.form.defectWeek.defectSurvey = ""
            this.form.defectWeek.defectDisposal = ""
            this.form.defectWeek.defectAssetInvest = ""
            this.form.defectWeek.defectAssetArea = ""
            this.form.defectWeek.defectTaxeFee = ""
            this.form.defectWeek.defectMiscellaFee = ""
            this.form.defectWeek.defectConstruct = ""
            this.form.defectWeek.defectLandRent = ""
            this.form.defectWeek.defectLandTrans = ""
            this.form.defectWeek.defectBackPay = ""
            this.form.defectWeek.defectPlaceFee = ""
            this.form.defectWeek.defectPolicy = ""
            this.form.defectWeek.defectOther = ""
            this.form.weekId = ""
            this.fetchWeekData()
            this.$message({
              message: "修改成功",
              type: "success",
            });
          }
        })
      },
      addForm() {
        $.weekInsert(this.form).then(res => {
          if (res.success) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.form.defectWeek.defectLostDef = ""
            this.form.defectWeek.defectAgainstDef = ""
            this.form.defectWeek.defectRecord = ""
            this.form.defectWeek.defectPunish = ""
            this.form.defectWeek.defectChangePerf = ""
            this.form.defectWeek.defectCycle = ""
            this.form.defectWeek.defectOccupy = ""
            this.form.defectWeek.defectAgainstPer = ""
            this.form.defectWeek.defectSeizure = ""
            this.form.defectWeek.defectBankTurn = ""
            this.form.defectWeek.defectAssess = ""
            this.form.defectWeek.defectTransact = ""
            this.form.defectWeek.defectCreditCont = ""
            this.form.defectWeek.defectCollectInfo = ""
            this.form.defectWeek.defectAgainstRel = ""
            this.form.defectWeek.defectContinge = ""
            this.form.defectWeek.defectAssetNature = ""
            this.form.defectWeek.defectDamage = ""
            this.form.defectWeek.defectLoss = ""
            this.form.defectWeek.defectUse = ""
            this.form.defectWeek.defectCertific = ""
            this.form.defectWeek.defectSurvey = ""
            this.form.defectWeek.defectDisposal = ""
            this.form.defectWeek.defectAssetInvest = ""
            this.form.defectWeek.defectAssetArea = ""
            this.form.defectWeek.defectTaxeFee = ""
            this.form.defectWeek.defectMiscellaFee = ""
            this.form.defectWeek.defectConstruct = ""
            this.form.defectWeek.defectLandRent = ""
            this.form.defectWeek.defectLandTrans = ""
            this.form.defectWeek.defectBackPay = ""
            this.form.defectWeek.defectPlaceFee = ""
            this.form.defectWeek.defectPolicy = ""
            this.form.defectWeek.defectOther = ""
            this.fetchWeekData()
          }
        })
        this.dialog = false
      },
      cancelForm() {
        this.dialog = false;
        this.form.defectWeek.defectLostDef = ""
        this.form.defectWeek.defectAgainstDef = ""
        this.form.defectWeek.defectRecord = ""
        this.form.defectWeek.defectPunish = ""
        this.form.defectWeek.defectChangePerf = ""
        this.form.defectWeek.defectCycle = ""
        this.form.defectWeek.defectOccupy = ""
        this.form.defectWeek.defectAgainstPer = ""
        this.form.defectWeek.defectSeizure = ""
        this.form.defectWeek.defectBankTurn = ""
        this.form.defectWeek.defectAssess = ""
        this.form.defectWeek.defectTransact = ""
        this.form.defectWeek.defectCreditCont = ""
        this.form.defectWeek.defectCollectInfo = ""
        this.form.defectWeek.defectAgainstRel = ""
        this.form.defectWeek.defectContinge = ""
        this.form.defectWeek.defectAssetNature = ""
        this.form.defectWeek.defectDamage = ""
        this.form.defectWeek.defectLoss = ""
        this.form.defectWeek.defectUse = ""
        this.form.defectWeek.defectCertific = ""
        this.form.defectWeek.defectSurvey = ""
        this.form.defectWeek.defectDisposal = ""
        this.form.defectWeek.defectAssetInvest = ""
        this.form.defectWeek.defectAssetArea = ""
        this.form.defectWeek.defectTaxeFee = ""
        this.form.defectWeek.defectMiscellaFee = ""
        this.form.defectWeek.defectConstruct = ""
        this.form.defectWeek.defectLandRent = ""
        this.form.defectWeek.defectLandTrans = ""
        this.form.defectWeek.defectBackPay = ""
        this.form.defectWeek.defectPlaceFee = ""
        this.form.defectWeek.defectPolicy = ""
        this.form.defectWeek.defectOther = ""
        this.form.weekId = ""
        this.fetchWeekData()
      },
    },
  };
</script>
<style scoped>
  #defecta {
    width: 100%;
    align: center;
    margin: 0 auto
  }

  table, th, td {
    text-align: center;
    vertical-align: middle !important; /*!important用来提高当前设置的优先级*/
  }
</style>
