<template>
  <!-- 旅游攻略页面 -->
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
          <SearchFrame @click="toSearch" />
          <!-- 推荐攻略 -->
          <div class="strategy">
            <h3 class="strategy_left">推荐攻略</h3>
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
          <div>
            <!-- 父组件传递数据-列表项 -->
            <PostList
              v-for="(item, index) in dataList"
              :key="index"
              :data="item"
            />
          </div>
          <!-- 分页 -->
          <div class="paging">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pagesizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total.total"
              >
                <!-- total:文章的总条数 ，size-change:切换页面文章数量时候触发，current-page：当前页数，page-size：当前页面文章数量-->
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
// 左边导航组件
import SideNacigation from "@/components/post/SideNacigation.vue";
//搜索框组件
import SearchFrame from "@/components/post/SearchFrame.vue";
//文章详情组件
import PostList from "@/components/post/postList.vue";
export default {
  components: {
    SideNacigation,
    SearchFrame,
    PostList,
  },
  created() {
    // 获取最初数据
    this.$axios({
      url: '/posts',
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
      // 赋值给要过滤的数据
      this.articleList = res.data.data
      this.total = res.data
      // console.log(this.articleList);

    })
  },
  computed: {
    dataList() {
      if (!this.articleList) {
        return []
      }
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.articleList.slice(start, end)
    }
  },
  data() {
    return {
      //文章存储的列表
      articleList: [],
      total: 100,
      pagesizes: [2, 4, 6],
      //每页条数
      pageSize: 2,
      //显示当前页数
      currentPage: 1,
      //多一个数组存放筛选后的数据
      articledata: [],
      //要搜索的城市名
      cityName: "",
    };
  },

  methods: {
    // 点击搜索按钮
    toSearch(cityName) {
      //如果搜索框为空的时候
      if (cityName.trim() == "") {
        this.$axios({
          url: '/posts'
        }).then((res) => {
          this.articleList = res.data.data;
          this.total = res.data
          // this.$route
        })

      } else {
        console.log(cityName);
        this.$axios({
          url: `/posts?city=${cityName}`
        }).then((res) => {
          this.articleList = res.data.data;
          this.total = res.data
          // this.$route
        })
        // console.log(2);
      }
    },
<<<<<<< HEAD
    // 改变一页显示多少条
    handleSizeChange(newSize) {
      this.currentPage = 1;
      this.pageSize = newSize
    },
    // 改变页码
    handleCurrentChange(newIndex) {
      //
      // console.log(this.dataList);
      this.currentPage = newIndex
    },


  },


=======
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  computed: {},
>>>>>>> 6f9e9e0bbb62af7310ed94125535f609c8ee1b5e
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
      margin: 8px 0;
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
      font-weight: normal;
      color: #ffa500;
      height: 55px;
      line-height: 50px;
      border-bottom: 2px solid #ffa500;
    }
  }
}
</style>