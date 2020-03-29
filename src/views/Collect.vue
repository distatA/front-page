<template>
  <div class="container">
    <NavigatorBar title="我的收藏" />
    <div class="newsBar">
      <div class="font">
        <span>林芝零林芝零林芝零林芝零林芝零林</span>
        <p class="message">
          <span class="message_left">火星时报</span>
          <span class="message_right">50跟帖</span>
        </p>
      </div>
      <img src="../assets/Snipaste_2020-03-24_07-40-41.png" alt />
    </div>
  </div>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar";
export default {
  components: {
    NavigatorBar
  }
};
</script>

<style lang="less" scoped>
.container {
  .newsBar {
    height: 130/360 * 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8/360 * 100vw;
    border-bottom: 1px solid #eeeeee;
    img {
      width: 135/360 * 100vw;
      height: 85/360 * 100vw;
      display: block;
    }
    .font {
      .message {
        color: grey;
        margin: 20px 0px;
        font-size: 14px;
        .message_right {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>