<template>
      <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm v-if="flightData.insurances" :data="flightData"/>

            <!-- 侧边栏 -->
            <OrderAside v-if="flightData.insurances" :data='flightData'/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/OrderForm'
import OrderAside from '@/components/air/OrderAside'
export default {
    components: {
        OrderForm,OrderAside
    },
    data() {
        return {
            flightData: {}
        }
    },

    created () {
        this.$axios({
            url: '/airs/' + this.$route.query.id,
            params: {
                seat_xid: this.$route.query.seat_xid
            }
        }).then(res=>{
            console.log(res.data);
            this.flightData = res.data
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>