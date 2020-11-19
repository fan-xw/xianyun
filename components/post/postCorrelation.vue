<template>
  <div class="post_strategy">
    <div class="strategy_title">相关攻略</div>
    <div
      class="postList same_strategy"
      v-for="(item, index) in correlation"
      :key="index"
    >
      <div class="strategy_post1">
        <div class="post1_content">
          <div class="post_img">
            <img :src="item.images[0]" alt="" v-if="item.images != ''" />
          </div>
          <div class="content">
            <div class="post_title">{{ item.title }}</div>
            <div class="date">
              <span>{{ item.created_at | formatDate }} </span>
              <span>阅读</span>
              <span>{{ item.watch }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { formatDate } from "@/utils/date.js";
export default {
  data() {
    return {
      correlation: [],
    };
  },

  filters: {
    formatDate(time) {
      //   time = time * 1000;
      let date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend",
    }).then((res) => {
      console.log(res);
      this.correlation = res.data.data;
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