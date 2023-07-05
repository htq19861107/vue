<template>
  <lzjsheader />
  <button class="btn" @click="test">click</button>
</template>

<script>
import lzjsheader from "../components/LzjsHeader";
export default {
  components: {
    lzjsheader,
  },
  setup(){
    const utils = require('utility')
    const test = ()=>{
      let reslt = utils.md5('pwd' + 'salt');
      console.log(reslt)
    }
    return {
      test
    }
  }
};
</script>

<style lang="scss" scoped>
.btn{
  position: absolute;
  left:400px;
  top:400px;
}
</style>
