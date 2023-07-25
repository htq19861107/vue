<template>
  <div class="contentPanel">
    <div class="dragicon" tag="ul" key="transition">
      <span class="quantumGates" v-for="(item, index) in imglist" :key="index">
        <el-tooltip placement="top">
          <img :src="item.url" :draggable="item.drag" @dragstart="dragStart(item)" @dragend="dragend(item, $event)" />
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
        <div class="svgrow" v-for="(itemRow, indexRow) in bglist" :key="indexRow">
          <span class="qubitNum">Q{{ indexRow }}</span>
          <el-icon @click.stop="changeImgList('reduce', indexRow)">
            <Remove />
          </el-icon>
          <span class="svgbg" v-for="(item, indexCol) in itemRow" :key="indexCol" :ref="el => handleRef(el, item)"
            @dragstart="dragStart(item)" @dragover="dragOver(item, $event)" @dragend="dragend(item, $event)"
            @click="judgClick(item)" @dragleave="dragLeave(item, $event)">
            <img :src="item.url" :draggable="item.drag" />
            <computeParamSet v-if="paramShow" />
            <ShowMsg v-if="show" :message="toastMessage" />
          </span>
        </div>
        <el-icon @click.stop="changeImgList('add')">
          <CirclePlus />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, nextTick } from "vue";
