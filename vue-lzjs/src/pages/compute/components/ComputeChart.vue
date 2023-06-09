<template>
  <div class="contentChart">
    <div
      class="densityChart"
      id="densityChart"   
    ></div>
    <div
      class="histogramChart"
      id="histogramChart"    
    >
    </div>
    <computeArrayChart />
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";

// 如果是vue3非setup情况，还需要注册
import ComputeArrayChart from "./ComputeArrayChart";

export default {
  name: "computeChart",
  components: {ComputeArrayChart},
  setup() {
    const stateDensityChart = reactive({
      option: {
        title: {
          text: "投影概率",
          // subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["概率"],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "0001",
              "0010",
              "0011",
              "0111",
              "1000",
              "1001",
              "1010",
              "1011",
              "1100",
              "1101",
              "1110",
              "1111",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "概率",
            type: "bar",
            data: [
              0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2,
              0.6,
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          // {
          //   name: "降水量",
          //   type: "bar",
          //   data: [
          //     2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
          //     2.3,
          //   ],
          //   markPoint: {
          //     data: [
          //       {
          //         name: "年最高",
          //         value: 182.2,
          //         xAxis: 7,
          //         yAxis: 183,
          //         symbolSize: 18,
          //       },
          //       { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 },
          //     ],
          //   },
          //   markLine: {
          //     data: [{ type: "average", name: "平均值" }],
          //   },
          // },
        ],
      },
    });
    const stateHistogramChart = reactive({
      option: {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.07, 6.95],
              [13.0, 7.58],
              [9.05, 8.81],
              [11.0, 8.33],
              [14.0, 7.66],
              [13.4, 6.81],
              [10.0, 6.33],
              [14.0, 8.96],
              [12.5, 6.82],
              [9.15, 7.2],
              [11.5, 7.2],
              [3.03, 4.23],
              [12.2, 7.83],
              [2.02, 4.47],
              [1.05, 3.33],
              [4.05, 4.96],
              [6.03, 7.24],
              [12.0, 6.26],
              [12.0, 8.84],
              [7.08, 5.82],
              [5.02, 5.68],
            ],
            type: "scatter",
          },
        ],
      },
    });
    let xData = [];
    let yData = [];
    let data = [];
  

    for (let y = 0; y < 10; y++) {
      yData.push(y);
      for (let x = 0; x < 10; x++) {
        data.push([x, y, 10]);
      }
    }
    for (let x = 0; x < 10; x++) {
      xData.push(x);
    }

    const initeCharts = () => {
      let densityChart = echarts.init(document.getElementById("densityChart"));
      // 绘制图表
      densityChart.setOption(stateDensityChart.option);

      let histogramChart = echarts.init(
        document.getElementById("histogramChart")
      );
      histogramChart.setOption(stateHistogramChart.option);
    };


    onMounted(() => {
      initeCharts();
    });
    return {
      stateDensityChart,
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
  top: 700px;
  .densityChart {
    position: relative;
    left:50px;
    top:100px;
    width:400px;
    height: 400px;
  }
  .histogramChart {
    position: relative;
    left:450px;
    top:-300px;
    width:400px;
    height: 400px;
  }
}
</style>
