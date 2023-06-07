<template>
  <div class="codePanel">
    <textarea class="codeFile" :placeholder="placeholder">111</textarea>
  </div>
</template>

<script>
export default {
  name: "computeCompiler",
  setup() {},
};
</script>

<style lang="scss" scoped>
.codePanel {
  position: absolute;
  left: 1200px;
  top: 150px;
  right:0px;
  bottom:100px;
  width:300px;
  .codeFile{
    position: relative;
    height: 800px;
  }
}
</style>

