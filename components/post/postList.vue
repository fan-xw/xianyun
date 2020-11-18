<template>
  <div>
    <div class="post" v-for="(item, index) in postList" :key="index">
      <h4>{{ postList.title }}</h4>
      <p>
        大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。
        by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最
      </p>
      <img
        src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["postList"],
};
</script>

<style lang="less" scoped>
.post {
  margin-top: 20px;
  h4 {
    font-size: 24px;
  }
  p {
    font-size: 18px;
    color: #ccc;
    font-weight: 400px;
  }
  img {
    width: 220px;
    height: 150px;
  }
}
</style>