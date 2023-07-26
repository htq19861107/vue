export const imgGate = [
    {
      name: "H",
      url: require("../assets/gate/H.png"),
      tooltip: "H",
    },
    {
      name: "T",
      url: require("../assets/gate/T.png"),
      tooltip: "T",
    },
    {
      name: "S",
      url: require("../assets/gate/S.png"),
      tooltip: "S",
    },
    {
      name: "X",
      url: require("../assets/gate/X.png"),
      tooltip: "X",
    },
    {
      name: "Y",
      url: require("../assets/gate/Y.png"),
      tooltip: "Y",
    },
    {
      name: "Z",
      url: require("../assets/gate/Z.png"),
      tooltip: "Z",
    },
    {
      name: "X1",
      url: require("../assets/gate/X1.png"),
      tooltip: "X1",
    },
    {
      name: "Y1",
      url: require("../assets/gate/Y1.png"),
      tooltip: "Y1",
    },
    {
      name: "Z1",
      url: require("../assets/gate/Z1.png"),
      tooltip: "Z1",
    },
    {
      name: "U1",
      url: require("../assets/gate/U1.png"),
      tooltip: "U1",
      paramSet:true,
    },
    {
      name: "U2",
      url: require("../assets/gate/U2.png"),
      tooltip: "U2",
      paramSet:true,
    },
    {
      name: "U3",
      url: require("../assets/gate/U3.png"),
      tooltip: "U3",
      paramSet:true,
    },
    {
      name: "U4",
      url: require("../assets/gate/U4.png"),
      tooltip: "U4",
      paramSet:true,
    },
    {
      name: "RX",
      url: require("../assets/gate/RX.png"),
      tooltip: "RX",
    },
    {
      name: "RY",
      url: require("../assets/gate/RY.png"),
      tooltip: "RY",
    },
    {
      name: "RZ",
      url: require("../assets/gate/RZ.png"),
      tooltip: "RZ",
    },
    {
      name: "CNOT",
      url: require("../assets/gate/CNOT.png"),
      tooltip: "CNOT",
      control:1
    },
    {
      name: "ISWAP",
      url: require("../assets/gate/ISWAP.png"),
      tooltip: "ISWAP",
      control:1,
      swap:require("../assets/gate/ISWAP.png"),
    },
    {
      name: "SQISWAP",
      url: require("../assets/gate/SQISWAP.png"),
      tooltip: "SQISWAP",
      control:1
    },
    {
      name: "SWAP",
      url: require("../assets/gate/SWAP.png"),
      tooltip: "SWAP",
      control:1
    },
    {
      name: "TOFFOLI",
      url: require("../assets/gate/TOFFOLI.png"),
      tooltip: "TOFFOLI",
      control:2
    },
    {
      name: "CR",
      url: require("../assets/gate/CR.png"),
      tooltip: "CR",
      control:1
    },
    {
      name: "CZ",
      url: require("../assets/gate/CZ.png"),
      tooltip: "CZ",
      control:1
    },
    {
      name: "MESEAGE",
      url: require("../assets/gate/MESEAGE.png"),
      tooltip: "MESEAGE",
    },
    {
      name: "BARRIER",
      url: require("../assets/gate/BARRIER.png"),
      tooltip: "BARRIER",
    },
    {
      name: "GHZ2",
      url: require("../assets/gate/GHZ2.png"),
      tooltip: "GHZ2",
    },
    {
      name: "GHZ3",
      url: require("../assets/gate/GHZ3.png"),
      tooltip: "GHZ3",
    },
    {
      name: "GHZ6",
      url: require("../assets/gate/GHZ6.png"),
      tooltip: "GHZ6",
    },
    {
      name: "QFT3",
      url: require("../assets/gate/QFT3.png"),
      tooltip: "QFT3",
    },
    {
      name: "QFT4",
      url: require("../assets/gate/QFT4.png"),
      tooltip: "QFT4",
    },
    {
      name: "ZCNOT",
      url: require("../assets/gate/ZCNOT.png"),
      tooltip: "ZCNOT",
    },
    {
      name: "H6",
      url: require("../assets/gate/H6.png"),
      tooltip: "H6",
    },    
]

export const initParam = {
    computePanel:{
        Qubits:5,
        QubitsLineDepth:100,
        LineBg:require("../assets/svg/Line.svg"),
        HollowCircle:require("../assets/svg/HollowCircle.svg"),
        SolidCircle:require("../assets/svg/SolidCircle.svg"),
        VerticalLine:require("../assets/svg/vertical-line.svg"),      
    },
    computeArrayChart:{
        Qubits:15,
        QubitsLineDepth:15,
        CircleRed:require("../assets/circle-red.svg"),
        CircleBg:require("../assets/circle-background.svg"),
        CircleBlue:require("../assets/circle-blue.svg"),
    }

}
