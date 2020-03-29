import Vue from "vue";
// 已经引入导航守卫
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Collect")
  },
  {
    // 登录页
    path: "/login",
    // 除了首页的页面都可以用懒加载
    component: () => import("@/views/Login")
  },
  {
    // 注册页
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    // 首页
    path: "/index",
    component: () => import("@/views/Index")
  },

  {
    // 个人中心页
    path: "/personal",
    component: () => import("@/views/Personal")
  },
  {
    // 个人中心页2
    path: "/personalTwo",
    component: () => import("@/views/PersonalTwo")
  },
  {
    // 编辑个人资料
    path: "/edit",
    component: () => import("@/views/Edit")
  },
  {
    // 编辑个人资料2
    path: "/editProfile",
    component: () => import("@/views/EditProfile")
  },
  {
    // 我的关注
    path: "/follow",
    component: () => import("@/views/Follow")
  },
  {
    // 我的收藏
    path: "/collect",
    component: () => import("@/views/Collect")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
