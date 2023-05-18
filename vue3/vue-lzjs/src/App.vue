<template>
  <div class="Apphome">
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from "./components/AppHeader";
import AppNavbar from "./components/AppNavbar";
import AppMain from "./components/AppMain";
import AppFooter from "./components/AppFooter";

// 导入子组件，缩写格式 AppHeader: AppHeader
export default {
  components: { AppHeader, AppNavbar, AppMain, AppFooter }, // 有s
};
</script>
<style scoped>
.Apphome{
  width:1500;
  display: block;
}
</style>
