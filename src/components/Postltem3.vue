<template>
  <router-link :to="`/VideoDetails/${data.id}`">
    <div class="container">
      <div class="font">{{data.title}}</div>
      <div class="pic">
        <div class="video">
          <span class="iconfont iconshipin"></span>
        </div>
        <img :src="$axios.defaults.baseURL+data.cover[0].url" alt />
      </div>
      <p class="detail">{{data.user.nickname}} {{data.comment_length}}跟帖</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
.container {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #eee;
  .font {
    height: 45/360 * 100vw;
    overflow: hidden;
    display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
    text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
    -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
    -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数。
  }
  .pic {
    height: 180/360 * 100vw;
    position: relative;
    img {
      width: 100%;
      display: block;
      height: 100%;
      margin-top: 10/360 * 100vw;
    }
  }
  .detail {
    margin-top: 20/360 * 100vw;
    color: grey;
    font-size: 12/360 * 100vw;
    .follows {
      margin-left: 10/360 * 100vw;
    }
  }
  .video {
    background-color: rgba(158, 165, 166, 0.5);
    height: 50/360 * 100vw;
    width: 50/360 * 100vw;
    position: absolute;
    top: 36%;
    left: 42%;
    border-radius: 50%;
    span {
      display: block;
      transform: scale(3);
      color: white;
      text-align: center;
      margin-top: 15/360 * 100vw;
    }
  }
}
</style>