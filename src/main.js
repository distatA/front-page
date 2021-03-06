// vue构造函数
import Vue from "vue";
// app组件(以.vue结尾的文件都是组件)
import App from "./App.vue";
// 路由对象
import router from "./router";
// 引入vant
import Vant, { Toast } from "vant";
// 引入请求ajax的插件axios
import axios from "axios";
let app;
// 绑定到原型,加上之后就可以在组件中通过this.$axios来调用方法
Vue.prototype.$axios = axios;
// 封装路径
// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "http://192.168.16.103:3000";
axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"

// 注册插件
Vue.use(Vant);
// 上线环境是否提示信息(可以忽略)
Vue.config.productionTip = false;

// 导航守卫
// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
router.beforeEach((to, from, next) => {
  // 判断是否自定义的meta属性里面需要验证的属性
  // console.log(to.meta.authorization);
  if (to.meta.authorization) {
    // 判断是否是登录状态，时候有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 有token可以正常访问
    if (userJson.token) {
      // 如果有token就继续执行内容
      next();
      // 否则
    } else {
      // 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
      next("/login");
    }
  } else {
    // 非个人中心页
    next();
  }
});

// axios响应拦截器
axios.interceptors.response.use(
  res => {
    return res;
  },
  // 执行拦截错误的代码
  error => {
    // console.log(error);
    // console.log(error.response);
    // 解构出当前错误消息和码数
    const { statusCode, message } = error.response.data;
    // 判断错误码数
    if (statusCode === 400) {
      // 如果错误给客户返回一个提示信息
      Toast.fail(message);
    }
    // .................... 
    // 如果验证客户数据失败
    // 对象里面的path属性表示路径，query表单问号的参数
    // push的参数除了可以写成字符串也可以写对象
    // 比如这完整的路径其实 /login?return_url=/posts/8

    if (statusCode === 403) {
      Toast.fail("尚未登录,请先去登录");
      // 通过app拿到组件的方法
      // app.$router.push("/login");
      // http://localhost:8080/login?verify=%2FNewsDetails%2F11      %2F是斜杠的意思 获取问号后面的参数要用query,
      setTimeout(() => {
        app.$router.push({
          path: "/login",
          query: {
            verify: app.$route.path
          }
        });
      }, 1000);
      console.log(app.$route.path);
    }
    return Promise.reject(error);
  }
);
// 创建一个vue根实例
//.$mount('#app') 相当于el配置,指定id为app的元素作为模版
app = new Vue({
  // 路由对象
  router,
  // 加载第一个子组件,最底层的组件,(写法是固定的)
  render: h => h(App)
}).$mount("#app");
