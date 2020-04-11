<template>
  <router-link :to="`/NewsDetails/${data.id}`">
    <div class="container">
      <div class="text">{{data.title}}</div>
      <div class="pho">
        <!-- <img v-for="(item, index) in imgs" :key="index" :src="item.src" alt /> -->
        <img
          v-for="(item,index) in data.cover"
          :key="index"
          :src="$axios.defaults.baseURL+ item.url"
          alt
        />
      </div>
      <div class="detail">{{data.user.nickname}} {{data.comment_length}}跟帖</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
  // data() {
  //   return {
  //     imgs: [
  //       {
  //         src: require("../assets/88830000d6ba88c49a76_tplv-resize_1024_0.jpg")
  //       },
  //       {
  //         src: require("../assets/d1f500732d0ec196bfcd394e440e73af_tplv-resize_1024_0.jpg")
  //       },
  //       {
  //         src: require("../assets/2f1e00008d876e7c83e6_tplv-resize_1024_0.jpg")
  //       }
  //     ]
  //   };
  // }
};
</script>

<style lang="less" scoped>
.container {
  padding: 15/360 * 100vw;
  border-bottom: 1px solid #eee;
}
.detail {
  margin-top: 20/360 * 100vw;
  color: grey;
  font-size: 12/360 * 100vw;
  .follows {
    margin-left: 10/360 * 100vw;
  }
}

.pho {
  display: flex;
  justify-content: space-between;
  padding-top: 10/360 * 100vw;
  img {
    width: 33%;
    height: 80/360 * 100vw;
  }
}
.text {
  height: 45 /360 * 100vw;
  overflow: hidden;
  display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
  text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
  -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
  -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数。
}
</style>