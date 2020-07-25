<template>
  <div class="my-padding">
    <el-tabs v-model="act" stretch>
      <el-tab-pane label="保证人估值" name="first">
        <el-form ref="form1" :model="form1" label-width="7rem">
          <el-form-item>
            <span slot="label">保证人</span>
            <el-select v-model="form1.legalId" placeholder="请选择保证人" style="width:100%">
              <el-option
                v-for="item in borrowers"
                :key="item.legalId"
                :label="item.corporateRepresent"
                :value="item.legalId"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span slot="label">保守回现(万元)</span>
            <el-input v-model="form1.conservativeMoney" placeholder="保守回现(万元)"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">乐观回现(万元)</span>
            <el-input v-model="form1.optimisticMoney" placeholder="乐观回现(万元)"></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label">依据</span>
            <el-input v-model="form1.basis" placeholder="依据"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="guaval">加入估值</el-button>
          </el-form-item>
        </el-form>
        <el-table id="myform" :data="guavalList" border fit show-summary style="width: 100%">
          <el-table-column prop="a" align="center"></el-table-column>
          <el-table-column prop="name" label="保证人" align="center"></el-table-column>
          <el-table-column prop="conservativeMoney" label="保守回现(万元)" sortable align="center"></el-table-column>
          <el-table-column prop="optimisticMoney" label="乐观回现(万元)" sortable align="center"></el-table-column>
          <el-table-column label="依据" align="center">
            <template slot-scope="scope">{{ scope.row.basis }}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="资产估值" name="second">
        <el-table id="myform" :data="assetsValList" border fit style="width: 100%">
          <el-table-column prop="a" label="序号" align="center" width="60rem"></el-table-column>
          <el-table-column prop="address" label="抵押物描述（包括地址／楼盘名称）" align="center" width="300rem"></el-table-column>
          <el-table-column prop="mortgageType" label="抵/质押物类型" align="center"></el-table-column>
          <el-table-column prop="city" label="抵押物所在省市" align="center"></el-table-column>
          <el-table-column prop="owner" label="抵押人" align="center"></el-table-column>
          <el-table-column label="详情页" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="完善资产详情" placement="top">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="xiangqing(scope.row.collateralId)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="估值" placement="top">
                <el-button
                  type="info"
                  icon="el-icon-search"
                  circle
                  @click="assetVal(scope.row.collateralId)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="资产详情"
          :visible.sync="dialogTableVisible"
          center
          :append-to-body="true"
          :lock-scroll="false"
          width="100%"
        >
          <el-form v-model="form2">
            <el-row style="margin-bottom:2rem">
              <el-col :span="8">
                <span>抵押物描述（包括地址／楼盘名称）:</span>
                {{form2.address}}
              </el-col>
              <el-col :span="8">
                <span>抵/质押物类型:</span>
                {{form2.mortgageType}}
              </el-col>
              <el-col :span="8">
                <span>抵押物所在省市:</span>
                {{form2.city+""}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="8" style="padding-top:0.7rem">
                <span>抵押人:</span>
                {{form2.owner}}
              </el-col>
              <el-col :span="8">
                <span>抵押物拍卖情况:</span>
                <el-select v-model="form2.auctions" placeholder="请选择拍卖情况" style="width:50%">
                  <el-option
                    v-for="item in auctionList"
                    :key="item.dicValue"
                    :label="item.dicKey"
                    :value="item.dicValue"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="8" style="padding-top:0.7rem">
                <span>抵（质）押物对应债权:</span>
                {{form2.claimsMoney}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="8">
                <span>最高额抵押金额:</span>
                {{form2.maxMort}}
              </el-col>
              <el-col :span="8">
                <span>抵押顺位:</span>
                {{form2.sequenceMort}}
              </el-col>
              <el-col :span="8">
                <span>前序顺位抵押金额:</span>
                {{form2.orderMort}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="8">
                <span>房产面积:</span>
                {{form2.propertyArea}}
              </el-col>
              <el-col :span="8">
                <span>土地面积:</span>
                {{form2.landArea}}
              </el-col>
              <el-col :span="8">
                <span>其他数量:</span>
                {{form2.otherNumbers}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="6" style="padding-top:0.7rem">
                <span>抵质押物情况（银行信息，尽调信息）:</span>
              </el-col>
              <el-col :span="18">
                <el-input v-model="form2.infos" placeholder="请输入抵质押物情况（银行信息，尽调信息）"></el-input>
              </el-col>
            </el-row>
            <!-- <el-form-item align="center">
                <el-button type="primary" @click="xiangqing(form2.collateralId)">完善详情</el-button>
            </el-form-item>-->
          </el-form>
          <div>
            <h3>房产估值</h3>
            <el-form v-model="form3">
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>参考价（元／㎡):</span>
                  <el-input
                    v-model="form3.referencePrice"
                    placeholder="请输入参考价（元／㎡)"
                    style="width:50%"
                  ></el-input>
                  {{"元/m²"}}
                </el-col>
                <el-col :span="12">
                  <span>变现系数——保守:</span>
                  <el-input v-model="form3.conservative" placeholder="请输入保守变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12" style="padding-top:0.7rem">
                  <span>变现系数——乐观:</span>
                  <el-input v-model="form3.optimistic" placeholder="请输入乐观变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>估值依据:</span>
                  <el-input v-model="form3.basisValue" placeholder="请输入估值依据" style="width:58%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>保守分析——税率:</span>
                  <el-input
                    v-model="form3.conservativeRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>乐观分析——税率:</span>
                  <el-input
                    v-model="form3.optimisticRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <h3>土地估值</h3>
            <el-form v-model="form4">
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>参考价（元／㎡):</span>
                  <el-input
                    v-model="form4.referencePrice"
                    placeholder="请输入参考价（元／㎡)"
                    style="width:50%"
                  ></el-input>
                  {{"元/m²"}}
                </el-col>
                <el-col :span="12">
                  <span>变现系数——保守:</span>
                  <el-input v-model="form4.conservative" placeholder="请输入保守变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12" style="padding-top:0.7rem">
                  <span>变现系数——乐观:</span>
                  <el-input v-model="form4.optimistic" placeholder="请输入乐观变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>估值依据:</span>
                  <el-input v-model="form4.basisValue" placeholder="请输入估值依据" style="width:58%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>保守分析——税率:</span>
                  <el-input
                    v-model="form4.conservativeRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>乐观分析——税率:</span>
                  <el-input
                    v-model="form4.optimisticRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <h3>其他估值</h3>
            <el-form v-model="form5">
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>参考价（元／㎡):</span>
                  <el-input
                    v-model="form5.referencePrice"
                    placeholder="请输入参考价（元／㎡)"
                    style="width:50%"
                  ></el-input>
                  {{"元/m²"}}
                </el-col>
                <el-col :span="12">
                  <span>变现系数——保守:</span>
                  <el-input v-model="form5.conservative" placeholder="请输入保守变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12" style="padding-top:0.7rem">
                  <span>变现系数——乐观:</span>
                  <el-input v-model="form5.optimistic" placeholder="请输入乐观变现系数" style="width:50%"></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>估值依据:</span>
                  <el-input v-model="form5.basisValue" placeholder="请输入估值依据" style="width:58%"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:2rem">
                <el-col :span="12">
                  <span>保守分析——税率:</span>
                  <el-input
                    v-model="form5.conservativeRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
                <el-col :span="12">
                  <span>乐观分析——税率:</span>
                  <el-input
                    v-model="form5.optimisticRate"
                    placeholder="请输入抵质押物情况（银行信息，尽调信息）"
                    style="width:50%"
                  ></el-input>
                  {{"%"}}
                </el-col>
              </el-row>
              <el-form-item align="center">
                <el-button type="primary" @click="assetsUpdate()">完善详情</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
        <div class="my-padding">
          <el-table :data="dataList" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="面积(m²)">
                    <span>{{ props.row.area }}</span>
                  </el-form-item>
                  <el-form-item label="参考价(元／㎡)">
                    <span>{{ props.row.referencePrice }}</span>
                  </el-form-item>
                  <el-form-item label="保守（变现系数）">
                    <span>{{ props.row.conservative +"%"}}</span>
                  </el-form-item>
                  <el-form-item label="乐观（变现系数）">
                    <span>{{ props.row.optimistic+"%" }}</span>
                  </el-form-item>
                  <el-form-item label="土地变现单价——保守值(元／㎡)">
                    <span>{{ props.row.conservativeValue }}</span>
                  </el-form-item>
                  <el-form-item label="土地变现单价——乐观值(元／㎡)">
                    <span>{{ props.row.optimisticValue }}</span>
                  </el-form-item>
                  <el-form-item label="估值依据">
                    <span>{{ props.row.basisValue }}</span>
                  </el-form-item>
                  <el-form-item label="保守分析——抵质押物总价(变现,万元)">
                    <span>{{ props.row.conservativeAll }}</span>
                  </el-form-item>
                  <el-form-item label="保守分析——税率">
                    <span>{{ props.row.conservativeRate +"%"}}</span>
                  </el-form-item>
                  <el-form-item label="保守分析——税后价值(万元) ">
                    <span>{{ props.row.conservativeAfter }}</span>
                  </el-form-item>
                  <el-form-item label="保守分析——抵押债权内的抵质押物价值(万元)">
                    <span>{{ props.row.conservativeIn }}</span>
                  </el-form-item>
                  <el-form-item label="乐观分析——抵质押物总价(变现,万元)">
                    <span>{{ props.row.optimisticAll }}</span>
                  </el-form-item>
                  <el-form-item label="乐观分析——税率">
                    <span>{{ props.row.optimisticRate+"%" }}</span>
                  </el-form-item>
                  <el-form-item label="乐观分析——税后价值(万元)">
                    <span>{{ props.row.optimisticAfter }}</span>
                  </el-form-item>
                  <el-form-item label="乐观分析——抵押债权内的抵质押物价值(万元)">
                    <span>{{ props.row.optimisticIn }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="类型" prop="a"></el-table-column>
            <el-table-column label="面积（㎡)" prop="area"></el-table-column>
            <el-table-column label="参考价（元／㎡)" prop="referencePrice"></el-table-column>
            <el-table-column label="估值依据" prop="basisValue"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="项目信息" name="third">
        <div class="my-padding">
          <div align="center">
            <h3>项目信息</h3>
          </div>
          <el-form v-model="form">
            <el-row style="margin-bottom:2rem">
              <el-col :span="8">
                <span>本金(万元):</span>
                {{form.balanTotal}}
              </el-col>
              <el-col :span="8">
                <span>利息(万元):</span>
                {{form.interTotal}}
              </el-col>
              <el-col :span="8">
                <span>其他(万元):</span>
                {{form.otherAmo}}
              </el-col>
            </el-row>
            <el-row style="margin-bottom:2rem">
              <el-col :span="8" style="margin-top:0.7rem">
                <span>合计金额(万元):</span>
                {{form.subToal}}
              </el-col>
              <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" style="margin-top:0.7rem">
                <span>包内现金(万元):</span>
              </el-col>
              <el-col :xs="4" :sm="6" :md="8" :lg="5" :xl="11">
                <el-input v-model="form.cashBag" placeholder="请输入包内现金(万元)" @change="cashBagChange"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <span>担保人:</span>
                <el-button type="text" @click="promise = true">查看所有担保人</el-button>
              </el-col>
            </el-row>
          </el-form>

          <el-drawer :visible.sync="promise" size="20%">
            <el-table
              id="myform"
              :data="borrowers"
              element-loading-text="Loading"
              border
              fit
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column label="担保人名称" align="center">
                <template slot-scope="scope">{{ scope.row.corporateRepresent }}</template>
              </el-table-column>
            </el-table>
          </el-drawer>
        </div>
        <div class="my-padding">
          <div align="center">
            <h3>项目估值</h3>
          </div>
          <el-row style="margin-bottom:2rem">
            <el-col :push="4" :span="5" align="center">{{"保证人回现"}}</el-col>
            <el-col :push="4" :span="5" align="center">{{"资产回现"}}</el-col>
            <el-col :push="4" :span="5" align="center">{{"包内现金"}}</el-col>
            <el-col :push="4" :span="5" align="center">{{"综合估值"}}</el-col>
          </el-row>
          <el-row style="margin-bottom:2rem">
            <el-col :span="4" align="center">{{"保守"}}</el-col>
            <el-col :span="5" align="center">{{form6.guacon}}</el-col>
            <el-col :span="5" align="center">{{form6.asscon}}</el-col>
            <el-col :span="5" align="center">{{form6.pacmoney}}</el-col>
            <el-col :span="5" align="center">{{form6.guacon+form6.asscon+form6.pacmoney}}</el-col>
          </el-row>
          <el-row style="margin-bottom:2rem">
            <el-col :span="4" align="center">{{"乐观"}}</el-col>
            <el-col :span="5" align="center">{{form6.guaopt}}</el-col>
            <el-col :span="5" align="center">{{form6.assopt}}</el-col>
            <el-col :span="5" align="center">{{form6.pacmoney}}</el-col>
            <el-col :span="5" align="center">{{form6.guaopt+form6.assopt+form6.pacmoney}}</el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import $ from "@/api/valuation";

export default {
  data() {
    return {
      promise: false,
      act: "first",
      dialogTableVisible: false,
      claimsNumber: "",
      //项目信息
      form: {
        //本金余额
        balanTotal: "",
        //利息余额
        interTotal: "",
        //其他金额
        otherAmo: "",
        //合计
        subToal: "",
        cashBag: ""
      },
      //保证人估值
      form1: {
        //保证人id
        legalId: "",
        //保守回现
        conservativeMoney: "",
        //乐观回现
        optimisticMoney: "",
        //依据
        basis: "",
        claimsNumber: ""
      },
      //资产估值
      form2: {
        address: "",
        mortgageType: "",
        city: [],
        owner: "",
        //抵押物拍卖情况
        auctions: "",
        //抵（质）押物对应债权
        claimsMoney: "",
        //最高额抵押金额
        maxMort: "",
        //抵押顺位
        sequenceMort: "",
        //前序顺位抵押金额
        orderMort: "",
        //房产面积
        propertyArea: "",
        //土地面积
        landArea: "",
        //其他数量
        otherNumbers: "",
        infos: "",
        collateralId: ""
      },
      //土地，房产，其他
      form3: {
        assetsId: "",
        collateralId: "",
        //类型
        mortgageType: "",
        //面积
        area: "",
        //参考价
        referencePrice: "",
        //保守（变现系数）
        conservative: "",
        //乐观（变现系数）
        optimistic: "",
        //保守值
        conservativeValue: "",
        //乐观值
        optimisticValue: "",
        //估值依据
        basisValue: "",
        //抵质押物总价
        conservativeAll: "",
        //税率 保守分析
        conservativeRate: "",
        //税后价值 保守分析
        pconservativeAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        conservativeIn: "",
        //抵质押物总价 乐观分析
        optimisticAll: "",
        //税率 乐观分析
        optimisticRate: "",
        //税后价值 乐观分析
        optimisticAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        optimisticIn: ""
      },
      form4: {
        assetsId: "",
        collateralId: "",
        //类型
        mortgageType: "",
        //面积
        area: "",
        //参考价
        referencePrice: "",
        //保守（变现系数）
        conservative: "",
        //乐观（变现系数）
        optimistic: "",
        //保守值
        conservativeValue: "",
        //乐观值
        optimisticValue: "",
        //估值依据
        basisValue: "",
        //抵质押物总价
        conservativeAll: "",
        //税率 保守分析
        conservativeRate: "",
        //税后价值 保守分析
        pconservativeAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        conservativeIn: "",
        //抵质押物总价 乐观分析
        optimisticAll: "",
        //税率 乐观分析
        optimisticRate: "",
        //税后价值 乐观分析
        optimisticAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        optimisticIn: ""
      },
      form5: {
        assetsId: "",
        collateralId: "",
        //类型
        mortgageType: "",
        //面积
        area: "",
        //参考价
        referencePrice: "",
        //保守（变现系数）
        conservative: "",
        //乐观（变现系数）
        optimistic: "",
        //保守值
        conservativeValue: "",
        //乐观值
        optimisticValue: "",
        //估值依据
        basisValue: "",
        //抵质押物总价
        conservativeAll: "",
        //税率 保守分析
        conservativeRate: "",
        //税后价值 保守分析
        pconservativeAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        conservativeIn: "",
        //抵质押物总价 乐观分析
        optimisticAll: "",
        //税率 乐观分析
        optimisticRate: "",
        //税后价值 乐观分析
        optimisticAfter: "",
        //抵押债权内的抵质押物价值 保守分析
        optimisticIn: ""
      },
      form6: {
        //保证人保守
        guacon: 0,
        //保证人乐观
        guaopt: 0,
        //资产保守
        asscon: 0,
        //资产乐观
        assopt: 0,
        //包内现金
        pacmoney: 0
      },
      borrowers: [],
      guavalList: [],
      assetsValList: [],
      auctionList: [],
      dataList: []
    };
  },

  created() {
    this.claimsNumber = this.$route.query.claimsNumber;
    this.form1.claimsNumber = this.$route.query.claimsNumber;
    // console.log(this.claimsNumber);
    $.addInit().then(res => {
      if (res.success) {
        this.auctionList = res.data.auctionList;
      }
    });
    //获取所有信息
    $.packeValue({ claimsNumber: this.claimsNumber }).then(res => {
      if (res.success) {
        this.form = res.data;
        this.form6.pacmoney=this.form.cashBag
        // console.log(res.data);
      }
    });
    //获取所有保证人名字
    $.guarantorList({ claimsNumber: this.claimsNumber }).then(res => {
      if (res.success) {
        // console.log(res.data);
        this.borrowers = res.data;
      }
    });
    //获取所有保证人估值信息
    this.valueList();
    //查询所有资产估值
    $.assetList({ claimsNumber: this.claimsNumber }).then(res => {
      if (res.success) {
        // console.log(res.data);
        this.assetsValList = res.data;
        for (var i = 1; i <= this.assetsValList.length; i++) {
          this.$set(this.assetsValList[i - 1], "a", i);
        }
      }
    });
  },

  methods: {
    //包内现金
    cashBagChange() {
      $.updateCash({cashBag:this.form.cashBag,claimsNumber:this.claimsNumber}).then(res => {
          if(res.success){
              this.form6.pacmoney=this.form.cashBag
          }
      });
    },
    valueList() {
      $.valueList({ claimsNumber: this.$route.query.claimsNumber }).then(
        res => {
          if (res.success) {
            // console.log(res.data);
            this.guavalList = res.data;
            var a = 0,
              b = 0;
            for (var i = 1; i <= this.guavalList.length; i++) {
              this.$set(this.guavalList[i - 1], "a", "保证人" + i);
              a += res.data[i - 1].conservativeMoney;
              b += res.data[i - 1].optimisticMoney;
            }
            this.form6.guacon = a;
            this.form6.guaopt = b;
          }
        }
      );
    },
    //资产详情
    xiangqing(id) {
      this.dialogTableVisible = true;
      $.assetDto({ claimsNumber: this.claimsNumber, collateralId: id }).then(
        res => {
          if (res.success) {
            this.form2 = res.data;
          }
        }
      );
      $.AssetsvalueList({ collateralId: id }).then(res => {
        this.form3 = res.data[0];
        this.form4 = res.data[1];
        this.form5 = res.data[2];
        //   console.log(res.data)
      });
    },
    //保证人估值
    guaval() {
      var a = false;
      for (let iterator of this.guavalList) {
        if (this.form1.legalId == iterator.legalId) {
          a = true;
        }
      }
      if (a == true) {
        // console.log("更新");
        // console.log(this.form1);
        $.valueUpdate(this.form1).then(res => {
          if (res.success) {
            this.form1.legalId = "";
            this.form1.conservativeMoney = "";
            this.form1.optimisticMoney = "";
            this.form1.basis = "";
            this.$message({
              message: "估值成功",
              type: "success"
            });
            this.valueList();
          }
        });
      } else {
        // console.log("插入");
        // console.log(this.form1);
        $.valueAdd(this.form1).then(res => {
          if (res.success) {
            this.form1.legalId = "";
            this.form1.conservativeMoney = "";
            this.form1.optimisticMoney = "";
            this.form1.basis = "";
            this.$message({
              message: "估值成功",
              type: "success"
            });
            this.valueList();
          }
        });
      }
    },
    //资产估值
    assetVal(id) {
      $.AssetsvalueList({ collateralId: id }).then(res => {
        this.dataList = res.data;
        this.$set(this.dataList[0], "a", "房产");
        this.$set(this.dataList[1], "a", "土地");
        this.$set(this.dataList[2], "a", "其他");
        var a = 0,
          b = 0;
        for (var i = 0; i < this.dataList.length; i++) {
          a += res.data[i].conservativeIn;
          b += res.data[i].optimisticIn;
        }
        this.form6.asscon = a;
        this.form6.assopt = b;
      });
    },
    //资产信息完善
    assetsUpdate() {
      $.update({
        auctions: this.form2.auctions,
        infos: this.form2.infos,
        collateralId: this.form2.collateralId
      }).then(res => {
        if (res.success) {
        //   console.log("基础信息更改成功");
        }
      });
      $.AssvalueUpdate(this.form3).then(res => {
        // console.log("房产更新成功");
      });
      $.AssvalueUpdate(this.form4).then(res => {
        // console.log("土地更新成功");
      });
      $.AssvalueUpdate(this.form5).then(res => {
        // console.log("其他更新成功");
      });
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>