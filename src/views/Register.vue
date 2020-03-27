<style lang="less" scoped  >
// 加上scoped防止组件样式冲突;
body {
  font-family: "montserrat", sans-serif;
  height: 1170px;
  // background: url("../assets/302045.jpg") no-repeat center;
}
// .center {
//   width: 35.6875rem;
// }
// @media screen and (min-width: 750px) {
//   html {
//     font-size: 75px;
//   }
// }
// @media screen and (min-width: 540px) and (max-width: 750px) {
//   html {
//     font-size: 54px;
//   }
// }
// @media screen and (min-width: 480px) and (max-width: 540px) {
//   html {
//     font-size: 48px;
//   }
// }
// @media screen and (max-width: 480px) {
//   html {
//     font-size: 48px;
//   }
// }
.iconfont.iconnew {
  color: #f441a5;
  font-size: 11.625rem;
  position: relative;
  top: 0rem;
  left: 8.5rem;
}
.btn {
  font-size: 1.375rem;
  cursor: pointer;
  // margin: 3.625rem 2rem;
  color: white;
  text-align: center;
  border-radius: 1.875rem;
  line-height: 3.75rem;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
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
  padding: 2.25rem;
  font-size: 1.8rem;
  cursor: pointer;
}
.form {
  margin-left: 1.25rem;
  width: 100%;
  .van-cell {
    width: 23.25rem;
    height: 3.125rem;
    border-bottom: 1px solid purple;
    font-size: 22px;
    margin-left: 1.5625rem;
  }
  .van-button--block {
    width: 24.5rem;
    height: 2.75rem;
    font-size: 18px;
    line-height: 2.75rem;
  }
  .van-button {
    margin-top: 2.75rem;
  }
  ::-webkit-input-placeholder {
    color: #4d9ecb;
  }
  .van-field__error-message {
    font-size: 1.125rem;
  }
}
.tips {
  width: 24.5625rem;
  height: 1.875rem;
  margin-left: 2.1875rem;
  margin-top: 2.5rem;
  font-size: 1.25rem;
  color: #4d9ecb;
  .password_left {
    float: left;
  }
  .register_right {
    float: right;
  }
}
</style>
<template>
  <div class="center">
    <!-- ××图标 -->
    <div class="iconfont iconicon-test"></div>
    <!-- logo标签 -->
    <div class="iconfont iconnew"></div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="用户名"
        placeholder="Username"
        :rules="[{ required: true, message: 'Please fill in the username' }]"
      />
      <van-field
        v-model="form.nickname"
        name="昵称"
        placeholder="nikename"
        :rules="[{ required: true, message: 'Please enter your nickname ' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="Password"
        :rules="[{ required: true, message: 'Please enter your password ' }]"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" class="btn">Register</van-button>
      </div>
    </van-form>
    <div class="tips">
      <span class="password_left">
        <a href="#">Forget?</a>
      </span>
      <span class="register_right">
        <a href="http://localhost:8080/login">Login</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        // this.$toast("登录成功");
        console.log(res);
        const { message } = res.data;
        this.$toast.success(message);
        this.form = "";
      });
    }
  }
};
</script>
