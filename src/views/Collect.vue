<template>
  <div class="container">
    <NavigatorBar title="我的收藏" />
    <div v-for="(item,index) in start" :key="index">
      <div class="newsBar" v-if="item.cover.length<3&&item.cover.length>0">
        <div class="newsText">
          <div class="font">
            <span>{{item.title}}</span>
          </div>
          <p class="detail">火星时报 50跟帖</p>
        </div>
        <div class="pic">
          <img :src="$axios.defaults.baseURL+item.cover[0].url" alt />
        </div>
      </div>
    </div>
    <!-- <div class="newsBar">
      <div class="text">
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        亚马逊
        <div class="pho">
          <img
            src="../assets/Snipaste_2020-03-24_07-40-41.png"
            alt
            v-for="(item,index) in [0,1,2]"
            :key="index"
          />
        </div>
        <div class="detail">火星时报 50跟帖</div>
      </div>
    </div>-->
  </div>
</template>

<script>
// 日常填入导航栏
import NavigatorBar from "@/components/NavigatorBar";
export default {
  data() {
    return {
      start: []
    };
  },
  // 注册
  components: {
    NavigatorBar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      // console.log(res);
      // 解构出数据
      const { data } = res.data;
      // 赋值渲染
      console.log(data);

      this.start = data;
    });
  }
};
</script>

<style lang="less" scoped>
//   /360*100vw
.container {
  .newsBar {
    height: 122/360 * 100vw;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 20/360 * 100vw;

    .font {
      margin-top: 10/360 * 100vw;
      span {
        overflow: hidden;
        display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
        text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
        -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
        -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数。
      }
    }
    .detail {
      margin-top: 20/360 * 100vw;
      color: grey;
      font-size: 12/360 * 100vw;
      .follows {
        margin-left: 10/360 * 100vw;
      }
    }
    .pic {
      img {
        width: 100/360 * 100vw;
        height: 80/360 * 100vw;
        display: block;
        object-fit: cover;
        margin-left: 20/360 * 100vw;
      }
    }
    .pho {
      display: flex;
      justify-content: space-between;
      img {
        width: 33%;
        height: 80/360 * 100vw;
      }
    }
    .text {
      display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示 。
      text-overflow: ellipsis; // 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。
      -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式 。
      -webkit-line-clamp: 2; // 限制在一个块元素显示的文本的行数。
    }
  }
}
</style>