<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                支付总金额 <span class="pay-price">￥ {{payData.price}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <!-- 😱2.为二维码准备一个画布 -->
                        <canvas ref="qrcodeCanvas"></canvas>
                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// 😱1.引入二维码插件
import QRcode from 'qrcode'
export default {
    // 页面进入就开始发请求
    data () {
        return {
            payData:{}
        }
    },
    
    // 别的页面进来，vuex 本来就有，直接发请求
    // created () {
    //     /*  😡😡😡
    //         问题分析:我们在做测试的时候，经常会进行刷新，一旦刷新 token 会被清空，
    //                 正在等待 vuex 恢复，而没有恢复之前就开始获取数据，于是会报错
    //         处理方法:1.分开写 2.使用 watch 的 immediate 属性
    //                 1.如果实现在本页面刷新，就会没有 token，只能在 watch 里面进行监听
    //                 2.如果正常跳转 token 本身存在,监听不到改变，可以通过 watch  的 immediate 属性来实现
    //     */

    //     if (this.$store.state.userstore.userInfo.token) {
    //         // 路由里 ? 用query传参  : 用params传参  axios是独立的， 而路由是vue 的一部分
    //         this.$axios({
    //             url:'/airorders/' + this.$route.query.id,
    //             headers:{
    //                 Authorization: 'Bearer ' + this.$store.state.userstore.userInfo.token
    //             } 
    //         }).then(res => {
    //             console.log(res.data);
    //             this.payData = res.data
    //         })
    //     }
    // },
      
    // 刷新页面，vuex 本来是空的，恢复后被检测到然后发请求，(有 vuex 进来的第一次就发请求)
    // 加上 immediate:true属性(没有 vuex 等待恢复，进来第一次不发请求，等了一会数据回来再次触发就发送请求)  
     watch: {
        '$store.state.userstore.userInfo.token': {
            handler: function () {
                console.log(this.$store.state.userstore.userInfo.token)
                if (this.$store.state.userstore.userInfo.token) {
                    // 路由里 ? 用query传参  : 用params传参  axios是独立的， 而路由是vue 的一部分
                    this.$axios({
                        url:'/airorders/' + this.$route.query.id,
                        headers:{
                            Authorization: 'Bearer ' + this.$store.state.userstore.userInfo.token
                        } 
                    }).then(res => {
                        console.log(res.data);
                        this.payData = res.data

                        // 😱3.获取dom, 生成二维码
                        // 二维码库里传入两个参数
                        // 1. canvas dom  2.字符串
                        QRcode.toCanvas(this.$refs.qrcodeCanvas,this.payData.payInfo.code_url, {
                            width: 256,
                            color: {
                                dark: '#0a0',
                                light: '#bbb'
                            }
                        });

                        // 只要已生成二维码 我们就开始询问支付结果,首先我们不管轮询逻辑, 只发起一次请求
                        this.checkPay()
                    });
                } 
            },
            immediate:true
        },
    },

    methods:{
        checkPay () {
            console.log('调用 checkpay 检查支付状态');
            this.$axios({
                method: "post",
                url:'/airorders/checkpay',
                data:{
                    id: this.payData.id,
                    nonce_str: this.payData.price,
                    out_trade_no: this.payData.orderNo
                },
                headers:{
                    Authorization: 'Bearer ' + this.$store.state.userstore.userInfo.token
                } 
            }).then(res => {
                console.log(res.data)
                // 开始 轮询 支付结果，直到弹出成功提示
                if (res.data.trade_state !== "SUCCESS") {
                    setTimeout(() => {
                        // 递归:自己调用自己
                        this.checkPay()
                    }, 3000);
                } else {
                    this.$message.success('已完成支付')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-left{
            text-align: left;
        }

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>