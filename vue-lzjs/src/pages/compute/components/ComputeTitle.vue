<template>
  <div class="nav">
    <el-input
      class="prjName"
      v-model="prjName"
      size="default"
      :disabled="bDisabled"
      placeholder="Untitled Project"
    />
    <el-button
      class="btnModify"
      v-show="rename"
      type="primary"
      :icon="Edit"
      @click="clickModifyPrjName"
    >
      修改
    </el-button>
    <el-button
      class="btnOK"
      v-show="!rename"
      type="primary"
      :icon="Select"
      @click="clickBtnOKPrjName"
      >确定</el-button
    >
    <el-button
      class="btnReset"
      v-show="!rename"
      type="primary"
      :icon="CloseBold"
      @click="clickResetPrjName"
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
    <el-button
      class="btnSave"
      type="primary"
      :icon="Management"
      @click="clickSave"
      >保存</el-button
    >
    <el-button
      class="btnSetting"
      type="primary"
      :icon="Setting"
      @click="clickSetting"
    />
    <el-dialog
      v-model="dialogVisible"
      title="设置"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
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
  Management,
} from "@element-plus/icons-vue";
export default {
  name: "computeTitle",
  setup() {
    let rename = ref(true);
    let curServe = ref("");
    let bDisabled = ref(true);
    let prjName = ref("");
    let dialogVisible = ref(false);
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
    const clickModifyPrjName = () => {
      rename.value = !rename.value;
      bDisabled.value = !bDisabled.value;
    };
    const clickBtnOKPrjName = () => {
      rename.value = !rename.value;
      bDisabled.value = !bDisabled.value;
    };
    const clickResetPrjName = () => {};
    const clickRun = () => {
      console.log("clickRun");
    };
    const clickSave = () => {
      console.log("clickSave");
    };
    const clickSetting = () => {
      dialogVisible.value = true;
    };
    return {
      prjName,
      rename,
      bDisabled,
      dialogVisible,
      curServe,
      servelist,
      clickModifyPrjName,
      clickBtnOKPrjName,
      clickResetPrjName,
      clickRun,
      clickSave,
      clickSetting,
      Search,
      Edit,
      Select,
      CloseBold,
      Setting,
      VideoPlay,
      Management,
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
    position: absolute;
    width: 200px;
  }
  .btnModify {
    position: absolute;
    left: 220px;
  }
  .btnOK {
    position: absolute;
    left: 220px;
  }
  .btnReset {
    position: absolute;
    left: 320px;
  }
  .selServe {
    position: absolute;
    left: 450px;
  }
  .btnRun {
    position: absolute;
    left: 700px;
  }
  .btnSave {
    position: absolute;
    left: 800px;
  }
  .btnSetting {
    position: absolute;
    left: 900px;
  }
}
</style>
