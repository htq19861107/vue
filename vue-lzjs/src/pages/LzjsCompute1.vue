<template>
    <div class="lzjsheader">
        <img class="logo" src="../assets/logo.png">
    </div>
    <div class="seen">
        <div class="seen-show" @click="btnInfo">click</div>
    </div>
</template>

<script>

export default {

}
</script>

<style lang='scss' scoped>
 .seen{
        width: 250px;
        height: 300px;
        background-color: lightblue;
        position:absolute;
        .seen-show{
            position: relative;
            left: 0px;
            top:300px;
            display: none;
            width: 100px;
            height: 40px;
            color: #fff;
            background: lightcoral;
            line-height: 40px;
            cursor: pointer;
        }
        &:hover .seen-show{
            display: block;
        }
    }
</style>