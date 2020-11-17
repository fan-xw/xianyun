<template>
  <section class="container">

    <!-- 酒店筛选组件 -->
    <SearchForm/>

    <!-- 筛选酒店组件 -->
    <HotelFilter/>

    <!-- 酒店列表组件 -->
    <HotelList/>

    <!-- 分页组件 -->
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
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>