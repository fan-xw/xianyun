<template>
 <div class="filter">
    <el-row type="flex" style="margin-left: -20px; margin-right: -20px">

      <!-- 进度滑块 -->
      <el-col class="filter_col"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">

        <el-row type="flex" class="filter-title">
          <el-col :span="12">价格</el-col>
          <el-col :span="12" class="ta-r">0-4000</el-col>
        </el-row>
        <el-row>
          <el-slider v-model="form.price_lt"
                     :step="10"
                     :max="4000"
                     @change="handlePrice">
          </el-slider>
        </el-row>
      </el-col>

      <!-- 住宿等级 -->
      <el-col class="filter_col"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">
        <el-row class="filter-title">
          <el-col :span="24">住宿等级</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown
            class="filter-dropdown"
            placement="bottom-start"
            @command="handleLevels">

            <span class="el-dropdown-link">
              <span class="dropdown-link-text">{{ getHotelLevel }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="value in optionsList.levels"
                  :key="value.id"
                  :command="value">
                  <i :class="[
                      form.hotellevel.indexOf(value.id) != -1
                        ? 'iconfont iconright-1'
                        : 'iconfont iconcircle',
                    ]"
                  ></i>
                  <span class="dropdown-menu-text">{{ value.name }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>

      <!-- 住宿类型 -->
      <el-col class="filter_col"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">
        <el-row class="filter-title">
          <el-col :span="24">住宿类型</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown
            class="filter-dropdown"
            placement="bottom-start"
            @command="handleTypes">
            <span class="el-dropdown-link">
              <span class="dropdown-link-text">{{ getHotelType }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="value in optionsList.types"
                  :key="value.id"
                  :command="value">
                  <i :class="[
                      form.hoteltype.indexOf(value.id) != -1
                        ? 'iconfont iconright-1'
                        : 'iconfont iconcircle',
                    ]">
                  </i>
                  <span class="dropdown-menu-text">{{ value.name }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>

      <!-- 酒店设施 -->
      <el-col class="filter_col"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">
        <el-row class="filter-title">
          <el-col :span="24">酒店设施</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown
            class="filter-dropdown"
            placement="bottom-start"
            @command="handleAssets">
            <span class="el-dropdown-link">
              <span class="dropdown-link-text">{{ getHotelAsset }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="value in optionsList.assets"
                  :key="value.id"
                  :command="value">
                  <i :class="[
                      form.hotelasset.indexOf(value.id) != -1
                        ? 'iconfont iconright-1'
                        : 'iconfont iconcircle',
                    ]">
                  </i>
                  <span class="dropdown-menu-text">{{ value.name }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>

      <!-- 酒店品牌 -->
      <el-col class="filter_col"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">
        <el-row class="filter-title">
          <el-col :span="24">酒店品牌</el-col>
        </el-row>
        <el-row class="filter-wrapper">
          <el-dropdown
            class="filter-dropdown"
            placement="bottom-start"
            @command="handleBrands">

            <span class="el-dropdown-link">
              <span class="dropdown-link-text">{{ getHotelBrand }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="filter-view-menu-box">
                <el-dropdown-item
                  v-for="value in optionsList.brands"
                  :key="value.id"
                  :command="value">
                  <i :class="[
                      form.hotelbrand.indexOf(value.id) != -1
                        ? 'iconfont iconright-1'
                        : 'iconfont iconcircle',
                    ]">
                  </i>
                  <span class="dropdown-menu-text">{{ value.name }}</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>

      <!-- 撤销条件 -->
      <el-col class="filter_col no_border"
              :span="4"
              style="padding-left: 20px; padding-right: 20px">
        <el-row class="button">
          <el-button type="primary" @click="handleCancel">撤销条件</el-button>
        </el-row>
      </el-col>


    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 酒店选项数据
      optionsList:[],

      form: {
        price_lt: 4000,
        hotellevel: [], // 住宿等级
        hoteltype: [],  // 住宿类型
        hotelasset: [],  // 酒店设施
        hotelbrand: [],  // 酒店品牌
      },
    };
  },

  // 酒店筛选 下来选择数据 
  created() {
    this.$axios({
      url: "/hotels/options",
    }).then((res) => {
    this.optionsList = res.data.data;
    console.log(this.optionsList);
      // 把路由数据读取到页面
      Object.keys(this.$route.query).forEach((v, i) => {
        if (v != "cityName") {
          if (Array.isArray(this.$route.query[v])) {
            this.form[v] = this.$route.query[v];
          } else if (v == "price_lt") {
            this.form.price_lt = +this.$route.query.price_lt;
          } else if (v.indexOf("hotel") != -1) {
            this.form[v].push(+this.$route.query[v]);
          }
        }
      });
    });
  },

  // 计算属性
  computed: {
    // 住宿等级下拉数据处理  
    getHotelLevel() {
      if (this.form.hotellevel.length == 0) {
        return "不限";
      } else if (this.form.hotellevel.length == 1) {
        let res;
        this.optionsList.levels.forEach((value,index) => {
          if (value.id == this.form.hotellevel[0]) {
            res = value.name;
          }
        })
        return res 
      } else {
        return '已选' + this.form.hotellevel.length + '项'
      }
    },

    // 酒店类型下拉数据处理 
    getHotelType() {
      if (this.form.hoteltype.length == 0) {
        return "不限";
      } else if (this.form.hoteltype.length == 1) {
        let res ;
        this.optionsList.types.forEach((v,i) => {
          if (v.id == this.form.hoteltype[0]) {
            res = v.name;
          }
        })
        return res 
      } else {
        return '已选' + this.form.hoteltype.length + '项'
      }
    },

    // 酒店设施下拉数据处理 
    getHotelAsset() {
      if (this.form.hotelasset.length == 0) {
        return "不限";
      } else if (this.form.hotelasset.length == 1) {
        let res ;
        this.optionsList.assets.forEach((v,i) => {
          if (v.id == this.form.hotelasset[0]) {
            res = v.name;
          }
        })
        return res 
      } else {
        return '已选' + this.form.hotelasset.length + '项'
      }
    },

    // 酒店品牌下拉数据处理 
    getHotelBrand() {
      if (this.form.hotelbrand.length == 0) {
        return "不限";
      } else if (this.form.hotelbrand.length == 1) {
        let res ;
        this.optionsList.brands.forEach((v,i) => {
          if (v.id == this.form.hotelbrand[0]) {
            res = v.name
          }
        })
        return res
      } else {
        return '已选' + this.form.hotelbrand.length + '项'
      }
    }
  },

  methods: {
    // 处理酒店价格数据
    handlePrice (item) {
      this.form.price_lt = item;
      this.searchHotel();
    },  

    // 处理酒店等级数据
    handleLevels (item) {
      // indexOf()的意思：查找一个字符串中，第一次出现指定字符串的位置。
      if (this.form.hotellevel.indexOf(item.id) != -1) {
        let index = this.form.hotellevel.indexOf(item.id);
        this.form.hotellevel.splice(index, 1);
      } else {
        this.form.hotellevel.push(item.id);
      }
      this.searchHotel();
    },

    // 处理酒店类型数据
    handleTypes (item) {
      if (this.form.hoteltype.indexOf(item.id) != -1) {
        let index = this.form.hoteltype.indexOf(item.id);
        this.form.hoteltype.splice(index,1);
      } else {
        this.form.hoteltype.push(item.id)
      }
      this.searchHotel();
    },

    // 处理酒店设施数据
    handleAssets (item) {
      if (this.form.hotelasset.indexOf(item.id) != -1) {
        let index = this.form.hotelasset.indexOf(item.id);
        this.form.hotelasset.splice(index,1);
      } else {
        this.form.hotelasset.push(item.id)
      }
      this.searchHotel();
    },

    // 处理酒店品牌数据
    handleBrands (item) {
      if (this.form.hotelbrand.indexOf(item.id) != -1) {
        let index = this.form.hotelbrand.indexOf(item.id);
        this.form.hotelbrand.splice(index,1);
      } else {
        this.form.hotelbrand.push(item.id)
      }
      this.searchHotel();
    },

    // 处理撤销条件功能
    handleCancel () {
      // 1.定义数据为空就可以了
      this.form = {
        price_lt: 4000,
        hotellevel: [], 
        hoteltype: [],  
        hotelasset: [],  
        hotelbrand: [],  
      };

      // 2.让路由重定向
      this.$router.replace({
        path: "/hotel",
        query: { cityName: this.$route.query.cityName },
      })
    },

    // 路由重定向
    searchHotel() {
      this.$router.replace({
        path: "/hotel",
        query: { ...this.$route.query, ...this.form },
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
.filter {
  border: 1px solid #ddd;
  padding: 5px 20px;
  color: #666;

  .filter_col {
    border-right: 1px solid #ddd;
    padding: 5px 0;

    &.no_border {
      border: none;
    }

    .filter-title {
      font-size: 14px;

      .ta-r {
        text-align: right;
      }
    }

    .filter-wrapper {
      height: 38px;
      display: flex;
      align-items: center;

      .filter-dropdown {
        position: relative;
        width: 100%;

        /deep/.el-dropdown-link {
          display: flex;
          flex: 1;
          width: 100%;
          cursor: pointer;

          .dropdown-link-text {
            flex: 1;
            font-size: 13px;
          }
        }
      }
    }
  }
}
.filter-view-menu-box {
  max-height: 230px;
  overflow: auto;

  .dropdown-menu-text {
    display: inline-block;
    min-width: 100px;
    margin-left: 10px;
  }
}

// 撤销条件按钮
.button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-button {
    width: 100px;
    height: 40px;
  }
}

</style>
