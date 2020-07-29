<template>
<div class="my-padding">
  <el-form ref="form" :model="form" label-width="7rem">
    <el-form-item>
      <span slot="label">
        类型
        <span class="red">*</span>
      </span>
      <el-select v-model="form.claimsType" placeholder="请选择类型" style="width:100%">
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
      <el-input v-model="form.describes" type="text" placeholder="请输入亮点描述"></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">亮点价值(元)</span>
      <el-input
        v-model="form.value"
        type="text"
        placeholder="请输入亮点价值"
        oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <span slot="label">依据</span>
      <el-input v-model="form.basis" type="text" placeholder="请输入依据"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addlight" v-if="form.lightId==null">保存</el-button>
      <el-button type="warning" @click="updatelight" v-if="form.lightId!=null">更改</el-button>
      <el-button @click="cencellight">取消</el-button>
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
        lightId: "",
        highlightList: "",
        describes: "",
        value: "",
        basis: "",
        claimsNumber: "",
        claimsType: ""
      },
      highlightList: []
    };
  },

  created() {
    this.form.claimsNumber = this.$route.query.id;
    this.form.lightId = this.$route.query.lightId;
    $.addInit().then(res => {
      if (res.success) {
        this.highlightList = res.data.highlightList;
      }
    });
    $.light({ lightId: this.$route.query.lightId }).then(res => {
      if (res.success) {
        if (res.data != null) {
          // console.log(res.data)
          this.form = res.data;
        }
      }
    });
  },
  methods: {
    addlight() {
      if (!this.validate()) return;
      $.addlight(this.form).then(response => {
        this.form.lightId = response.data;
        // console.log(response.data)
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.$router.replace({
          path: "add",
          query: {
            activeName: "fifth",
            claimsNumber: this.form.claimsNumber
          }
        });
      });
    },
    updatelight() {
      if (!this.validate()) return;
      $.updatelight(this.form).then(response => {
        if (response.data == "无此信息") {
          this.$message({
            type: "error",
            message: "请先保存"
          });
        } else {
          this.$message({
            type: "success",
            message: "更改成功"
          });
          this.$router.replace({
            path: "add",
            query: {
              activeName: "fifth",
              claimsNumber: this.form.claimsNumber
            }
          });
        }
      });
    },
    cencellight() {
      this.$router.push({
        path: "add",
        query: { activeName: "fifth", claimsNumber: this.form.claimsNumber }
      });
    },
    validate() {
      let error = "";
      if (this.form.claimsType.length == 0) {
        error = "类型必选\n";
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
