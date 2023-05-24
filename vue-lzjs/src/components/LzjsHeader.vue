<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <div class="nav">
      <img src="../assets/logo.png" />
      <div class="nav-item">
        <span class="nav-item-title" @click="toHome">量子首页</span>
      </div>
      <div class="nav-item">
        <span class="nav-item-title">产品中心</span>
        <!-- 下拉菜单 -->
        <div class="dropdown-content">
          <div class="dropdown-menu">
            <div
              class="menuItem"
              v-for="(item, index) in productlist"
              @click="toUrl(item.path)"
              :key="index"
            >
              {{ item.name }}-{{ index }}
            </div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <span class="nav-item-title">解决方案</span>
        <!-- 下拉菜单 -->
        <div class="dropdown-content">
          <div class="dropdown-menu">
            <div
              class="menuItem"
              v-for="(item, index) in productlist"
              @click="toUrl(item.path)"
              :key="index"
            >
              {{ item.name }}-{{ index }}
            </div>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <span class="nav-item-title">公司简介</span>
      </div>
      <div class="nav-item"><span class="nav-item-title">新闻资讯</span></div>
      <el-button class="btn-login" @click="toLogin" type="primary" size="large">login</el-button
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const productlist = [
      { name: "菜单1", path: "./lzjshome" },
      { name: "菜单2", path: "./lzjshome" },
      { name: "菜单3", path: "./lzjslogin" },
    ];
    const toHome = () => {
      router.push("./lzjshome");
    };
    const toLogin = () => {
      router.push("./lzjslogin");
    };
    const toUrl = (param) => {
      console.log(param);
      router.push(param);
    };
    return {
      productlist,
      router,
      toHome,
      toLogin,
      toUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: reactive;
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  .img {
    display: inline-block;
  }
  .nav-item {
    position: relative;
    width: 200px;
    white-space: nowrap;
    margin: 0 20px;
    cursor: pointer;
    transition: all 0.3s linear;

    .nav-item-title {
      position: relative;
      display: inline-block;
      height: inherit;
      width: inherit;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: #1678e9;
        transform: scale(0);
        transition: all 0.4s linear;
      }

      &:hover {
        color: #1678e9;
        &::before {
          transform: scale(1);
        }
      }
    }
    &:hover .dropdown-content {
      height: 400px;
    }
  }

  // 下拉菜单
  .dropdown-content {
    position: relative;
    top: 0px; // 为导航栏高度
    left: 0px; // 设置为0, 不然会直接定位到父元素下方
    width: 100%;
    height: 0; // 下拉初始高度
    overflow: hidden;
    transition: 0.6s;

    .dropdown-menu {
      padding: 10px 8px 15px;
      color: white;
      background-color: rgba($color: #ccc, $alpha: 0.5);
      border-radius: 4px;

      .menuItem {
        width: 100%;
        height: 42px;
        white-space: nowrap;
        padding: 0 16px;
        font-size: 16px;
        line-height: 42px;
        color: #000;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        border-radius: 4px;

        &:hover {
          color: #0b2be0;
        }
      }
    }
  }
  .btn-login {
    position: relative;
    float: right;
    left: 40px;
    top: 10px;
  }
}
</style>
