<template>
  <div class="left">
    <span>相关攻略</span>
    <ul>
      <li>
        <img
          src="http://p1-q.mafengwo.net/s11/M00/B4/92/wKgBEFt6ZqaAJeK7AAbj58wpNlY06.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
          alt=""
        />
      </li>
      <li><p>这里是成都！一座来了就不想走的城市～</p></li>
      <li class="time">2019-05-22 1:04 阅读：1448</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.left {
  width: 300px;

  span {
    padding-bottom: 20px;
    display: block;
    width: 300px;
    border-bottom: 1px solid red;

    font-size: 18px;
    font-weight: 400;
  }
  ul {
    width: 300px;
    position: relative;
    margin: 20px 0;

    li {
      float: left;

      p {
        position: absolute;
        margin-left: 10px;
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
    .time {
      position: absolute;
      top: 85px;
      left: 106px;
      font-size: 12px;
    }
  }
}
</style>