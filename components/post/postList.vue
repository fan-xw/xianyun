<template>
  <div class="recommended">
    <div v-for="(item, index) in articeList" :key="index">
      <!-- 多张图片显示 -->
      <div class="post-item" v-if="item.images.length == 3">
        <!-- 标题 -->
        <h4 class="post-title">
          <a href="#"> {{ item.title }}</a>
        </h4>
        <!-- 内容 -->
        <p class="post-desc">{{ item.summary }}</p>
        <!-- 图片 -->
        <div class="post-img">
          <a href="#">
            <img :src="item.images[0]" alt="" />
          </a>
          <a href="#">
            <img :src="item.images[1]" alt="" />
          </a>
          <a href="#">
            <img :src="item.images[2]" alt="" />
          </a>
        </div>
        <!-- 底部信息 -->
        <div class="post-info">
          <div class="post-info-left">
            <span>
              <i class="el-icon-location-outline"></i>
              {{ item.cityName }}
            </span>
            <div class="post-user">
              by
              <a href="#">
                <img
                  :src="$axios.defaults.baseURL + item.account.defaultAvatar"
                  alt=""
                />
              </a>
              <a href="#">{{ item.account.nickname }}</a>
            </div>
            <span>
              <i class="el-icon-view"></i>
              {{ item.watch }}
            </span>
          </div>
          <div class="post-info-right">
            <span>{{ item.like }}赞</span>
          </div>
        </div>
      </div>
      <!-- 单张图片显示 左右结果 -->
      <div class="post-item2" v-if="item.images.length == 1">
        <!-- 图片 -左-->
        <div class="post-cover">
          <a href="#">
            <img :src="item.images[0]" alt="" />
          </a>
        </div>
        <!-- 内容-右 -->
        <!-- 标题 -->
        <div class="post-content">
          <h4 class="post-title">
            <a href="#">{{ item.title }}</a>
          </h4>
          <!-- 内容 -->
          <p class="post-desc">{{ item.summary }}</p>
          <!-- 底部信息 -->
          <div class="post-info">
            <div class="post-info-left">
              <span>
                <i class="el-icon-location-outline"></i>
                {{ item.cityName }}
              </span>
              <div class="post-user">
                by
                <a href="#">
                  <img
                    :src="$axios.defaults.baseURL + item.account.defaultAvatar"
                    alt=""
                  />
                </a>
                <a href="#">{{ item.account.nickname }}</a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                {{ item.watch }}
              </span>
            </div>
            <div class="post-info-right">
              <span>{{ item.like }}赞</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 没有图片只有详情 -->
      <div class="post-item3" v-if="item.images.length == 0">
        <!-- 内容 -->
        <!-- 标题 -->
        <div class="post-content">
          <h4 class="post-title">
            <a href="#">{{ item.title }}</a>
          </h4>
          <!-- 内容 -->
          <p class="post-desc">{{ item.summary }}</p>
          <!-- 底部信息 -->
          <div class="post-info">
            <div class="post-info-left">
              <span>
                <i class="el-icon-location-outline"></i>
                {{ item.cityName }}
              </span>
              <div class="post-user">
                by
                <a href="#">
                  <img
                    :src="$axios.defaults.baseURL + item.account.defaultAvatar"
                    alt=""
                  />
                </a>
                <a href="#">{{ item.account.nickname }}</a>
              </div>
              <span>
                <i class="el-icon-view"></i>
                {{ item.watch }}
              </span>
            </div>
            <div class="post-info-right">
              <span>{{ item.like }}赞</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pagesizes"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="48"
        >
        </el-pagination>
      </div>
    </div>
  </div>
  <!-- item.images[0] -->
  <!-- v-if="item.images.length == 0" -->
</template>


<script>
export default {
<<<<<<< HEAD
  created() {
    //文章列表渲染
    this.$axios({
      url: '/posts',
    }).then(res => {
      console.log(res);
      this.articeList = res.data.data
      // console.log(this.articeList);
      // this.total = res.data.total
    }
    )
  },
  data() {
    return {
      articeList: [],
      currentPage: 3,
      pagesize: 3,
      pagesizes: [3, 5, 10, 15],
      // total: 48,
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
=======
  mounted() {
    this.$axios({
      url: "/posts/recommend",
    }).then((res) => {
      console.log(res.data);
    });
  },
};
>>>>>>> 64e716d8d3b566aef69a1363597796bce3de2574
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