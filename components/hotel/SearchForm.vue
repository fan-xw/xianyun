<template>
  <div class="searchForm">
    <div class="hotel">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
            <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <el-row>
      <el-col :span="5">
        <el-autocomplete
          v-model="city"
          :fetch-suggestions="loadCityList"
          placeholder="切换城市"
          @select="handleSelect">
        </el-autocomplete>
      </el-col>

      <el-col :span="8">
        <el-date-picker
          v-model="value1"
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
          <el-input
            placeholder="人数未定"
            suffix-icon="el-icon-user"
            slot="reference"
            v-model="person">
          </el-input>

          <!-- 筛选人数 -->
          <div class="man">
            <span class="every">每间</span>
            <el-select
              v-model="adult"
              slot="prepend"
              placeholder="2 成人"
              size="mini"
              class="selectbox">
              <el-option
                v-for="(item,index) in personList"
                :key="index"
                :label="`${item} 成人`"
                :value="item">
              </el-option>
            </el-select>

            <el-select
              v-model="children"
              slot="prepend"
              placeholder="0 儿童"
              size="mini"
              class="selectbox">
              <el-option
                v-for="(item,index) in personList"
                :key="index"
                :label="`${item} 儿童`"
                :value="item">
              </el-option>
            </el-select>

            <div class="line"></div>
            <div class="botton" @click="sure">
              <el-button type="primary" size="mini">确定</el-button>
            </div>
          </div>
          

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
        <div id="container">
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
          city:'广州市',
          value1: '',
          person:'',
          personList:[0,1,2,3,4,5,6],
          adult:'2成人',
          children:' 0 儿童',
          // 地图点坐标
          positionList:[
                {x:113.331085,y:23.112187 },
                {x:113.33352,y:23.113201},
                {x:113.328992,y:23.117464},
                {x:113.324357,y:23.1163},
                {x:113.298378,y:23.122283}],
          pickerOptions:[],
          // 定义一个风景区的空数组
          scenics:[]
        }
    },

    // mounted钩子函数-- 实现页面一进来就加载地图
    mounted () {
      const positionList = this.positionList

      window.onLoad  = function(){
            var map = new AMap.Map('container',{
              zoom:12,
              center:[positionList[0].x,positionList[0].y]
            });

            const markerList= positionList.map((item)=>{
                return   new AMap.Marker({
                    position: new AMap.LngLat(item.x,item.y),   
                    title: '广州塔'
                })
            })
            //添加到地图
            map.add(markerList);
      }
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=您申请的key值&callback=onLoad';
      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }, 

    /*
    created ：处于loading结束后，还做一些初始化，实现函数自执行
    (data数据已经初始化，但是DOM结构渲染完成，组件没有加载)
    */
    created () {
      this.sendCities()
    },


    methods:{
      sendCities () {
         this.$axios({
           url:'/cities',
           params:{
             name:this.city
           }
         }).then(res => {
           console.log(res);
           this.scenics = res.data.data[0].scenics
           console.log(this.scenics);
         })
      },

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
  .hotel {
    padding: 20px 0;
    font-size: 16px;
    color: #000;
  }

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