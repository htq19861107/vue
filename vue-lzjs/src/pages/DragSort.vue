<template>
  <transition-group
    class="dragsortbox"
    tag="div"
    @dragover="dragover($event)"
  >
    <div
      :class="[itemClass, 'dragsortitem']"
      v-for="(item, index) in images"
      :key="item"
      :draggable="true"
      @dragstart="dragstart(item, index)"
      @dragenter="dragenter(item, $event)"
      @dragend="dragend(item, $event)"
      @dragover="dragover($event)"
    >
      <!-- <p class="moxsind">{{ index + 1 }}</p> -->
      <img :src="item" :class="index == dargIndex ? 'active' : ''" />{{ item }}
    </div>
  </transition-group>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DragSort",
  props: {
    imageList: Array, // 传入图片数据
    sortType: {
      // 排序方式
      type: String,
      default: "insert",
    },
    itemClass: String, //自定义类名
  },
  setup(prop, ctx) {
    let images = ref([...prop.imageList]);
    console.log(typeof(prop.imageList))
    //images.value = images.value.map((v, i) => (v = v + "?index=" + i)); //不重复key
    let dargIndex = ref(-1);

    let oldData = null;
    let newData = null;

    function dragstart(value, index) {
      oldData = value;
      dargIndex.value = index;
    }
    function dragenter(value, e) {
      newData = value;
      e.preventDefault();
    }

    function dragover(e) {
      e.preventDefault();
    }

    function dragend() {
      if (oldData !== newData) {
        let oldIndex = images.value.indexOf(oldData);
        let newIndex = images.value.indexOf(newData);
        if (prop.sortType == "insert") {
          let newItems = [...images.value];
          newItems.splice(oldIndex, 1);
          newItems.splice(newIndex, 0, oldData);
          images.value = [...newItems];
        } else {
          [images.value[oldIndex], images.value[newIndex]] = [
            images.value[newIndex],
            images.value[oldIndex],
          ];
        }

        ctx.emit("change", images.value);
      }
      dargIndex.value = -1;
    }

    return {
      images,
      dargIndex,

      dragover,
      dragstart,
      dragenter,
      dragend,
    };
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  line-height: 1;
}
.dragsortbox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.dragsortbox .dragsortitem {
  width: 100px;
  height: 100px;
  margin: 2px;
  cursor: pointer;
  transition: all 0.3s;
  background: #ccc;
  position: relative;
}

.dragsortbox .dragsortitem img {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  position: relative;
}
.drag-sort-box .drag-sort-item .active {
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
}
.moxsind {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dfd6d6;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  font-size: 50px;
  font-weight: 600;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
