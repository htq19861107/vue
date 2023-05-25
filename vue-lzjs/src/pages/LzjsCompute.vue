<template>
  <lzjsheader />
  <div class="app-container">
    <!-- <img src="../assets/gate/H.png" alt="" /> -->
    <input class="prjName" placeholder="Untitled Project" />
    <button class="btnModify" v-show="rename" @click="clickPrjName">
      修改
    </button>
    <button class="btnOK" v-show="!rename" @click="clickPrjName">确定</button>
    <button class="btnReset" v-show="!rename" @click="clickPrjName">
      清空
    </button>
    <el-select v-model="curServe" placeholder="请选择">
      <el-option
        v-for="item in servelist"
        :key="item.value"
        :label="item.label"
        :curServe="item.value"
      >
      </el-option>
    </el-select>
    <button class="btnRun" @click="clickRun">运行</button>
    <button class="btnSave" @click="clickSave">保存</button>
    <button class="btnSetting" @click="clickSetting">设置</button>
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
    <div class="densityChart" id="densityChart" :style="{ width: '300px', height: '300px' }"></div>
  </div>
</template>

<script>
import lzjsheader from "../components/LzjsHeader";
import { ref ,reactive,onMounted} from "vue";
import * as echarts from 'echarts'
export default {
  components: {
    lzjsheader,
  },
  setup() {
    let rename = ref(true);
    let curServe = ref("");
    const imglist = [
      {
        name: "H",
        url: require("../assets/gate/H.png"),
        tooltip: "H",
      },
      {
        name: "X",
        url: require("../assets/gate/X.png"),
        tooltip: "X",
      },
      {
        name: "Y",
        url: require("../assets/gate/Y.png"),
        tooltip: "Y",
      },
      {
        name: "Z",
        url: require("../assets/gate/Z.png"),
        tooltip: "Z",
      },
    ];
    const servelist = [
      {
        value: 1,
        label: "1号服务器",
        state: "1",
      },
      {
        value: 2,
        label: "2号服务器",
        state: "1",
      },
    ];
    const clickPrjName = () => {
      rename.value = !rename.value;
    };
    const clickRun = () => {};
    const clickSave = () => {};
    const clickSetting = () => {};
    /*******/
    const state = reactive({
        option: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ["芳草地国际","实验小学","白家庄小学","外国语小学","师范学校附属","望京东园"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '学校',
              type: 'bar',
              barWidth: '40%',
              data: [260,680,360,460,150,320],
            },
          ],
        },
      });
      const initeCharts = () => {
        let densityChart = echarts.init(document.getElementById('densityChart'))
        // 绘制图表
        densityChart.setOption(state.option)
      };

      onMounted(() => {
        initeCharts()
      });

    /******/
    return {
      rename,
      curServe,
      imglist,
      servelist,
      state,
      clickPrjName,
      clickRun,
      clickSave,
      clickSetting,
      initeCharts
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .prjName {
    left: 60px;
    top: 60px;
  }
  ul {
    position: relative;
    list-style-type: none;
    display: block;
    li {
      display: inline-block;
      padding-left: 10px;
    }
  }
  .densityChart{
    position: relative;
    left:600px;
    top:60px;
  }
}
</style>
