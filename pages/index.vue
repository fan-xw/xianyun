<template>
   <div class="container">
      <!-- 幻灯片 -->
        <el-carousel 
        :interval="5000" 
        arrow="always">
            <el-carousel-item 
            v-for="(item, index) in banners" 
            :key="index">
                <div class="banner-image" 
                :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `">
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- 下面是其他内容，装备写搜索框 -->
   </div>
</template>

<script>
export default {
    data(){
        return {
            // 轮播图数据
            banners: []
        }
    },

    // 页面创建时需要获取轮播图的数据 
    created () {
        this.$axios({
            url: "/scenics/banners"
        }).then(res => {
            const {data} = res.data;
            this.banners = data;
        })
    },
   //  async created () {
   //    let res = await this.$axios({
   //          url: "/scenics/banners"
   //    })
   //    console.log(res);
   //    const {data} = res.data;
   //    this.banners = data;
   //  },
}
</script>

<style lang="less" scoped>
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>
