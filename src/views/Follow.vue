<template>
  <div class="container">
    <NavigatorBar title="我的关注" />
    <FollowBar />
    <FollowBar />
    <FollowBar />
  </div>
</template>

<script>
// 引入导航栏
import NavigatorBar from "@/components/NavigatorBar";
import FollowBar from "@/components/FollowBar";
export default {
  components: {
    NavigatorBar,
    FollowBar
  }
};
</script>

<style lang="less" scoped>
</style>