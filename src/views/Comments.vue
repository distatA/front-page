<template>
  <div class="container">
    <NavigatorBar title="我的跟帖" />
    <div class="commentBar" v-for="(item,index) in comments" :key="index">
      <div class="date">{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</div>

      <div class="replyContent" v-if="item.parent">
        <div class="replyContent_top">
          回复:
          <span>火星彩票研究所</span>
        </div>
        <div class="replyContent_bottom">阿信是张信哲阿信是张信哲阿信是张信哲</div>
      </div>
      <div class="content">{{item.content}}</div>
      <router-link to="#">
        <div class="title">
          原文:{{item.post.title}}
          <span class="iconfont iconjiantou1"></span>
        </div>
      </router-link>
    </div>

    <p class="more">更多跟帖>></p>
  </div>
</template>

<script>
// 引入时间插件
import moment from "moment";
import NavigatorBar from "@/components/NavigatorBar";
export default {
  data() {
    return {
      // 一个数组接收数组
      comments: [],
      moment
    };
  },
  // 注册
  components: {
    NavigatorBar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    // console.log(userJson);

    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      // 解构出数据

      const { data } = res.data;
      console.log(data);

      // 赋值给comments
      this.comments = data;
    });
  }
};
</script>

<style lang='less' scoped>
.container {
  // background-color: #f2f2f2;
  .commentBar {
    height: 160/360 * 100vw;
    padding: 20/360 * 100vw;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    font-size: 15/360 * 100vw;
    .date {
      color: grey;
    }
    .replyContent {
      margin: 12/360 * 100vw 0;
      font-size: 12/360 * 100vw;
      color: grey;
      height: 70/360 * 100vw;
      padding: 10/360 * 100vw;
      background-color: #e4e4e4;
      .replyContent_bottom {
        margin-top: 12/360 * 100vw;
      }
    }
    .title {
      color: grey;
      font-size: 14/360 * 100vw;
      margin-top: 10/360 * 100vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: block;
      }
    }
  }
  .more {
    text-align: center;
    margin-top: 35/360 * 100vw;
    color: grey;
    font-size: 14/360 * 100vw;
  }
}
</style>