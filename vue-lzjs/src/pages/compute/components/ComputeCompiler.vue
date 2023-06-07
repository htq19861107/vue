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
  width: 100%;
  .codeFile{
    position: relative;
    height: 800px;
  }
}
</style>

