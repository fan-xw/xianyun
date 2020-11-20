<template>
        <section class="container">
      
          <!-- 酒店筛选组件 -->
          <SearchForm/>
      
          <!-- 筛选酒店组件 -->
          <HotelFilter @sendHotels="sendHotels"/>
      
          <!-- 酒店列表组件 -->
          <HotelList :hotels="hotels" />

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
            hotels:[],
            locationList:[],
            isload:true,
        }
    },
    created(){
        // this.openFullScreen1()
        setTimeout(() => {
          this.open1()
        }, 2000);
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

      sendHotels (hotels) {
        this.hotels = hotels
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

    .disappointed{
        text-align: center;
        padding-top: 20px;
        margin-top: 10px;
    }
}
</style>