import { useStore } from "vuex";
import { imgGate, initParam } from "../../../config/baseConfig";
import computeParamSet from "../components/ComputeParamSet"
import ShowMsg, { useToastEffect } from "../../../components/ShowMsg"
export default {
  name: "computePanel",
  components: {
    computeParamSet,
    ShowMsg
  },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect()
    const { Qubits, QubitsLineDepth, LineBg, HollowCircle, SolidCircle, VerticalLine } = initParam.computePanel;
    const store = useStore();
    const imglist = reactive(imgGate);
    let bglist = reactive([]);
    let qubitsArray = [];
    let startData = null;
    let endData = null;
    let clickStatus = 0;
    let paramShow = false;
    let bgRef = ref([]);
    let doubleRef = ref([]); // dom二维数组
    let isHaveEle = null;
    function deepClone(obj) {
      var target = {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (typeof obj[key] === 'object') {
            target[key] = deepClone(obj[key]);
          } else {
            target[key] = obj[key];
          }
        }
      }
      return target;
    }
    const createBasicQubit = (id, row, col, drag, url, click, up, down, type, order, param) => {
      let obj = {
        id: id,
        row: row,
        col: col,
        drag: drag,
        url: url,
        click: click,
        up: up,//中心点向上偏移
        down: down,//中心点向下偏移
        type: type,//类型
        order: order,//根据顺序来确定门的执行顺序，主要为门设计，如果相同则为交换门
        param: param//是否有参数设置
      }
      return obj;
    }

    const initBglist = () => {
      for (let row = 0; row < Qubits; row++) {
        let imgRow = [];
        for (let col = 0; col < QubitsLineDepth; col++) {
          imgRow.push(createBasicQubit(-1,row,col,false,LineBg,false,0,0,null,-1))
        }
        if (imgRow.length > 0) {
          bglist.push(imgRow);
        }
      }
    };
    /*** 初始化按钮组*/
    const initQubitsArray = () => {
      for (let row = 0; row < Qubits; row++) {
        let Row = [];
        qubitsArray.push(Row);
      }
    };

    /*** 按钮组移动*/
    const dragStart = (value) => {
      startData = deepClone(value);
    };
    const dragOver = (value, e) => {
      endData = deepClone(value);
      const { row, col } = value;
      drawBackgroundChange("access", row, col, startData.up, startData.down);
      e.preventDefault();
    };
    /**
    * 离开背景色改为白色
    */
    const dragLeave = (value, e) => {
      const { row, col } = value;
      drawBackgroundChange("leave", row, col, startData.up, startData.down);
      e.preventDefault();
    };
    /*** 切割为二维数组*/
    const spliceDoubleArr = (num, arr) => {
      let newArr = [];
      const total = Math.ceil(arr.length / 100); // 20

      for (let i = 0; i < total; i++) {
        let res = bgRef._rawValue.slice(i * 100, (i + 1) * 100);
        newArr.push(res);
      }
      doubleRef.value = newArr;
    };
    const clearDrc = (vaule) => {
      if (vaule.hasOwnProperty('id')) {
        return;
      }
      if (vaule.hasOwnProperty('control')) {
        delete vaule.control;
      }
      if (vaule.hasOwnProperty('paramSet')) {
        delete vaule.paramSet;
      }
      if (vaule.hasOwnProperty('attach')) {
        delete vaule.attach;
      }
    }
    const setDragSrc = (bMoveBack) => {
      let col = Number(startData.col) + Number(bMoveBack ? 1 : 0)
      if (bMoveBack) {
        col = endData.col < startData.col ? col : --col;
      }

      let nUp = 1
      while (nUp <= startData.up) {
        let row = startData.row - nUp
        bglist[row][col].url = LineBg;
        bglist[row][col].drag = false;
        clearDrc(bglist[row][col])
        ++nUp;
      }
      let nDown = 1
      while (nDown <= Math.abs(startData.down) && Number(startData.row) + Number(nDown) < bglist.length) {
        let row = Number(startData.row) + Number(nDown)
        console.log('row' + row)
        console.log('col' + col)
        bglist[row][col].url = LineBg;
        bglist[row][col].drag = false;
        clearDrc(bglist[row][col])
        ++nDown;
      }
      bglist[startData.row][col].url = LineBg;
      bglist[startData.row][col].drag = false;
      bglist[startData.row][col].up = 0;
      bglist[startData.row][col].down = 0;
      clearDrc(bglist[startData.row][col])
    }

    const setDragDes = () => {
      bglist[endData.row][endData.col].up = startData.up;
      bglist[endData.row][endData.col].down = startData.down;
      let nUp = 1
      while (nUp <= startData.up) {
        let row = endData.row - nUp
        if (nUp < startData.up) {
          bglist[row][endData.col].url = VerticalLine;
          bglist[row][endData.col].drag = false;
        }
        else {
          bglist[row][endData.col].url = SolidCircle;
          bglist[row][endData.col].drag = false;
        }
        ++nUp;
      }
      let nDown = 1
      while (nDown <= Math.abs(startData.down)) {
        let row = Number(endData.row) + Number(nDown)
        if (nDown < Math.abs(startData.down)) {
          bglist[row][endData.col].url = VerticalLine;
          bglist[row][endData.col].drag = false;
        }
        else {
          bglist[row][endData.col].url = SolidCircle;
          bglist[row][endData.col].drag = false;
        }
        ++nDown;
      }
    }
    const isMoveBack = (src, des) => {
      //从最上处拖都移动
      let bReslt = false;
      if (!src.hasOwnProperty('id')) {
        let row = 0
        while (row < bglist.length) {
          if (bglist[row][endData.col].url != LineBg) {
            bReslt = true;
            break;
          }
          ++row;
        }
        return bReslt;
      }
      //判断是否重叠
      let nUp = 1
      while (nUp <= startData.up) {
        let row = endData.row - nUp
        if (bglist[row][endData.col].url != LineBg) {
          bReslt = true;
          break;
        }
        ++nUp;
      }
      let nDown = 1
      while (nDown <= Math.abs(startData.down)) {
        let row = Number(endData.row) + Number(nDown)
        if (bglist[row][endData.col].url != LineBg) {
          bReslt = true;
          break;
        }
        ++nDown;
      }
      //跟自己重叠
      return bReslt;
    }
    const isOverlapSelf = () => {
      let bReslt = false;
      if (startData.col == endData.col) {
        let nUp = 1
        while (nUp <= startData.up) {
          let row = endData.row - nUp
          if (row >= startData.row - startData.up || row < Number(startData.row) + Number(startData.down)) {
            bReslt = true;
            break;
          }
          ++nUp;
        }
        let nDown = 1
        while (nDown <= Math.abs(startData.down)) {
          let row = Number(endData.row) + Number(nDown)
          if (row >= startData.row - startData.up || row < Number(startData.row) + Number(startData.down)) {
            bReslt = true;
            break;
          }
          ++nDown;
        }
      }

      return bReslt;
    }
    const checkIllegal = (startData, endData) => {
      let bIllegal = false;
      qubitsArray = store.quantumData.qubitsArray
      for (let iRow = 0; iRow < qubitsArray.length; iRow++) {
        for (let iCol = 0; iCol < qubitsArray[iRow].length; iCol++) {
          store.quantumData.qubitsArray[iRow][iCol].q
        }
      }
      return bIllegal;
    }
    const dragend = (item, e) => {
      let bCanMove = isCanMove(startData, endData)
      let bMoveBack = isMoveBack(startData, endData)
      if (item != null && bCanMove) {
        const bDrag = startData.drag;
        if ('paramSet' in startData) {
          bglist[endData.row][endData.col].paramSet = startData.paramSet;
        }
        /*多个图片移动数据交换*/
        let bOverlapSelf = isOverlapSelf();
        if (bMoveBack && !bOverlapSelf) {
          for (let row = 0; row < bglist.length; row++) {
            let itemRow = bglist[row]
            itemRow.pop()
            let item = createBasicQubit(-1,row,endData.col,false,LineBg,false,0,0,null,-1,-1);
            itemRow.splice(endData.col, 0, item)
            for (let col = 0; col < itemRow.length; col++) {
              if (endData.col < col) {
                ++itemRow[col].col
              }
            }
          }
          nextTick(() => {
            spliceDoubleArr(100, bgRef._rawValue);
          });
        }
        if (bDrag) {
          setDragSrc(bMoveBack);
          setDragDes();
        }
        //拖拽完为需要配置的门
        if ('control' in startData && startData.control > 0) {
          for (let row = 0; row < bglist.length; row++) {
            if (endData.row !== row) {
              bglist[row][endData.col].url = HollowCircle;
              bglist[row][endData.col].click = true;
              bglist[row][endData.col].drag = false;
              bglist[row][endData.col].control = startData.control;
            }
          }
          clickStatus = startData.control;
        }
        if ('control' in startData && startData.control > 0) {
          bglist[endData.row][endData.col].url = startData.url;
          bglist[endData.row][endData.col].drag = false;
        }
        else {
          bglist[endData.row][endData.col].url = startData.url;
          bglist[endData.row][endData.col].drag = true;
        }
        /*清除背景*/
      }
      drawBackgroundChange("leave", endData.row, endData.col, startData.up, startData.down)
      e.preventDefault();
    };

    /*** 背景阴影* @param { String } type access:进入 & leave:离开*/
    const drawBackgroundChange = (type, row, col, up, down) => {
      const colorMap = {
        access: "gray", // 鼠标移入背景
        leave: "white", // 鼠标离开背景
      };
      if (up > 0) {
        let val = 1;
        while ((val <= up) && ((row - val) >= 0)) {
          doubleRef._rawValue[row - val][col].style.background = colorMap[type];
          val++;
        }
      }
      if (down < 0) {
        let val = 1;
        while ((val <= Math.abs(down)) && ((Number(row) + Number(val)) < bglist.length)) {
          doubleRef._rawValue[Number(row) + Number(val)][col].style.background = colorMap[type];
          val++;
        }
      }

      if (typeof (row) != "undefined" && typeof (col) != "undefined") {
        doubleRef._rawValue[row][col].style.background = colorMap[type];
      }
    };

    const isCanMove = (src, des) => {
      // 超出边界
      isHaveEle = true;
      if (src.hasOwnProperty('row')) {
        if (des.row - src.up < 0 || Number(des.row) + Number(Math.abs(src.down)) >= bglist.length) {
          isHaveEle = false;
        }
      }
      return isHaveEle;
    };
    const handleRef = (el, item) => {
      if (el) {
        bgRef.value.push(el);
      }
    };

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
        let objBg = createBasicQubit(-1,nlen,iCol,false,LineBg,false,0,0,null,-1,-1);
        bgCol.push(objBg);
      }
      bglist.push(bgCol);
      let rowData = [];
      store.commit("ADDqubitsArray", { rowData });
    };
    const showFloatParamSet = () => {
      paramShow = !paramShow;
    };
    const judgClick = (item) => {
      if (0 === clickStatus) {
        showFloatParamSet();
      }
      else {
        if ('control' in item) {
          SetControlGate(item);
        }
        else {
          showToast("请点击垂直方向上高亮的点");
        }
      }
    };
    const SetControlGate = (value) => {
      const nContr = value.control;
      if ('click' in value && value.click) {
        if (startData.hasOwnProperty('attach')) {
          value.url = startData.attach
        }
        else {
          value.url = SolidCircle
        }

        for (let row = 0; row < bglist.length; row++) {
          if ('control' in bglist[row][value.col]) {
            bglist[row][value.col].control = nContr - 1;
          }
        }
        clickStatus--;
        value.click = false;
        bglist[endData.row][endData.col].up = (endData.row - value.row) > bglist[endData.row][endData.col].up ? endData.row - value.row : bglist[endData.row][endData.col].up;
        bglist[endData.row][endData.col].down = (value.row - endData.row) > bglist[endData.row][endData.col].down ? endData.row - value.row : bglist[endData.row][endData.col].down;

      }
      if (value.control === 0) {
        for (let row = 0; row < bglist.length; row++) {
          if (value.row !== row && bglist[row][value.col].url === HollowCircle) {
            if ((Number(endData.row) - Number(bglist[endData.row][endData.col].up) <= row) && (Number(endData.row) - Number(bglist[endData.row][endData.col].down) >= row)) {
              bglist[row][value.col].url = VerticalLine
              bglist[row][value.col].click = false;
            }
            else {
              bglist[row][value.col].url = LineBg;
              bglist[row][value.col].click = false;
            }
          }
        }
        bglist[endData.row][endData.col].drag = true;
      }
    };
    /*** 删除跟增加* @param { String } type add 增加 reduce 减少*/
    const changeImgList = (type, index = null) => {
      const imgMap = new Map([
        [
          "add",
          () => {
            let newImgArr = [];
            for (let iCol = 0; iCol < QubitsLineDepth; iCol++) {
              newImgArr.push(createBasicQubit(-1,bglist.length,iCol,false,LineBg,false,0,0,null,-1,-1));
            }
            bgRef.value = [];
            bglist.push(newImgArr);
            nextTick(() => {
              spliceDoubleArr(100, bgRef._rawValue);
            });
          },
        ],
        [
          "reduce",
          () => {
            if (bglist.length <= 1) {
              return;
            }
            bgRef.value = [];
            bglist.splice(index, 1);
            nextTick(() => {
              spliceDoubleArr(100, bgRef._rawValue);
            });
          },
        ],
      ]);
      imgMap.get(type)();
    };
    onMounted(() => {
      initBglist();
      initQubitsArray();
      store.commit("INITqubitsArray", { qubitsArray });
      // 处理表格dom
      nextTick(() => {
        spliceDoubleArr(100, bgRef._rawValue);
      });
    });
    return {
      clickStatus,
      dragStart,
      dragOver,
      dragend,
      dragLeave,
      clickRemove,
      clickAdd,
      SetControlGate,
      judgClick,
      changeImgList,
      handleRef,
      Qubits,
      QubitsLineDepth,
      qubitsArray,
      imglist,
      bglist,
      paramShow,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.contentPanel {
  position: absolute;
  left: 0px;
  top: 150px;
  width: 100%;
  padding-left: 15px;
  box-sizing: border-box;
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
      overflow-y: scroll;
      margin-top: 20px;

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
        padding-left: 36px;

        li {
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          position: relative;
          display: inline-block;
        }
      }

      .svgrow {
        display: flex;
        align-items: center;
        white-space: nowrap;

        .qubitNum {
          text-align: center;
          right: 0;
          bottom: 10px;

          margin-left: 0;
          margin-right: 0;
          width: auto;
          display: inline-block;
          width: 20;
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
