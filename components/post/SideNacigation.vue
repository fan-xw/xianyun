 <template>
  <div class="recommend" @mouseleave="hideCity">
    <div
      class="hot"
      v-for="(item, index) in data"
      :key="index"
      @mouseover="handerDesc(index)"
    >
      <div>{{ item.type }}</div>
      <span class="el-icon-arrow-right"></span>
    </div>
    <!--列表展示城市内容 -->
    <div class="active" v-if="isShow">
      <div class="active-list" v-for="(item, i) in listChildren" :key="i">
        <span class="num">{{ i + 1 }}</span>
        <span class="citys">{{ item.city }}</span>
        <span class="title">{{ item.desc }}</span>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  created() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      const { data } = res.data
      this.data = data
    });


  },
  data() {
    return {
      isShow: false,//二级菜单的显示与隐藏
      data: [], //推荐数据
      listChildren: [],//子数据
    }
  },
  methods: {
    //鼠标移入
    handerDesc(index) {
      this.isShow = true;
      this.listChildren = this.data[index].children
    },
    // 鼠标移出
    hideCity() {
      this.isShow = false;
      this.showIndex = -1;
    },
  }
}
</script>


<style lang="less" scoped>
.recommend {
  width: 250px;
  border-bottom: 1px solid #dddddd;
  .hot:hover {
    color: #ffa500;
    cursor: pointer;
    border-right-color: #fff;
  }
  .hot {
    padding: 8px 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dddddd;
    border-bottom: none;
    div {
      font-size: 14px;
      // color: #333;
      padding: 0 20px;
    }
    span {
      width: 30px;
      display: flex;
      justify-content: flex-end;
      font-size: 24px;
      color: #999;
    }
  }
  .active {
    position: absolute;
    border: 1px solid #dddddd;
    border-left: none;
    width: 350px;
    right: 399px;
    background: #ffffff;
    z-index: 10;
    top: 0;
    .active-list {
      cursor: pointer;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-around;
      padding: 4.5px 3px;
      font-size: 14px;

      .num {
        color: #ffa500;
        font-size: 24px;
        padding: 0 15px;
      }
      .citys {
        color: #ffa500;

        padding: 0 15px;
      }
      .title {
        color: #999999;
        flex: 1;
        text-align: left;
      }
      &:last-child {
        border-left: 1px solid #ddd;
      }
    }
  }
}
</style>