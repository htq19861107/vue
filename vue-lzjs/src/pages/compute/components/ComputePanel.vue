<template>
  <div class="contentPanel">
    <transition-group class="dragicon" tag="ul">
      <span class="quantumGates" v-for="item in imglist" :key="item">
        <el-tooltip placement="top">
          <img
            :src="item.url"
            :draggable="true"
            @dragstart="dragStart(item)"
            @drop="dragDrop(item,$event)"
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
          <li v-for="(item, indexCol) in QubitsLineDepth" :key="indexCol">
            <div class="panelTitle">{{ indexCol }}</div>
          </li>
        </ul>
        <div
          class="svgrow"
          v-for="(itemRow, indexRow) in bglist"
          :key="indexRow"
        >
          <span
            class="qubitNum"
            @mouseenter="mouseEnter(indexRow)"
            @mouseleave="mouseLeave(indexRow)"
            >Q{{ indexRow }}</span
          >
          <el-icon @click="clickRemove(indexRow)"><Remove /></el-icon>
          <span
            class="svgbg"
            v-for="(item, indexCol) in itemRow"
            :key="indexCol"
            :draggable="true"
            @dragstart="dragStart(item)"
            @dragover="dragOver(item,$event)"
            @drop="dragDrop(item,$event)"
            @click="judgClick(item)"
          >
            <img :src="item.url" />
          </span>
        </div>
        <el-icon @click="clickAdd()"><CirclePlus /></el-icon>
      </div>
      <div class="paramSet" v-show="paramShow">参数设置
        <el-input
      class="param1"
      size="default"
      placeholder="Untitled Project"
    />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { imgGate, initParam } from "../../../config/baseConfig";
export default {
  name: "computePanel",
  setup() {
    const {Qubits,QubitsLineDepth,LineBg,HollowCircle,SolidCircle} = initParam.computePanel;
    const store = useStore();
    const imglist = reactive(imgGate);
    let bglist = reactive([]);
    let qubitsArray = [];
    let startDataUrl = "";
    let endDataUrl = "";
    let startData = null;
    let endData = null;
    let clickStatus = 0;
    let paramShow = false;
    const initBglist = () => {
      for (let row = 0; row < Qubits; row++) {
        let imgRow = [];
        for (let col = 0; col < QubitsLineDepth; col++) {
          imgRow.push({
            row: row,
            col: col,
            drag: false,
            url: LineBg,
            click:false,
          });
        }
        if (imgRow.length > 0) {
          bglist.push(imgRow);
        }
      }
    };
    const initQubitsArray = () => {
      for (let row = 0; row < Qubits; row++) {
        let Row = [];
        qubitsArray.push(Row);
      }
    };
    const dragStart = (value) => {
      startData = value;
    };

    const dragOver = (value,e) => {
      endData = value;
      e.preventDefault();
    };

    const dragDrop = (item,e) => {
      if (item != null) {
        startDataUrl = startData.url;
        endDataUrl = endData.url;
        const bDrag = startData.drag;
        if('paramSet' in startData){
          bglist[endData.row][endData.col].paramSet = startData.paramSet;
        }
        bglist[endData.row][endData.col].url = startDataUrl;
        bglist[endData.row][endData.col].drag = true;
        if (bDrag) {
          bglist[startData.row][startData.col].url = endDataUrl;
          bglist[startData.row][startData.col].drag = endData.drag;
        }
        if('control' in startData){
          for(let row =0;row < bglist.length;row++){
            if(endData.row !== row){
              bglist[row][endData.col].url = HollowCircle;
              bglist[row][endData.col].click = true;
              bglist[row][endData.col].control = startData.control;
            }
          }
        }
      }
      e.preventDefault();
    };
    const mouseEnter = () => {};
    const mouseLeave = () => {};
    const clickRemove = (index) => {
      if (index > -1) {
        bglist.splice(index, 1);
      }
      store.commit("REMOVEqubitsArray", { index });
    };
    const clickAdd = () => {
      const nlen = bglist.length;
      let bgCol = [];
      for (let iCol = 0; iCol < QubitsLineDepth; iCol++) {
        let objBg = {
          row: nlen,
          col: iCol,
          url: LineBg,
          drag: false,
        };
        bgCol.push(objBg);
      }
      bglist.push(bgCol);
      let rowData = [];
      store.commit("ADDqubitsArray", { rowData });
    };
    const showFloatParamSet = ()=>{
      paramShow = true;
    };
    const judgClick = (item)=>{
      if(0 === clickStatus){
        showFloatParamSet();
      }
      else{
        SetControlGate(item);
      }
    };
    const SetControlGate = (value) => { 
      const nContr = value.control;
      console.log(value.control)
      if('click' in value && value.click){
        value.url = SolidCircle
        for(let row = 0;row < bglist.length;row++){
          if('control' in bglist[row][value.col]){
            bglist[row][value.col].control = nContr - 1;
          }
        }
        value.click = false;
      }
      if(value.control === 0){
        for(let row = 0;row < bglist.length;row++){
          if(value.row !== row && bglist[row][value.col].url === HollowCircle){
            bglist[row][value.col].url = LineBg;
            bglist[row][value.col].click = false;
          }
        }
      }
    }
    onMounted(() => {
      initBglist();
      initQubitsArray();
      store.commit("INITqubitsArray", { qubitsArray });
    });
    return {
      clickStatus,
      dragStart,
      dragOver,
      dragDrop,
      mouseEnter,
      mouseLeave,
      clickRemove,
      clickAdd,
      SetControlGate,
      judgClick,
      Qubits,
      QubitsLineDepth,
      qubitsArray,
      imglist,
      bglist,
      paramShow,
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
    .quantumGates {
      ul {
        position: relative;
        left: 0px;
        top: 0px;
        list-style-type: none;
        display: block;
        li {
          position: relative;
          display: inline-block;
          padding-left: 15px;
          pointer-events: none;
        }
      }
    }
    .computebg {
      width: 1100px;
      height: 400px;
      overflow-x: scroll;
      overflow-x: scroll;
      .panelTitle {
        position: relative;
        left: 0px;
        top: 0px;
        padding: 10px;
        white-space: nowrap;
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
        .qubitNum {
          text-align: center;
          right: 0;
          bottom: 10px;

          margin-left: 0;
          margin-right: 0;
          width: auto;
        }
        .svgbg {
          width: 32px;
          height: 32px;
          img {
            margin: 0 0px 0 0;
          }
        }
      }
    }
  }
}
</style>
