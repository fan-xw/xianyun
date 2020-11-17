<template>
  <!-- 头部面包屑 -->
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/post/' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 攻略详情标题 -->
    <h1>{{ particulars.title }}</h1>
    <hr />
    <!-- 攻略时间 -->
    <div>
      <p>攻略:2019-05-22 1:16</p>
      <p>阅读：757</p>
    </div>
    <!-- 特点简介 -->

    <p>
      大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。
    </p>
    <img
      src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
      alt=""
    />

    <h2>一、怎样用6000块玩转塞班？</h2>
    <p>
      大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say
      no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品
    </p>
    <h3>1.怎样订机票+酒店性价比最高？</h3>
    <p>
      机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了
    </p>
    <img
      src="https://p1-q.mafengwo.net/s10/M00/E9/33/wKgBZ1octwiAAKAoAAJ9ixcJc9M71.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
      alt=""
    />
    <p>
      怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。
      在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。
      怎样在机票酒店上获得最高性价比的体验？
      直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。
    </p>
    <!-- 评论和分享点击图标 -->
    <el-tooltip class="item" effect="dark" content="评论" placement="top-start">
      <i class="el-icon-edit"></i>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
      <i class="el-icon-edit-outline" @click="handelShare"></i>
    </el-tooltip>

    <!-- 评论模块 -->
    <!-- 相关攻略模块 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      particulars: "",
    };
  },
  modules() {
    //获取到文章详情
    this.$axios({
      url: "/posts",
      params: { id: this.id },
    }).then((res) => {
      console.log(res);
      this.particulars = res.data.data;
      console.log(this.particulars);
    });
  },
  methods: {
    handelShare() {
      this.$message.closeAll();
      this.$message.warning("暂时不支持分享,请见谅");
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  i {
    font-size: 50px;
  }
}
</style>