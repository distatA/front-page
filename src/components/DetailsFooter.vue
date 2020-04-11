<template>
  <div class="footer">
    <router-link :to="`/splendidComment/${data.id}`">
      <input class="review" placeholder="写跟贴" />
    </router-link>
    <div class="number">{{data.comment_length>=99? '99+':data.comment_length}}</div>
    <span class="little_logo iconfont iconpinglun-"></span>
    <span
      class="little_logo iconfont iconshoucang"
      :class="data.has_star ? 'active':''"
      @click="handleStar"
    ></span>
    <span class="little_logo iconfont iconfenxiang"></span>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: ["data"],
  methods: {
    handleStar() {
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      this.$axios({
        url: "/post_star/" + this.$route.params.id,
        headers: {
          Authorization: token
        }
      }).then(res => {
        console.log(res);
        this.data.has_star = !this.data.has_star;
        Toast.success(this.data.has_star ? "收藏成功!" : "取消收藏!");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  background-color: white;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50/360 * 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .review {
    margin-top: 5/360 * 100vw;
    height: 27/360 * 100vw;
    width: 150/360 * 100vw;
    background-color: #d7d7d7;
    border-radius: 20/360 * 100vw;
    padding-left: 15/360 * 100vw;
    line-height: 27/360 * 100vw;
    font-size: 12/360 * 100vw;
    font-weight: 600;
    outline: none;
    border: none;
  }
  .little_logo {
    transform: scale(1.8);
  }
  .number {
    position: absolute;
    top: 2/360 * 100vw;
    left: 225/360 * 100vw;
    border-radius: 20/360 * 100vw 20/360 * 100vw 20/360 * 100vw 0;
    background-color: red;
    font-size: 12/360 * 100vw;
    height: 15/360 * 100vw;
    width: 33/360 * 100vw;
    text-align: center;
    line-height: 15/360 * 100vw;
    color: white;
  }
  .active {
    color: red;
  }
}
</style>