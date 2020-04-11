import Vue from "vue";
// 已经引入导航守卫
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Index"),
  },
  {
    // 登录页
    path: "/login",
    // 除了首页的页面都可以用懒加载
    component: () => import("@/views/Login"),
  },
  {
    // 注册页
    path: "/register",
    component: () => import("@/views/Register"),
  },
  {
    // 首页
    path: "/index",
    component: () => import("@/views/Index"),
  },

  {
    // 个人中心页
    path: "/personal",
    component: () => import("@/views/Personal"),
    // 自定义一个数据,来进行验证
    meta: {
      authorization: true,
    },
  },

  {
    // 编辑个人资料
    path: "/edit",
    component: () => import("@/views/Edit"),
    meta: {
      authorization: true,
    },
  },

  {
    // 我的关注
    path: "/follow",
    component: () => import("@/views/Follow"),
    meta: {
      authorization: true,
    },
  },
  {
    // 我的收藏
    path: "/collect",
    component: () => import("@/views/Collect"),
    meta: {
      authorization: true,
    },
  },
  {
    // 我的跟帖
    path: "/comments",
    component: () => import("@/views/Comments"),
    meta: {
      authorization: true,
    },
  },
  // 栏目管理
  {
    path: "/column",
    component: () => import("@/views/Column"),
  },
  // 视频详情
  {
    path: "/videoDetails/:id",
    component: () => import("@/views/VideoDetails"),
  },
  // 搜索内容
  {
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    // 新闻详情
    path: "/newsDetails/:id",
    component: () => import("@/views/NewsDetails"),
  },
  // 精彩跟帖
  {
    // 新闻详情
    path: "/splendidComment/:id",
    component: () => import("@/views/SplendidComment"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
