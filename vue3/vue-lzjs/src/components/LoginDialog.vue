<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
    <el-form-item lable="zhanghao">
        <el-input v-model="loginForm.username"></el-input>
    </el-form-item> 
    <el-form-item lable="mima">
        <el-input type='password' v-model="loginForm.password"></el-input>
    </el-form-item>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ["visible"],
  data() {
    return {
      dialogVisible: false,
      loginForm:{
        username:null,
        password:null
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style></style>
