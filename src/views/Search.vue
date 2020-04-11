<template>
  <div class="container">
    <div class="header">
      <div class="iconfont iconjiantou22" @click="$router.back()">取消</div>
      <div class="search">
        <div class="iconfont iconsearch">
          <input
            placeholder="程序猿面临就业困难"
            class="ipt"
            autofocus
            v-model="value"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
      <div class="font" @click="handleSearch">搜索</div>
    </div>
    <div class="tips">
      <p class="history">
        <strong>历史记录</strong>
        <span class="iconfont iconicon-test" @click="handleRemove"></span>
      </p>
      <div class="tips_content">
        <span v-for="(item,index) in history " :key="index" @click="handleComeBack(item)">{{item}}</span>
      </div>
    </div>
    <div class="hot_search">
      <h4>热门搜索</h4>
      <div class="content">
        <p>假发可以永镶上?</p>
        <p>医院植发天价?</p>
        <p>假发可以永镶上</p>
        <p>医院植发天价</p>
        <p>假发可以永镶上?</p>
        <p>医院植发天价</p>
      </div>
    </div>
    <div class="mask_layer" v-if="showLayer">
      <!-- <div class="data">
        <span class="data_font">美国疫情突破三十万,然而特朗普</span>
        <span class="iconfont iconjiantou1"></span>
      </div>-->
      <div v-for="(v,index) in list" :key="index">
        <Postltem1 :data="v" v-if=" v.type===1 && v.cover.length <3" />
        <Postltem2 :data="v" v-if=" v.type===1 && v.cover.length >=3" />
        <Postltem3 :data="v" v-if=" v.type===2 " />
      </div>
      <div class="empty" v-if="list.length === 0">
        <h3>没有你想要搜索的内容哦~</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Postltem1 from "@/components/Postltem1";
import Postltem2 from "@/components/Postltem2";
import Postltem3 from "@/components/Postltem3";
export default {
  name: "search",
  // 局部的组件导航
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      if (from.path === "/") {
        // 通过 `vm` 访问组件实例
        vm.value = "";
        // 隐藏浮层
        vm.showLayer = false;
      } else {
        next();
      }
    });
  },
  data() {
    return {
      value: "",
      // 获取本地数据,如果有就返回数据,没有就返回一个数组
      history: JSON.parse(localStorage.getItem("history")) || [],
      // 判断是否显示
      showLayer: false,
      list: []
    };
  },
  watch: {
    value() {
      if (this.value === "") {
        // 隐藏浮层
        this.showLayer = false;
        // 清空数组
        this.list = [];
      }
    }
  },
  components: {
    Postltem1,
    Postltem2,
    Postltem3
  },
  methods: {
    // 点击搜索
    handleSearch() {
      // 非空判断,如果没有输入内容,不会生成历史记录
      if (this.value === "") return;
      this.history.unshift(this.value);
      // 点完搜索清空输入框
      this.value = "";

      // 数组去重
      this.history = [...new Set(this.history)];
      // 保存到本地
      localStorage.setItem("history", JSON.stringify(this.history));
      this.getList();
    },
    // 清除记录
    handleRemove() {
      // 清空数组
      this.history = [];
      // 本地删除记录
      localStorage.removeItem("history");
    },
    // 获取搜索结果
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        console.log(res);
        this.showLayer = true;
        const { data } = res.data;
        this.list = data;
      });
    },
    // 点击历史记录搜索
    handleComeBack(v) {
      // 点击的搜索记录在输入框显示
      this.value = v;
      this.getList();
    }
  }
};
</script>
<style lang="less" scoped >
//                        /360 * 100vw
.container {
  padding: 5/360 * 100vw 15/360 * 100vw;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50/360 * 100vw;
    .iconjiantou22 {
      font-weight: 700;
      font-size: 17/360 * 100vw;
    }
    .font {
      font-size: 17/360 * 100vw;
      font-weight: 700;
    }
    .search {
      font-size: 12 /360 * 100vw;
      padding-left: 10/360 * 100vw;
      line-height: 35 /360 * 100vw;
      height: 35/360 * 100vw;
      flex: 1;
      width: 300 /360 * 100vw;
      margin: 0 15 /360 * 100vw;
      border-radius: 30 /360 * 100vw;
      border: 1px solid grey;
      .iconsearch {
        margin-left: 5 /360 * 100vw;
        font-size: 16 /360 * 100vw;
      }
      .ipt {
        width: 90%;
        height: 100%;
        border: none;
        outline: none;
      }
    }
  }
  .tips {
    border-bottom: 2px solid #eee;
    .history {
      display: flex;
      align-items: center;
      height: 30/360 * 100vw;
      justify-content: space-between;
    }
    .tips_content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      span {
        border: 1px solid #eee;
        border-radius: 30/360 * 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #d6d6d6;
        height: 22/360 * 100vw;
        width: 80/360 * 100vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin: 5/360 * 100vw;
        font-size: 12/360 * 100vw;
      }
    }
  }

  .hot_search {
    h4 {
      margin: 15/360 * 100vw 0;
    }
    .content {
      display: flex;
      height: 130 /360 * 100vw;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      width: 150/360 * 100vw;
      height: 18/360 * 100vw;
    }
  }
  .mask_layer {
    position: absolute;
    padding: 0 20/360 * 100vw;
    top: 60/360 * 100vw;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    .data {
      height: 50/360 * 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid grey;

      .iconjiantou1 {
        font-size: 17/360 * 100vw;
      }
      .data_font {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-right: 10/360 * 100vw;
        flex: 1;
      }
    }
  }
  .empty {
    margin: 50/360 * 100vw auto;
    text-align: center;
  }
}
</style>