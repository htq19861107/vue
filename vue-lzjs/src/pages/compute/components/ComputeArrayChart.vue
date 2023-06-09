<template>
  <div class="arrayChart">
    <div class="imgbg" v-for="(itemRow, index) in imglist" :key="index">
      <span v-for="(item, index) in itemRow" :key="index"
        ><img :src="item.url"
      /></span>
    </div>
  </div>
</template>

<script>
// 如果是vue3非setup情况，还需要注册
import { onMounted, reactive } from "vue";

import {initParam} from '../../../config/baseConfig'
export default {
  name: "computeArrayChart",
  setup() {
    const Qubits = initParam.computeArrayChart.Qubits;
    const QubitsLineDepth = initParam.computeArrayChart.QubitsLineDepth;
    let imglist = reactive([]);
    const initChart = (nRwo, nCol) => {
      for (let col = 0; col < nCol; col++) {
        let imgRow = [];
        for (let row = 0; row < nRwo; row++) {
          imgRow.push({
            nRow: row,
            nCol: col,
            url: require("../../../assets/circle-red.svg"),
          });
        }
        imglist.push(imgRow);
      }
    };
    // const updateChart = computed(() => {
    //   const qubitsArray = store.state.quantumData.qubitsArray
    //   initChart(qubitsArray.length,qubitsArray.length)
    // })
    onMounted(() => {
      initChart(Qubits,QubitsLineDepth);
      let flag = false;
      setInterval(() => {
        if (flag) {
          imglist[0][1].url = require("../../../assets/circle-red.svg");
        } else {
          imglist[0][1].url = require("../../../assets/circle-background.svg");
        }
        flag = !flag;
      }, "900");
    });

    return { imglist };
  },
};
</script>

<style lang="scss" scoped>
.arrayChart {
  left: 100px;
  top: 100px;
  width: 400px;
  height: 400px;
  white-space: nowrap;
  overflow-x:scroll;
  overflow-y:scroll;

}
</style>
