<template>
  <div class="container">
    <div class="header">
      <div class="iconfont iconnew"></div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        搜索新闻
      </div>
      <router-link to="/personal">
        <div class="iconfont iconwode"></div>
      </router-link>
    </div>
    <!-- tab栏切换 -->
    <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
    <!-- sticky：是否使用粘性定位布局 -->
    <!-- swipeable: 是否开启手势滑动切换 -->
    <!-- scroll 检测页面滑动的值 -->
    <van-tabs v-model="active" sticky swipeable @scroll="handelScroll">
      <van-tab
        v-for="(item, index) in categories"
        v-if="item.is_top === 1 || item.name === `∨`"
        :key="index"
        :title="item.name"
      >
        <van-list
          :immediate-check="false"
          v-model="item.loading"
          :finished="item.finished "
          finished-text="已经到底部啦"
          @load="onLoad"
        >
          <div v-for="(v,index) in item.list" :key="index">
            <!-- 只有单张图片的 -->
            <Postltem1 :data="v" v-if=" v.type===1 && v.cover.length <3" />
            <!-- 大于等于3张图片 -->
            <Postltem2 :data="v" v-if=" v.type===1 && v.cover.length >=3" />
            <!-- 视频 -->
            <Postltem3 :data="v" v-if=" v.type===2 " />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// 标签页
import { Tab, Tabs } from "vant";
// 下拉加载
import { List } from "vant";
import Postltem1 from "@/components/Postltem1";
import Postltem2 from "@/components/Postltem2";
import Postltem3 from "@/components/Postltem3";

