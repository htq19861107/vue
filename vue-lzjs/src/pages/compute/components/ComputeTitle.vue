<template>
  <div class="nav">
    <el-input class="prjName" size="default" placeholder="Untitled Project" />
    <el-button
      class="btnModify"
      v-show="rename"
      type="primary"
      :icon="Edit"
      @click="clickPrjName"
    >
      修改
    </el-button>
    <el-button
      class="btnOK"
      v-show="!rename"
      type="primary"
      :icon="Select"
      @click="clickPrjName"
      >确定</el-button
    >
    <el-button
      class="btnReset"
      v-show="!rename"
      type="primary"
      :icon="CloseBold"
      @click="clickPrjName"
    >
      清空
    </el-button>
    <el-select class="selServe" v-model="curServe" placeholder="请选择">
      <el-option
        v-for="item in servelist"
        :key="item.value"
        :label="item.label"
        :curServe="item.value"
      >
      </el-option>
    </el-select>
    <el-button
      class="btnRun"
      type="primary"
      :icon="VideoPlay"
      @click="clickRun"
    >
      运行
    </el-button>
    <el-button class="btnSave" type="primary" :icon="Management" @click="clickSave"
      >保存</el-button
    >
    <el-button
      class="btnSetting"
      type="primary"
      :icon="Setting"
      @click="clickSetting"
    >
      设置
    </el-button>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import {
  Search,
  Edit,
  Select,
  CloseBold,
  Setting,
  VideoPlay,
  Management
} from "@element-plus/icons-vue";
export default {
  name: "computeTitle",
  setup() {
    let rename = ref(true);
    let curServe = ref("");
    const servelist = reactive([
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
    ]);
    const clickPrjName = () => {
      rename.value = !rename.value;
    };
    const clickRun = () => {
      console.log("clickRun");
    };
    const clickSave = () => {
      console.log("clickSave");
    };
    const clickSetting = () => {
      console.log("clickSetting");
    };
    return {
      rename,
      curServe,
      servelist,
      clickPrjName,
      clickRun,
      clickSave,
      clickSetting,
      Search,
      Edit,
      Select,
      CloseBold,
      Setting,
      VideoPlay,
      Management
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  //display: flex;
  //   z-index: 0;
  position: relative;
  left: 50px;
  top: 90px;

  .prjName {
    position:absolute;
    width:200px;
  }
  .btnModify {
    position:absolute;
    left:220px;
  }
  .btnOK {
    position:absolute;
    left:220px;
  }
  .btnReset {
    position:absolute;
    left:320px;
  }
  .selServe{
    position:absolute;
    left:450px;
  }
  .btnRun {
    position:absolute;
    left:700px;
  }
  .btnSave {
    position:absolute;
    left:800px;
  }
  .btnSetting {
    position:absolute;
    left:900px;
  }
}
</style>
