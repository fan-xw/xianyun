<template>
  <div>机票搜索结果页</div>
</template>

<script>
import { airsList } from '@/apis/air.js'
export default {
  data() {
    return {
      flightsDate:{}
    }
  },

  async created() {
    const res = await airsList(this.$route.query)
    console.log(res.data);
    this.flightsDate = res.data
  }

}
</script>

<style>

</style>