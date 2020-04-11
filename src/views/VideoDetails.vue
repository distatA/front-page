<template>
  <div class="container">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="pic">
      <!-- 不加v-if会报错,因为数据没有请求回来之前都是undefined,所以要判断有数据就显示 -->
      <video
        v-if="post.content"
        :src="$axios.defaults.baseURL+post.content"
        controls
        autoplay
        class="vedio"
        :poster="$axios.defaults.baseURL+post.cover[0].url"
      ></video>
      <!-- <div class="viedo_icon">
        <span class="iconfont iconshipin"></span>
      </div>-->
    </div>
    <div class="content">
      <div class="user">
        <div class="user_left">
          <img :src="$axios.defaults.baseURL+post.user.head_img" alt />
          <span>{{post.user.nickname}}</span>
        </div>
        <div
          class="user_right"
          :class="post.has_follow ?'': 'active'"
          @click="handleFollow"
        >{{post.has_follow ?'已关注':'关注'}}</div>
      </div>
      <div class="title">{{post.title}}</div>
      <div class="eles">
        <div class="like">
          <div class="iconfont icondianzan" @click="handleLike"></div>
          <span>{{Number(post.has_like)}}</span>
        </div>
        <div class="wechat">
          <div class="iconfont iconweixin"></div>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <h3>精彩跟帖</h3>
      <p>暂无跟帖,抢占沙发</p>
    </div>
    <DetailsFooter :data="post" />
  </div>
</template>

<script>
import { Toast } from "vant";
import { NavBar } from "vant";
import DetailsFooter from "@/components/DetailsFooter";
export default {
  data() {
    return {
      post: {
        // 因为post里面没有uesr这个对象,所以headimg报错 所以加个默认值
        // xx.undefined,只会undefined 如果undefined.undefined就是会报错
        user: {},
        cover: [{}]
      },
      token: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    handleFollow() {
      let url = this.post.has_follow
        ? "/user_unfollow/" + this.post.user.id
        : "/user_follows/" + this.post.user.id;
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res);
        this.post.has_follow = !this.post.has_follow;
        const { message } = res.data;
        Toast.success(message);
      });
    },
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.$route.params.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 如果当前状态是点过赞的话
        if (this.post.has_like) {
          // 就让数字建议
          this.post.has_like -= 1;
          Toast.success("取消点赞");
        } else {
          // 数字加一
          this.post.has_like += 1;
          Toast.success("点赞成功");
        }
        this.$toast.success(res.data.message);
      });
    }
  },
  components: {
    DetailsFooter
  },
  mounted() {
    // 本地的token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    const { id } = this.$route.params;
    const config = {
      url: "/post/" + id
    };
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      console.log(res);
      // 把数据解构出来
      const { data } = res.data;

      this.post = data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  //      /360 * 100vw;
  background-color: #f2f2f2;
  .active {
    background-color: red;
    color: white;
    border-color: red;
  }
  .pic {
    position: relative;
    .vedio {
      width: 100%;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .viedo_icon {
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(150, 143, 143, 0.8);
      height: 50/360 * 100vw;
      width: 50/360 * 100vw;
      border-radius: 50%;
      transform: translate(-25/360 * 100vw, -25/360 * 100vw;);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconshipin {
        color: white;
        transform: scale(3);
      }
    }
  }
  .content {
    height: 165 /360 * 100vw;
    padding: 10 /360 * 100vw;
    border-bottom: 3px solid rgb(211, 203, 203);
    .title {
      margin-top: 15px;
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40/360 * 100vw;

      .user_left {
        width: 150/360 * 100vw;
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 20/360 * 100vw;
          height: 20/360 * 100vw;
          border-radius: 50%;
          object-fit: cover;
        }
        span {
          display: block;
          margin-left: 10/360 * 100vw;
        }
      }

      .user_right {
        height: 25/360 * 100vw;
        width: 60/360 * 100vw;
        border-radius: 30/360 * 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12/360 * 100vw;
        border: 1px solid grey;
      }
    }
    .eles {
      height: 50/360 * 100vw;
      display: flex;
      align-items: center;
      margin-top: 20/360 * 100vw;
      justify-content: space-around;
      .like,
      .wechat {
        font-size: 13/360 * 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30/360 * 100vw;
        width: 80/360 * 100vw;
        border-radius: 30/360 * 100vw;
        border: 1px solid grey;
        .iconweixin {
          color: rgb(18, 192, 41);
        }
        span {
          margin-left: 5/360 * 100vw;
        }
      }
    }
  }
  .comment {
    text-align: center;
    height: 150/360 * 100vw;
    color: grey;
    border-bottom: 1px solid rgb(172, 171, 171);
    h3 {
      margin: 20/360 * 100vw 0px;
      color: grey;
    }
    p {
      font-size: 15/360 * 100vw;
    }
  }
}
</style>