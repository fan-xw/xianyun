<template>
  <div class="post">
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          左边
          <SideNacigation /></div
      ></el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SideNacigation from '@/components/post/SideNacigation.vue'
export default {
  components: {
    SideNacigation
  },
  data() {
    return {



    }
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
.post {
  min-width: 1000px;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
}
</style>