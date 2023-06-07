<template>
  <div class="contentChart">
    <div class="densityChart" id="densityChart"></div>
    <div class="histogramChart" id="histogramChart"></div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import h from '../assets/gate/H.png'
import circlebg from '../assets/circle-bg.svg'
// 如果是vue3非setup情况，还需要注册

export default {
  name: "computeChart",
  setup() {
    let xData = [];
    let yData = [];
    let data = [];
    let _h = 'image://'+h;
    let _circlebg = 'image://'+circlebg;
    for (let y = 0; y < 5; y++) {
      yData.push(y);
      for (let x = 0; x < 5; x++) {
        data.push([x, y, 5]);
      }
    }
    for (let x = 0; x < 5; x++) {
      xData.push(x);
    }
    const stateHistogramChart = reactive({
      option: {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        xAxis: {
          show: false,
          type: "category",
          data: xData,
        },
        yAxis: {
          show: false,
          type: "category",
          data: yData,
        },
        series: [
          {
            type: "scatter",
            data: data,
            
            symbol: _circlebg,
            symbolKeepAspect: true,
            universalTransition: true,
            symbolSize: 80,
            
          },
        ],
      },
    });
    const initeCharts = () => {
      let histogramChart = echarts.init(
        document.getElementById("histogramChart")
      );
      histogramChart.setOption(stateHistogramChart.option);
    };

    onMounted(() => {
      initeCharts();
    });
    return {

      stateHistogramChart,
      initeCharts,
    };
  },
};
</script>

<style lang="scss" scoped>
.contentChart {
  position: absolute;
  left: 50px;
  top: 100px;

  .densityChart {
    position: relative;
    left: 100px;
    top: 100px;

    width: 800px;
    height: 800px;
  }
  .histogramChart {
    position: relative;
    left: 600px;
    top: -300px;

    width: 800px;
    height: 800px;
  }
}
</style>
