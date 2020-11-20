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
// 2.引入筛选酒店过滤器
import HotelFilter from '@/components/hotel/HotelFilter'
// 3.引入酒店列表页组件
import HotelList from '@/components/hotel/HotelList'
export default {
  components:{
    SearchForm,HotelFilter,HotelList
  },

   data(){
        return{
            locationList:[],
            isload:true,
            // 定义一个空数组来接受 酒店详情数据
            hotelList:[],
        }
    },
    created(){
        // this.openFullScreen1()
        setTimeout(() => {
          this.open1()
        }, 2000);
    },

    mounted() {
       this.loadPage()
    },
    
    methods:{
      // 页面一进来，就开始定位,提示
      open1() {
        this.$notify({
          title: '城市',
          message: '定位当前城市:广州市',
          type: 'success',
          position:'top-left'
        });
      },

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