<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters v-if="flightsDate.options" :data='flightsDate' @setFilteredList='setFilteredList'/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div class="list" v-if="dataList.length > 0">
                  <FlightsItem 
                      v-for="(flight,index) in dataList" 
                      :key="flight.id" 
                      :data="flight"
                      @click.native="showFlight(index)"
                      :isShow="index == currentActive"/>
                </div>
                <div v-else>
                  暂时没有数据
                </div>

                <!-- 分页组件 -->
                <!-- 
                  🌾🌾🌾
                  current-change: currentPage改变时会触发--当前页
                  size-change: pageSize改变时会触发--每页条数
                  page-size: 每页显示条目个数，支持 .sync 修饰符	number
                  page-sizes: 每页显示个数选择器的选项设置	number[]		例子:[10, 20, 30, 40, 50, 100]
                 -->
                <el-pagination
                  layout="total, sizes, prev, pager, next, jumper"
                  :page-size="pageSize"
                  :page-sizes="[2,5,10,20,50,100]"
                  :total="filteredList.length"
                  @current-change="currentChange"
                  @size-change="sizeChange"
                  :current-page="pageIndex">
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
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
// 😥1.引入条件过滤 筛选器
import FlightsFilters from '@/components/air/FlightsFilters'
// 😝1.引入侧边栏组件
import FlightsAside from '@/components/air/FlightsAside'
export default {
  data() {
    return {
      flightsDate:{},
      // 定义一个数组用于存放 筛选过后的数据
      filteredList: [],
      // 当前页码
      pageIndex:1,
      // 每页数据
      pageSize:2,
      // 自己切割出来的应该显示的机票数据
      // dataList:[]
      currentActive:null
    }
  },

  components:{
    // 👌2.注册飞机列表页头部组件
     FlightsListHead,
    // 😋2.注册机票列表页组件
    FlightsItem,
    // 😥2.注册条件过滤 筛选器组件
    FlightsFilters,
    // 😝2.注册侧边栏组件
    FlightsAside
  },

  // 计算属性
  computed:{
    dataList() {
        /* 
        🍕问题：每次翻页/修改页面长度时重新调用计算内容数组的代码没有必要

        1.因为这里面是页面进入时就执行, 不像之前可以在获取数据 .then 之后执行
        2.加一个判断, 有数据,就切割, 没数据就返回默认空数组即可
        */
      if (!this.filteredList) {
          return []
      }

      const end = this.pageIndex * this.pageSize;
      const begin = end - this.pageSize;

      return this.filteredList.slice(begin,end);
    }
  },

  /*
  分析：当我们点击历史记录，监控路由变化
      1.但对于 /air/flights 页面来说，其实一直都没有跳转，所以一开始加载完毕的 created / mounted 函数不会再次执行
      2.虽然页面没有跳转，但是路由发生了变化，query 专门用来储存 url 问号参数的属性发生了变化
      3.监听路由变化，就知道用户点击了历史记录，然后重新获取数据即可
  */ 
  watch: {
    $route () {
      this.pageIndex = 1
      this.loadPage()
    }
  },

  created() {
    this.loadPage()

    /*
    👍👍👍分页分析:机票数据存在 this.flightDate.flights里面。
            假如当前是第三页！每页10条，那么.splice()的时候就是(20,30) [可以取到左边的参数，但取不到右边的参数(不包括在内)]，
            就可以拿到第20条到第30条之间的数据，
            begin = (3-1) * 10 = 20
            end = 20 + 10 = 30
            .slice(begin,end)
    */ 
    // const begin = (this.pageIndex - 1) * this.pageSize
    // const end = begin + this.pageSize
    // this.dataList = this.flightsDate.flights.slice(begin,end);

    /*
    🌱🌱🌱另外一种思考方式：当前翻到第几页，结束就应该是当前页码乘以长度
       假如每页十条：第一页以10结束，第二页以20结束，第三页以30结束，
       开始的参数 = 结束参数 - 一个长度
    */
    // const end = this.pageIndex * this.pageSize
    // const begin = end - this.pageSize
    // this.dataList = this.flightsDate.flights.slice(begin,end);
    
    // 页面一进来就开始切割第一次数据并进行渲染  调用 
    // this.dataList = this.getDataList()
  },

  methods:{
    // 封装数据加载
    async loadPage () {
      const res = await airsList(this.$route.query)
      console.log(res.data);
      this.flightsDate = res.data
    
      this.filteredList = [...this.flightsDate.flights]
    },
    
    // currentPage 改变时会触发
    currentChange (newIndex) {
       this.pageIndex = newIndex;
      //  this.dataList = this.getDataList()
    },

    sizeChange (newSize) {
      this.pageSize = newSize
      // this.dataList = this.getDataList()
    },

    // 封装
    // getDataList() {
    //   const end = this.pageIndex * this.pageSize;
    //   const begin = end - this.pageSize;

    //   return this.flightsDate.flights.slice(begin,end);
    // }
    
    showFlight (index) {
        if (this.currentActive == index) {
          this.currentActive = null
        } else {
          this.currentActive = index
        }
    },

    setFilteredList(newList) {
      this.filteredList = newList
    }
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