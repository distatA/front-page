<template>
  <div class="containar">
    <navigatorBar title="编辑资料" />
    <div class="pic">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
      <van-uploader :after-read="afterRead" class="upload" />
    </div>
    <!-- @click.native就是强制给最外层的div绑定一个事件 -->
    <!-- changeNickname -->
    <listBar lable="昵称" :tips="userInfo.nickname" @click.native="show=true" />
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="changeNickname">
      <van-field v-model="nickname" placeholder="请输入要修改的昵称" />
    </van-dialog>

    <listBar lable="密码" tips="******" @click.native="showPassword=true" />
    <van-dialog v-model="showPassword" title="修改密码" show-cancel-button @confirm="changePassword">
      <van-field v-model="password" placeholder="请输入要修改的密码" />
    </van-dialog>

    <!-- 按照数组的索引来选择 -->
    <listBar lable="性别" :tips="['女','男'][userInfo.gender]" @click.native="genderShow=true" />
    <van-action-sheet
      v-model="genderShow"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
// 导入导航栏
import navigatorBar from "@/components/NavigatorBar";
// 引入list
import listBar from "@/components/ListBar";
export default {
  data() {
    return {
      // 个人信息
      userInfo: {},
      // 本地个人数据
      userJson: {},
      // 输入框框是否打开,默认false
      show: false,
      // 修改的值
      nickname: "",
      showPassword: false,
      password: "",
      genderShow: false,
      actions: [
        { name: "女", gender: "0" },
        { name: "男", gender: "1" }
      ]
    };
  },
  components: {
    // 注册导入的组件
    navigatorBar,
    listBar
  },
  // vue中的onload事件 加载完毕立即执行事件
  mounted() {
    // 拿到本地个人信息
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 赋值给userInfo这个空对象接收进行回显
    this.userJson = userJson;
    console.log(this.userInfo);
    this.$axios({
      url: "/user/" + this.userJson.user.id,
      // 需要验证:【Authorization 】也就是token值
      // 添加请求头信息
      headers: {
        Authorization: this.userJson.token
      }
    }).then(res => {
      // console.log(res);
      // 解构出data参数,
      const { data } = res.data;
      // 赋值给userInfo;
      this.userInfo = data;
    });
  },
  methods: {
    // 调用第三方的组件,传入得必须是文件格式
    afterRead(file) {
      // 利用formdata格式提交
      const formdata = new FormData();
      // console.log(file);

      // 追加内容
      // 前面file是文件格式
      formdata.append("file", file.file);
      this.$axios({
        url: "/upload",
        // 也需要验证Authorization
        headers: {
          Authorization: this.userJson.token
        },
        method: "POST",
        data: formdata
      }).then(res => {
        console.log(res);
        // 解构出图片地址,
        const { url } = res.data.data;
        // console.log(url);
        // 覆盖掉页面的图片
        // 这里只是渲染页面的图片改变了,本地的个人信息并没有改变
        this.userInfo.head_img = url;
        // 参数是个对象,所以传入个对象
        this.changeMessage({
          head_img: url
        });
      });
    },
    // 封装一个编辑用户信息的函数
    changeMessage(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        headers: {
          Authorization: this.userJson.token
        },
        method: "POST",
        data
      }).then(res => {
        console.log(res);
        this.$toast.success("修改成功");
      });
    },
    // 修改昵称
    changeNickname() {
      this.changeMessage({
        // 把data中的nickname赋值给本地的nickname
        nickname: this.nickname
      });
      // 并且在页面上也同时进行渲染
      this.userInfo.nickname = this.nickname;
    },
    // 修改密码
    changePassword() {
      this.changeMessage({
        password: this.password
      });
      // 密码不需要显示到页面
      // console.log(this.password);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.changeMessage({
        gender: item.gender
      });
      this.userInfo.gender = item.gender;
    }
  }
};
</script>
// /360 * 100vw
<style lang="less" scoped>
.containar {
  .pic {
    height: 120/360 * 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      object-fit: cover;
    }
    .upload {
      position: absolute;
      top: 21%;
      left: 39%;
      opacity: 0;
    }
  }
}
</style>