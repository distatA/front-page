<template>
  <div class="container">
    <!-- 返回上一页按钮 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test" @click="$router.back()"></span>
    </div>

    <!-- logo -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 使用vant的表单 -->
    <!-- van-form是表单的组件， @submit是表单按钮提交的事件 -->
    <van-form @submit="onSubmit" class="form">
      <!-- van-field是表单的字段 -->
      <!-- rules是表单字段的规则，required表示这个输入框是必填 -->
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部，
        并且按钮的native-type="submit"，说明点击这个按钮就会触发submit事件-->
        <van-button round block type="info" native-type="submit" class="btn">登录</van-button>
      </div>
    </van-form>
    <!-- <router-link to="/register">
      <van-button round block class="link-register">注册</van-button>
    </router-link>-->
    <div class="tips">
      <span class="password_left">
        <a href="#">忘记密码?</a>
      </span>
      <span class="register_right">
        <a href="http://localhost:8080/register">注册</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 保存表单数据
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 提交表单时候触发的事件，该事件通过校验才会触发
    // values是表单返回的值，这里的values我们用不上，数据可以在this.form里面拿
    onSubmit(values) {
      // 调用axios发起异步请求，类似$.ajax(类似不代表一样)
      this.$axios({
        // 接口地址
        url: "/login",
        // 声明请求的方法为post请求(一定要注册这个method没有s)
        // 跟vue的methods属性毫无关系
        method: "POST",
        // 参数
        data: this.form
        // .then方法里面的函数就是成功的回调函数,axios没有succces
      }).then(res => {
        // 获取到返回的信息, data是token和用户的信息，data是保存到本地的
        const { message, data } = res.data;
        // 使用vant的弹窗提示用，success表示成功的弹窗
        this.$toast.success(message);

        // 把token和id保存到本地
        // localStorage只能保存字符串，需要使用JSON.stringify来把对象转换成字符串
        localStorage.setItem("userInfo", JSON.stringify(data));

        // 判断地址栏有没有return_url参数，
        const { return_url } = this.$route.query;
        // 有的话就跳转到这个路径，没有就跳转个人中心
        this.$router.replace(return_url || "/personal");
      });
    }
  }
};
</script>


<style lang="less" scoped>
//             /360 * 100vw
.container {
  padding: 20/360 * 100vw;
  .back-btn {
    margin: 10/360 * 100vw;
    .iconicon-test {
      // margin: 20 /360 * 100vw 5/360 * 100vw;
      font-size: 25 /360 * 100vw;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10/360 * 100vw;
    .iconnew {
      font-size: 150/360 * 100vw;
      color: #f441a5;
    }
  }
}
.van-cell.van-field {
  border-bottom: 1px solid #f441a5;
  margin-bottom: 15/360 * 100vw;
  width: 300/360 * 100vw;
  margin-left: 10/360 * 100vw;
  padding: 5/360 * 100vw;
  font-size: 15/360 * 100vw;
  color: #4d9ecb;
}
.van-cell {
  color: #4d9ecb;
}

.van-button {
  margin: 30/360 * 100vw 0;
}
.btn {
  font-size: 15/360 * 100vw;
  height: 45/360 * 100vw;
  line-height: 45/360 * 100vw;
  cursor: pointer;
  // margin: 3.625rem 2rem;
  color: white;
  text-align: center;
  border-radius: 30/360 * 100vw;
  // line-height: 3.75rem;
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

.tips {
  height: 20/360 * 100vw;
  margin-top: 40/360 * 100vw;
  font-size: 18/360 * 100vw;
  color: #4d9ecb;
  .password_left {
    float: left;
  }
  .register_right {
    float: right;
  }
}
</style>