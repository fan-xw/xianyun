<template>
  <div class="search">
    <div class="frame">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="search-recommend">
      <span>推荐：</span><span>广州</span><span>北京</span><span>上海</span>
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
  .frame {
    color: orange;
  }
  .search-recommend {
    color: #cccc;
    font-size: 10px;
    margin-top: 5px;
  }
}
</style>