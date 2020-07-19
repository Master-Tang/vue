<template>
<div class="my-padding">
  <el-form ref="form" :model="form" label-width="5rem">
    <el-form-item>
      <span slot="label">
        产证号
        <span class="red">*</span>
      </span>
      <el-input v-model="form.otherProd" type="text" placeholder="请输入产证号"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">类型</span>
      <el-select v-model="form.otherType" placeholder="请选择类型" style="width:100%">
        <el-option
          v-for="item in highlightList"
          :key="item.dicValue"
          :label="item.dicKey"
          :value="item.dicValue"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <span slot="label">描述</span>
      <el-input v-model="form.describe" type="text" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">备注</span>
      <el-input v-model="form.note" type="text" placeholder="请输入备注"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addother" v-if="form.otherId==null">保存</el-button>
      <el-button type="warning" @click="updateother" v-if="form.otherId!=null">更改</el-button>
      <el-button @click="cencelother">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import $ from "@/api/bus";
export default {
  data() {
    return {
      activeName: "first",
      act: "first",
      acte: "first",
      form: {
        busType: "01",
        otherId: "",
        otherProd: "",
        otherType: "",
        describe: "",
        note: "",
        number: "",
        collateralId: ""
      },
      claimsNumber: "",
      highlightList: []
    };
  },
  created() {
    this.claimsNumber = this.$route.query.id;
    this.form.collateralId = this.$route.query.id;
    this.form.otherId = this.$route.query.otherId;
    $.addInit().then(res => {
      if (res.success) {
        this.highlightList = res.data.highlightList;
      }
    });
    $.other({ otherId: this.$route.query.otherId}).then(res => {
      if (res.success) {
        if(res.data!=null){
        // console.log(res.data)
        this.form = res.data;
        }
      }
    });
  },
  methods: {
    addother() {
      if (!this.validate()) return;
      $.addother(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该产证号已存在,请勿重复添加"
          });
        } else {
          this.form.propertyId = response.data;
          // console.log(response.data)
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "forth",
              claimsNumber: this.claimsNumber
            }
          });
        }
      });
    },
    cencelother() {
      this.$router.push({
        path: "index",
        query: {
          activeName: "forth",
          claimsNumber: this.claimsNumber
        }
      });
    },
    updateother() {
      if (!this.validate()) return;
      $.updateother(this.form).then(response => {
        if (response.data == "已存在") {
          this.$message({
            type: "error",
            message: "该产证号已存在,请重新更改"
          });
        } else {
          this.$message({
            type:"success",
            message: "该信息已更改"
          });
          this.$router.replace({
            path: "index",
            query: {
              activeName: "forth",
              claimsNumber: this.claimsNumber
            }
          });
        }
      });
    },
    validate() {
      let error = "";
      if (this.form.otherProd.length == 0) {
        error = "产证号必填\n";
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

<style>
.red {
  color: red;
  font-size: 1.5rem;
  vertical-align: middle;
}
</style>