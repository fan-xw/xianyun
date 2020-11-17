<template>
  <div class="searchForm">
    <el-row>
      <el-col :span="5">
        <el-autocomplete
          :fetch-suggestions="loadCityList"
          placeholder="切换城市"
          @select="handleSelect"></el-autocomplete>
      </el-col>

      <el-col :span="8">
        <el-date-picker
          type="daterange"
          range-separator="-"
          unlink-panels
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>

      <el-col :span="5">
        <el-popover placement="bottom-start" width="300">
          <div class="man">
            <span class="every">每间</span>
            <el-select
              slot="prepend"
              placeholder="2 成人"
              size="mini"
              class="selectbox">
              <el-option
                label="`成人`"
                value="">
              </el-option>
            </el-select>

            <el-select
              slot="prepend"
              placeholder="0 儿童"
              size="mini"
              class="selectbox">
              <el-option
                label="`儿童 `"
                value="">
              </el-option>
            </el-select>

            <div class="line"></div>
            <div class="botton" @click="sure">
              <el-button type="primary" size="mini">确定</el-button>
            </div>
          </div>
          
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            slot="reference">
          </el-input>
        </el-popover>
      </el-col>
      <el-button type="primary" @click="sendInfo">查看价格</el-button>
    </el-row>

    <el-row>
      <el-col :span="14">
        <el-row type="flex">
          <span class="title">区域:</span>
          <div class="box-r-f1">
            <el-col>
              <span class="place">
              </span>
            </el-col>
            <div @click="showPlace">
              <span></span>
              等29个区域
            </div>
          </div>
        </el-row>
        <el-row type="flex">
          <span class="title">均价
            <span
              class="el-icon-question"
              title="等级均价由平日计算得出,节假日价格会有所上浮"></span>:
          </span>
          <div
            class="box-r-f1"
            title="等级评定是针对房价，设施和服务等各方面水平的综合评估。">
            <el-col :span="6">
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span>¥332</span>
            </el-col>
            <el-col
              :span="7"
              title="等级评定是针对房价，设施和服务等各方面水平的综合评估。">
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span>¥521</span>
            </el-col>
            <el-col
              :span="8"
              title="等级评定是针对房价，设施和服务等各方面水平的综合评估。">
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span class="iconfont iconhuangguan"></span>
              <span>¥768</span>
            </el-col>
          </div>
        </el-row>
      </el-col>
      <el-col :span="10">
        <div id="container" v-loading="isload">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props:['value'],
    data () {
        return {
            pickerOptions:[]
        }
    },
    methods:{
        // 切换城市
        handleSelect () {},
        loadCityList () {},

        // 确定按钮
        sure () {},

        // 点击查看价格
        sendInfo () {},

        // 区域下拉
        showPlace () {},

        isload () {}
    }
};
</script>

<style lang="less" scoped>
.searchForm {
  /deep/.el-input__inner {
    width: 100%;
  }
  .area {
    height: 48px;
    overflow: hidden;
  }
  .title {
    width: 100px;
  }
  .place {
    padding-right: 10px;
    font-size: 14px;
    color: #666666;
  }
  .el-icon-question {
    font-size: 16px;
    color: #cccccc;
  }
  .box-r-f1 {
    flex: 1;
  }
  .iconhuangguan {
    color: #ff9900;
  }
  #container {
    width: 100%;
    height: 300px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  padding-right: 12px;
}
.man {
  height: 90px;
  .selectbox {
    width: 100px;
  }
  .line {
    width: 100%;
    height: 1px;
    border-top: 1px solid #dddddd;

    margin-top: 20px;
  }
  .every {
    display: inline-block;
    width: 80px;
  }
  .botton {
    padding: 15px;
    text-align: right;
  }
}
</style>