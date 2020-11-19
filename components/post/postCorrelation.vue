<template>
  <div class="post_strategy">
    <div class="strategy_title">相关攻略</div>
    <div class="postList same_strategy">
      <!-- 没有封面图片的 -->
      <div class="strategy_post">
        <div class="post_content">
          <div class="post_title">标题</div>
          <div class="date">
            <span>2020-11-19 12:20 </span>
            <span>阅读</span>
            <span>1</span>
          </div>
        </div>
      </div>
      <!-- 有封面图片的 -->
      <div class="strategy_post1">
        <div class="post1_content">
          <div class="post_img">
            <img
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt=""
            />
          </div>
          <div class="content">
            <div class="post_title">标题</div>
            <div class="date">
              <span>2020-11-19 12:20 </span>
              <span>阅读</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$axios({
      url: "/posts",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>


<style lang="less" scoped>
.post_strategy {
  .strategy_title {
    margin-top: 20px;
    font-size: 18px;
    height: 35px;
    border-bottom: 1px solid #dddddd;
  }
  .postList {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    // 没有封面图
    .strategy_post {
      border-bottom: 1px solid #ddd;
      padding: 20px 0;

      .post_content {
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .date {
          font-size: 12px;
          color: #999;
        }
        .post_title {
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    // 有封面图
    .strategy_post1 {
      border-bottom: 1px solid #ddd;
      padding: 20px 0;
      .post1_content {
        height: 80px;
        display: flex;
        .post_img {
          img {
            width: 100px;
            height: 80px;
            object-fit: cover;
            margin-right: 10px;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .post_title {
            width: 168px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .date {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>