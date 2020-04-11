<template>
  <div class="container">
    <navigatorbar title=" 个人中心" isShow="true" />
    <router-link to="/edit">
      <div class="header">
        <!-- 头像 -->
        <div class="picture">
          <!-- $axios.defaults.baseURL 就是后台的基准路径 -->
          <!-- 因为域名随时会变化,所以就随便的返回一个域名,前端要进行修改 -->
          <img :src="$axios.defaults.baseURL + userInfo.head_img" />
        </div>
        <div class="depict">
          <div class="message">
            <!-- 判断客户性别 -->
            <span
              v-if="userInfo.gender === 0"
              class="iconfont iconxingbienv"
              style="color:pink;padding:4px"
            ></span>
            <span
              v-if="userInfo.gender === 1"
              class="iconfont iconxingbienan"
              style="color:skyblue;padding:4px"
            ></span>
            <span>{{ userInfo.nickname }}</span>
            <p style="margin-top:10px">
              <!-- 利用时间插件渲染出来 -->
              {{ moment(userInfo.creat_data).format("YYYY-MM-DD") }}
            </p>
          </div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </router-link>

    <listBar
      v-for="(item, index) in rows"
      :key="index"
      :lable="item.lable"
      :tips="item.tips"
      :path="item.path"
    />
    <!-- @click.native在组件中使用是强行实现事件 ,,click.native这个事件类型，会给Listbar这个组件最外部的div强制绑定点击事件-->
    <listBar lable="退出" @click.native="handleClick" />
  </div>
</template>

<script>
// 导入要在export default外面
import { Dialog } from "vant";
import listBar from "@/components/ListBar";
import navigatorbar from "@/components/NavigatorBar";
// 引入时间插件
import moment from "moment";

export default {
  data() {
    return {
      rows: [
        {
          lable: "我的关注",
          tips: "关注的用户",
          path: "/follow"
        },
        {
          lable: "我的跟帖",
          tips: "跟帖/回复",
          path: "/comments"
        },
        {
          lable: "我的收藏",
          tips: "文章/视频",
          path: "/collect"
        }
      ],
      // userInfo初始值是一个对象,接收数据的赋值
      userInfo: {},
      // moment是日期处理的工具库，为了在模板中可以使用，所以需要绑定在data中
      moment
    };
  },
  methods: {
    // 给退出强制注册了个点击事件
    // 利用插件实现功能
    handleClick() {
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要退出吗?"
      })
        .then(() => {
          // 点击确认之后返回登录页
          // 并且把本地的token删除
          this.$router.replace("/login");
          localStorage.removeItem("userInfo");
        })
        .catch(() => {});
    }
  },
  components: {
    listBar,
    navigatorbar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加请求头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      // 解构data
      const { data } = res.data;
      // 赋值给userInfo,在data中定义一个userInfo接收数据,在进行渲染
      this.userInfo = data;
    });
  }
};
</script>

<style lang="less" scoped>
//         /360 * 100vw
.container {
  background-color: #f2f2f2;
  height: 630/360 * 100vw;

  .header {
    color: grey;
    display: flex;
    height: 120/360 * 100vw;
    border-bottom: 2px solid rgb(207, 203, 203);
    align-items: center;
    padding: 20 /360 * 100vw;
    .picture {
      img {
        width: 70 /360 * 100vw;
        height: 70 /360 * 100vw;
        border-radius: 50%;
        object-fit: fill;
      }
    }
    .depict {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 10 /360 * 100vw;
    }
  }
}
</style>
