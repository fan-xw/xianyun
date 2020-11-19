<template>
<div>
<el-row class='infobox' v-for="(item,index) in hotels"
                        :key="index">
    <el-col :span=9 @click.native='$router.push(`/hotel/details?id=${id}`)'>
        <img :src="item.photos" alt="">
    </el-col>
    <el-col :span=10 class='text' @click.native='$router.push(`/hotel/details?id=${id}`)'>
       <h2 class='title'>{{item.name}}</h2>
       <p class='pinyin'>{{item.alias}}</p>
        <div class="textbox">
        <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分">
        </el-rate>
       <span class='data'> <span>{{item.bad_remarks}}</span> 条评价</span>
        <span class='data'> <span>50</span> 篇游记</span>
        
        </div>
        <p class='place'> <span class='el-icon-location'></span> 位于: {{item.address}}</p>
    </el-col>
    <el-col :span=5 class='info-right'>
        <el-row 
        v-for="(item,index) in item.products"
        :key="index"
        class='preferential'
        @click.native="push('https://hotels.ctrip.com/hotels/694679.html?hotel=694679&tab=1')"
        ><span class="hotelname">{{item.name}}</span> <span class='right'> <span class="color">￥{{item.price}}</span>起<span class='el-icon-arrow-right'></span> </span></el-row>
        
    </el-col>
</el-row>
</div>
</template>
<script>
export default {
    props:['hotels'],
    data(){
        return{
            value:0
        }
    },
    
    
    methods:{
        push(url){
            window.open(url)
        }
    }
    
        
}
</script>
<style lang='less' scoped>
     .infobox{
         height: 264px;
         padding:25px 0px;
         border-bottom: 1px solid #eeeeee;
            img{
                cursor: pointer;
                height: 210px;
                width: 320px;
            }
        .title{
            font-weight: normal;
                &:hover {
                    cursor: pointer;
                    color: #409eff;
                }
        }
        .pinyin{
            font-size: 16px;
            color:#999999
        }
        .textbox{
            padding:12px 0px;
        }
        .data{
            padding: 0 15px;
            span{
                color:#ff9900;
            }
        }
        .el-icon-star-on{
            color:#f7ba2a;
            font-size: 24px;
        }
        .el-icon-star-off{
            color:#eff2f7;
            font-size: 24px;
        }
        .score{
           color: #ffc552
        }
        .place{
            color:#666666
        }
        .info-right{
            margin-top: 25px;
        .preferential{
            cursor: pointer;
            display:flex;
            height: 48px;
            padding:12px 4px ;
            border-bottom: 1px solid #ebeef5;
                &:hover {
                    background-image: linear-gradient(180deg, #fff, #f5f7fa);
                }
        }
        .hotelname{
            flex:1
        }
        .right{
            width:80px ;
        }
        .color{
            color:#ff9900
        }

        }
        .el-rate{
            display: inline-block;
        }
        

     }
     
</style>