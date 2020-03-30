<template>
  <div class="container">
    <NavigatorBar title="我的关注" />
    <div class="FollowBar" v-for="(item,index) in userInfo" :key="index">
      <div class="particulars">
        <img :src="$axios.defaults.baseURL+item.head_img" alt />
        <div class="author">
          <p>{{item.nickname}}</p>
          <p>{{moment(item.create_date).format('YYYY-MM-DD')}}</p>
        </div>
      </div>
      <div class="FollowBtn">
        <!-- 把id传进去作为唯一标识,进行请求数据和删除内容 -->
        <span @click="handleCancel(item.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入导航栏
import NavigatorBar from "@/components/NavigatorBar";
import { Dialog } from "vant";
// 导入处理时间的插件
import moment from "moment";
export default {
  data() {
    return {
      userInfo: [],
      userJosn: {},
      // 声明插件
      moment
    };
  },
  components: {
    // 注册组件
    NavigatorBar
  },
  mounted() {
    // 获取到本地纯纯用户的数据
    const userJosn = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userJosn);
    // 把本地储存的数据赋值到data里面,便于在其他地方拿到
    this.userJosn = userJosn;
    // 发起请求
    this.$axios({
      url: "/user_follows",
      // 添加请求头信息,验证token值
      headers: {
        Authorization: userJosn.token
      }
    }).then(res => {
      console.log(res);
      // 解构出来
      const { data } = res.data;
      // console.log(data);
      // 赋值给userInfo对象,用于渲染
      this.userInfo = data;
      // console.log(this.userJosn);
    });
  },
  methods: {
    handleCancel(id, index) {
      // 调用确认框
      Dialog.confirm({
        title: "温馨提示:",
        message: "您确定要取消关注吗?"
      })
        .then(() => {
          // 点击确定的话
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.userJosn.token
            }
          }).then(res => {
            // console.log(res);
            this.$toast.success("删除成功!");
            // 并且在页面中删除
            // 根据传入的索引值进行删除,删除一项
            this.userInfo.splice(index, 1);
          });
        })
        .catch(() => {
          // 取消则不执行任何代码
          this.$toast.success("已取消操作!");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .FollowBar {
    font-size: 16/360 * 100vw;
    height: 90/360 * 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20/360 * 100vw;
    border: 1px solid #e1e1e1;
    .particulars {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        border-radius: 50%;
        display: block;
        object-fit: cover;
        margin-right: 10/360 * 100vw;
      }
    }
    .FollowBtn {
      height: 28/360 * 100vw;
      width: 70/360 * 100vw;
      border-radius: 20/360 * 100vw;
      background-color: #e1e1e1;
      line-height: 28/360 * 100vw;
      text-align: center;
      font-size: 12/360 * 100vw;
    }
  }
}
</style>