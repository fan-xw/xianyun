<template>
  <div>
    <!-- 使用头部组件 -->
    <PageHeader/>
    <!-- 内容占位组件 -->
    <nuxt />
    <!-- 使用页脚组件 -->
    <PageFooter/>
  </div>
</template>

<script>
// 引入公共头部组件
import PageHeader from '@/components/PageHeader'
// 引入公共页脚组件
import PageFooter from '@/components/PageFooter'
export default {
  // 注册组件
  components:{
    PageHeader,PageFooter
  }

}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin:0; 
  padding:0;
}
ul, li, ol{
  list-style:none;
}
a{
  text-decoration:none;
  color:inherit;
}

em,i{
  font-style: normal;
}
</style>