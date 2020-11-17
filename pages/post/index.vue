<template>
  <div class="post">
    <el-container>
      <el-aside width="200px">Aside 123124</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.post {
  min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>