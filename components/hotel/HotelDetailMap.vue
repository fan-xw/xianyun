<template>
  <div class="map">
    <div id="container"></div>
    <div class="ponit">
      <el-tab-pane
        label="交通"
        name="second"
        class="two"
      >交通</el-tab-pane>
      <el-tabs>
        <el-tab-pane
          label="风景"
          class="two"
          name="风景"
        >
          <ul>
            <li>
              <span class="character">123</span>
              <span class="distance">米</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          label="交通"
          class="two"
          name="交通"
        >
          <ul>
            <li>
              <span class="character">321</span>
              <span class="distance">米</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang="less">
.map {
  width: 100%;
  margin: 40px 0;
  display: flex;
}
.ponit {
  width: 350px;
  height: 360px;
  padding-left: 20px;
  .two {
    overflow: auto;
    height: 300px;
    width: 340px;
    cursor: pointer;
    display: flex;
    ul {
      width: 100%;
      margin: 0 10px 0;
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        display: flex;
        .character {
          flex: 1;
        }
        .distance {
          width: 50px;
        }
      }
    }
  }
}
#container {
  width: 650px;
  height: 360px;
}
</style>