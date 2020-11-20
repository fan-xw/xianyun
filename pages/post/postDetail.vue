<template>
  <div class="detail">
    <el-row :gutter="20" style="width: 1000px; margin: 0 auto">
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <!-- 面包屑 -->
          <div class="crumbs">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/post' }"
                >旅游攻略</el-breadcrumb-item
              >
              <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div v-for="(item, index) in postList" :key="index">
            <div class="postTitle">
              <h1>{{ item.title }}</h1>
            </div>
            <!-- 发布攻略时间 -->
            <div class="postTime">
              <el-row :gutter="20">
                <el-col :span="20" :offset="13"
                  ><div class="grid-content bg-purple">
                    <span>攻略：{{ item.updated_at | formatDate }} </span>
                    <span>阅读：{{ item.watch }}</span>
                  </div></el-col
                >
              </el-row>
            </div>
            <!-- 攻略内容 -->
            <div class="postContent">
              <p v-html="item.content">
                {{ item.content }}
              </p>
            </div>
          </div>
          <!-- 攻略标题 -->

          <!-- 评论回复模块 -->
          <postComment /></div
      ></el-col>
      <!-- 相关攻略模块 -->
      <el-col :span="8"
        ><div class="grid-content bg-purple"><postCorrelation /></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import postComment from "@/components/post/postComment.vue";
import postCorrelation from "@/components/post/postCorrelation";
//引入时间戳转换文件
import { formatDate } from "@/utils/date.js";

export default {
  data() {
    return {
      postList: [],
    };
  },

  components: {
    postComment,
    postCorrelation,
  },
  mounted(id) {
    this.$axios({
      url: "/posts",
      params: this.$route.query,
    }).then((res) => {
      console.log(res.data.data);
      this.postList = res.data.data;
    });
  },
  // 转换时间戳
  filters: {
    formatDate(time) {
      //   time = time * 1000;
      let date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>
<style lang="less" scoped>
.detail {
  .crumbs {
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .postTitle {
    height: 100px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .postTime {
    margin-bottom: 20px;
    span {
      font-size: 16px;
      color: #999;
    }
  }
  /deep/.postContent {
    z-index: 9999;
    font-size: 16px;
    padding: 20px 0;

    img {
      max-width: 700px;
    }
  }
}
</style>