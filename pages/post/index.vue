<template>
  <div class="post">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <SideNacigation />
          <div class="city">
            <h4>推荐城市</h4>
            <hr />
            <a href="post#">
              <img
                src="http://157.122.54.189:9093/images/pic_sea.jpeg"
                alt=""
              />
            </a>
          </div></div
      ></el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <SearchFrame />
          <div class="strategy">
            <h2 class="strategy_left">推荐攻略</h2>

            <el-row>
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="$router.replace({ path: '/post/create' })"
                >写游记</el-button
              >
            </el-row>
          </div>
          <postList />
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SideNacigation from "@/components/post/SideNacigation.vue";
import SearchFrame from "@/components/post/SearchFrame.vue";
import postList from "@/components/post/postList.vue";
export default {
  components: {
    SideNacigation,
    SearchFrame,
    postList,
  },
  data() {
    return {
      postData: [],
    };
  },
  mounted() {


  },
};
</script>

<style lang="less" scoped>
.post {
  min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
  padding-top: 20px;
  .city {
    width: 250px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    hr {
      margin: 10px 0;
    }
    img {
      width: 100%;
    }
  }

  .strategy {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 1px solid #eeee;
    height: 50px;
    .strategy_left {
      color: #ffa500;
      height: 55px;
      line-height: 50px;
      border-bottom: 2px solid #ffa500;
    }
  }
}
</style>