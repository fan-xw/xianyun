<template>
    <el-row type="flex"
            class="hotel-option-row"
            style="margin-left=-5px;margin-right=-5px">

    <!-- 左侧区域部分 -->
    <el-col :span="14" style="padding-left: 5px; padding-right: 5px">
      <el-row>
        <el-row type="flex" class="option-row">
          <el-col :span="3">区域：</el-col>
          <el-col :span="21">
            <div :class="{ 'scenics-box': upArrow }">
              <span class="location-budget">
                哈哈哈
              </span>
            </div>
            <span class="scenics-arrow">
              <i
                class="el-icon-d-arrow-left"
                :class="{
                  'scenics-arrow-down': upArrow,
                  'scenics-arrow-up': !upArrow,
                }"
                @click="showOrHide">
              </i>
              等29个区域
            </span>
          </el-col>
        </el-row>
        <el-row type="flex" class="option-row">
          <el-col :span="3">
            均价
            <el-tooltip
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top-start"
              class="question-mark"
            >
              <sup>?</sup>
            </el-tooltip>
            :
          </el-col>

          <!-- 价格 -->
          <el-col :span="21">
            <el-row type="flex">
              <el-col :span="6">
                <el-tooltip
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                  placement="bottom-start"
                  :visible-arrow="false">
                  <span>
                    <i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥332</span>
                  </span>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <el-tooltip
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                  placement="bottom-start"
                  :visible-arrow="false">
                  <span>
                    <i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥521</span>
                  </span>
                </el-tooltip>
              </el-col>
              <el-col :span="6">
                <el-tooltip
                  effect="dark"
                  content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                  placement="bottom-start"
                  :visible-arrow="false">
                  <span>
                    <i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i
                    ><i class="iconfont iconhuangguan"></i>
                    <span class="price-budget">¥768</span>
                  </span>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-col>

    <!-- 右侧地图部分 -->
    <el-col :span="10" style="padding-left: 5px; padding-right: 5px">
      <div class="map-box" style="width: 420px; height: 260px">
        <div
          id="map"
          style="position: relative; background: rgb(252, 249, 242)"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {

    methods:{
        showOrHide () {},
        upArrow () {}
    }

}
</script>

<style lang="less" scoped>
.hotel-option-row {
  min-height: 260px;
  margin-bottom: 20px;

  .option-row {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;

    .scenics-box {
      max-height: 3em;
      overflow: hidden;
    }
    .location-budget {
      margin-right: 1em;
      padding: 0 2px;
      border-radius: 4px;
      display: inline-block;
    }

    .scenics-arrow {
      /deep/.el-icon-d-arrow-left {
        cursor: pointer;
        color: #f90;

        &.scenics-arrow-down {
          transform: rotate(-90deg);
        }
        &.scenics-arrow-up {
          transform: rotate(90deg);
        }
      }
    }

    .question-mark {
      background-color: #ccc;
      color: #fff;
      display: inline-block;
      width: 1.2em;
      height: 1.2em;
      text-align: center;
      border-radius: 100%;
    }

    .iconhuangguan {
      color: #f90;
    }

    .price-budget {
      margin-left: 0.5em;
    }
  }
}
.map-box {
  position: relative;

  #map {
    width: 100%;
    height: 100%;
  }
}
/deep/.marker {
  display: inline-block;
  width: 22px;
  height: 36px;
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
  background-size: 22px 36px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}
</style>