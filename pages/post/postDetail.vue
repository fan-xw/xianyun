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
          <!-- 攻略标题 -->
          <div class="postTitle">
            <h1>远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</h1>
          </div>
          <!-- 发布攻略时间 -->
          <div class="postTime">
            <el-row :gutter="20">
              <el-col :span="20" :offset="13"
                ><div class="grid-content bg-purple">
                  <span>攻略：2019-05-22 12:59 </span>
                  <span>阅读：2079</span>
                </div></el-col
              >
            </el-row>
          </div>
          <!-- 攻略内容 -->
          <div class="postContent">
            <p>
              想象一下一个距离 北京 只有2.5小时飞行距离的城市：身处 亚洲
              却能感受到十足的欧陆风情——欧式建筑和街道，金发碧眼的路人，正宗的西餐外加只有国内一半售价的帝王蟹可以敞开吃——更难能可贵的是，这里对国人（实质）免签，有直飞航班，低廉的物价，且尚未有太多的游客涉足还保留着原汁原味的传统风情！
            </p>
            <img
              src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
              alt=""
            />
          </div>
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

export default {
  components: {
    postComment,
    postCorrelation,
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
  .postContent {
    font-size: 16px;
    padding: 20px 0;
    img {
      padding: 20px 0;
      width: 100%;
    }
  }
}
</style>