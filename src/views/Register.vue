
<style  lang="less">
body {
  font-family: "montserrat", sans-serif;
}
@banxin-width: 46.875rem;
// 版心
.center {
  margin: 0 auto;
  max-width: @banxin-width;
  background-color: rgb(224, 224, 224);
  height: 112.5rem;
  background: url("../assets/302045.jpg") no-repeat center;
  background-size: cover;
}

.TopEdge {
  height: 1.875rem;
  width: 100%;
  background-color: rgb(117, 117, 117);
}

.iconfont.iconnew {
  color: #f441a5;
  font-size: 15.625rem;
  position: relative;
  top: 0rem;
  left: 16.25rem;
}

.btn {
  // transition: all 3s linear;
  cursor: pointer;
  margin: 7.625rem 4.75rem;
  color: white;
  text-align: center;
  width: 37.5rem;
  height: 3.75rem;
  border-radius: 1.875rem;
  line-height: 3.75rem;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  text-transform: uppercase;
  transition: 1s;
  font-family: sans-serif;
  z-index: 1;
}
.btn:hover {
  animation: animate 1.5s linear infinite;
}
@keyframes animate {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 100%;
  }
}

.iconfont.iconicon-test {
  margin: 3.125rem 2.8125rem;
  font-size: 2.5rem;
}
.inputbox {
  text-align: center;
  input {
    outline: none;
    border: none;
    width: 31.25rem;
    height: 3.125rem;
    border-bottom: 3px solid rgb(173, 51, 255);
    // color: rgb(173, 51, 255);
    color: #f441a5;
    background-color: transparent;
    margin-top: 1.4375rem;
    font-size: 1.875rem;
  }
}
::-webkit-input-placeholder {
  color: #4d9ecb;
}
</style>
<template>
  <div class="center">
    <!-- 上沿灰色 -->
    <div class="TopEdge"></div>
    <!-- ××图标 -->
    <div class="iconfont iconicon-test"></div>
    <!-- logo标签 -->
    <h1 class="iconfont iconnew"></h1>
    <div class="inputbox">
      <input type="text" placeholder="username/phone number" />
      <br />
      <input type="text" placeholder="nickname" />
      <br />
      <input type="password" placeholder="password" />

      <div class="enter">
        <div class="btn">
          <span>
            <a href="#">Register</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  // http://localhost:8080/login
};
</script>

