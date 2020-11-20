<template>
        <section class="container">

          <!-- 面包屑导航 -->
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>酒店</el-breadcrumb-item>
              <el-breadcrumb-item
                >{{ $route.query.cityName }}酒店预订</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
      
          <!-- 酒店筛选组件 -->
          <SearchForm/>

          <!-- 酒店位置组件 -->
          <!-- 通过父传子，把城市区域数据传递给子组件 -->
          <HotelLocation :scenicData="scenicList"/>
      
          <!-- 筛选酒店组件 -->
          <HotelFilter />
      
          <!-- 酒店列表组件 -->
          <!-- 父传子 -->
          <HotelList :hotelList="hotelList"/>

        </section>
</template>

<script>
// 1.引入酒店价钱筛选组件
import SearchForm from '@/components/hotel/SearchForm'
// 2.引入酒店位置组件
import HotelLocation from '@/components/hotel/HotelLocation'
// 2.引入筛选酒店过滤器
import HotelFilter from '@/components/hotel/HotelFilter'
// 3.引入酒店列表页组件
import HotelList from '@/components/hotel/HotelList'
export default {
  components:{
    SearchForm,HotelFilter,HotelList,HotelLocation
  },

   data(){
        return{
            // 定义一个空数组来接受 酒店详情数据
            hotelList:[],
            scenicList: [], // 景点数据
        }
    },

    mounted() {
      // 如果有城市名字就发起请求获取城市id和城市景点
      if (this.$route.query.cityName) {
        this.$axios({
          url: "/cities",
          params: { name: this.$route.query.cityName },
        }).then((res) => {
          console.log(res);
          this.city = res.data.data[0].id;
          this.scenicList = res.data.data[0].scenics;
          // this.getHotelData();
        });
      }
       this.loadPage()
    },

    watch:{
      // 监听路由变化，获取城市id和城市景点
      $route() {
        console.log(this.$route.query);
        this.$axios({
          url: "/cities",
          params: { name: this.$route.query.cityName },
        }).then((res) => {
          this.city = res.data.data[0].id;
          this.scenicList = res.data.data[0].scenics;
          // this.getHotelData();
        });
      },
    },
    
    methods:{

      // 数据加载 发送请求 获取酒店详情数据
      loadPage () {
          this.$axios({
            url:'/hotels',
            params:{
              city:'197',
              _limit:'10',
              _start:'0'
            }
          }).then(res => {
            console.log(res)
            this.hotelList = res.data.data
          })
      },


    }
}

</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
    .pagechange{
    padding-top: 20px;
    display: flex;
    justify-content: right;
    }

  .breadcrumb {
    overflow: hidden;
    padding: 20px 0;
  }
}
</style>