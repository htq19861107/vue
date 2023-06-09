<template>
  <div class="contentChart">
    <div class="densityChart" id="densityChart"></div>
    <div class="histogramChart" id="histogramChart"></div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import h from "../assets/gate/H.png";
import circlebg from "../assets/circle-background.svg";
import circleblink from '../assets/circle-highlight.svg'
import circlered from '../assets/circle-red.svg'
// 如果是vue3非setup情况，还需要注册

export default {
  name: "computeChart",
  setup() {
    let xData = [];
    let yData = [];
    let data = [];
    let data1 = [];
    let databg = [];
    let databg1 = [];
    for (let y = 0; y < 5; y++) {
      yData.push(y);
      for (let x = 0; x < 5; x++) {
        for (let x = 0; x < 5; x++) {
          databg.push([x, y, 5]);
      }
      }
    }
    let _circleblink = "image://" + circleblink;
    let _circlebg = "image://" + circlebg;
    let _circlered = "image://" + circlered;
    for (let y = 0; y < 5; y++) {
      yData.push(y);
      for (let x = 0; x < 5; x++) {
        if (x === 1) {
          data1.push([x, y, 5]);
        } else {
          data.push([x, y, 5]);
        }
      }
    }
    for (let x = 0; x < 5; x++) {
      xData.push(x);
    }
    const stateHistogramChart = reactive({
      option: [
        {
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
              universalTransition: false,
              symbolSize: 32,
            },
            {
              type: "scatter",
              data: data1,
              symbol: _circleblink,
              symbolKeepAspect: true,
              universalTransition: false,
              symbolSize: 32,
            },
          ],
        },
        {
          series: [
            {
              data: databg,
              symbol: _circlered,
            },
          ],
        },
      ],
    });
    const initeCharts = () => {
      let histogramChart = echarts.init(
        document.getElementById("histogramChart")
      );
     
      let optionIndex = 0;
      let bSwitch =false;
      //let option = stateHistogramChart[optionIndex];
      //histogramChart.setOption(stateHistogramChart.option[0]);
      setInterval(function () {
        if(bSwitch){
          histogramChart.setOption(stateHistogramChart.option[0]);
        }else{
          histogramChart.setOption(stateHistogramChart.option[1]);
        }
        bSwitch = !bSwitch;
        //histogramChart.setOption(stateHistogramChart.option[0]);
      }, 600);
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
