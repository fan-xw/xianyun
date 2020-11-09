<template>
  <div class="text">
    <!-- fetch-suggestions:返回输入建议的方法，注意用 v-bind 的形式传入
         仅当你的输入建议数据 resolve 时，通过调用callback(data:[])来返回它	
         Function(queryString, callback) -->
    <!-- select:是建议被选择之后的回调事件 -->
      <el-autocomplete
      class="inline-input"
      v-model="value"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import { airCity } from '@/apis/air.js'
export default {
  data () {
    return {
       restaurants: [],
       value:'',
    }
  },
  methods: {
    /*querySearch:是显示建议的函数
      第一个参数queryString:就是当前输入的值
      第二个参数callback:就是用来显示建议列表的回调函数*/

    /*只要在调用这个函数的时候，往里面传入一个建议数组即可
      这个数组中的每一个元素都是一个建议对象
      其中 value 属性会被显示在页面上*/ 
    // querySearch(queryString, callback) {
    //   // 这里还有第一个参数，就是输入的值(其实是后面可以用来发送请求拿取建议数组的)
    //   const newArr = [
    //     {value:'北京',name:'大威',address:'北京市朝阳区北新泾街道金钟路180号1层01号摊位'},
    //     {value:'上海',name:'小威',address:'上海市长宁区金钟路968号15楼15-105室'},
    //     {value:'广州',name:'范小威',address:'增城区仙霞西路299弄3号101B'},
    //     {value:'深圳',name:'范大威',address:'普陀区金沙江路1699号鑫乐惠美食广场A13'}
    //   ];
    //   // 调用 callback 返回建议列表的数据
    //   callback(newArr);


    // 获取远程数据显示搜索建议
    async querySearch(queryString, callback) {
      // 触发了这个获取建议的函数，人后发送请求：根据用户的输入值拿到建议数组，最后显示出来

      // 第一种方案：直接发请求
        // this.$axios({
        //   url:'/airs/city',
        //   params:{
        //     name:queryString
        //   }
        // }).then(res => {
        //   console.log(res.data);
        //    const list = res.data.data.map(city => {
        //       return {
        //          ...city,
        //          value: city.name.replace('市', '')
        //       }
        //    })
  
        //   callback(list)
        // })

      // 第二种方法：采用封装的axios请求
      const res = await airCity(queryString).then(res => {
        console.log(res.data);
        // 城市就在 res.data.data
         const list = res.data.data.map(city => {
             return {
                ...city,
                value: city.name.replace('市', '')
             }
         })

        callback(list)
      })  
      
    },

    handleSelect (item) {
      // 这里是用户选择了其中一个选项之后会触发的事件
      // 可以接收到用户选择选项的对象本身
      // 不单单只有value值，而是整个对象，可以进行后续操作
      console.log('---------');
      console.log(item);
    },
  
  },

}      

</script>

<style>

</style>