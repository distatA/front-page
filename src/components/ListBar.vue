<template>
  <router-link :to="path||'#'">
    <div class="listBar">
      <div class="listBar_left" style="color:black; font-size:15">{{ lable }}</div>
      <div class="listBar_right">
        {{ tips }}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  // 声明的属性
  props: ["lable", "tips", "path"]
};
</script>

<style lang="less" scoped>
.listBar {
  padding: 10/360 * 100vw;
  font-size: 13/360 * 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60 /360 * 100vw;
  border-bottom: 1px solid rgb(218, 215, 215);
  color: grey;
}
</style>
