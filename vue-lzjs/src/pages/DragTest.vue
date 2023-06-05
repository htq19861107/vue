<template>
  <div class="dropx">
      <DragSort
          :imageList="imageList"
          :sortType="'exchange'"
          :item-class="'citem'"
          @change="sortChange"
      />
  </div>

  <div class="dropx">
      <DragSort
          :imageList="imageList"
          :sortType="'insert'"
          :item-class="'bitem'"
          @change="sortChange"
      />
  </div>
</template>

<script>
import DragSort from './DragSort.vue'

export default {
  name: 'dragTest',
  components: {
      DragSort
  },
  setup() {
      const imageList = [
      require("../assets/gate/H.png"),
      require("../assets/gate/X.png"),
      // require("../assets/gate/H.png"),
      // require("../assets/gate/H.png"),
      // require("../assets/gate/H.png"),
      //     require("../assets/gate/H.png"),
      ]

      function sortChange(newArr) {
          console.log(newArr);
      }

      return {
          imageList,
          sortChange
      }
  }
}
</script>

<style scoped>
.dropx {
  width: 80vw;
  height: 200px;
  border: 1px dashed #999;
  margin: 50px auto;
}
</style>
<style>
.citem {
  border: 1px dashed red;
}
.bitem {
  border: 1px dashed green;
}
</style>


