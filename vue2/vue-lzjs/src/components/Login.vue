<template>
  <div class ="login">
    <input type="text" v-model="loginForm.username" placehoder="用户名" />
    <input type="password" v-model="loginForm.password" placehoder="密码" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
//import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        passWord: "",
      },
    };
  },
  methods: {
    login() {
      let _this = this;
      if (this.loginForm.userName === "" || this.loginForm.passWord == "") {
        alert("账号或者密码不能为空！");
      }else{
        this.axios({
            method:'post',
            url:'/user/login',
            data:_this.loginForm
        }).then(res =>{
            console.log(res.data);
            _this.userToken='Bearer' + res.data.data.body.token;
            //将用户token保存到vuex中
            _this.changeLogin({Authorization:_this.userToken});
            _this.$router.push('/home');
            alert('登录成功！')
        }).catch(error => {
            alert('账号或者密码错误！');
            console.log(error);

        })
      }
    },
  },
};
</script>

<style></style>
