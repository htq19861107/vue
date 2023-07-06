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
    }, 200000)
  }

  const { show, toastMessage } = toRefs(toastData)
  
  return { show, toastMessage, showToast }
}
</script>
<style scoped>
.alert {
    background-color: #fff;
    color: #000;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
}
</style>