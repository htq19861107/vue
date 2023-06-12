<template>
  <div class="contentChart">
    <div
      class="densityChart"
      id="densityChart"   
    ></div>
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
        ],
      },
    });

    const initeCharts = () => {
      let densityChart = echarts.init(document.getElementById("densityChart"));
      // 绘制图表
      densityChart.setOption(stateDensityChart.option);
    };

    onMounted(() => {
      initeCharts();
    });
    return {
      stateDensityChart,
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
}
</style>
