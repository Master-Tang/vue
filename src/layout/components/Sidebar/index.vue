<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in rotes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import $ from "@/api/assets";

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      rotes:this.$router.options.routes,
      myRoutes: {
        partner:"",
        search:"",
        system:"",
        admincheck:""
      }
    };
  },
  created() {
    $.path().then(res => {
      this.myRoutes=res.data
      if(this.myRoutes.search=="/search"){
          
          this.$delete(this.$router.options.routes,7)
          this.$delete(this.$router.options.routes,6)
           return this.rotes;
        }else{
            this.$delete(this.rotes,5)
           return this.rotes;
          
        }
    });
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
     
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
