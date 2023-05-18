<template>
  <div class="main">
    <router-link to="/home">home</router-link>
    <router-link to="/home1">home1</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AppMain",
};
</script>
<style scoped>
.main {
  position: absolute;
  top: 60px;
  left: 200px;
  bottom: 0px;
  right: 0px; 
  /* padding: 10px; */
  overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
  background-color: rgb(10, 212, 57);
}
</style>
