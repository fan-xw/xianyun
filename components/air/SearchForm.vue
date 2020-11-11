<template>
  <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <!-- trigger-on-focus:是否在输入框 focus 时显示建议列表 布尔值：默认为true 输入后再激活输入建议-->
                <!-- highlight-first-item:是否默认突出显示远程搜索建议中的第一项 布尔值：默认为 false 自动高亮第一选项-->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                v-model="form.departCity"
                :trigger-on-focus="false"
                :highlight-first-item="true">
                </el-autocomplete>
            </el-form-item>  

            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                v-model="form.destCity"
                :trigger-on-focus="false"
                :highlight-first-item="true">
                </el-autocomplete>
            </el-form-item> 

            <el-form-item label="出发时间">
              <!-- change 用户确认选择日期时触发 -->
              <!-- picker-options:当前时间日期选择器特有的选项参考下表	object 
                   disabledDate:设置禁用状态，参数为当前日期，要求返回 Boolean	Function-->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate"
                :picker-options="{disabledDate}">
                </el-date-picker>
            </el-form-item> 

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>

            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
  </div>
</template>

<script>
// 🍝1.引入封装的机票城市请求api
import { airCity } from '@/apis/air.js'
// 引入 moment.js 处理时间的第三方包
import moment from 'moment'
export default {
    data () {
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            
            form:{
              departCity:'', // 出发城市
              departCode:'', // 出发城市代码
              destCity:'',   // 到达城市
              destCode:'',   // 到达城市代码
              departDate:''  // 日期字符串
            }
        }
    },

    methods: {
        // 点击实现Tab栏的切换
        handleSearchTab (index) {
            this.currentTab = index
            if (index == 1) {
              this.$message.warning('暂时只支持单程机票搜索')
            }
        },

        // 👌👌封装:获取远程数据显示搜索建议
        async getCitiesList(name) {
          const res = await airCity(name)
          console.log(res.data);
          if (res) {
            // 这种链式调用的方式其实就是在 cities 里面过滤了数据，和下面的做法相同
            let cities = res.data.data.filter(city => {
              return city.sort
            }).map(city => {
              return {
                 ...city,
                value:city.name.replace('市',''),
              }
            })
            // 过滤掉不带有 sort 数据的城市
            // cities = cities.filter(city => {
            //   return city.sort
            // })
            // 合并搜索城市后的优化, 如果搜索出来的城市长度 等于 0 显示没有城市
            return cities.length == 0 ? [{value: '搜索的城市不存在'}] : cities
          }
        }, 

        // 👌👌出发城市输入框获得焦点时触发, 获取远程数据显示搜索建议
        // value 是选中的值，showList是回调函数，接收要展示的列表
        async queryDepartSearch(value, showList) {
          // 触发了这个获取建议的函数，然后发送请求：根据用户的输入值拿到建议数组，最后显示出来
          // const res = await airCity(value)
          // if (res) {
          //   const cities = res.data.data.map(city => {
          //     return {
          //       ...city,
          //       value: city.name.replace('市','')
          //     }
          //   })
          //   showList(cities)
          // }
          const cities = await this.getCitiesList(value)

          // 搜索得出建议选项的时候，默认将列表的第一项code数据放入 form,默认给一个值，如果用户自己选了(触发 select 事件)，再去覆盖
          this.form.departCode = cities[0].sort
          showList(cities)
        },
    
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        async queryDestSearch(value, showList) {
          const cities = await this.getCitiesList(value)
          this.form.destCode = cities[0].sort
          showList(cities)
        },

        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
          // 把出发城市代码赋值给form里的departCode 
          this.form.departCode = item.sort
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
          // 把到达城市代码赋值给form里的destCode 
          this.form.destCode = item.sort
        },

        // 确认选择日期时触发
        handleDate(value){
          this.form.departDate = moment(value).format("YYYY-MM-DD");
        },

        // 设置日期的禁用状态
        disabledDate (time) {
            // 这里返回true,说明 disabled 不可选
            return time.getTime() < Date.now() - 24*60*60*1000
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            // 只需要将触发城市和触发城市代码与到达城市和到达城市代码进行互换即可

            // 1.定义一个中间量
            const oldDepartCode = this.form.departCode
            const oldDepartCity = this.form.departCity
            // 2.城市代码互换
            this.form.departCode = this.form.destCode
            this.form.destCode = oldDepartCode
            // 3.城市名互换
            this.form.departCity = this.form.destCity
            this.form.destCity = oldDepartCity
        },

        // 提交表单是触发
        handleSubmit(){
          console.log(this.form);
          // 编程式导航：带查询参数，变成 /register?plan=private
          // router.push({ path: 'register', query: { plan: 'private' }})
          this.$router.push({
            path:'/air/flights',
            query:this.form
          })
        }
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
