<template>
  <!-- 导航栏 -->
  <div class="nav">
    <!-- 因为$router.back()是实例下的属性,可以直接渲染 -->
    <span class="iconfont iconjiantou" @click="$router.back()"></span>
    <span style="font-size:15px">{{title}}</span>
    <!-- 如果isshow是true就顯示homelogo,不是就显示另外一个 -->
    <span class="iconfont iconshouye" @click="$router.push('/')" v-if="isShow"></span>
    <!-- 因为使用了flex布局所以,为了占位置,把它透明度改为0 -->
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  props: ["title", "isShow"]
};
</script>

<style lang="less" scoped>
.nav {
  height: 50/360 * 100vw;
  display: flex;
  box-shadow: 5px 2px 5px #88888d;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
</style>