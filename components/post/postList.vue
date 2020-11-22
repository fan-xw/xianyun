<template>
  <!-- 旅游攻略文章列表渲染 -->
  <div class="recommended">
    <div>
      <!-- 多张图片显示 -->
      <div
        class="post-item"
        v-if="data.images.length >= 3"
        @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
      >
        <!-- 标题 -->
        <h4
          class="post-title"
          @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
        >
          <a href="#"> {{ data.title }}</a>
        </h4>
        <!-- 内容 -->
        <p class="post-desc">{{ data.summary }}</p>
        <!-- 图片 -->
        <div
          class="post-img"
          @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
        >
          <a href="#">
            <img :src="data.images[0]" alt="" />
          </a>
          <a href="#">
            <img :src="data.images[1]" alt="" />
          </a>
          <a href="#">
            <img :src="data.images[2]" alt="" />
          </a>
        </div>
        <!-- 底部信息 -->
        <div class="post-info">
          <div class="post-info-left">
            <span>
              <i class="el-icon-location-outline"></i>
              {{ data.cityName }}
            </span>
            <div class="post-user">
              by
              <a href="#">
                <img
                  :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                  alt=""
                />
              </a>
              <a href="#">{{ data.account.nickname }}</a>
            </div>
            <span>
              <i class="el-icon-view"></i>
              {{ data.watch }}
            </span>
          </div>
          <div class="post-info-right">
            <span>{{ data.like == null ? '0' : data.like }}赞</span>
          </div>
        </div>
      </div>
      <!-- 单张图片显示 左右结果 -->
      <div
        class="post-item2"
        v-if="data.images.length == 1 || data.images.length == 2"
        @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
      >
        <!-- 图片 -左-->
        <div
          class="post-cover"
          @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
        >
          <a href="#">
            <img :src="data.images[0]" alt="" />
          </a>
        </div>
        <!-- 内容-右 -->
        <!-- 标题 -->
        <div
          class="post-content"
          @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
        >
          <h4 class="post-title">
            <a href="#">{{ data.title }}</a>
          </h4>
          <!-- 内容 -->
          <p class="post-desc">{{ data.summary }}</p>
          <!-- 底部信息 -->
          <div class="post-info">
            <div class="post-info-left">
              <span>
                <i class="el-icon-location-outline"></i>
                {{ data.cityName }}
              </span>
              <div class="post-user">
                by
                <a href="#">
                  <img
                    :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                    alt=""
                  />
                </a>
                <a href="#">{{ data.account.nickname }}</a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                {{ data.watch }}
              </span>
            </div>
            <div class="post-info-right">
              <span>{{ data.like == null ? '0' : data.like }}赞</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有图片只有详情 -->
      <div class="post-item3" v-if="data.images.length < 1">
        <!-- 内容 -->
        <!-- 标题 -->
        <div
          class="post-content"
          @click="$router.push({ path: `/post/postDetail?id=${data.id}` })"
        >
          <h4 class="post-title">
            <a href="#">{{ data.title }}</a>
          </h4>
          <!-- 内容 -->
          <p class="post-desc">{{ data.summary }}</p>
          <!-- 底部信息 -->
          <div class="post-info">
            <div class="post-info-left">
              <span>
                <i class="el-icon-location-outline"></i>
                {{ data.cityName }}
              </span>
              <div class="post-user">
                by
                <a href="#">
                  <img
                    :src="$axios.defaults.baseURL + data.account.defaultAvatar"
                    alt=""
                  />
                </a>
                <a href="#">{{ data.account.nickname }}</a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                {{ data.watch }}
              </span>
            </div>
            <div class="post-info-right">
              <span>{{ data.like == null ? '0' : data.like }}赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- data.images[0] -->
  <!-- v-if="data.images.length == 0" -->
</template>


<script>
import { log } from 'util'
export default {
<<<<<<< HEAD
  //接收父组件传递过来的数据data,子组件接收渲染
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {

    return {

    }
  },
  mounted() {
    // console.log(this.data);
  }

}
=======
  created() {
    //文章列表渲染
    this.$axios({
      url: "/posts",
    }).then((res) => {
      console.log(res);
      this.articeList = res.data.data;
    });
  },
  data() {
    return {
      articeList: [],
    };
  },
};
>>>>>>> 6f9e9e0bbb62af7310ed94125535f609c8ee1b5e
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
    display: -webkit-box; //对象作为弹性伸缩盒子模型显示
    -webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
    -webkit-line-clamp: 3; //设置 块元素包含的文本行数
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
      // width: 100%;
      width: 220px;
      height: 150px;
    }
  }
  .post-content {
    width: 470px;
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
      color: #7f667f;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //对象作为弹性伸缩盒子模型显示
      -webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
      -webkit-line-clamp: 3; //设置 块元素包含的文本行数
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
.post-item3 {
  width: 700px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-self: center;

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
      display: -webkit-box; //对象作为弹性伸缩盒子模型显示
      -webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
      -webkit-line-clamp: 3; //设置 块元素包含的文本行数
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