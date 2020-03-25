

<style lang="less">
body {
  user-select: none;
}
.center {
  margin: 0 auto;
  width: 25.625rem;
  height: 48.125rem;
  background-color: pink;
  .TopLine {
    background-color: grey;
    height: 1.5625rem;
  }
  .header {
    height: 3.75rem;
    background-color: red;
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    color: white;
    .search {
      width: 15rem;
      height: 2.5rem;
      background-color: rgba(231, 231, 231, 0.5);
      line-height: 2.5rem;
      text-align: center;
      border-radius: 1.875rem;
      .iconfont.iconsearch {
        font-size: 1.125rem;
      }
    }

    .user {
      font-size: 1.875rem;
      cursor: pointer;
    }
    .logo {
      font-size: 3.5625rem;
      cursor: pointer;
    }
  }
  .nav {
    display: flex;
    background-color: #e4e4e4;
    font-size: 1.125rem;
    justify-content: center;
    align-items: center;
    height: 3.125rem;
    .iconfont.iconjiantou1 {
      font-size: 1.4375rem;
      transform: rotate(90deg);
      line-height: 3.125rem;
      padding-left: 0.625rem;
      padding-top: 0.5rem;
      cursor: pointer;
    }
  }
  .nav > div {
    margin-left: 1.25rem;
    width: 2.9375rem;
  }
  .content_top {
    height: 7.5rem;
    border-bottom: 0.0625rem grey solid;
    .content_top.content {
      margin: 0.625rem;
      .content_top.left {
        flex: 1;
        float: left;
        width: 15rem;
      }
      .content_top.right {
        float: right;
      }
      .content_top.right img {
        width: 8.8125rem;
        height: 6.8rem;
        float: right;
        vertical-align: middle;
      }
    }
    .Mars {
      margin-top: 0.5rem;
      span {
        margin-left: 0.625rem;
        color: grey;
      }
    }
  }

  .content_center {
    height: 12.1875rem;
    background-color: green;
  }
  .content_bottom {
    height: 17.5rem;
    background-color: yellow;
  }
}
</style>
<template>
  <div class="center">
    <!-- 灰色上沿 -->
    <div class="TopLine"></div>
    <!-- 头部 -->
    <header class="header">
      <div class="logo iconfont iconnew"></div>
      <div class="search">
        <div class="iconfont iconsearch">Search News</div>
      </div>
      <div class="user iconfont iconwode"></div>
    </header>
    <!-- 导航栏 -->
    <nav class="nav">
      <div>
        <a href="#">Follow</a>
      </div>
      <div>
        <a href="#">Hot</a>
      </div>
      <div>
        <a href="#">Travel</a>
      </div>
      <div>
        <a href="#">Sports</a>
      </div>
      <div>
        <a href="#">Live</a>
      </div>
      <div>
        <a href="#">Movie</a>
      </div>
      <div class="iconfont iconjiantou1">
        <a href="#"></a>
      </div>
    </nav>
    <section class="content_top">
      <div class="content_top content">
        <div class="content_top left">
          <h3>The list of people who have designed the latest iphone model has turned out to be a trainee?</h3>
          <p class="Mars">
            <span>火星时报</span>
            <span>25跟帖</span>
          </p>
        </div>
        <div class="content_top right">
          <img src="../assets/Snipaste_2020-03-24_07-40-41.png" alt />
        </div>
      </div>
    </section>
    <section class="content_center"></section>
    <section class="content_bottom"></section>
  </div>
</template>
<script>
export default {
  //  http://localhost:8080/index
};
</script>
