<template>
  <lzjsheader />
  <computeTitle />
  <computePanel />
  <computeChart />
</template>

<script>
import lzjsheader from "../../components/LzjsHeader";
import computeTitle from "./components/ComputeTitle";
import computePanel from "./components/ComputePanel";
import computeChart from './components/ComputeChart';

// 如果是vue3非setup情况，还需要注册

export default {
  components: {
    lzjsheader,
    computeTitle,
    computePanel,
    computeChart,
  },
  setup() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
