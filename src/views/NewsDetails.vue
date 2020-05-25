<template>
  <div class="container">
    <div class="header">
      <div class="header_left" @click="$router.back()">
        <span class="iconfont iconjiantou"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <div class="header_right" :class="post.has_follow ? '':'active'">
        <span
          class="follow"
          :class="post.has_follow ? '':'active'"
          @click="clickFollow"
        >{{post.has_follow ? '已关注':'关注' }}</span>
      </div>
    </div>

    <div class="main">
      <div class="title">
        <h3>{{post.title}}</h3>
      </div>
      <div class="from">
        {{post.user.nickname}}
        <span>{{moment(post.create_date).format('YYYY-MM-DD')}}</span>
      </div>
      <div class="content" v-html="post.content"></div>

      <div class="eles">
        <div class="like">
          <span class="iconfont icondianzan" @click="handleLike"></span>
          {{post.like_length}}
        </div>
        <div class="wechat">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>
    <!-- <div class="comment"></div> -->
    <DetailsFooter :data="post" />
  </div>
</template>

<script>
import DetailsFooter from "@/components/DetailsFooter";
import moment from "moment";
import { Toast } from "vant";
export default {
  components: {
    DetailsFooter
  },
  data() {
    return {
      post: {
        user: {}
      },

      moment,
      token: ""
    };
  },
  mounted() {
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
      const { data } = res.data;
      // 赋值给data中的对象,用来渲染
      // 后台图片路径写死了,用线上服务器图片看不了,所以要正则表达式全则替换基准路径
      data.content = data.content.replace(
        /http:\/\/localhost:3000/gi,
        this.$axios.defaults.baseURL
      );
      this.post = data;
    });
  },

  methods: {
    clickFollow() {
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
        this.post.has_like = !this.post.has_like;

        this.post.like_length = this.post.has_like
          ? (this.post.like_length += 1)
          : (this.post.like_length -= 1);
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang="less" scoped >
//    /360*100vw

.container {
  padding-bottom: 50/360 * 100vw;
  .header {
    padding: 15/360 * 100vw;
    height: 50 /360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_left {
      width: 50/360 * 100vw;
      // font-size: 50/360 * 100vw;
      align-items: center;
      justify-content: space-between;
      display: flex;
      .iconnew {
        transform: scale(3.5);
        padding-left: 5/360 * 100vw;
      }
      .iconjiantou {
        font-size: 20/360 * 100vw;
      }
    }
    .header_right {
      padding: 5/360 * 100vw 10/360 * 100vw;
      border-radius: 30/360 * 100vw;
      border: 1px solid #666;
      display: flex;
      align-items: center;
      justify-content: center;
      .follow {
        font-size: 13/360 * 100vw;
      }
    }
  }
  .main {
    padding: 15/360 * 100vw;
    border-bottom: 5px #eee solid;
    .content {
      /deep/ img {
        width: 100%;
      }
    }
    .from {
      margin: 20 /360 * 100vw 0;
    }
    .eles {
      height: 50/360 * 100vw;
      display: flex;
      align-items: center;
      margin-top: 20/360 * 100vw;
      justify-content: space-around;
      span {
        padding-right: 5/360 * 100vw;
      }
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
      }
    }
  }
  .comment {
    height: 200/360 * 100vw;
  }
  .active {
    background-color: red;
    color: white;
    border-color: red;
  }
}
</style>