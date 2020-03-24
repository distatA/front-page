
<style  lang="less">
body {
  font-family: "montserrat", sans-serif;
}
// 版心
.center {
  margin: 0 auto;
  max-width: 750px;

  background-color: rgb(224, 224, 224);
  height: 1800px;
  background: url("../assets/302045.jpg") no-repeat center;
  background-size: cover;
}

.TopEdge {
  height: 30px;
  width: 100%;
  background-color: rgb(117, 117, 117);
}
@media screen and (min-width: 540px) and (max-width: 750px) {
  html {
    font-size: 54px;
  }
}

@media screen and (min-width: 480px) and (max-width: 540px) {
  html {
    font-size: 48px;
  }
}

@media screen and (max-width: 480px) {
  html {
    font-size: 48px;
  }
}
.iconfont.iconnew {
  color: #f441a5;
  font-size: 250px;
  position: relative;
  top: 0px;
  left: 260px;
}

.btn {
  transition: all 3s linear;
  cursor: pointer;
  margin: 122px 76px;
  background-color: red;
  color: white;
  text-align: center;
  width: 600px;
  height: 60px;
  border-radius: 30px;
  line-height: 60px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  text-transform: uppercase;
}

.iconfont.iconicon-test {
  margin: 50px 45px;
  font-size: 40px;
}
.inputbox {
  text-align: center;
  input {
    outline: none;
    border: none;
    width: 500px;
    height: 50px;
    border-bottom: 3px solid rgb(173, 51, 255);
    // color: rgb(173, 51, 255);
    color: black;
    background-color: transparent;
    margin-top: 23px;
    font-size: 30px;
   
  }
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
      <input type="text" placeholder="用户名/手机号码" />
      <br />
      <input type="password" placeholder="密码" />
      <div class="enter">
        <div class="btn">
          <span>
            <a href="#">登录</a>
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

