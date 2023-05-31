<template>
  <div class="contentPanel">
    <div class="dragicon">
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
    </div>
    <div class="computebg">
      <ul>
        <li v-for="(item, indexCol) in Qubits" :key="indexCol">
          <div class="panelTitle">{{ indexCol }}</div>
        </li>
      </ul>
      <ul>
        <template v-for="(itemRow, indexRow) in bglist" :key="indexRow">
          <div class="svgRow">
            <li v-for="(item, indexCol) in itemRow" :key="indexCol">
              <img class="svgbg" src="../../../assets/svg/Line.svg" />
            </li>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "computePanel",
  setup() {
    const Qubits=100;
    const imglist = [
      {
        name: "H",
        url: require("../../../assets/gate/H.png"),
        tooltip: "H",
      },
      {
        name: "X",
        url: require("../../../assets/gate/X.png"),
        tooltip: "X",
      },
      {
        name: "Y",
        url: require("../../../assets/gate/Y.png"),
        tooltip: "Y",
      },
      {
        name: "Z",
        url: require("../../../assets/gate/Z.png"),
        tooltip: "Z",
      },
    ];
    const bglist = [
      [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
        { row: 0, col: 5 },
      ],
      [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 1, col: 6 },
      ],
    ];
    return {
      Qubits,
      imglist,
      bglist,
    };
  },
};
</script>

<style lang="scss" scoped>
.contentPanel {
  position: absolute;
  left: 10px;
  top: 150px;
  width: 100%;
  .dragicon {
    ul {
      position: relative;
      left: 0px;
      top: 0px;
      list-style-type: none;
      display: block;
      li {
        position: relative;
        display: inline-block;
        padding-left: 10px;
      }
    }
  }
  .computebg {
    
    .panelTitle {
      padding: 16px;
      white-space: nowrap;
      overflow-x: hidden;
      overflow-x:auto;
    }
    // white-space: nowrap;
    ul {
      position: relative;
      left: 0px;
      top: 0px;
      list-style-type: none;
      display: block;
      white-space: nowrap;
      li {
        position: relative;
        display: inline-block;
      }
    }
    .svgRow {
      .svgbg {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
