<template>
  <div class="recommend">
    <div class="hot">
      <div><span>热门城市</span><i class="el-icon-arrow-right"></i></div>
      <div><span>推荐城市</span><i class="el-icon-arrow-right"></i></div>
      <div><span>奔向海岛</span><i class="el-icon-arrow-right"></i></div>
      <div><span>主题推荐</span><i class="el-icon-arrow-right"></i></div>
    </div>

    <div class="active">
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.recommend {
  .hot {
    width: 200px;
    height: 300px;
    border: 1px solid #999;

    div {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>