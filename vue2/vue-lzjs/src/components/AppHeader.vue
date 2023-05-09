<template>
  <div class="header">
    <div class="nav">
      <ul class="nav-title-list">
        <li
          v-for="(nav, index) in menus"
          :key="index"
          class="menus"
          @mouseover="nav.show = !nav.show"
          @mouseout="nav.show = !nav.show"
        >
          <a :href="nav.url" class="menus-a">
            {{ nav.name }}
          </a>
          <ul class="nav-title-submenu" v-show="nav.show">
            <li
              v-for="(subMenu, index) in nav.subMenus"
              :key="index"
              class="subMenu"
            >
              <a :href="nav.url"> {{ subMenu.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      
      menus: [
        { name: "首页", url: "#" },

        {
          name: "量子技术研究院",
          url: "#",
          subMenus: [
            { name: "量子技术研究院文化", url: "#" },
            { name: "量子技术研究院机构", url: "#" },
            { name: "量子技术研究院历史", url: "#" },
          ],
        },
        {
          name: "公告动态",
          url: "#",
          subMenus: [
            { name: "量子技术研究院信息", url: "#" },
            { name: "量子技术研究院平台", url: "#" },
            { name: "量子技术研究院公告", url: "#" },
            { name: "量子技术研究院专题报道", url: "#" },
          ],
        },
        {
          name: "量子云",
          url: "#",
          subMenus: [
            { name: "一量子云", url: "#" },
            { name: "二量子云", url: "#" },
            { name: "三量子云", url: "#" },
          ],
        },
        {
          name: "产品",
          url: "#",
          subMenus: [
            { name: "产品1", url: "#" },
            { name: "产品2", url: "#" },
            { name: "产品3", url: "#" },
            { name: "产品4", url: "#" },
            { name: "产品5", url: "#" },
          ],
        },
        {
          name: "学习",
          url: "#",
          subMenus: [
            { name: "学习1", url: "#" },
            { name: "学习2", url: "#" },
            { name: "学习3", url: "#" },
            { name: "学习4", url: "#" },
          ],
        },
        {
          name: "开发",
          url: "#",
          subMenus: [
            { name: "开发1", url: "#" },
            { name: "开发2", url: "#" },
            { name: "开发3", url: "#" },
            { name: "开发4", url: "#" },
          ],
        },
        {
          name: "大赛",
          url: "#",
          subMenus: [
            { name: "大赛1", url: "#" },
            { name: "大赛2", url: "#" },
            { name: "大赛3", url: "#" },
            { name: "大赛4", url: "#" },
          ],
        },
        { name: "网上预约", url: "#" },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.header {
  position: absolute;
  margin: 0px 0px 0px 0px;
  height: 60px;
  left: 0px;
  right: 0px;
  background-color: #c2e10f;
  margin: 0;
  padding: 0;

  .nav {
    margin-top: 1px;
    height: 40px;
    width: 100px;
  }
  .nav-title-list {
    width: 1500px;
    margin: 0 auto;
    li {
      float: left;
      margin-right: 50px;
      list-style: none;
    }
  }
  .menus {
    float: left;
  }
  .menus .menus-a{
    float: left;
    font-size:15px;
    color:#ac1313;
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 1px #a0a290 solid;
  }
  .nav-title-submenu{
    display: block;
    width:110px;
    text-align: center;
    z-index: 1000;
    margin-top: 100px;
  }
  .menus>.menus-a:hover{
    background-color: #131504;
    color: #0f32e1;
  }
  .subMenu a{
    float:left;
    font-size:20px;
    background-color: #EB131E;
    color:#FFFFFF;
    width:120px;
    height:50px;
    text-align: center;
    border-top: 1px #909090 solid;
  }
  .subMenu a:hover{
    background-color: #ffaa00;
  }
}
</style>
