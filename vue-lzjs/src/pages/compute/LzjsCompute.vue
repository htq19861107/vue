<template>
  <lzjsheader />
  <computeTitle />
  <div class="content">
    <ul>
      <li v-for="(item, index) in imglist" :key="index">
        <el-tooltip placement="top">
          <img :src="item.url" />
          <span>鼠标悬浮时显示提示</span>
          <template v-slot:content>
            <div class="tooltip-content">
              <p>{{ item.tooltip }}</p>
            </div>
          </template>
        </el-tooltip>
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <img class="test1" src="../../assets/svg/Line.svg" />
    <img class="test2" src="../../assets/svg/Line.svg" />
    <img class="test3" src="../../assets/svg/Line.svg" />
    <img class="test4" src="../../assets/svg/Line.svg" />
    <img class="test5" src="../../assets/svg/Line.svg" />
    <img class="test6" src="../../assets/svg/Line.svg" />
    <div
      class="densityChart"
      id="densityChart"
      :style="{ width: '300px', height: '300px' }"
    ></div>
  </div>
</template>

<script>
import lzjsheader from "../../components/LzjsHeader";
import computeTitle from "./components/ComputeTitle";
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";

// 如果是vue3非setup情况，还需要注册

export default {
  components: {
    lzjsheader,
    computeTitle,
  },
  setup() {
    const imglist = [
      {
        name: "H",
        url: require("../../assets/gate/H.png"),
        tooltip: "H",
      },
      {
        name: "X",
        url: require("../../assets/gate/X.png"),
        tooltip: "X",
      },
      {
        name: "Y",
        url: require("../../assets/gate/Y.png"),
        tooltip: "Y",
      },
      {
        name: "Z",
        url: require("../../assets/gate/Z.png"),
        tooltip: "Z",
      },
    ];
    const state = reactive({
      option: {
        grid: {
          top: "4%",
          left: "2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "芳草地国际",
              "实验小学",
              "白家庄小学",
              "外国语小学",
              "师范学校附属",
              "望京东园",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: { interval: 0, rotate: 30 },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "学校",
            type: "bar",
            barWidth: "40%",
            data: [260, 680, 360, 460, 150, 320],
          },
        ],
      },
    });
    const initeCharts = () => {
      let densityChart = echarts.init(document.getElementById("densityChart"));
      // 绘制图表
      densityChart.setOption(state.option);
    };

    onMounted(() => {
      initeCharts();
    });
    return {
      imglist,
      state,
      initeCharts,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  left: 0px;
  top: 300px;
  width: 100%;
  ul {
    position: relative;
    left: 200px;
    top: 360px;
    list-style-type: none;
    display: block;
    li {
      position: relative;
      display: inline-block;
      padding-left: 10px;
    }
  }
  .densityChart {
    position: relative;
    left: 600px;
    top: 260px;
  }
}
</style>
