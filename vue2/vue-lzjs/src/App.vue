<template>
  <el-container class="home-container">
    <!--头部  -->
    <el-header>
      <div>
        <img src="../src/assets/logo.png" alt="" />
        <span>量子計算平台</span>
      </div>
      <!-- 退出按钮 -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区  嵌套容器  包裹 Aside与Main -->
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container> 
    <el-footer>footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    // 退出操作
    logout() {
      // 清空token
      window.sessionStorage.clear();
      //  将登录页面转入到登录界面
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
// 标签的名字就是类的名字
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  //  居中
  align-items: center;
  //  文本颜色
  color: #fff;
  // 文字大小
  font-size: 20px;
  height: 100px;
  // 给header中嵌套的div进行样式改造
  // 子代选择器
  > div {
    display: flex;
    //   纵向居中
    align-items: center;

    //   在给div中的span改造样式
    > span {
      margin-left: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
  max-width: 200px;
  min-height: 900px;
}

.el-main {
  background-color: #eaedf1;
  height: 900px;
}

.el-footer{
  background-color: #42b983;
  height: 100px;
}
</style>
