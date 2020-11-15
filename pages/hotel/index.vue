<template>
    <div class="hotel">
      <div id="container"></div>
    </div>
</template>

<script>
export default {
    mounted() {
      // 页面挂载完毕，开始一部引入，高德地图

      // 1.创建一个回调函数，高德地图加载完毕后会加载
      window.onLoad  = function(){
          var map = new AMap.Map('container');
      }

      // 2.api 地址
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=f07385ea960b22e354688cec55dfadb1&callback=onLoad';

      // 3.创建一个 script dom 元素
      var jsapi = document.createElement('script');

      // 4.设定 script 标签属性
      jsapi.charset = 'utf-8';
      jsapi.src = url;

      // 5.将我们的api文件引入到页面中，加载完毕后就会调用
      document.head.appendChild(jsapi);
    }
}
</script>

<style lang="less" scoped>;
  #container {
    width: 600px;
    height: 400px;
  }
</style>