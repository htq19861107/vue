<template>
  <div class="contentPanel">
    <transition-group class="dragicon" tag="ul">
      <span :class="dragicon" v-for="(item, index) in imglist" :key="item">
        <el-tooltip placement="top">
          <img
            :src="item.url"
            :draggable="true"
            @dragstart="dragstart(item, index)"
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
        <div class="svgrow" v-for="(itemRow, indexRow) in bgsvg" :key="indexRow">
          <span
            class="svgbg"
            v-for="(item, indexCol) in itemRow"
            :key="indexCol"
            @dragenter="dragenter(item, $event)"
            @dragover="dragover($event)"
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
        { row: 0, col: 0, url: require("../../../assets/svg/Line.svg") },
        { row: 0, col: 1, url: require("../../../assets/svg/Line.svg") },
        { row: 0, col: 2, url: require("../../../assets/svg/Line.svg") },
        { row: 0, col: 3, url: require("../../../assets/svg/Line.svg") },
        { row: 0, col: 4, url: require("../../../assets/svg/Line.svg") },
        { row: 0, col: 5, url: require("../../../assets/svg/Line.svg") },
      ],
      [
        { row: 1, col: 0, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 1, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 2, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 3, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 4, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 5, url: require("../../../assets/svg/Line.svg") },
        { row: 1, col: 6, url: require("../../../assets/svg/Line.svg") },
      ],
    ];
    let images = reactive(imglist);
    let bgsvg = reactive(bglist);
    //images.value = images.value.map((v, i) => v = v + '?index=' + i);//不重复key
    // let dargIndex = ref(-1);

    let oldData = null;
    let newData = null;

    function dragstart(value, index) {
      oldData = value;
      //dargIndex.value = index;
      console.log(index);
      console.log("dragstart");
    }
    function dragenter(value, e) {
      console.log("dragenter");
      newData = value;
      console.log(newData.col);
      console.log(newData.row);
      console.log(newData.url);
      e.preventDefault();
    }

    function dragover(e) {
      console.log("dragover");
      e.preventDefault();
    }

    function dragend(item, event) {
      console.log("dragend");
      console.log(item);
      console.log(event);
      // if (oldData !== newData) {
      // let oldIndex = images.value.indexOf(oldData);
      // let newIndex = images.value.indexOf(newData);

      // [images.value[oldIndex], images.value[newIndex]] = [
      //   images.value[newIndex],
      //   images.value[oldIndex],
      console.log("*********************************");
      console.log(oldData.url);
      // ];
      console.log(newData.col);
      console.log(newData.row);
      console.log(newData.url);
      bgsvg[newData.row][newData.col].url = oldData.url;
      //ctx.emit('change', images.value)
      // }
      //dargIndex.value = -1;
    }
    return {
      oldData,
      newData,
      dragstart,
      dragenter,
      dragover,
      dragend,
      Qubits,
      imglist,
      bglist,
      bgsvg,
      images,
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
        pointer-events: none;
      }
    }
    .computebg {
      .panelTitle {
        padding: 16px;
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
