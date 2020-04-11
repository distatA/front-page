<template>
  <div>
    <div class="userColumn">
      <div class="user">
        <span>回复{{data.user.nickname}}</span>
      </div>
      <div class="replyPart">
        <div class="reply">
          <span>{{moment(data.create_date).fromNow() }}</span>
        </div>
      </div>
    </div>
    <div class="content">{{data.content}}</div>
    <div class="else">
      <div class="else_left">
        <span></span>
      </div>
      <div class="else_right">
        <span class="iconfont icondianzan" style="padding-right:30px"></span>
        <!-- 然后注册一个点击事件,在里面触发父组件传来的事件-->
        <span class="iconfont iconpinglun-" @click="handleReply(data)"></span>
      </div>
    </div>
    <div class="commentArea" v-if="data.parent">
      <!-- <span>{{data.user.nickname}}</span>: -->
      <div class="content">
        <!-- {{data.content}}:回复 -->
        <replyReview :data="data.parent" @reply="handleReply" v-if="data.parent" />
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "replyReview",
  data() {
    return {
      moment
    };
  },
  props: ["data"],
  methods: {
    handleReply(item) {
      this.$emit("reply", item);
      // console.log(data);
    }
  }
};
</script>

<style scoped lang="less">
.userColumn {
  height: 50/360 * 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.else {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15/360 * 100vw;
  color: grey;
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
.review {
  margin: 10 /360 * 100vw 0;

  .review_content {
    height: 40/360 * 100vw;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>