<template>
<div>
<el-row class='infobox'>
    <el-col :span=9>
        <img :src="hotelItem.photos" alt="">
    </el-col>
    <el-col :span=10 class='text'>

       <h2 class='title'>{{hotelItem.name}}</h2>
       
       <p class='pinyin'>{{hotelItem.alias}}  {{hotelItem.hoteltype.name}}</p>
        <div class="textbox">
        <span class='el-icon-star-on'></span>
        <span class='el-icon-star-on'></span>
        <span class='el-icon-star-on'></span>
        <span class='el-icon-star-on'></span>
        <span class='el-icon-star-off'></span>
        <span class='score'>{{hotelItem.stars}}分</span>
        <span class='data'> <span>{{hotelItem.all_remarks}}</span> 条评价</span>
        <span class='data'> <span>50</span> 篇游记</span>
        </div>
        <p class='place'> <span class='el-icon-location'></span> 位于: {{hotelItem.address}}</p>
    </el-col>
    <el-col :span=5 class='info-right'>
        <el-row 
        class='preferential'
        v-for='(item,index) in hotelItem.products'
        :key='index'
        ><span class="hotelname">{{item.name}}</span> <span class='right'> <span class="color">￥{{item.price}}</span>起<span class='el-icon-arrow-right'></span> </span></el-row>
        
    </el-col>
</el-row>
</div>
</template>
<script>
export default {
    data(){
        return{
               
        }
    },
    
    // 父传子
    props:['hotelItem'],    
        
}
</script>
<style lang='less' scoped>
     .infobox{
         height: 264px;
         padding:25px 0px;
         border-bottom: 1px solid #eeeeee;
         img{
         height: 210px;
         width: 320px;
     }
        .title{
            font-weight: normal;
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
            display:flex;
            height: 48px;
            padding:12px 4px ;
            border-bottom: 1px solid #ebeef5;
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
        

     }
     
</style>