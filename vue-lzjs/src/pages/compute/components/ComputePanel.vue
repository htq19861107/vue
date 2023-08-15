<template>
  <div class="contentPanel">
    <div class="dragicon" tag="ul" key="transition">
      <span class="quantumGates" v-for="(item, index) in imglist" :key="index">
        <el-tooltip placement="top">
          <img :src="item.url" :draggable="item.drag" @dragstart="dragStart(item)" @dragend="dragend(item, $event)"
            @click="clickHeader" />
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
            @click="judgClick(item, $event)" @dragleave="dragLeave(item, $event)"
            @contextmenu.prevent.stop="showMenu(item, $event)">
            <img :src="item.url" :draggable="item.drag" />
            <ShowMsg v-if="show" :message="toastMessage" />
            <div v-show="isShowParam" class="itemParam" :style="{ 'left': menuLeft + 'px', 'top': menuTop + 'px' }">
              <div>参数设置</div>
              <el-divider border-style="double" />
              <el-input v-model="paramInfo" type="textarea" :rows="3"
                placeholder="请输入一个数学表达式，可以包括PI，不包含括号，运算符包括'+-*/'(弧度制)" readonly="true" />
              <span class="paraItem" v-for="(data, index) in param" :key="index">
                <div>表达式{{ index }}</div>
                <el-input v-model="param[index]" type="text" @click.stop="">{{ param[index] }}</el-input>
              </span>
              <el-row class="btn">
                <el-button type="primary" @click.stop="paramOK(item)">确定</el-button>
                <el-button type="primary" @click.stop="paramCancell">取消</el-button>
              </el-row>
            </div>
          </span>
          <div v-show="isShowMenu" class="menu_box" :style="{ 'left': menuLeft + 'px', 'top': menuTop + 'px' }">
            <div class="menu">
              <div class="menu_item item_text" @click.stop="deleteItem">删除</div>
              <div class="menu_item item_text" @click.stop="cutItem">剪切</div>
              <div class="menu_item item_text" @click.stop="copyItem">复制</div>
              <div class="menu_item item_text" @click.stop="pasteItem">粘贴</div>
            </div>
          </div>
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
import ShowMsg, { useToastEffect } from "../../../components/ShowMsg"

