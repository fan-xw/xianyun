<template>
  <div class="Hlfilter">
    <el-row class="list-filter">

      <el-col :span="4">
          <div class="bolck">
                <span class="demonstration">
                  <span class="price">价格</span>
                  <span class="scope">0-4000</span>
                </span>
                <el-slider
                  v-model="value"
                  :format-tooltip="formatTooltip">
                </el-slider>
          </div>
      </el-col>

      <el-col :span="4" 
              v-for="(item,index) in hotelItem"
              :key="index">
              <span class="demonstration1">{{item.name}}</span>
              <el-dropdown placement='bottom-start' @command="handleCommand" >
                    <span class="el-dropdown-link">
                      <span class='text'>{{hotelItem[index].state}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
            
                  <el-dropdown-menu slot="dropdown" size='medium'>
                    <el-dropdown-item 
                    v-for='(value,num) in item.list'
                    :command='{index,num}'
                    :key='num'> 
                        <span :class="{
                                  'iconfont iconcircle':!value.isshow,
                                  'el-icon-circle-check':value.isshow
                              }">
                        </span>  
                        <span class='item'>{{value.name}}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
      </el-col>

      <el-col :span="4">
          <div class="btn">
              <el-button type="primary">撤销条件</el-button>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
t
<script>
export default {
  data () {
      return {
          value:0,
          hotelItem:[
            {name:'住宿等级',list:[],state:'不限'},
            {name:'住宿类型',list:[],state:'不限'},
            {name:'酒店设施',list:[],state:'不限'},
            {name:'酒店品牌',list:[],state:'不限'},
          ],
          form:{
              price_it:4000,
              hotellevel_in:[1,2,3],
              hoteltype_in:[1,2,3]
          },
          hotelList:[],
      }
  },
 
  created () {
    this.$axios({
      url:'/hotels/options',
    }).then(res => {
      console.log(res);
      this.hotelItem[2].list  =res.data.data.assets
      this.hotelItem[3].list  =res.data.data.brands
      this.hotelItem[0].list  =res.data.data.levels
      this.hotelItem[1].list =res.data.data.types
    });

  },

  mounted() {
    this.$axios({
      url:'/hotels',
      params:{
        city:'197',
        _limit:'10',
        _start:'0'
      }
    }).then(res => {
      console.log(res)
      this.hotelList = res.data.data
      this.$emit('sendHotels',this.hotelList)
    })
  },

  methods:{
      // Slider-滑块
      formatTooltip (value) {
        return value * 40
      },
      valuechange () {},

      // command:点击菜单项触发的事件回调	dropdown-item 的指令
      handleCommand (command) {
         const { index,num } = command
         this.hotelItem[index].list[num].isshow = !this.hotelItem[index].list[num].isshow
         this.hotelItem = [...this.hotelItem]
         this.countitem(index)
        //  this.$emit('filter',this.form)
      },

      countitem(index){
          const list=this.hotelItem[index].list.filter((value)=>{
              return value.isshow == true
          })
        
          if(list.length==0){
              this.hotelItem[index].state='不限'
          }
          else if(list.length==1){
              this.hotelItem[index].state = list[0].name
          }
          else{
              this.hotelItem[index].state = `已选${list.length}项`
          } 
      }
      
  }
}
</script>

<style lang="less" scoped>
    .Hlfilter {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        .list-filter {
            height: 80px;
            border: 1px solid #ddd;
            padding: 5px 20px;
            color: #666;
            font-size: 14px;

            .el-col {
                height: 100%;
                border-right: 1px solid #dddddd;
                padding: 8px 20px;
                &:last-child {
                  border-right: 0;
                }

                .demonstration {
                  display: flex;
                  font-size: 14px;
                  color: #666666;
                  padding-bottom: 5px;
                  .price {
                    flex: 1;
                    .scope {
                      width: 80px;
                    }
                  }
                }

                .demonstration1{
                    display: block;
                    font-size: 14px;
                    padding-bottom: 10px;
                    color: #666666;
                }

                .el-dropdown{
                       width: 130px;

                   .el-dropdown-link {
                        display: flex;
                        width: 100%;
                        cursor: pointer;
                        font-size: 13px;

                       .el-icon--right{
                           width: 10px;
                       }
                       
                       .text{
                           flex:1
                       }
                  }
                }
                
                .btn {
                    text-align: center;
                    line-height: 60px;
                }
            }

        }
    }

    .el-dropdown-menu__item{
        width: 150px;
    }
    
    .el-dropdown-menu{
      height: 300PX;
      overflow: scroll;  
    }
</style>