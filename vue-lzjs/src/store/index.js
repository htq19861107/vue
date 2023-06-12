import { createStore } from 'vuex'
// 类似 Redux 中的建立状态树

export default createStore({
  
  // 1、 存储所有全局数据
  state: {
    userInfo: {
        userName:'',
    },
    quantumData:{
        prjName:'',
        runLine:'',
        qubits:0,
        lineDepth:0,
        qubitsArray:[],
    },
    code:'OPENQASM 2.0;\ninclude "qelib1.inc";\n'   

  },
 
  // 2、 需要通过计算获取state里的内容获取的数据
  // 只能读取不可修改
  getters: {
   
  }, 
  //  3、定义对state的各种操作
  // why不直接实现在mutation里需要写到action里?
  // mtations不能执行异步操作。aq:从云端获取信息-->(等待云端反馈)更新到state异步操作
  // 因此说:对于异步操作需要放到action里，简单的直接赋值操作可以直接放到mutation里
  mutations: {
    // 初始化数组
    INITqubitsArray(state,data){
      const { qubitsArray } = data;
      state.quantumData.qubitsArray = qubitsArray;
    },
    // 增加量子比特数量
    ADDqubitsArray(state,data){
      const { rowData } = data;
      state.quantumData.qubitsArray.push(rowData);
    },
    // 减少量子比特
    REMOVEqubitsArray(state,data){
      const {index} = data;
      for (let iRow = 0;iRow < state.quantumData.qubitsArray.length;iRow++ ) {
        if(iRow >= index){
          state.quantumData.qubitsArray[iRow] = state.quantumData.qubitsArray[iRow + 1];
        }
        state.quantumData.qubitsArray.pop();
      }
      //state.quantumData.qubitsArray.slice(index - 1, index);
    },
    // 改变量子比特的门
    CHANGEqubitsArray(state,data){
      const { row, col, qubits } = data;
      state.qubitsArray[row][col] = qubits;
    },
    // 切换运行服务器
    CHANGEservie(state,srv){
      state.quantumData.runLine = srv;
    },
    // 修改工程名称
    CHANGEprjName(state,prjName){
      state.quantumData.prjName = prjName;
    },
  },

  // 3、定义对state的各种操作
  // actions无法直接修改state，需要在mutations里更新
  // mutation不支持异步，所以需要在action里写api到url
  actions: {
      // 比说action定义了更新state的操作
      // 但是不可对其直接修改
      // 所有的修改操作必须放到mutations里
  },

  // state中信息过长时
  // 用来将state进行分割
  // 如下，将state树分割出一个user state。
  modules: {
  }
})

