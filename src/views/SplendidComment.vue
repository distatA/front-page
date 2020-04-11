<template>
  <div class="bigBoss">
    <!-- 头部导航组件 -->
    <NavigatorBar title="精彩跟帖" />

    <!-- 分页组件 -->
    <!-- v-model：是否正在加载中
        finished：数据是否加载完成
    @load：滚动到底部时候触发的事件-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="allContainer">
        <!-- <h3>`
        全部评论
        <span>75</span>
        </h3>-->
        <div class="region" v-for="(item,index) in list " :key="index">
          <div class="userColumn">
            <div class="user">
              <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
              <span>{{item.user.nickname}}</span>
            </div>
            <div class="replyPart">
              <div class="reply"></div>
            </div>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="else">
            <div class="else_left">
              <span>广东广州</span>
              <!-- moment().fromNow 就是显示距离到当前的时间 -->
              <span>{{moment(item.create_date).fromNow() }}</span>
            </div>
            <div class="else_right">
              <span class="iconfont icondianzan" style="padding-right:30px"></span>
              <span class="iconfont iconpinglun-" @click="handleReply(item)"></span>
            </div>
          </div>
          <div class="commentArea" v-if="item.parent">
            <!-- 父组件把事件带上参数传给子组件,子组件通过自定义的事件(this.$emit)来触发父组件传过来的事件 -->
            <Review :data="item.parent" v-if="item.parent" @reply="handleReply" />
          </div>
        </div>
      </div>
    </van-list>
    <div class="ipt">
      <!-- 输入框，点击和没点击时候显示的效果是不一样的 -->
      <!-- 如果输入框获得焦点的话：
            1.需要显示出发布按钮，
            2.需要去掉输入框的自适应高度，
      3.需要添加active这个class-->
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFocus"
        type="textarea"
        maxlength="200"
        :placeholder="reply.user? '回复:@'+reply.user.nickname:'留下你的神评论'"
        show-word-limit
        :autofocus="isFocus"
        @click="handleClick"
        :class="isFocus?'active':''"
        @blur="lostFocus"
        @keyup.enter="handleSend"
        ref="textarea"
      />
      <div class="btn" v-if="isFocus" @click="handleSend">发送</div>
    </div>
  </div>
</template>

<script>
// 输入框的引入
import { Field, Toast } from "vant";
// 头部导航组件
import NavigatorBar from "@/components/NavigatorBar";
// 时间的插件
import moment from "moment";
// 递归的子组件
import Review from "@/components/Review";
// 下拉加载组件
import { List } from "vant";
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
export default {
  data() {
    return {
      // 文章id
      postId: "",
      // 评论的列表
      list: [],
      moment,
      // 评论的列表
      loading: false,
      // 数据是否加载完毕
      finished: false,
      // 请求的页数
      pageIndex: 1,
      // 请求的条数
      pageSize: 5,
      // 发布评论的数据
      message: "",
      // 记录当前的输入框是否获得焦点
      isFocus: false,
      // 回复评论的对象
      reply: {},
      // 发布评论输入框的行数
      rows: 1
    };
  },
  // 注册的组件
  components: {
    NavigatorBar,
    Review
  },
  mounted() {
    // 获取到路由带过来的文章id

    const { id } = this.$route.params;
    // 赋值给数据的data,提供全局使用
    this.postId = id;
    console.log(this.postId);
    // 请求页面列表数据
    this.getList();
  },
  methods: {
    onLoad() {
      // 加载请求页面列表数据
      this.getList();
    },
    getList() {
      this.$axios({
        url: "/post_comment/" + this.postId,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        // data是评论的列表数组
        const { data } = res.data;
        // 保存到data的list
        this.list = [...this.list, ...data];
        // 请求完毕后，页数需要加1
        this.pageIndex += 1;
        // 初始化分页相关的值, 告诉van-list组件请求完毕
        this.loading = false;
        // 判断数据已经全部完毕
        if (data.length < this.pageSize) {
          this.finished = true;
        }
        console.log(this.list);
      });
    },
    handleClick() {
      this.isFocus = true;
    },
    lostFocus() {
      // 失去焦点时候，不要立马就隐藏发布按钮，需要在按钮点击之后再隐藏

      setTimeout(() => {
        this.isFocus = false;
      }, 100);
    },
    handleSend() {
      // 输入框为空直接return
      if (this.message.trim() === "") return;

      // 如果这个评论有值
      if (this.reply.id) {
        // parent_id 就是回复的评论的id
        data.parent_id = this.reply.id;
      }

      // 需要验证token,首先要获取
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      // 评论接口的参数
      const data = {
        content: this.message
      };
      this.$axios({
        url: `/post_comment/${this.postId}`,
        headers: {
          Authorization: token
        },
        method: "post",
        data
      }).then(res => {
        // 请空输入框
        this.message = "";
        const { message } = res.data;
        // 提示
        Toast.success(message);
        // 必须清空数组?
        // 果不清空会合并之前的评论,顺序会被打乱
        this.list = [];
        this.pageIndex = 1;
        // 重新获取页面数据
        this.getList();
        // 清空回复的数据
        this.reply = {};
      });
    },
    // 点击回复按钮触发的事件
    handleReply(item) {
      // 因为点击时候失去焦点，已经触发了handleBlur事件
      setTimeout(() => {
        console.log(item);
        // 记录下来当前回复的评论信息,就是我们的评论在回复
        this.reply = item;
        // 弹起输入框
        this.isFocus = true;
        // 用vue的方法操作dom元素,自动聚焦
        this.$refs.textarea.focus();
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
//          /360 * 100vw
.bigBoss {
  padding-bottom: 120 /360 * 100vw;
  .ipt {
    height: 80/360 * 100vw;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .btn {
    width: 70/360 * 100vw;
    height: 30/360 * 100vw;
    background-color: orange;
    font-size: 17/360 * 100vw;
    color: white;
    border-radius: 30/360 * 100vw;
    position: absolute;

    top: 13px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    height: 165/360 * 100vw;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0px;
  }

  .allContainer {
    padding: 15/360 * 100vw;

    .region {
      // margin-bottom: 70px;
      border-bottom: 1px solid #eee;
      .content {
        margin: 10 /360 * 100vw 0;
      }
      .userColumn {
        height: 50/360 * 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // width: 100/360 * 100vw;
          img {
            display: block;
            object-fit: cover;
            border-radius: 50%;
            height: 35/360 * 100vw;
            width: 35 /360 * 100vw;
          }
          span {
            display: inline-block;
            width: 150/360 * 100vw;
            margin-left: 5/360 * 100vw;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
      .else {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15/360 * 100vw;
        color: grey;
        margin: 10 /360 * 100vw 0;
        span {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .else_left {
          width: 150/360 * 100vw;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      }
      .commentArea {
        background-color: #f8f8fa;
        // height: 150 /360 * 100vw;
        padding: 10 /360 * 100vw;
        font-size: 17/360 * 100vw;
      }
    }
  }
}
</style>