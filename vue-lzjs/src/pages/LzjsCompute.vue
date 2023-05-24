<template>
  <lzjsheader />
  <div class="app-container">
    <!-- <img src="../assets/gate/H.png" alt="" /> -->
    <ul>
      <li v-for="(item, index) in imglist" :key="index">
        <img :src="item.url" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import lzjsheader from "../components/LzjsHeader";
export default {
  components: {
    lzjsheader,
  },
  setup() {
    const imglist = [
      {
        name: "H",
        url: require("../assets/gate/H.png"),
      },
      {
        name: "X",
        url: require("../assets/gate/X.png"),
      },
      {
        name: "Y",
        url: require("../assets/gate/Y.png"),
      },
      {
        name: "Z",
        url: require("../assets/gate/Z.png"),
      },
    ];
    return {
      imglist,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  ul {
    list-style-type: none;
    display:block;
    li{
      display:inline-block;
      padding-left:10px;
    }
  }
}
</style>
