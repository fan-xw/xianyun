<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <!-- 2.父组件定义一个事件进行接收 -->
      <OrderForm
        v-if="flightData.insurances"
        :data="flightData"
        @sendTotalPrice="sendTotalPrice"
      />

      <!-- 侧边栏 -->
      <!-- 4.定义一个数据，传给子组件 OrderAside.vue -->
      <OrderAside
        v-if="flightData.insurances"
        :data="flightData"
        :totalPrice="totalPrice"
      />
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/OrderForm";
import OrderAside from "@/components/air/OrderAside";
export default {
  components: {
    OrderForm,
    OrderAside,
  },
  data() {
    return {
      flightData: {},
      totalPrice: 0,
    };
  },

  created() {
    this.$axios({
      url: "/airs/" + this.$route.query.id,
      params: {
        seat_xid: this.$route.query.seat_xid,
      },
    }).then((res) => {
      console.log(res.data);
      this.flightData = res.data;
    });
  },

  methods: {
    // 3.后续操作
    sendTotalPrice(newTotalPrice) {
      this.totalPrice = newTotalPrice;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>