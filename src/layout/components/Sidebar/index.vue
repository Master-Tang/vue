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
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />

      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return {
      myRoutes:{}
      
    }
  },
  created(){
    //request net  ==>myRoutes
    //{‘/partner’:1,'/system':1}
  }
  ,
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      //获取角色的菜单和路由比较
      let menuList=[]
      console.log(this.$router.options.routes)
      // for(let s of this.$router.options.routes)
      // {
      //    if(myRoutes[s.path])
      //    {
      //      menuList.push(s)
      //    }
      // }
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
