<template>
    <div class="nav">
      <input class="prjName" placeholder="Untitled Project" />
      <button class="btnModify" v-show="rename" @click="clickPrjName">
        修改
      </button>
      <button class="btnOK" v-show="!rename" @click="clickPrjName">确定</button>
      <button class="btnReset" v-show="!rename" @click="clickPrjName">
        清空
      </button>
      <el-select class="selServe" v-model="curServe" placeholder="请选择">
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

      <button class="btnSetting" type="primary" @click="clickSetting">
        设置
      </button>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
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
    const clickRun = () => {console.log("clickRun");};
    const clickSave = () => {console.log("clickSave");};
    const clickSetting = () => {console.log("clickSetting");};
    return {
      rename,
      curServe,
      servelist,
      clickPrjName,
      clickRun,
      clickSave,
      clickSetting,
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
    margin-left: 20px;
  }
  .btnModify{
    margin-left: 20px;
  }
  .btnModify{
    margin-left: 20px;
  }
}
</style>