export default {
  name: "index",
  components: {
    Postltem1,
    Postltem2,
    Postltem3
  },
  data() {
    return {
      active: 0,
      // 本地栏目的数据
      categories: [],
      token: ""
    };
  },
  // 监听
  watch: {
    active(index) {
      // 根据索引值来判断点击的是哪个标签
      console.log(index);
      // ]如果该点击的索引等于这个数组的长度就跳转到栏目管理页面
      // 因为栏目只显示is_top=1的栏目,所以要过滤出来
      const arr = this.categories.filter(v => {
        return v.is_top || v.name === "∨";
      });
      if (index === arr.length - 1) {
        // console.log(1);
        this.$router.push("/Column");
      }
      // 当栏目切换时候，需要重新的请求当前栏目的数据
      this.getList();
      // 我们需要等待文章数据的渲染，渲染完成了之后才进行滚动
      setTimeout(() => {
        // 页面滚动到当前栏目下的scrollY值
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 10);
    }
  },
  mounted() {
    // 把方法封装到reload这个函数里面
    this.load();
    console.log(this.$root);
  },
  // 局部路由守卫
  beforeRouteEnter(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    if (from.path === "/Column") {
      next(vm => {
        // 通过 `vm` 访问组件实例
        // 如果是栏目管理页跳转过来的,就让active=0
        vm.active = 0;
        // 如果是从栏目管理回来的，避免栏目管理的数据有更新，所以重新的初始化页面
        vm.load();
      });
    } else {
      next();
    }
  },
  methods: {
    onLoad() {
      this.getList();
    },
    // 由于因为keep-alive导致的进入栏目修改完返回首页不会立即修改页面数据,所以整了下面这一出好戏
    load() {
      // 获取本地的栏目数据
      const categories = JSON.parse(localStorage.getItem("categories"));
      // 获取本地的token,如果没有值就等于一个空对象
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      // 把token保存到data
      this.token = token;
      if (categories) {
        // 如果当前是登录的状态，但是栏目的第一项居然不是“关注”，需要重新请求
        // 如果当前未登录，但是栏目的第一项居然叫“关注”，也需要重新请求
        if (
          (token && categories[0].name !== "关注") ||
          (!token && categories[0].name === "关注")
        ) {
          // 调用请求栏目的数据,并且保存到本地
          this.getColumn();
        } else {
          this.categories = categories;
          // 调用方法给每个栏目添加新属性
          this.Addproperty();
        }
      } else {
        // 调用请求栏目的数据,并且保存到本地
        this.getColumn();
      }
      // this.getList();
      console.log(this.categories);
    },
    // 获取栏目
    getColumn() {
      // 请求的配置
      const config = {
        url: "/category"
      };
      // 如果token有值，给请求的配置加上headers
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        console.log(res);
        // 把栏目数据保存到data
        const { data } = res.data;
        // 给数组最后添加一个跳转到栏目管理的图标
        data.push({
          name: "∨"
        });
        this.categories = data;
        // 保存到本地
        localStorage.setItem("categories", JSON.stringify(data));
        // 调用方法给每个栏目添加新属性
        this.Addproperty();
      });
    },
    // 获取页面数据
    getList() {
      // 解构出当前页面的属性
      const {
        pageIndex,
        loading,
        finished,
        isLoad,
        id,
        name
      } = this.categories[this.active];
      // 如果正在加载的数据完毕后立即return,停止执行后面代码
      if (isLoad) return;
      // 正在加载数据
      this.categories[this.active].isLoad = true;
      // 让分页加一
      this.categories[this.active].pageIndex += 1;
      // 如果文章数据加载完毕立即return,停止执行后面代码
      if (finished) return;
      // 请求文章的配置
      const config = {
        url: "/post",
        params: {
          pageIndex, // 每个栏目页数是不一样的
          pageSize: 5, //  请求数据的条数
          category: id //  请求数据的id
        }
      };
      // 解构出来的name属性,如果有关注,就验证token信息
      if (name === "关注") {
        // 如果是的话就需要加上token
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        console.log(res);
        // 解构出数据和文章总数
        const { data, total } = res.data;
        // 合并到当前页面的数组里
        this.categories[this.active].list = [
          ...this.categories[this.active].list,
          ...data
        ];
        // 要用赋值方式才可立即看到数据,否则需要刷新
        this.categories = [...this.categories];
        // 让加载状态停止
        this.categories[this.active].loading = false;
        // 判断如果文章数据全部加载完毕就停止继续加载
        if (this.categories[this.active].list.length === total) {
          this.categories[this.active].finished = true;
        }
        // 手动控制的请求状态也停止
        this.categories[this.active].isLoad = false;
      });
    },
    // 给每个栏目添加属性
    Addproperty() {
      this.categories = this.categories.map(v => {
        // 给每个栏目都添加了一个pageIndex属性
        v.pageIndex = 1;
        // 给每个栏目都添加是否正在请求的状态
        v.loading = false;
        // 给每个栏目都添加一个文章是否全部加载完毕的状态
        v.finished = false;
        // 当前栏目是否正在请求，跟上面的loading不一样，
        v.isLoad = false;
        // 给每个栏目都拥有自己的文章列表
        v.list = [];
        // 给每个栏目添加一个滚动条的高度
        v.scrollY = 0;
        // 返回这个数组
        return v;
      });
      // 请求文章列表数据,是一定要放到栏目处理之后执行；
      this.getList();
    },
    handelScroll({ scrollTop }) {
      console.log(scrollTop);
      // / 因为栏目不管是从本地获取或者请求接口也好，都是需要时间，
      // 所以需要等this.categories有值时候才设置滚动条的高度s
      if (this.categories.length === 0) return;
      // scrollTop是滚动条的距离,插件自带传进的值
      // 赋值给自定义的属性
      this.categories[this.active].scrollY = scrollTop;
      // console.log(this.categories[this.active].scrollY);
    }
  }
};
</script>
<style lang="less" scoped>
// 如果添加了scoped之后,想修改第三方的样式要在样式前面/deep/
.container {
  // height: 1800px;
  .header {
    padding: 15/360 * 100vw;
    height: 45/360 * 100vw;
    // background-color: #ff0000;
    background: linear-gradient(90deg, #43c6ac, #191654);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    .iconnew {
      transform: scale(2);
      font-size: 25/360 * 100vw;
      padding-left: 5/360 * 100vw;
    }
    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 30/360 * 100vw;
      background-color: rgba(250, 250, 250, 0.5);
      border-radius: 50/360 * 100vw;
      margin: 0 20/360 * 100vw;
      span {
        margin-right: 5/360 * 100vw;
        font-size: 18/360 * 100vw;
      }
    }
    .iconwode {
      font-size: 25/360 * 100vw;
    }
  }
  /deep/ .van-tabs__nav {
    background-color: #eee !important;
  }
  /deep/ .van-tab.van-ellipsis {
    flex-basis: 15% !important;
  }
  /deep/ .van-tab:nth-last-child(2) {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 35/360 * 100vw !important;
    box-sizing: unset;
    background-color: #eee;
  }

  /deep/ .van-tabs__wrap {
    padding-right: 25/360 * 100vw;
  }

  /deep/ .van-tabs__nav {
    // 静态定位
    // 恢复到原始流,不受定位影响!
    position: static;
  }
  /deep/ .van-tabs__line {
    position: static;
    // display: none;
  }
  /deep/.van-tab--active {
    border-bottom: 1px solid red;
  }
  /deep/ .van-tabs__line {
    background-color: transparent;
  }
}
</style>