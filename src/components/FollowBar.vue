<template>
  <div class="FollowBar">
    <div class="particulars">
      <img src="../assets/u=1107263072,1224997471&fm=26&gp=0.jpg" alt />
      <div class="author">
        <p>天线宝宝</p>
        <p>2073-10-10</p>
      </div>
    </div>
    <div class="FollowBtn">
      <span>取消关注</span>
    </div>
  </div>
</template>

<script>
export default {};
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
      width: 80/360 * 100vw;
      border-radius: 20/360 * 100vw;
      background-color: #e1e1e1;
      line-height: 28/360 * 100vw;
      text-align: center;
      font-size: 14/360 * 100vw;
    }
  }
}
</style>