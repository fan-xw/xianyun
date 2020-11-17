<template>
  <section class="container">
    <!-- 面包屑 -->
    <div class="hotel">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
            <el-breadcrumb-item>酒店管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

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
  .hotel {
    padding: 20px 0;
    font-size: 16px;
    color: #000;
  }
}
</style>