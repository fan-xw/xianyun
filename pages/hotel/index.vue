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
      
          <div class="hotelList">
              <div v-if="hotelList.length != 0">
                  <!-- 酒店列表组件 -->
                  <!-- 父传子 -->
                  <HotelList :hotelList="hotelList"/>

                  <!-- 分页 -->
                  <div class="pagination">
                    <el-pagination
                      layout="prev, pager, next"
                      :total="totalPage"
                      :page-size="pageSize"
                      :current-page="pageIndex"
                      @current-change="handleCurrentChange">
                    </el-pagination>
                  </div>
              </div>

              <div class="noHotel" v-if="hotelList.length == 0">
                暂无符合条件的酒店
              </div>
          </div>

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
            totalPage: 0, // 记录总页数
            pageIndex: 1, // 当前页面
            pageSize: 10, // 当前页显示的总数据
            start:0,      // 酒店数据里的分页数据，分页时使用
            city: "",     // 城市id
            cityname: "", // 城市名字
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
          this.getHotelData();
        });
      }
      //  this.loadPage()
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
          this.getHotelData();
        });
      },
    },
    
    methods:{

      // 数据加载 发送请求 获取酒店详情数据
      // loadPage () {
      //     this.$axios({
      //       url:'/hotels',
      //       params:{
      //         city:'197',
      //         _limit:'10',
      //         _start:'0'
      //       }
      //     }).then(res => {
      //       console.log(res)
      //       this.hotelList = res.data.data
      //     })
      // },

      // 获取酒店数据
      getHotelData() {
        let urlStr = "?";
        urlStr += "city=" + this.city + "&";
        urlStr += "_start=" + this.start + "&";
        urlStr += "_limit=" + this.pageSize + "&";
        Object.keys(this.$route.query).forEach((v, i) => {
          if (v != "cityName") {
            if (Array.isArray(this.$route.query[v])) {
              this.$route.query[v].forEach((item, index) => {
                urlStr += v + "_in=" + item + "&";
              });
            } else if (this.$route.query[v] != "") {
              urlStr += v + "=" + this.$route.query[v] + "&";
            }
          }
        });
        console.log(urlStr);
        this.$axios({
          url: "/hotels" + urlStr,
        }).then((res) => {
          console.log(res);
          this.hotelList = res.data.data;
          this.totalPage = res.data.total;
        });
      },


      // 分页
      handleCurrentChange (val) {
        console.log(val);
      }
    }
}

</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  .breadcrumb {
    overflow: hidden;
    padding: 20px 0;
  }

  .hotelList {
    .pagination {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0 40px;
    }
    .noHotel {
      text-align: center;
      height: 300px;
      margin-top: 20px;
    }
  }
}
</style>