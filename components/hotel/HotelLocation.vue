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
            <div :class="{ 'scenics-box': arrowMark }">

              <!-- 遍历拿过来的数据 -->
              <span class="location-budget"
                    v-for="(item,index) in scenicData"
                    :key="index">
                {{item.name}}
              </span>
            </div>
            <span class="scenics-arrow">
              <i
                class="el-icon-d-arrow-left"
                :class="{
                  'scenics-arrow-down': arrowMark,
                  'scenics-arrow-up': !arrowMark,
                }"
                @click="showOrHide">
              </i>
              等{{scenicData.length}}个区域
            </span>
          </el-col>
        </el-row>
        <el-row type="flex" class="option-row">
          <el-col :span="3">
            均价
            <el-tooltip
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top-start"
              class="question-mark">
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

        <el-row type="flex" class="option-row">
            <el-col :span="3">
                攻略:
            </el-col>
            <el-col :span="21">
                广州塔是广州的地标，塔高600米，为国内第一高塔，可以俯瞰广州全景。
                其头尾相当，腰身玲珑细长，又有“小蛮腰”之称，到晚上会亮灯，即使不游塔，也可来此拍摄外观。
                包括摩天轮、珠江摄影观景平台、蜘蛛侠栈道等景点，大部分以观景摄影为主。
                一般4点半-5点可以到达电视塔顶，观看日落及夜景。
            </el-col>
        </el-row>
      </el-row>
    </el-col>

    <!-- 右侧地图部分 -->
    <el-col :span="10" style="padding-left: 5px; padding-right: 5px">
      <div id="map-box" style="width: 420px; height: 260px">
        <div
          id="mapBox"
          style="position: relative; background: rgb(252, 249, 242)"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { Loading } from 'element-ui';
export default {
    // 接受父组件传递过来的数据
    props:{
        // 城市景区数据
        scenicData: {
          type: Array,
          default: () => {
            return [];
          },
        },

        // 酒店详情数据
        hotelList: {
          type: Array,
          default: () => {
            return [];
          },
        },
    },

    data() {
        return {
            // 定义一个箭头的初始值
            arrowMark:true,
            map:{},  // 地图
            markerList:[]
        }        
    },
    
    mounted() {
        // 地图加载
        window.onLoad = () => {
          this.init();
        };
        var url =
            "https://webapi.amap.com/maps?v=1.4.15&key=018322aa6281c56564c9fb050577ad16&callback=onLoad";
          var jsapi = document.createElement("script");
          jsapi.charset = "utf-8";
          jsapi.src = url;
          document.head.appendChild(jsapi);

        // 调用加在事件
        this.getData()
    },

    methods:{
         getData() {
           const loading = this.$loading ({
             lock:true,                                 // lock 的修饰符--默认是false 
             text:'Loading',                            // 显示在加载图标下方的加载方案
             spinner:'el-icon-loading',                 // 自定义加载图标类名 
             background:'rgba(0,0,0,0.7)',              // 遮罩层颜色
             target: document.querySelector('#mapBox')  // loading覆盖的dom元素节点
           });
           setTimeout(()=>{
             loading.close()                            // 成功回调函数停止加载
           },2000)
         },
        // 控制区域数据的数量
        showOrHide () {
            this.arrowMark = !this.arrowMark;
        },

        // 定义一个地图
        init() {
            this.map = new AMap.Map("mapBox", {
              resizeEnable: true,   // 定位
              zoom: 11,             // 级别
              viewMode:"3D",        // 3D
            });

            // 通过判断是否有城市名字，查看是否需要定位
            if (!this.$route.query.cityName) {
              AMap.plugin("AMap.CitySearch", () => {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity((status, result) => {
                  console.log(status, result);
                  if (status === "complete" && result.info === "OK") {

                    // 查询成功，result即为当前所在城市信息
                    // console.log(result);
                    this.$alert("定位当前城市:" + result.city, "提示", {
                      confirmButtonText: "确定",
                      type: "success",
                    });
                    this.$router.replace({
                      path: "/hotel",
                      query: { cityName: result.city },
                    });
                  }
                });
              });
            }
        }
    },

    watch: {
        // 监听酒店详情数据的变化，去更改地图定位信息
        hotelList() {
            // 调用地图
            this.init();
            console.log(this.hotelList);

          if (this.hotelList.length != 0) {
            // 随机地图的中心点
            this.map.setCenter([
              this.hotelList[0].location.longitude,
              this.hotelList[0].location.latitude,
            ]);
            // 清除地图覆盖物
            this.map.clearMap();
            // 定义一个空数组
            let markerList = [];
            
              // 添加点标记   
              /*
                高德地图的js中有部分代码是异步执行的，就导致可能js还没有加载完,自己打代码就执行，
                这种情况下，要保证地图的js 加载顺序在最前面，并且支持返回callback的方式
                就是在外层 添加 window.init = function(){}
              */ 
              this.hotelList.forEach((v, i) => {
                // 创建一个 Marker 实例：
                var marker = new AMap.Marker({
                    content: `<span class="marker">${i + 1}</span>`,
                    // 位置坐标
                    // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    position: new AMap.LngLat(
                      v.location.longitude,
                      v.location.latitude
                    ), 
                    // 提示    
                    // title: v.name,
                });
                // 移进点标记打开信息窗口
                marker.on("mouseover", () => {
                  // 创建 infoWindow 实例
                  let infoWindow = new AMap.InfoWindow({
                    position: new AMap.LngLat(
                      v.location.longitude,
                      v.location.latitude
                    ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    content: `<span style="font-size: 12px;color: #333">${v.name}</span>`, //传入 dom 对象，或者 html 字符串
                    offset: new AMap.Pixel(0, -35),
                  });
      
                  // 打开信息窗体
                  infoWindow.open(this.map);
                });
                // 移出点标记关闭信息窗口
                marker.on("mouseout", () => {
                  this.map.clearInfoWindow();
                });
                // 把 添加的点标记 添加到 定义的 markerList 数组里面
                markerList.push(marker)
            });
              // 添加到已有的地图实例中去
              this.map.add(markerList)
            }

        },
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
#map-box {
  position: relative;

  #mapBox {
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