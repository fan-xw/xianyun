<template>
<div>
<el-row class='infobox' v-for="(item,index) in hotelList"
                        :key="index">
    <el-col :span=8 @click.native='$router.push(`/hotel/details?id=${item.id}`)'>
        <img :src="item.photos" alt="">
    </el-col>
    <el-col :span=11 class='text' @click.native='$router.push(`/hotel/details?id=${item.id}`)'>
       <h2 class='title'>{{item.name}}</h2>
        <div class="pinyin">
            <span>{{item.alias}}</span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <span>{{item.hoteltype.name}}</span>
        </div>
        <div class="textbox">
        <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分">
        </el-rate>
       <span class='data'> <span>{{item.bad_remarks}}</span> 条评价</span>
        <span class='data'> <span>{{item.good_remarks}}</span> 篇游记</span>
        
        </div>
        <p class='place'> <span class='el-icon-location'></span> 位于: {{item.address}}</p>
        <p class="place"><i class="el-icon-phone"></i> 联系电话：{{item.phone}}</p>
        <p style="margin-top:10px;">
              <el-tag type="warning" v-for="(item2,index2) in item.hotelassets" :key="index2">
                <span style="font-size:14px;margin:5px;">{{item2.name}}</span>
              </el-tag>
        </p>
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
    props:['hotelList'],
    data(){
        return{
            value:0,
        }
    },
    
    
    methods:{
        // 点击酒店详情跳转至 携程网
        push(url){
            window.open(url)
        },
        
 
    },

    
        
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
            display: flex;
            font-size: 15px;
            color:#999999;
            span {
                &:first-child{
                    margin-right: 5px;
                }
            }
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
            color:#666666;
            line-height: 30px;
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

     /deep/.disappointed {
         font-size: 18px;
         text-align: center;
     }
     
     /deep/.pagechange {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0 40px;
     }

     .iconhuangguan {
         color: #ff9900;
     }
</style>