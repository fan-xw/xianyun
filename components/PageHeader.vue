<template>
  <header class="header">
        <el-row type="flex" justify="space-between" class="main">

            <!-- logo -->
            <div class="logo">
                <nuxt-link to="/">
                    <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </nuxt-link>
            </div>

            <!-- 菜单栏 -->
            <el-row type="flex" class="navs">
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link to="/post">旅游攻略</nuxt-link>
                <nuxt-link to="/hotel">酒店</nuxt-link>
                <nuxt-link to="/air">国内机票</nuxt-link>  
            </el-row>

            <!-- 登录/用户信息 -->
            <el-row type="flex" align="middle">

                <!-- 如果用户存在则展示用户信息，用户数据来自store -->

                <!-- 🌾🌾🌾2.判断 token的存在则将用户数据显示出来 -->
                <el-dropdown v-if="userInfo.token">
                    <el-row type="flex" align="middle" class="el-dropdown-link">

                        <!-- 🌾🌾🌾3.在头部组件展示store中保存的用户数据。 -->
                        <nuxt-link to="#">
                            <img :src="$axios.defaults.baseURL + userInfo.user.defaultAvatar"/>
                            {{userInfo.user.nickname}}
                        </nuxt-link>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-row>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                           <nuxt-link to="#">个人中心</nuxt-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div @click="handleLogout">退出</div> 
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <!-- 不存在用户信息展示登录注册链接 -->
                <nuxt-link to="/user/login" class="account-link" v-else>
                    登录 / 注册 
                    <!-- $store.state全局的 +模块名+字段名-->
                    <!-- {{$store.state.userstore.userInfo.token}} -->
                </nuxt-link>
            </el-row>
        </el-row>
    </header>
</template>

<script>
export default {
    // 假如需求：我们等待1秒钟，将abc 改为 666
    // mounted () {
    //     console.log(this.$store.state.userstore.abc);
    //     setTimeout(() => {
    //         // this.$store.state.userstore.abc = 666
    //         // 必须以规定的方式改变数据，禁止随意的赋值
    //         //  this.$store.commit(mutation 函数路径(模块名) )
    //         this.$store.commit('userstore/setABC', 666);
    //     },1000)
    // }
    methods: {
        // 点击退出功能，实现退出登录
        handleLogout () {
            // const {commit} = this.$store;
            // commit("userstore/cleanUserInfo");
            
            // this.$message({
            //     message: "退出成功",
            //     type: "success"
            // })
            this.$store.commit('userstore/setUserInfo',{})
        }
    },

    // 计算属性
    computed: {
        userInfo () {
            // 🌾🌾🌾1.获取数据
            return this.$store.state.userstore.userInfo
        }
    }
}
</script>

<style scoped lang="less">
// 在vue组件中，在style标签上添加scoped属性，以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的
    .header{
        height: 60px;
        line-height:60px;
        background:#fff;
        border-bottom: 1px #ddd solid;
        box-shadow:0 3px 0 #f5f5f5;
        box-sizing: border-box;

        .main{
            width:1000px;
            margin:0 auto;
        }

        .logo{
            width:156px;
            padding-top:8px;

            img{
                display: block;
                width:100%;
            }
        }

        .navs{
            margin: 0 20px;
            flex:1;

            a{
                display:block;
                padding:0 20px;
                height:60px;
                box-sizing: border-box;

                &:hover,&:focus, &:active {
                    border-bottom:5px #409eff solid;
                    color:#409eff;
                }
            }

            /deep/ .nuxt-link-exact-active{
                background:#409eff;
                color:#fff!important;
            }
        }

        .message{
            height:36px;
            line-height:1;
            cursor:pointer;
            .el-icon-bell{
                margin-right:2px;
                font-size:18px;      
            }
        }

        .el-dropdown-link{
           margin-left:20px;

           &:hover{
               img{
                    border-color: #409eff;
               }
            }

           a{
               display:block;
           }

            img{
                width:32px;
                height:32px;
                vertical-align: middle;
                border:2px #fff solid;
                border-radius:50px;
            }
        }

        .account-link{
            font-size: 14px;
            margin-left:10px;
            color:#666;

            &:hover{
                color:#409eff;
                text-decoration: underline;
            }
        }
    } 
</style>