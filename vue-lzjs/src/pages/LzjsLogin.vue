<template>
  <lzjsheader />
  <div class="login">
    <el-form
      label-width="120px"
      :model="loginForm"
      class="ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin">Submit</el-button>
        <el-button @click="clearData">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import lzjsheader from "../components/LzjsHeader";
export default {
  components: {
    lzjsheader,
  },
  setup() {
    const userLogin = () => {
      console.log(loginForm);
    };

    const loginForm = reactive({
      username: "",
      password: "",
    });
    const clearData=()=>{
        loginForm.username = '';
        loginForm.password = '';
    };
    return {
      userLogin,
      loginForm,
      clearData,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  left: 1200px;
  top: 400px;
  .ruleForm {
    .el-input {
      width: 350px;
    }
  }
}
</style>
