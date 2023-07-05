<template>
  <lzjsheader />
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
      utils.md5(utils.md5('pwd' + 'salt'))
    }
    return {
      test
    }
  }
};
</script>

<style lang="scss" scoped></style>
