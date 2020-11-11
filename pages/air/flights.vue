<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    过滤条件
                </div>
                  <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                  </el-pagination>
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div class="list">
                  <FlightsItem v-for="flight in dataList" :key="flight.id" :data="flight"/>
                </div>

                <!-- 分页组件 -->
                <div>
                  分页组件
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                侧边栏
            </div>


        </el-row>
    </section>
</template>

<script>
import { airsList } from '@/apis/air.js'
// 👌1.引入飞机列表页头部组件
import FlightsListHead from '@/components/air/FlightsListHead'
// 😋1.引入机票列表页组件
import FlightsItem from '@/components/air/FlightsItem'
export default {
  data() {
    return {
      flightsDate:{},
      // 当前页码
      pageIndex:2,
      // 每页数据
      pageSize:10,
      // 自己算出来的应该显示的机票数据
      dataList:[]
    }
  },

  components:{
    // 👌2.注册飞机列表页头部组件
     FlightsListHead,
    // 😋2.注册机票列表页组件
    FlightsItem
  },

  async created() {
    const res = await airsList(this.$route.query)
    console.log(res.data);
    this.flightsDate = res.data
    /*
    👍👍👍分页分析:机票数据存在 this.flightDate.flights里面。
            假如当前是第三页！每页10条，那么.splice()的时候就是(20,30) [可以取到左边的参数，但取不到右边的参数(不包括在内)]，
            就可以拿到第20条到第30条之间的数据，
            begin = (3-1) * 10 = 20
            end = 20 + 10 = 30
            .slice(begin,end)
    */ 
    const begin = (this.pageIndex - 1) * this.pageSize
    const end = begin + this.pageSize
    this.dataList = this.flightsDate.flights.splice(begin,end);
    console.log(this.dataList)

  }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>