<template>
  <router-link :to="`/NewsDetails/${data.id}`">
    <div class="container">
      <div class="newsBar">
        <div class="newsText">
          <div class="font">
            <span>{{data.title}}</span>
          </div>
          <p class="detail">{{data.user.nickname}} {{data.comment_length}}跟帖</p>
        </div>
        <div class="pic">
          <img :src="$axios.defaults.baseURL + data.cover[0].url" alt />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
// lablePage: [
//   "关注",
//   "体育",
//   "新闻",
//   "音乐",
//   "文艺",
//   "军事",
//   "政治",
//   "科学",
//   "电影",
//   "书籍",
//   "IT",
//   "金融",
//   "NBA",
//   "游戏",
//   "V"
// ],
</script>

<style lang='less' scoped>
.container {
  .newsBar {
    height: 122/360 * 100vw;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 15/360 * 100vw;

    .font {
      margin-top: 10/360 * 100vw;
      span {
        overflow: hidden;
        display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
        text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
        -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
        -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数。
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
    .pic {
      img {
        width: 100/360 * 100vw;
        height: 80/360 * 100vw;
        display: block;
        object-fit: cover;
        margin-left: 20/360 * 100vw;
      }
    }
  }
}
</style>