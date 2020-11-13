<template>
  <div class="filters">
        <!-- gutter	栅格间隔	number -->
        <el-row type="flex" class="filters-top" justify="space-between" align="middle" :gutter="5">
            <el-col :span="8">
                单程： 
                广州 - 上海 
                / 
                2019-06-17
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="runFilters">
                    <el-option
                    v-for="(airPort,index) in data.options.airport"
                    :key="index"
                    :label="airPort"
                    :value="airPort">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="runFilters">
                    <el-option
                    v-for="(time,index) in data.options.flightTimes"
                    :key="index"
                    :label="time.from + ':00' + '-' + time.to +':00'"
                    :value="time.from + ',' + time.to">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="runFilters">
                    <el-option
                    v-for="(company,index) in data.options.company"
                    :key="index"
                    :label="company"
                    :value="company">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="runFilters">
                    <el-option
                    v-for="(size,index) in sizeAirModel"
                    :key="index"
                    :label="size.label"
                    :value="size.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            // 定义一个机型的数组，然后渲染
            sizeAirModel:[
                {
                    label:'大',
                    value:'L'
                },
                {
                    label:'中',
                    value:'M'
                },
                {
                    label:'小',
                    value:'S'
                }
            ],

            // 借鉴Element-ui表单的验证规则，  把所有的函数封装成一个 rules 对象
            rules:{
                // 纯函数:函数的返回结果只依赖于它的参数。函数执行过程里面没有副作用。
                // 相同的输入，每次都能得到相同的输出
                airport: (flights,userOption) => {
                    return flights.filter((item) => {
                        return item.org_airport_name == userOption;
                    });
                },
                flightTimes: (flights,userOption) => {
                    const from = Number(userOption.split(',')[0])
                    const to = Number(userOption.split(',')[1])

                    return flights.filter(item => {
                        const depTime = Number(item.dep_time.split(':')[0])
                        return depTime >= from && depTime < to
                    })
                },
                company: (flights,userOption) => {
                    return flights.filter(item => {
                        return item.airline_name == userOption
                    }) 
                },
                airSize: (flights,userOption) => {
                    return flights.filter(item => {
                        return item.plane_size == userOption
                    })
                }
            }
        }
    },

    methods: {
        /*😥😥😥
        此时出现一个问题:就是我们的每一个筛选器的数据都是从总数据(100条)里面拿的,
                          并且每次过滤都会使用原始数据，每一个过滤器都会覆盖上一个过滤器的结果
        解决办法：不应该每个筛选器单独触发父组件的数据渲染，筛选器应该只管输入和输出数据，用一个通用函数包装起来，
                 每个筛选器的变更，都应该重新触发一次所有过滤，然后再统一显示在父组件      
                 1.封装一个函数，将原始数据依次通过所有过滤器，最后统一向父组件渲染数据
                 2.每个过滤器必须在判断有选项的情况下再进行过滤，不然一个空字段，会造成所有数据都通不过变成空数组了
                 3.过滤玩所有函数后，才触发一次父组件渲染            
        */ 
       runFilters () {
           // 1. 先将原来的一百条数据放入一个数组备用
           let flights = [...this.data.flights]

           // 😊2.遍历规则配置，配置中的每一个key都可以拿出来   
           for (const key in this.rules) {
            // console.log(key); key 代表每一个筛选框

            // 😊3.拿到用户选择
            // 这里直接用 this.key是不行的 .语法得到的是一个字符串，把key变成一个变量 [key]
            // 如果当前 key == this.airport, 那么 this[key] == this.airport
            const userOption = this[key]
            // 😊4.拿到对应选择函数的处理函数
            const filterFn = this.rules[key]

            // 😊5.如果用户有选择，就执行这个函数，否则不执行
            if (userOption) {
                flights = filterFn(flights,userOption)
            }

           }
           
            // 选择机场   
            // if (this.airport) {
            //     flights = this.handleAirport(flights)
            //     console.log(flights);
            // }

            // // 选择出发时间
            // if (this.flightTimes) {
            //     flights = this.handleFlightTimes(flights)
            //     console.log(flights);
            // }

            // // 选择航空公司
            // if (this.company) {
            //     flights = this.handleCompany(flights)
            //     console.log(flights)
            // }

            // // 选择机型
            // if (this.airSize) {
            //     flights = this.handleAirSize(flights)
            //     console.log(flights)
            // }

            this.$emit('setFilteredList',flights)
       },

        // // 选择机场时候触发
        // handleAirport(flights){
        //     // 改造了这个函数，不再直接渲染数据，而是接受一个数组，过滤后返回新数组
        //     const newList = this.data.flights.filter(item => {
        //         return item.org_airport_name == this.airport
        //     })
        //     // 不能直接渲染而是返回结果
        //     return newList
        // },

        // // 选择出发时间时候触发
        // handleFlightTimes(flights){
        //     // 这里会有一个小小的BUG 我们打印出的数字是字符串，所以我们需要把字符串数字转换成Number
        //     const from = Number(this.flightTimes.split(',')[0])
        //     const to = Number(this.flightTimes.split(',')[1])
        //     const newList = flights.filter(item => {
        //         const depTime = Number(item.dep_time.split(':')[0])
        //         return depTime >= from && depTime < to
        //     })
        //     return newList
        // },

        //  // 选择航空公司时候触发
        // handleCompany(flights){
        //     // 其实这里的 value 值是 value == this.company 
        //     // 1.先拿到页面进来传入的 原始数据(100条)，this.data.flights
        //     const newList = flights.filter(item => {
        //         return item.airline_name == this.company
        //     }) 

        //     // 2.利用 子传父 把数据传递给 父组件 (父组件那边接受到筛选后的数据后进行分页)
        //     // this.$emit('setFilteredList',newList)
        //     return newList
        // },

        //  // 选择机型时候触发
        // handleAirSize(flights){
        //    const newList = flights.filter(item => {
        //        return item.plane_size == this.airSize
        //    })
        //    return newList
        // },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            // 1.清空所有双向绑定的筛选选项
	        this.airport = ''
            this.flightTimes = ''
            this.company = ''
            this.airSize = ''
            // 2.执行以下筛选器
            this.runFilters()
        },
    }
}
</script>

<style lang="less" scoped>
.filters {
    margin-bottom: 5px;
}
</style>