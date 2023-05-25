<template>
  <lzjsheader />
  <div class="app-container">
    <div>
      <el-tooltip content="提示内容">
        <span>鼠标悬浮时显示提示</span>
        <template v-slot:content>
          <div class="tooltip-content">
            <p>这是提示内容1</p>
            <p>这是提示内容2</p>
          </div>
        </template>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import lzjsheader from "../components/LzjsHeader";
export default {
  components: {
    lzjsheader,
  },
};
</script>

<style lang="scss" scoped></style>
