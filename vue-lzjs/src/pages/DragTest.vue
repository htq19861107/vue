<template>
  <div class="dropx">
    <DragSort
      :imageList="imageList"
      :sortType="'exchange'"
      :item-class="'citem'"
      @change="sortChange"
    />
  </div>

  <!-- <div class="dropx">
        <DragSort
            :imageList="imageList"
            :sortType="'insert'"
            :item-class="'bitem'"
            @change="sortChange"
        />
    </div> -->
</template>

<script>
import DragSort from "./DragSort.vue";

export default {
  name: "App",
  components: {
    DragSort,
  },
  setup() {
    const imageList = [
      [
        "https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500",
        "https://img1.baidu.com/it/u=1407750889,3441968730&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=799",
        "https://img0.baidu.com/it/u=1721391133,702358773&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=625",
        "https://img1.baidu.com/it/u=3316754777,2519856621&fm=253&fmt=auto&app=138&f=JPEG?w=653&h=500",
        "https://img1.baidu.com/it/u=3851364429,4209170710&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=3851364429,4209170710&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      ],
      [
        "https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500",
        "https://img1.baidu.com/it/u=1407750889,3441968730&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=799",
        "https://img0.baidu.com/it/u=1721391133,702358773&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=625",
        "https://img1.baidu.com/it/u=3316754777,2519856621&fm=253&fmt=auto&app=138&f=JPEG?w=653&h=500",
        "https://img1.baidu.com/it/u=3851364429,4209170710&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        "https://img1.baidu.com/it/u=3851364429,4209170710&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      ],
    ];

    function sortChange(newArr) {
      console.log(newArr);
    }

    return {
      imageList,
      sortChange,
    };
  },
};
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
