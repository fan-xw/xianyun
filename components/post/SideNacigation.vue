<template>
  <div class="recommend">
    <div
      class="hot"
      v-for="(item, index) in cities"
      :key="index"
      @mouseover="add(index)"
      @mouseleave="current = 10"
    >
      <span>
        {{ item.type }}
        <i class="el-icon-arrow-right right"></i>
      </span>
    </div>
    <div
      class="active"
      v-if="current === index ? true : false"
      v-for="(item, index) in children"
      :key="index"
    >
      <a href="#">
        <i>{{ index + 1 }}</i>
      </a>
      <strong>{{ item.city }}</strong>
      <span>{{ item.desc }}</span>
    </div>
  </div>
</template>

<script>

export default {

  created() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.cities = res.data.data
      console.log(this.cities)
      this.children = this.cities[0].children
      console.log(this.children)

    });

  },
  data() {
    return {
      current: "",

      cities: {},

    }
  },
  methods: {

    add(index) {
      console.log(index);
      this.current = index
      // this.first.push(this.cities[0].children)

    }
  }


}
</script>

<style lang="less" scoped>
.recommend {
  .hot {
    border: 1px solid #ccc;
    height: 50px;
    width: 250px;

    span {
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      display: flex;

      justify-content: space-around;

      i {
        font-size: 15px;
        line-height: 50px;
        text-align: center;
      }
    }
  }
  .active {
    // display: none;
    width: 350px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #ccc;
    position: absolute;
    top: 0;
    left: 250px;
    display: flex;
    justify-content: space-around;
    div {
      border-bottom: 1px solid #ccc;
    }
    i {
      color: orange;
    }
  }
}
</style>