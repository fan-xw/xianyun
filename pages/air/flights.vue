<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    过滤条件
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div class="list">
                  <FlightsItem v-for="flight in flightsDate.flights" :key="flight.id"/>
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
      flightsDate:{}
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