<template>
  <div class="search">
    <div class="frame">
      <el-input
        v-model="input"
        placeholder="请输入想去的地方，比如'广州'"
        suffix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="search-recommend">
      推荐：<a href="#">广州</a>
      <a href="#">北京</a>
      <a href="#">上海</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',

    }
  }

}
</script>

<style lang="less" scoped>
.search {
  /deep/.el-input__inner {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px solid orange;
  }
  /deep/.el-input__icon {
    width: 50px;
    font-size: 25px;
    color: orange;
    font-weight: 600;
  }
  .search-recommend {
    font-size: 12px;
    color: #ccc;
    margin: 8px 0;
    a {
      &:hover {
        color: orange;
      }
    }
  }
}
</style>