<template>
  <div class="post">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!-- 左边导航栏 -->
          <SideNacigation />
          <!-- 左边推荐城市 -->
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
          <!-- 搜索框 -->
          <SearchFrame />
          <!-- 推荐攻略 -->
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
          <!-- 文章列表 -->
          <PostList />
          <!-- 分页 -->
          <div class="paging">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pagesizes"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="48"
              >
              </el-pagination>
            </div>
          </div>
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
import PostList from "@/components/post/postList.vue";
export default {
  components: {
    SideNacigation,
    SearchFrame,
    PostList,
  },
  data() {
    return {
      currentPage: 3,
      pagesize: 3,
      pagesizes: [3, 5, 10, 15],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  computed: {},
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