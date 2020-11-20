<template>
  <el-form :inline="true" :model="form">
    <el-form-item>
      <el-autocomplete
        placeholder="切换城市"
        v-model="form.cityName"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        @select="handleCity"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <span>
        <el-popover
          placement="bottom-start"
          width="300"
          trigger="click"
          :visible-arrow="false"
          v-model="visible"
        >
          <el-row
            type="flex"
            align="middle"
            style="margin-left: -5px; margin-right: -5px"
          >
            <el-col :span="8" style="padding-left: 5px; padding-right: 5px">
              每间
            </el-col>
            <el-col :span="8" style="padding-left: 5px; padding-right: 5px">
              <el-select
                v-model="adult"
                placeholder="请选择"
                size="mini"
                @change="handleAdult"
              >
                <el-option
                  v-for="(item, index) in adultData"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8" style="padding-left: 5px; padding-right: 5px">
              <el-select
                v-model="child"
                placeholder="请选择"
                size="mini"
                @change="handleChild"
              >
                <el-option
                  v-for="(item, index) in childData"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end" class="btn-col">
            <el-button type="primary" size="mini" @click="setPerson"
              >确定</el-button
            >
          </el-row>
          <el-input
            placeholder="人数未定"
            suffix-icon="iconfont iconuser"
            v-model="showPerson"
            slot="reference"
            :readonly="true"
          >
          </el-input>
        </el-popover>
      </span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查看价格</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 设置只能选择当前日期及之后的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      form: {
        cityName: "", // 城市名称
        enterTime: "", // 进入时间
        leftTime: "", // 离开时间
      },
      time: [], // 日期选择器绑定数据
      showPerson: "", // 人数绑定数据
      adult: "2成人", // 成人选择器绑定数据
      adultData: [1, 2, 3, 4, 5, 6, 7], // 成人选择器选项
      child: "0儿童", // 儿童选择器绑定数据
      childData: [0, 1, 2, 3, 4], // 儿童选择器选项
      visible: false,
    };
  },
  methods: {
    // 处理成人数据
    handleAdult(item) {
      this.adult = item + "成人";
    },
    // 处理儿童数据
    handleChild(item) {
      this.child = item + "儿童";
    },
    // 设置人数框显示数据
    setPerson() {
      if (this.child != "0儿童") {
        this.showPerson = this.adult + "" + this.child;
      } else {
        this.showPerson = this.adult;
      }
      this.visible = false;
    },
    // 查看价格
    onSubmit() {
      console.log(this.form);
      this.searchHotel();
    },
    // 输入匹配建议
    querySearch(value, cb) {
      this.getCities(value, cb);
    },
    // 选中匹配建议
    handleCity(item) {
      this.city = item.city;
      this.form.cityName = item.value;
      this.$router.replace({
        path: "/hotel",
        query: { cityName: item.value },
      });
    },

    // 查找城市,获取城市的远程数据
    getCities(item, cb) {
      this.$axios({
        url: "/cities",
        params: { name: item },
      }).then((res) => {
        console.log(res);
        let list = res.data.data.map((v, i) => {
          return {
            value: v.name,
            city: v.id,
          };
        });
        if (cb) {
          if (list.length == 0) {
            cb([{ value: "没有查找到相应的城市" }]);
            return;
          }
          cb(list);
        }
      });
    },

    // 添加路由跳转
    searchHotel() {
      if (this.time.length != 0) {
        this.form.enterTime = this.time[0];
        this.form.leftTime = this.time[1];
      }
      let myform = {};
      Object.keys(this.form).forEach((v, i) => {
        if (this.form[v] != "") {
          myform[v] = this.form[v];
        }
      });
      console.log(myform);
      this.$router.replace({
        path: "/hotel",
        query: { ...this.$route.query, ...myform },
      });
    },
  },

  mounted() {
    // 读取数据到页面
    if (this.$route.query.cityName) {
      this.form.cityName = this.$route.query.cityName;
    }
    if (this.$route.query.enterTime && this.$route.query.leftTime) {
      console.log(1);
      this.time.push(this.$route.query.enterTime);
      this.time.push(this.$route.query.leftTime);
    }
  },
  watch: {
    //  监听路由变化，读取数据到页面
    $route() {
      if (this.$route.query.cityName) {
        this.form.cityName = this.$route.query.cityName;
      }
      if (this.$route.query.enterTime && this.$route.query.leftTime) {
        this.time.push(this.$route.query.enterTime);
        this.time.push(this.$route.query.leftTime);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn-col {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}
</style>