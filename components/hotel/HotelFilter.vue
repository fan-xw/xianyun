<template>
  <div>
    <el-row class="bbox">
      <el-col :span="4">
        <div class="block">
          <span class="demonstration">
            <span class="price">价格</span>
            <span class="scope">0-4000</span>
          </span>
          <el-slider
            v-model="form.price_lt"
            :step="10"
            :max="4000"
            @change="valuechange"
          ></el-slider>
        </div>
      </el-col>
      <el-col
        :span="4"
        v-for="(item, index) in hotelItem"
        :key="index"
        class="bad"
      >
        <span class="demonstration1">{{ item.name }}</span>
        <el-dropdown placement="bottom-start" @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="text">{{ hotelItem[index].state }}</span
            ><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" size="medium">
            <el-dropdown-item
              v-for="(value, num) in item.list"
              :command="{ index, num }"
              :key="num"
            >
              <span
                class="iconfont itempad"
                :class="{
                  iconcircle: !value.isshow,
                  'el-icon-circle-check': value.isshow,
                }"
              ></span>
              <span class="item">{{ value.name }}</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <el-col :span="4">
        <div class="button">
          <el-button type="primary" size="medium" @click="handlecancel"
            >撤销条件</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      assetsList: [],
      brandsList: [],
      levelsList: [],
      typesList: [],
      hotelItem: [
        { name: "住宿等级", list: [], state: "不限" },
        { name: "住宿类型", list: [], state: "不限" },
        { name: "酒店设施", list: [], state: "不限" },
        { name: "酒店品牌", list: [], state: "不限" },
      ],
      // showList: [],
      form: {
        price_lt: 4000,
        hotellevel_in: [], // 住宿等级
        hoteltype_in: [],  // 住宿类型
        hotelasset_in: [],  // 酒店设施
        hotelbrand_in: [],  // 酒店品牌
      },
    };
  },

  // 酒店筛选 下来选择数据 
  created() {
    this.$axios({
      url: "/hotels/options",
    }).then((res) => {
      this.hotelItem[2].list = res.data.data.assets;
      this.hotelItem[3].list = res.data.data.brands;
      this.hotelItem[0].list = res.data.data.levels;
      this.hotelItem[1].list = res.data.data.types;
    });
  },

  methods: {

    handleCommand(command) {
      const { index, num } = command;
      this.hotelItem[index].list[num].isshow = !this.hotelItem[index].list[num].isshow;
      this.hotelItem = [...this.hotelItem];
      if (index === 0) {
        if (this.form.hotellevel_in.indexOf(num + 1) == -1) {
          this.form.hotellevel_in.push(num + 1);
        } else {
          this.form.hotellevel_in.splice(
            this.form.hotellevel_in.indexOf(num + 1),
            1
          );
        }
      }
      if (index === 1) {
        if (this.form.hoteltype_in.indexOf(num + 1) == -1) {
          this.form.hoteltype_in.push(num + 1);
        } else {
          this.form.hoteltype_in.splice(
            this.form.hoteltype_in.indexOf(num + 1),
            1
          );
        }
      }
      if (index === 2) {
        if (this.form.hotelasset_in.indexOf(num + 1) == -1) {
          this.form.hotelasset_in.push(num + 1);
        } else {
          this.form.hotelasset_in.splice(
            this.form.hotelasset_in.indexOf(num + 1),
            1
          );
        }
      }
      if (index === 3) {
        if (this.form.hotelbrand_in.indexOf(num + 1) == -1) {
          this.form.hotelbrand_in.push(num + 1);
        } else {
          this.form.hotelbrand_in.splice(
            this.form.hotelbrand_in.indexOf(num + 1),
            1
          );
        }
      }

      this.countitem(index);
      this.$emit("filter", this.form);
    },
    countitem(index) {
      const list = this.hotelItem[index].list.filter((value) => {
        return value.isshow == true;
      });

      if (list.length == 0) {
        this.hotelItem[index].state = "不限";
      } else if (list.length == 1) {
        this.hotelItem[index].state = list[0].name;
      } else {
        this.hotelItem[index].state = `已选${list.length}项`;
      }
    },

    // 进度条
    valuechange(value) {
      this.form.price_lt = value;
    },

    // 撤销条件操作
    handlecancel() {
      (this.form.price_lt = 4000),
        (this.form.hotellevel_in = []),
        (this.form.hoteltype_in = []),
        (this.form.hotelasset_in = []),
        (this.form.hotelbrand_in = []);
      this.$emit("filter", this.form);
      this.hotelItem.forEach((value) => {
        value.state = "不限";
        value.list.forEach((item) => {
          item.isshow = false;
        });
      });
    },
  },
};
</script>

<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.bbox {
  margin-top: 20px;
  height: 80px;
  border: 1px solid #dddddd;

  .el-col {
    height: 100%;
    border-right: 1px solid #dddddd;
    padding: 8px 20px;
    &:last-child {
      border-right: 0;
    }
    .demonstration {
      display: flex;
      font-size: 14px;
      color: #666666;
      padding-bottom: 5px;
      .price {
        flex: 1;
        .scope {
          width: 80px;
        }
      }
    }
    .demonstration1 {
      display: block;
      font-size: 14px;
      padding-bottom: 10px;
      color: #666666;
    }

    .el-dropdown {
      width: 130px;
      /deep/ .el-dropdown-link {
        outline: none;
        display: flex;
        width: 100%;
        cursor: pointer;
        font-size: 13px;
        .el-icon--right {
          width: 10px;
        }
        .text {
          flex: 1;
        }
      }
    }

    .button {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        width: 80px;
        height: 40px;
      }
    }
  }
}
.el-dropdown-menu__item {
  width: 180px;
}

.el-dropdown-menu {
  max-height: 230px;

  overflow: auto;
  .item {
    padding-left: 20px;
  }
}
.itempad {
  padding-left: 15px;
}
</style>
