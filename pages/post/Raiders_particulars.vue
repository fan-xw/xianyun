<template>
  <!-- 头部面包屑 -->
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/post/' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 攻略详情标题 -->
    <h1>小蛮腰广州塔，怎么玩才不遗憾？</h1>
    <hr />
    <!-- 攻略时间 -->
    <div>
      <p>攻略:2019-05-22 1:16</p>
      <p>阅读：757</p>
    </div>
    <!-- 特点简介 -->

    <p></p>
    <!-- 评论和分享点击图标 -->
    <!-- 评论模块 -->
    <!-- 相关攻略模块 -->
  </div>
</template>

<script>
export default {};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>