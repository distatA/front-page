<template>
  <div class="container">
    <navigatorbar title="编辑资料" />
    <!-- 照片 -->
    <div class="picture">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>

    <listBar lable="昵称" :tips="userInfo.nickname" @click.native="show=true" />
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <listBar lable="密码" tips="******" @click.native="isShowPassword=true" />

    <van-dialog
      v-model="isShowPassword"
      title="修改密码"
      show-cancel-button
      @confirm="handleChangePassword"
    >
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>

    <!-- 性别判断 根据索引值去选择-->
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
import navigatorbar from "@/components/NavigatorBar";
import listBar from "@/components/ListBar";
export default {
  // /360 * 100vw
  data() {
    return {
      // 用户信息详情
      userInfo: {},
      // 本地储存数据
      userJson: {},
      // 是否弹出输入框 默认是false
      show: false,
      isShowPassword: false,
      genderShow: false,
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      nickname: "",
      password: ""
    };
  },
  components: {
    navigatorbar,
    listBar
  },
  mounted() {
    // 获取到本地数据 进行回显
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 保存到data中的userJson
    this.userJson = userJson;
    // console.log(userJson);

    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      // console.log(res);
      // 解构出数据
      const { data } = res.data;
      // 赋值给空对象userInfo,再进行回显(渲染)
      this.userInfo = data;
      // console.log(data);

      // 单独保存nickname给编辑的弹窗使用
      this.nickname = data.nickname;
    });
  },
  methods: {
    // 图片上传的方法，file是对文件对象（认为它是不可读的）
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      // 解构出file
      const formDate = new FormData();
      //第一个字符串的file表示接口接收的属性,第二个 file.file是文件对象
      formDate.append("file", file.file);
      this.$axios({
        // 文件路径
        url: "/upload",
        // 要验证Authorization 也就是token值，所以要添加请求头信息
        headers: {
          Authorization: this.userJson.token
        },
        // 上传文件都是post请求
        // 如果是get请求可以不写类型，默认是get
        method: "post",
        // 把formdata当成参数提交
        data: formDate
      }).then(res => {
        // console.log(res);
        // 解构出图片地址
        const { url } = res.data.data;
        // 把图片地址覆盖掉原先的图片地址
        this.userInfo.head_img = url;
        this.handleEdit({
          head_img: url
        });
      });
    },
    // 封装一个编辑本地信息的函数

    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("修改成功");
      });
    },
    handleChangeNickname() {
      this.handleEdit({
        // 修改掉本地的昵称
        nickname: this.nickname
      });
      // 把昵称同步到页面
      this.userInfo.nickname = this.nickname;
    },
    // 修改面
    handleChangePassword() {
      this.handleEdit({
        password: this.password
      });
      console.log(this.password);
    },
    onSelect(item) {
      this.handleEdit({
        gender: item.value
      });
      this.userInfo.gender = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background-color: #f2f2f2;
  height: 800/360 * 100vw;

  .edit_data {
    margin: 0 auto;
  }
  .picture {
    height: 150/360 * 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  // 外部上传按钮的类名
  .uploader {
    position: absolute;
    top: 24%;
    left: 40%;
    // top: 50%;
    // left: 50%;
    // transform: translate(-35/360 * 100vw, -35/360 * 100vw;);
    opacity: 0;
  }
}
</style>