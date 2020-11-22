<template>
  <!-- 旅游攻略搜索框 -->
  <div class="search">
    <div class="frame" @keyup.enter="toSearch()">
      <el-input v-model="cityName" placeholder="请输入想去的地方，比如'广州'">
        <i slot="suffix" class="el-icon-search" @click="toSearch()"></i>
      </el-input>
    </div>
    <div class="search-recommend">
      <div class="recommend">推荐:</div>
      <div class="city_list">
        <a href="#" @click="toSearch('广州')">广州</a>
        <a href="#" @click="toSearch('上海')">上海</a>
        <a href="#" @click="toSearch('北京')">北京</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      cityName: '',


    }
  },
  methods: {
    //搜索框
    toSearch(city) {
      if (city) {
        this.cityName = city
      }
      // if (this.cityName.trim() == "") {
      // this.$notify({
      //   message: "请输入内容再搜索",
      //   type: "warning",
      //   duration: 1500,
      // });

      // document.querySelector(".el-input__inner").focus();
      // return;
      // }
      this.$emit("click", this.cityName)

    },


  }

}
</script>

<style lang="less" scoped>
.search {
  .frame {
    /deep/.el-input__inner {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      border: 3px solid orange;
    }
    i {
      width: 50px;
      font-size: 25px;
      color: orange;
      font-weight: 600;
      text-align: center;
      margin-top: 8px;
    }
  }
  // 城市搜索框
  .search-recommend {
    font-size: 12px;
    color: #666666;
    margin: 8px 0;
    display: flex;
    align-items: center;
    .recommend {
      padding-right: 3px;
    }
    .city_list {
      padding: 5px 3px;

      a {
        &:hover {
          color: orange;
        }
      }
    }
  }
}
</style>