<template>
  <div class="contentPanel">
    <transition-group class="dragicon" tag="ul">
      <span class="quantumGates" v-for="(item) in imglist" :key="item">
        <el-tooltip placement="top">
          <img
            :src="item.url"
            :draggable="true"
            @dragstart="dragstart(item)"
            @dragend="dragend(item, $event)"
          />
          <span>鼠标悬浮时显示提示</span>
          <template v-slot:content>
            <div class="tooltip-content">
              <p>{{ item.tooltip }}</p>
            </div>
          </template>
        </el-tooltip>
      </span>
      <div class="computebg">
        <ul>
          <li v-for="(item, indexCol) in Qubits" :key="indexCol">
            <div class="panelTitle">{{ indexCol }}</div>
          </li>
        </ul>
        <div
          class="svgrow"
          v-for="(itemRow, indexRow) in bglist"
          :key="indexRow"
        >
          <span
            class="svgbg"
            v-for="(item, indexCol) in itemRow"
            :key="indexCol"
            :draggable="true"
            @dragstart="dragstart(item)"
            @dragenter="dragenter(item, $event)"
            @dragover="dragover($event)"
            @dragend="dragend(item, $event)"
          >
            <img :src="item.url" />
          </span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "computePanel",
  setup() {
    const Qubits = 100;
    const imglist = reactive([
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
    ]);
    const bglist = reactive([
      [
        {
          row: 0,
          col: 0,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 0,
          col: 1,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 0,
          col: 2,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 0,
          col: 3,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 0,
          col: 4,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 0,
          col: 5,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
      ],
      [
        {
          row: 1,
          col: 0,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 1,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 2,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 3,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 4,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 5,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
        {
          row: 1,
          col: 6,
          url: require("../../../assets/svg/Line.svg"),
          drag: false,
        },
      ],
    ]);

    let startDataUrl = "";
    let endDataUrl = '';
    let startData = null;
    let endData = null;
    function dragstart(value) {
      console.log('***************value')
      console.log(value)
      startData = value;
    }
    function dragenter(value, e) {
      endData = value;
      e.preventDefault();
    }

    function dragover(e) {
      e.preventDefault();
    }

    function dragend(item, event) {
      console.log("dragend");
      console.log(item);
      console.log(event);
      startDataUrl = startData.url;
      endDataUrl = endData.url;


      bglist[endData.row][endData.col].url = startDataUrl;
      bglist[endData.row][endData.col].drag = true;

      console.log("*************startDataUrl********************");
      console.log(startDataUrl);
      console.log("**************endDataUrl*******************");
      console.log(endDataUrl);
      console.log("*************startData********************");
      console.log(startData);
      console.log("**************endData*******************");
      console.log(endData);
      if (item.drag) {
        
        bglist[startData.row][startData.col].url = endDataUrl;
        bglist[startData.row][startData.col].drag = endData.drag;
      }
    }
    return {
      // startData,
      // endData,
      dragstart,
      dragenter,
      dragover,
      dragend,
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
    .quantumGates{
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
        pointer-events: none;
      }
    }
    }
    .computebg {
      .panelTitle {
        position: relative;
        left:0px;
        top:0px;
        padding: 10px;
        white-space: nowrap;
        overflow-x: hidden;
        overflow-x: auto;
      }
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

      .svgrow {
        white-space: nowrap;
        .svgbg {
          width: 32px;
          height: 32px;
          img {
            margin: 0 30px 0 0;
          }
        }
      }
    }
  }
}
</style>
