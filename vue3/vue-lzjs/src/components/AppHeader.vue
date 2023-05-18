<template>
  <div class="AppHeader">
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
              <a :href="nav.url" @click="toUrl(nav, subMenu)">
                {{ subMenu.name }}</a
              >
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
        { show: false, name: "首页", url: "#" },
        {
          show: false,
          name: "量子技术研究院",
          url: "#",
          subMenus: [
            { name: "量子技术研究院文化", url: "home1" },
            { name: "量子技术研究院机构", url: "home" },
            { name: "量子技术研究院历史", url: "#" },
          ],
        },
        {
          show: false,
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
          show: false,
          name: "量子云",
          url: "#",
          subMenus: [
            { name: "一量子云", url: "#" },
            { name: "二量子云", url: "#" },
            { name: "三量子云", url: "#" },
          ],
        },
        {
          show: false,
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
          show: false,
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
          show: false,
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
          show: false,
          name: "大赛",
          url: "#",
          subMenus: [
            { name: "大赛1", url: "#" },
            { name: "大赛2", url: "#" },
            { name: "大赛3", url: "#" },
            { name: "大赛4", url: "#" },
          ],
        },
        { show: false, name: "网上预约", url: "#" },
      ],
    };
  },
  methods: {
    toUrl(nav, submenu) {
      nav.show = false;
      this.$router.push({ name: submenu.url });
      this.hideAllMenu();
    },
    hideAllMenu() {
      //这里有问题
      this.menus.forEach((item, index) => {
        item.show = false;
        this.$set(this.menus[index], index, item);
      });
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.AppHeader {
  position:absolute;
  margin: 0px 0px 0px 0px;
  height: 60px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #c2e10f;
  margin: 0;
  padding: 0;
  .nav {
    margin-top: 0px 0px 0px 0px;
    height: 60px;
    width: 100px;
    .nav-title-list {
      flex: 1;
      position: relative;
      width: 1200px;
      margin: 0 auto;
      padding-inline-start: 0px;
      li {
        float: left;
        margin-right: 0px;
        list-style: none;
      }

      .menus {
        float: left;
      }

      .menus .menus-a {
        float: left;
        font-size: 15px;
        color: #ac1313;
        width: 120px;
        height: 60px;
        line-height: 50px;
        text-align: center;
        border-top: 1px #a0a290 solid;
      }
      .nav-title-submenu {
        position: absolute;
        display: block;
        width: 120px;
        text-align: center;
        z-index: 1000;
        margin-left: 0px;
        margin-top: 50px;
      }
      .menus > .menus-a:hover {
        background-color: #131504;
        color: #0f32e1;
      }
      .subMenu a {
        float: left;
        font-size: 10px;
        background-color: #eb131e;
        color: #ffffff;
        width: 120px;
        height: 20px;
        text-align: center;
        border-top: 1px #909090 solid;
      }
      .subMenu a:hover {
        background-color: #ffaa00;
      }
    }
  }
}
</style>
