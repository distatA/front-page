<template>
  <div class="container">
    <NavigatorBar title="个人中心" isShow="true" />
    <router-link to="/editProfile">
      <div class="header">
        <div class="introduction">
          <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
          <div class="font">
            <div class="gender_name">
              <!-- <span
              :class="userInfo.gender===1?'iconfont iconxingbienan':'iconfont iconxingbienv'"
              style="color:skyblue;padding-right:10px"
              ></span>-->
              <span
                v-if="userInfo.gender===1"
                class="iconfont iconxingbienan"
                style="color:skyblue;padding-right:10px"
              ></span>
              <span
                v-if="userInfo.gender===0"
                class="iconfont iconxingbienv"
                style="color:pink;padding-right:10px"
              ></span>

              <span>{{userInfo.nickname}}</span>
            </div>
            <p>
              {{
              moment(userInfo.create_date).format('YYYY-MM-DD')
              }}
            </p>
          </div>
        </div>
        <div class="iconfont iconjiantou1" style="padding-right:15px"></div>
      </div>
    </router-link>

    <ListBar v-for="(item,index) in rows" :lable="item.lable" :tips="item.tips" :key="index" />
    <ListBar lable="退出" @click.native="handelOut" />
  </div>
</template>

<script>
import { Dialog } from "vant";
// 导入插件
import moment from "moment";
// 导入导航栏
import NavigatorBar from "@/components/NavigatorBar";
// 导入列表行
import ListBar from "@/components/ListBar";
export default {
  data() {
    return {
      show: false,
      rows: [
        { lable: "我的关注", tips: "关注的用户" },
        { lable: "我的跟帖", tips: "跟帖/回复" },
        { lable: "我的收藏", tips: "文章/视频" }
      ],
      userInfo: {},
      // 记得要定义,草!!!!
      moment
    };
  },
  // 注册组件
  components: {
    NavigatorBar,
    ListBar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userJson;
    // console.log(this.userInfo);

    this.$axios({
      url: "/user/" + this.userInfo.user.id,
      headers: {
        Authorization: this.userInfo.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    handelOut() {
      Dialog.confirm({
        title: "温馨提示",
        message: "你确定要退出?"
      })
        .then(() => {
          this.$router.replace("/login");
          localStorage.removeItem("userInfo");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .header {
    height: 150/360 * 100vw;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;

    .introduction {
      width: 200/360 * 100vw;

      display: flex;

      justify-content: space-around;
      align-items: center;
      padding-left: 15/360 * 100vw;
      img {
        display: block;
        width: 70/360 * 100vw;
        height: 70/360 * 100vw;
        border-radius: 50%;
        object-fit: cover;
      }
      .gender_name {
        margin-bottom: 10px;
      }
    }
  }
}
</style>