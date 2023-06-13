<template>
  <div class="codePanel">
    <div>代码编译器：</div>
    <textarea
      class="codeFile"
      :placeholder="placeholder"
      v-model="codeContent"
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
    let codeContent = computed(() => {
      console.log(store.state.codeQreg)
      return store.state.codeTitle + store.state.codeQreg;
    });


    const initCode = () => {
 
    };

    onMounted(() => {
      initCode();
      console.log('codeContent*******************')
      console.log(codeContent)
    });
    return { codeContent };
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
