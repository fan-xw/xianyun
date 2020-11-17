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
                  :format-tooltip="formatTooltip"
                  @change="valuechange">
                </el-slider>
          </div>
      </el-col>

      <el-col :span="4">
          <div class="bolck1">
              <span>住宿等级</span>
              <el-row class="dropDown">
              <el-dropdown class="el-grade">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1星</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2星</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3星</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4星</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5星</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-row>
          </div>
      </el-col>

      <el-col :span="4">
          <div class="bolck1">
              <span>住宿类型</span>
              <el-row class="dropDown">
              <el-dropdown class="el-grade">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;经济型</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;舒适型</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;高档型</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;豪华型</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;度假村</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;公寓式酒店</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-row>
          </div>
      </el-col>

      <el-col :span="4">
          <div class="bolck1">
              <span>酒店设施</span>
              <el-row class="dropDown">
              <el-dropdown class="el-grade">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;wifi</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;热水壶</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;吹风机</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;外币兑换服务</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;洗衣服服务</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;电梯</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-row>
          </div>
      </el-col>

      <el-col :span="4">
          <div class="bolck1">
              <span>酒店品牌</span>
              <el-row class="dropDown">
              <el-dropdown class="el-grade">
                <span class="el-dropdown-link">不限</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;7天连锁</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;格林豪泰</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-check">&nbsp;&nbsp;&nbsp;&nbsp;锦江之星</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-row>
          </div>
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
          value:0
      }
  },

  methods:{
      formatTooltip () {},
      valuechange () {}
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

                .bolck1 {
                    .dropDown{
                        margin-top: 10px;
                        .el-grade {
                            display: flex;
                            width: 100%;
    
                            .el-dropdown-link {
                                flex: 1;
                                cursor: pointer;
                                color: #409EFF;
                            }

                            .el-icon--right {
                                align-self: center;
                            }
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
</style>