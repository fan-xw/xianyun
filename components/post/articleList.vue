<template>
  <div class="recommended">
    推荐攻略
    <!-- 多张图片显示 -->
    <div class="post-item">
      <!-- 标题 -->
      <h4 class="post-title">
        <a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a>
      </h4>
      <!-- 内容 -->
      <p class="post-desc">
        怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。
      </p>
      <!-- 图片 -->
      <div class="post-img">
        <a href="#">
          <img
            src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt=""
          />
        </a>
        <a href="#">
          <img
            src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt=""
          />
        </a>
        <a href="#">
          <img
            src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt=""
          />
        </a>
      </div>
      <!-- 底部信息 -->
      <div class="post-info">
        <div class="post-info-left">
          <span>
            <i class="el-icon-location-outline"></i>
            北京
          </span>
          <div class="post-user">
            by
            <a href="#">
              <img
                src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                alt=""
              />
            </a>
            <a href="#">地球发动机</a>
          </div>
          <span>
            <i class="el-icon-view"></i>
            12346
          </span>
        </div>
        <div class="post-info-right">
          <span>79赞</span>
        </div>
      </div>
    </div>
    <!-- 单张图片显示 -->
    <div class="post-item2">
      <!-- 图片 -左-->
      <div class="post-cover">
        <a href="#">
          <img
            src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
            alt=""
          />
        </a>
      </div>
      <!-- 内容-右 -->
      <!-- 标题 -->
      <div class="post-content">
        <h4 class="post-title">
          <a href="#">塞班贵？一定是你的打开方式不对！6000块玩转塞班</a>
        </h4>
        <!-- 内容 -->
        <p class="post-desc">
          怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。
        </p>
        <!-- 底部信息 -->
        <div class="post-info">
          <div class="post-info-left">
            <span>
              <i class="el-icon-location-outline"></i>
              北京
            </span>
            <div class="post-user">
              by
              <a href="#">
                <img
                  src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                  alt=""
                />
              </a>
              <a href="#">地球发动机</a>
            </div>
            <span>
              <i class="el-icon-view"></i>
              12346
            </span>
          </div>
          <div class="post-info-right">
            <span>79赞</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
// 多张图片样式
.post-item {
  width: 700px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .post-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 18px;
    a:hover {
      color: #ffa500;
    }
  }
  .post-desc {
    margin-bottom: 15px;
    line-height: 1.5;
    font-size: 14px;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .post-img {
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;

    img {
      width: 220px;
      height: 150px;
    }
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    .post-info-left {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;
      .post-user {
        margin: 0 10px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        img {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 100px;
          margin: 5px;
        }
        a {
          color: orange;
        }
      }
    }
    .post-info-right {
      color: orange;
    }
  }
}
// 一张图片样式
.post-item2 {
  width: 700px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-self: center;
  .post-cover {
    width: 220px;
    height: 150px;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .post-content {
    flex: 1;
    .post-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
      a:hover {
        color: #ffa500;
      }
    }
    .post-desc {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 14px;
      height: 63px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .post-info {
      display: flex;
      justify-content: space-between;
      .post-info-left {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        .post-user {
          margin: 0 10px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          img {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 100px;
            margin: 5px;
          }
          a {
            color: orange;
          }
        }
      }
      .post-info-right {
        color: orange;
      }
    }
  }
}
</style>