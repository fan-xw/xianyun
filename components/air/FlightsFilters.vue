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
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(airPort,index) in data.options.airport"
                    :key="index"
                    :label="airPort"
                    :value="airPort">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(time,index) in data.options.flightTimes"
                    :key="index"
                    :label="time.from + ':00' + '-' + time.to +':00'"
                    :value="time.from + ',' + time.to">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(company,index) in data.options.company"
                    :key="index"
                    :label="company"
                    :value="company">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
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
            ]
        }
    },

    methods: {
        // 选择机场时候触发
        handleAirport(value){
            
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            
        },

         // 选择航空公司时候触发
        handleCompany(value){
            console.log(value);
            // 1.先拿到页面进来传入的 原始数据(100条)，this.data.flights
            const newList = this.data.flights.filter(item => {
                return item.airline_name == value
            }) 

            console.log(newList);
            // 2.利用 子传父 把数据传递给 父组件 (父组件那边接受到筛选后的数据后进行分页)
            this.$emit('setFilteredList',newList)
        },

         // 选择机型时候触发
        handleAirSize(value){
           
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    }
}
</script>

<style lang="less" scoped>
.filters {
    margin-bottom: 5px;
}
</style>