<template>
  <div class="codePanel">
    <div>代码编译器：</div>
    <textarea
      class="codeFile"
      :placeholder="placeholder"
      v-model="codeText"
      readonly
    ></textarea>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  name: "computeCompiler",

  setup() {
    const store = useStore();
    let codeText = computed(() => {
      return store.state.codeTitle + store.state.codeQreg + store.state.codeContent;
    });

    onMounted(() => {
    });
    return { codeText };
  },
};
</script>

<style lang="scss" scoped>
.codePanel {
  position: absolute;
  left: 1200px;
  top: 150px;
  right: 0px;
  bottom: 100px;
  width: 300px;
  .codeFile {
    position: relative;
    height: 500px;
  }
}
</style>
