<template>
  <div class="flight-item">
        <div>
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{data.airline_name}} </span> {{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{ rankTime }}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                            <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{bestPrice}}</span>起
                </el-col>
            </el-row>
        </div>

    <el-collapse-transition>
        <div class="flight-recommend" v-if="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" 
                            justify="space-between" 
                            align="middle" 
                            class="flight-sell" 
                            v-for="(seats,index) in data.seat_infos"
                            :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{seats.group_name}}</span> | {{seats.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{seats.org_settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <!-- 带两个参数：把 航班id 和 座位id 带过去-->
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click="$router.push({
                                path:'/air/order',
                                query:{
                                    id:data.id,
                                    seat_xid:seats.seat_xid
                                }
                            })">
                            选定
                            </el-button>
                            <p v-if="seats.nums != 'A'">剩余：{{seats.nums}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </el-collapse-transition>    
    </div>
</template>

<script>
export default {
    // props:['data'],
    props: {
        // 数据
        data: {
            type: Object,
            // 默认是空数组
            default: {}
        },
        isShow:{}
    },
    
    // 计算属性  需要渲染的数据
    computed: {
        bestPrice () {
           // 遍历当前航班的所有座位数据, 对比过后, 拿出最便宜的那张返回出来
           // 1.先预设第一个座位信息的价格就是最低
           let bestPrice = this.data.seat_infos[0].settle_price_child
           // 2.遍历所有座位, 每个座位信息都拿出来对比, 如果有更低的就替换掉原来的数据
           this.data.seat_infos.forEach(v => {
               if (v.settle_price_child < bestPrice) {
                   bestPrice = v.settle_price_child
               }
           });
           return bestPrice
        },

        // 计算相差时间:计算起飞时间到到达时间的时间间隔。
        rankTime () {
           // 1.切割时间字符串
           const arrayDepTime = this.data.dep_time.split(':')   
           const arrayArrTime = this.data.arr_time.split(':')
           // ['20','30'] 

           // 2.算出出发时间和到达时间的总分钟数
           const depMin = Number(arrayDepTime[0]) * 60 + Number(arrayDepTime[1])
           const arrMin = Number(arrayArrTime[0]) * 60 + Number(arrayArrTime[1])

           // 3.到达时间减去出发时间
           let duration = arrMin - depMin

           // 4.如果时间跨过凌晨，相减数据会变成一个负数， 我们只需要 再加上一天的时间即可
           if (duration < 0) {
               duration += 24 * 60
           }
           
           // 5. 返回数据 变回小时分钟格式
           return Math.floor(duration / 60) + '时' + (duration % 60) + '分'    
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>