export default {
  name: "computePanel",
  components: {
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
    let orderStatic = 0;
    let paramShow = false;
    let bgRef = ref([]);
    let doubleRef = ref([]); // dom二维数组
    let positionMaxMap = new Map();
    let paramInfo = ref('')
    let param = reactive([])
    let currentId = -1
    let itemData = [];

    let idCount = 0;

    const isShowMenu = ref(false) // 控制是否显示右键菜单
    const isShowParam = ref(false) // 控制是否显示参数菜单
    const menuLeft = ref(0)
    const menuTop = ref(0)

    /*** 单个元素创建*/
    const createBasicQubit = (id, row, col, major, drag, url, click, type, order, param, attachArray) => {
      let obj = {
        id: id,
        row: row,
        col: col,
        major: major,
        drag: drag,
        url: url,
        click: click,
        type: type,//类型
        order: order,//根据顺序来确定门的执行顺序，主要为门设计，如果相同则为交换门
        param: param,//是否有参数设置 
        attach: attachArray//{position:-1,url:url}
      }
      return obj;
    }
    /*** 获取attach的最大值*/
    const getItemDown = (item) => {
      if (item?.attach) {
        let max = Math.max(...item.attach);
        return max > 0 ? max : 0;
      } else {
        return 0;
      }
    }
    /*** 获取attach的最小值*/
    const getItemUp = (item) => {
      if (item?.attach) {
        let min = Math.min(...item.attach);
        return min < 0 ? min : 0;
      } else {
        return 0;
      }
    }
    /*** 初始化原始数据*/
    const initBglist = () => {
      for (let row = 0; row < Qubits; row++) {
        let imgRow = [];
        for (let col = 0; col < QubitsLineDepth; col++) {
          imgRow.push(createBasicQubit(-1, row, col, false, false, LineBg, false, null, -1, [], []))
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
      startData = JSON.parse(JSON.stringify(value));
      getPositionMaxMap()
    };
    /*** 浮动显示变化*/
    const dragOver = (value, e) => {
      const { row, col } = value;
      if (col > positionMaxMap.get(row)) {
        endData = JSON.parse(JSON.stringify(bglist[row][positionMaxMap.get(row)]));
      }
      else {
        endData = JSON.parse(JSON.stringify(value));
      }
      drawBackgroundChange("access", endData.row, endData.col, getItemUp(startData), getItemDown(startData));
      e.preventDefault();
    };
    /**
    * 离开背景色改为白色
    */
    const dragLeave = (value, e) => {
      if (endData != null && endData.hasOwnProperty('row') && endData.hasOwnProperty('col')) {
        drawBackgroundChange("leave", endData.row, endData.col, getItemUp(startData), getItemDown(startData));
      }
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
    /*** 清除元素值*/
    const clearDrc = (vaule) => {
      if (vaule.hasOwnProperty('control')) {
        delete vaule.control;
      }
      if (vaule.hasOwnProperty('param')) {
        delete vaule.param;
      }
      if (vaule.hasOwnProperty('swap')) {
        delete vaule.swap;
      }
      if (vaule.hasOwnProperty('attach')) {
        delete vaule.attach;
      }
      if (vaule.hasOwnProperty('url')) {
        vaule.url = LineBg;
      }
      if (vaule.hasOwnProperty('id')) {
        vaule.id = -1;
      }
      if (vaule.hasOwnProperty('major')) {
        vaule.major = false;
      }
    }
    /*** 清除拖拽原位置元素*/
    const setDragSrc = () => {
      let col = Number(startData.col)
      for (let nRow = 0; nRow < bglist.length; nRow++) {
        if (nRow >= Number(startData.row) + Number(getItemUp(startData)) && nRow <= Number(startData.row) + Number(getItemDown(startData))) {
          bglist[nRow][col].url = LineBg;
          bglist[nRow][col].drag = false;
          clearDrc(bglist[nRow][col])
        }
      }
    }
    /*** 
     * 
    */
    const convertAttac2Col = (attach, row) => {
      if (attach != undefined) {
        return attach.map((item) => { return row + item })
      }
      else {
        return []
      }
    }
    /*** 设置单个元素属性*/
    const setSingleItem = (src, des) => {
      let col = des.col
      let row = des.row
      bglist[row][col].id = ++idCount;
      bglist[row][des.col].attach = src?.attach;
      bglist[row][col].url = startData.url;
      bglist[row][col].drag = true;
      bglist[row][col].type = startData?.type;
      bglist[row][col].param = startData?.param;
    }
    /*** 拷贝元素属性*/
    const copyData = (src, des) => {
      des.id = src.id;
      des.click = src.click;
      des.major = src.major;
      des.attach = src?.attach;
      des.url = src.url;
      des.drag = src.drag;
      des.type = src?.type;
      des.param = src?.param;
      des.order = src.order;
    }
    /*** 元素是否可以移动*/
    const isDragable = (src, des) => {
      let up = getItemUp(src)
      let down = getItemDown(src)
      let endRow = des.row
      let bResult = false;

      if (endRow + up >= 0 && endRow + down < bglist.length) {
        bResult = true;
      }
      return bResult;
    }
    /*** 拖拽设置元素属性*/
    const switchData = () => {
      bglist[endData.row][endData.col].attach = startData?.attach;
      let up = getItemUp(startData)
      let down = getItemDown(startData)
      let col = endData.col
      let arrRow = convertAttac2Col(startData?.attach, endData.row)
      let endRow = endData.row

      for (let nRow = Number(endRow) + Number(up); nRow <= Number(endRow) + Number(down); nRow++) {
        if (nRow >= Number(endRow) + Number(up) && nRow <= Number(endRow) + Number(down)) {

          bglist[nRow][col].id = idCount;
          if (nRow == endData.row) {
            bglist[nRow][col].url = startData.url;
            bglist[nRow][col].drag = true;
            bglist[nRow][col].type = endData?.type;
            bglist[nRow][col].param = endData?.param;
          }
          else {
            if (arrRow.includes(nRow)) {
              if (startData.hasOwnProperty('swap')) {
                bglist[nRow][col].url = startData.swap;
                bglist[nRow][col].swap = startData.swap;
              }
              else {
                bglist[nRow][col].url = SolidCircle;
              }
              bglist[nRow][col].drag = false;
            }
            else {
              bglist[nRow][col].url = VerticalLine;
              bglist[nRow][col].drag = false;
            }
          }
        }
      }
    }
    /*** 拖拽情况分类*/
    const setDragDes = (fromData) => {
      if ('menu' == fromData) {
        if ('control' in startData) {
          setHollowCircle(endData)
        }
        else {
          setSingleItem(startData, endData)
        }
      }
      if ('form' == fromData) {
        switchData()
      }
    }

    const initMaxMap = () => {
      for (let row = 0; row < bglist.length; row++) {
        positionMaxMap.set(row, 0)
      }
    }

    const getPositionMaxMap = () => {
      for (let row = 0; row < bglist.length; row++) {
        let col = bglist[row].length - 1;
        for (; col >= 0; col--) {
          if (bglist[row][col].url != LineBg) {
            let max = col + 1;
            positionMaxMap.set(row, max);
            break;
          }
        }
        if (0 > col) {
          positionMaxMap.set(row, 0);
        }
      }
    }

    const moveCol = (value) => {
      for (let row = 0; row < bglist.length; row++) {
        let itemRow = bglist[row]
        itemRow.pop()
        let major = false;
        if (row == value?.row) {
          major = true;
        }
        let item = createBasicQubit(-1, row, value.col, major, false, LineBg, false, null, -1, [], []);
        itemRow.splice(value.col, 0, item)
        for (let col = 0; col < itemRow.length; col++) {
          if (value.col < col) {
            ++itemRow[col].col
          }
        }
      }
      nextTick(() => {
        spliceDoubleArr(100, bgRef._rawValue);
      });
    }
    /***设置控制门*/
    const setHollowCircle = (endData) => {
      let col = endData.col;
      ++idCount;
      for (let row = 0; row < bglist.length; row++) {
        bglist[row][col].id = idCount;
        if (row == endData.row) {
          bglist[row][col].url = startData.url;
          bglist[row][col].drag = true;
          bglist[row][col].type = endData?.type;
          bglist[row][col].param = endData?.param;
          bglist[row][col].major = true;
        }
        if (endData.row != row) {
          bglist[row][col].url = HollowCircle;
          bglist[row][col].click = true;
          bglist[row][col].drag = false;
          bglist[row][col].control = startData.control;
        }
      }
      clickStatus = startData.control;
      orderStatic = clickStatus
    }
    const getCurrentItemScope = (item) => {
      let up = 0;
      let down = 0;

      for (let row = 0; row < bglist.length; row++) {
        if (bglist[row][item.col].id == item.id && item.id != -1) {
          if (row < item?.row) {
            ++up;
          }
          if (row > item?.row) {
            ++down;
          }
        }
      }
      return { 'up': up, 'down': down };
    }
    const getFrontItemStep = (item, codition) => {
      let nStep = 0;
      for (let col = item.col; col > 0; col--) {
        let bResult = true;
        for (let row = item.row - codition.up; row <= Number(item.row) + Number(codition.down); row++) {
          if (item.col > 0 && row < bglist.length && bglist[row][item.col - 1 - nStep].url != LineBg) {
            bResult = false;
            break;
          }
        }
        if (bResult) {
          ++nStep;
        }
      }
      return nStep;
    }
    const isFrontItemBlank = (item, codition) => {
      let bResult = true;
      for (let row = item.row - codition.up; row <= Number(item.row) + Number(codition.down); row++) {
        if (item.col > 0 && row < bglist.length && bglist[row][item.col - 1].url != LineBg) {
          bResult = false;
          break;
        }
      }
      return bResult;
    }

    const moveFrontItem = (item, codition, step) => {
      for (let row = item.row; row <= item.row + codition.down + codition.up; row++) {

        if (row < bglist.length && bglist[row][item.col - 1].url == LineBg) {
          copyData(bglist[row][item.col], bglist[row][item.col - 1 - step])
          clearDrc(bglist[row][item.col]);
        }
      }
    }

    const clearBlank = () => {
      for (let col = 0; col < QubitsLineDepth; col++) {
        for (let row = 0; row < bglist.length; row++) {
          if (bglist[row][col].url != LineBg) {
            if (col > 0 && bglist[row][col - 1].url == LineBg) {
              //1判断整体占用几个  
              let currentItemScope = getCurrentItemScope(bglist[row][col]);
              let bisFrontItemBlank = isFrontItemBlank(bglist[row][col], currentItemScope)
              let step = getFrontItemStep(bglist[row][col], currentItemScope)
              if (bisFrontItemBlank) {
                moveFrontItem(bglist[row][col], currentItemScope, --step)
              }
            }
          }
        }
      }
    }

    const dragend = (item, e) => {
      // 1、判断是否来自菜单栏    
      let dataFrom = 'tooltip' in startData ? 'menu' : 'form';
      if ('menu' == dataFrom) {
        moveCol(endData);
        setDragDes(dataFrom);
        if (!startData.hasOwnProperty('control')) {
          clearBlank();
        }
      }
      else {
        let bDrag = isDragable(startData, endData);
        if (bDrag) {
          setDragSrc();
          moveCol(endData)

          setDragDes(dataFrom);
          clearBlank();
        }
      }
      if (endData != null) {
        drawBackgroundChange("leave", endData.row, endData.col, getItemUp(startData), getItemDown(startData))
      }

      e.preventDefault();
    };

    /*** 背景阴影* @param { String } type access:进入 & leave:离开*/
    const drawBackgroundChange = (type, row, col, up, down) => {
      const colorMap = {
        access: "gray", // 鼠标移入背景
        leave: "white", // 鼠标离开背景
      };

      for (let nRow = 0; nRow < bglist.length; nRow++) {
        if (nRow >= Number(row) + Number(up) && nRow <= Number(row) + Number(down)) {
          doubleRef._rawValue[nRow][col].style.background = colorMap[type];
        }
      }
    };

    const handleRef = (el, item) => {
      if (el) {
        bgRef.value.push(el);
      }
    };

    const judgClick = (item, e) => {
      closeMenu();
      currentId = item.id;
      if (0 === clickStatus) {
        showParam(item, e);
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
        if (startData.hasOwnProperty('swap')) {
          value.url = startData.swap
          value.id = idCount;
        }
        else {
          value.url = SolidCircle;
          value.order = orderStatic - nContr;
          value.id = idCount;
        }

        for (let row = 0; row < bglist.length; row++) {
          if ('control' in bglist[row][value.col]) {
            bglist[row][value.col].control = nContr - 1;
          }
        }
        clickStatus--;
        value.click = false;
        bglist[endData.row][endData.col].attach.push(value.row - endData.row);
      }
      bglist[endData.row][endData.col].attach = bglist[endData.row][endData.col].attach.sort((a, b) => { return a - b })
      let up = getItemUp(bglist[endData.row][endData.col])
      let down = getItemDown(bglist[endData.row][endData.col])

      if (value.control === 0) {
        for (let row = 0; row < bglist.length; row++) {
          if (value.row !== row && bglist[row][value.col].url === HollowCircle) {
            if ((Number(endData.row) + Number(up) <= row) && (Number(endData.row) + Number(down) >= row)) {
              bglist[row][value.col].url = VerticalLine
              bglist[row][value.col].click = false;
              bglist[row][value.col].id = idCount;
            }
            else {
              clearDrc(bglist[row][value.col])
            }
          }
        }
        bglist[endData.row][endData.col].drag = true;
        clearBlank()
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
              newImgArr.push(createBasicQubit(-1, bglist.length, iCol, false, false, LineBg, false, null, -1, [], []));
            }
            bgRef.value = [];
            bglist.push(newImgArr);
            nextTick(() => {
              spliceDoubleArr(100, bgRef._rawValue);
            });
            let rowData = [];
            store.commit("ADDqubitsArray", { rowData });
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
            store.commit("REMOVEqubitsArray", { index });
          },
        ],
      ]);
      imgMap.get(type)();
    };


    /*************弹出菜单和页面相关函数**********/

    const clickHeader = () => {
      closeParam();
      closeMenu();
    }
    /*** 关闭弹出的功能菜单*/
    const closeMenu = () => {
      isShowMenu.value = false
    }
    /*** 显示弹出的功能菜单*/
    const showMenu = (item, e) => {
      closeParam();
      closeMenu();
      if (item.id != -1) {
        isShowMenu.value = true
        menuLeft.value = e.pageX
        menuTop.value = e.pageY
      }
    }
    /*** 关闭参数页面*/
    const closeParam = () => {
      isShowParam.value = false
    }
    /*** 修改param参数*/
    const changeParm = (param) => {
      for (let row = 0; row < bglist.length; row++) {
        for (let col = 0; col < bglist[row].length; col++) {
          if (bglist[row][col].id == currentId) {
            bglist[row][col].param.splice(0, param.length);
            bglist[row][col].param.push(...param)
          }
        }
      }
    }
    /*** 显示参数页面*/
    const showParam = (item, e) => {
      closeMenu();
      closeParam();
      if (item.param != undefined && item?.param.length > 0) {
        param.splice(0, param.length);
        param.push(...item.param)
        menuLeft.value = e.pageX
        menuTop.value = e.pageY
        isShowParam.value = true;
        currentId = item.id;
      }
    };
    /*** 删除元素*/
    const deleteItem = () => {
      console.log(currentId)
      for (let row = 0; row < bglist.length; row++) {
        for (let col = 0; col < bglist[row].length; col++) {
          if (bglist[row][col].id == currentId) {
            bglist[row][col].url = LineBg;
            bglist[row][col].drag = false;
            clearDrc(bglist[row][col])
          }
        }
      }
      closeMenu();
    }
    /*** 复制元素*/
    const copyItem = () => {
      console.log(currentId)
      itemData.splice(0, itemData.length);
      for (let row = 0; row < bglist.length; row++) {
        for (let col = 0; col < bglist[row].length; col++) {
          if (bglist[row][col].id == currentId) {
            let obj = createBasicQubit(-1, row, col, false, false, LineBg, false, null, -1, [], []);
            copyData(bglist[row][col], obj);
            itemData.push(obj)
          }
        }
      }
      ++idCount
      for (let index = 0; index < itemData.length; index++) {
        itemData[index].id = idCount;
      }
      closeMenu();
    }
    /*** 剪切元素*/
    const cutItem = () => {
      console.log(currentId)
      itemData.splice(0, itemData.length);
      for (let row = 0; row < bglist.length; row++) {
        for (let col = 0; col < bglist[row].length; col++) {
          if (bglist[row][col].id == currentId) {
            let obj = createBasicQubit(-1, row, col, false, false, LineBg, false, null, -1, [], []);
            copyData(bglist[row][col], obj);
            itemData.push(obj)
            bglist[row][col].url = LineBg;
            bglist[row][col].drag = false;
            clearDrc(bglist[row][col])
          }
        }
      }
      closeMenu();
    }
    /*** 粘贴元素*/
    const pasteItem = () => {
      console.log(currentId)
      itemData.splice(0, itemData.length);
      for (let row = 0; row < bglist.length; row++) {
        for (let col = 0; col < bglist[row].length; col++) {
          if (bglist[row][col].id == currentId) {
            let obj = createBasicQubit(-1, row, col, false, false, LineBg, false, null, -1, [], []);
            copyData(bglist[row][col], obj);
            itemData.push(obj)
            bglist[row][col].url = LineBg;
            bglist[row][col].drag = false;
            clearDrc(bglist[row][col])
          }
        }
      }
      closeMenu();
    }
    /*** 参数param确定修改*/
    const paramOK = (item) => {
      isShowParam.value = false
      item.param.value = param
      changeParm(param);
    }
    /*** 参数param取消修改*/
    const paramCancell = () => {
      isShowParam.value = false
    }

    onMounted(() => {
      initBglist();
      initQubitsArray();
      store.commit("INITqubitsArray", { qubitsArray });
      // 处理表格dom
      nextTick(() => {
        spliceDoubleArr(100, bgRef._rawValue);
      });
      initMaxMap();
    });

    return {
      clickStatus,
      orderStatic,
      dragStart,
      dragOver,
      dragend,
      dragLeave,
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
      showMenu,
      deleteItem,
      copyItem,
      cutItem,
      pasteItem,
      isShowMenu,
      menuLeft,
      menuTop,
      isShowParam,
      clickHeader,
      paramInfo,
      param,
      paramCancell,
      paramOK
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
          border: 2px solid rgb(233, 24, 24);

          img {
            margin: 0 0px 0 0;
          }

        }

        .itemParam {
          position: fixed;
          z-index: 999;
          background-color: #fff;
          height: 400px;
          width: 200px;
          border: 2px solid rgb(175, 183, 211);
        }

        .menu_box {
          position: fixed;
          z-index: 999;
          background-color: #fff;

          // border-radius: 5px;
          .menu {
            width: 100px;
            text-align: left;
            // padding: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

            .menu_item {
              height: 24px;
              line-height: 22px;
              // margin-top: 5px;
            }

            .item_text {
              color: #171A1D;
              cursor: pointer;
              padding: 4px 20px;
              // border-radius: 3px;
              transition: all .2s ease-in;
            }

            .item_text:hover {
              background-color: #E9EAEC;
            }
          }
        }
      }
    }
  }
}
</style>
