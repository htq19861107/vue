<template>
    <div  class="alert">
        {{ message }}
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'

export default {
  props: ['message']
}

export const useToastEffect = () => {
  
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })

  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }

  const { show, toastMessage } = toRefs(toastData)
  
  return { show, toastMessage, showToast }
}
</script>
<style scoped>
.alert {
    background-color: #fff;
    color: #ad0b0b;
    padding: 0px;
    border-radius: 3px;
    border: 1px solid rgb(230, 39, 13);
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}
</style>