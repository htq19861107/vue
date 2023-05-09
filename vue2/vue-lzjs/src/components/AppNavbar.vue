<template>
  <div class="navbar">左侧区域</div>
</template>
<script>
export default {
  name: "AppNavbar",
};
</script>
<style scoped>
.navbar {
  position: absolute;
  width: 200px;
  top: 60px; /* 距离上面50像素 */
  left: 0px;
  bottom: 0px;
  overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
  background-color: #545c64;
}
</style>
