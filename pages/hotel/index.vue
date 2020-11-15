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
          var map = new AMap.Map('container',{
            zoom:18,   // 级别
            center:[113.32459,23.10668],  // 中心点
            viewMode:'3D'  // 使用3D视图
          });

          //实时路况图层
          var trafficLayer = new AMap.TileLayer.Traffic({
              zIndex: 10
          });
          map.add(trafficLayer);//添加图层到地图

          // 位置点标记
          var marker = new AMap.Marker({
              position:[113.32459,23.10668],//位置
              // offset: new AMap.Pixel(-100,-100),
              // 如果是替换图标使用 icon 属性
              icon: '//vdata.amap.com/icons/b18/1/2.png',
              // 如果希望自定义内容, 可以使用 content 属性
              // 如果用了 content 那么 icon 图标失效
              // content: '<h2>广州塔</h2>'
          })
          map.add(marker);//添加到地图

          // 添加缩放工具体哦啊插件
          AMap.plugin('AMap.ToolBar',function(){
             var toolbar = new AMap.ToolBar();
             map.addControl(toolbar)
          })
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