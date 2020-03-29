import Vue from "vue";
// 已经引入导航守卫
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/PersonalTwo")
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
    path: "/personalTwo",
    component: () => import("@/views/PersonalTwo")
  },
  {
    path: "/edit",
    component: () => import("@/views/Edit")
  },
  {
    path: "/editProfile",
    component: () => import("@/views/EditProfile")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
