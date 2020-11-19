<template>
  <div class="infoContainer">
    <div class="info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">入住时间：14：00之后</el-col>
        <el-col :span="5">离店时间：12：00之前</el-col>
        <el-col :span="5">2010年开业 / 2010年装修</el-col>
        <el-col :span="5">酒店规模：132间客房</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">酒店服务</el-col>
        <el-col :span="20">
          <span>
            <i class="facility">暂无数据</i>
          </span>
          <span>
            <span>
              <i class="facility"></i>
            </span>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <span>
            <i class=" facility">暂无数据</i>
          </span>
          <span>
            <span>
              <i></i>
            </span>
          </span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col>
          <span class="facility"> 暂无数据 </span>
        </el-col>
        <el-col :span="20">
          <span class="facility">
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 240px;
  margin: 40px 0;
}

.el-col {
  border-bottom: 1px solid #eeeeee;
  padding: 15px 0;
}
.facility {
  margin: 0 10px 0 0;
  padding: 10px 15px;
  color: #666;
  background-color: #eeeeee;
  font-size: 14px;
  text-align: center;
  border-radius: 7px;
}
</style>