<template>
  <div class="container">
    <NavigatorBar title="栏目管理" />
    <div class="manage">
      <div class="delete">点击删除以下下频道</div>
      <div class="item_list">
        <!-- 循环渲染出is_top为1的栏目数组 -->
        <!-- 如果item.name里面包含关注和头条就调用active -->
        <!-- handleDle把删除的id,和索引传过去 -->
        <span
          v-for="(item, index) in categoriesDel"
          :key="index"
          :class="['关注','头条'].includes(item.name)?'active':'' "
          @click="handleDle(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
    <div class="manage">
      <div class="delete">点击添加以下下频道</div>
      <div class="item_list">
        <!-- 循环渲染出is_top为0的栏目数组 -->
        <span
          v-for="(item, index) in categoriesAdd"
          :key="index"
          @click="handleAdd(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar";
export default {
  data() {
    return {
      // 本地栏目数据
      categories: [],

      // 删除栏目数据的数组
      categoriesDel: [],
      // 添加栏目数据的数组
      categoriesAdd: []
    };
  },
  components: {
    NavigatorBar
  },
  mounted() {
    // 获取本地数据渲染
    this.categories = JSON.parse(localStorage.getItem("categories0*"));

    console.log(this.categories);

    // 过滤出添加和删除的栏目列表,放进响应的数组

    this.categoriesDel = this.categories.filter(v => {
      return v.is_top === 1;
    });
    this.categoriesAdd = this.categories.filter(v => {
      return v.is_top === 0;
    });
    
  },
  // 页面销毁时执行
  destroyed() {
    this.categories = [
      ...this.categoriesDel,
      ...this.categoriesAdd,
      this.categories[this.categories.length - 1]
    ];
    // 将数据保存到本地
    localStorage.setItem("categories", JSON.stringify(this.categories));
  },
 
  methods: {
    // 点击删除
    handleDle(v, i) {
      // 根据索引点击,删除,改istpo值,追加数组
      // 如果点击的是关注和头条就无效
      if (["关注", "头条"].includes(v.name)) return;
      this.categoriesDel.splice(i, 1);
      v.is_top = 0;
      this.categoriesAdd.push(v);
    },
    // 点击添加
    handleAdd(v, i) {
      this.categoriesAdd.splice(i, 1);
      v.is_top = 1;
      this.categoriesDel.push(v);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .manage {
    padding: 20/360 * 100vw;
  }
  .delete {
    font-weight: 700;
    font-size: 17/360 * 100vw;
    color: rgb(104, 104, 104);
  }
  .item_list {
    margin-top: 20/360 * 100vw;
    span {
      display: inline-block;
      border: 1px solid rgb(216, 207, 207);
      font-size: 20/360 * 100vw;
      width: 60/360 * 100vw;
      height: 35/360 * 100vw;
      margin: 5px 10px;
      font-weight: 700;
      border-radius: 3px;
      text-align: center;
      line-height: 35px;
    }
  }
  .active {
    border: red;
    background-color: #eee;
  }
}
</style>