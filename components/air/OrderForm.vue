<template>
   <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info" :model="{ users }" ref="contactUsersForm">
                <!-- 表单只有一个，这里的 div 可以跟随数组的长度进行遍历 -->
                <div class="member-info-item"
                     v-for="(user,index) in users"
                     :key="index">

                    <el-form-item label="乘机人类型" :rules="[
                                                        {
                                                             required:true,
                                                             message:'请填写乘机人姓名',
                                                             trigger:'blur'
                                                        }
                                                    ]"
                                                    :prop="`users[${index}].username`">
                        <el-input placeholder="请输入乘机人姓名" class="input-with-select" v-model="user.username" @focus="clearErrUers(`users[${index}].username`)">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                                <el-option label="儿童" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型" :rules="[
                                                        {
                                                           required:true,
                                                           message:'请填写乘机人证件号码',
                                                           trigger:'blur'
                                                        }
                                                   ]"
                                                   :prop="`users[${index}].id`">
                        <el-input placeholder="请输入证件号码"  class="input-with-select" v-model="user.id" @focus="clearErrUers(`users[${index}].id`)">
                            <el-select slot="prepend" value="1" placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                                <el-option label="护照" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <!-- v-model绑定Array类型的变量即可。el-checkbox 的 label属性是该 checkbox 对应的值， -->
            <el-checkbox-group v-model="insurances">
                <div class="insurance-item"
                     v-for="item in data.insurances"
                     :key="item.id">
                    <el-checkbox 
                    :label="item.id" 
                    border>
                    {{item.type}}: ￥{{item.price}} / 份 X {{users.length}} 最高赔付 {{item.compensation}}
                    </el-checkbox> 
                </div>
            </el-checkbox-group>
            <h2>发票</h2>
            <el-checkbox v-model="invoice">申请发票</el-checkbox>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="80px"
                         :model="{
                             contactName,
                             contactPhone,
                             captcha
                         }"
                         :rules="contactRules"
                         ref="contactForm">
                    <el-form-item label="姓名" prop="contactName">
                        <el-input placeholder="请输入姓名" v-model="contactName" @focus="clearErrorMsg('contactName')"></el-input>
                    </el-form-item>

                    <el-form-item label="手机" prop="contactPhone">
                        <el-input placeholder="请输入手机号码" v-model="contactPhone" @focus="clearErrorMsg('contactPhone')">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码" prop="captcha">
                        <el-input placeholder="请输入验证码" v-model="captcha" @focus="clearErrorMsg('captcha')"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" 
                           class="submit" 
                           @click="handleSubmit"
                           v-if="this.$store.state.userstore.userInfo.token">提交订单</el-button>
            </div>
            <div style="display: none;">
                {{totalPrice}}
            </div>
        </div>

        <!-- 放入登录页(登录和注册)的表单 -->
        <div class="container">
            <!-- 主要内容 -->
            <!-- 通过判断 token 的存在 判断显示按钮 还是显示登录框-->
            <el-row 
            type="flex" 
            justify="center" 
            align="middle" 
            class="main"
            v-if="!this.$store.state.userstore.userInfo.token">
    
                <div class="form-wrapper">
                    <!-- 表单头部tab -->
                    <el-row type="flex" justify="center" class="tabs">
                        <span :class="{active: currentTab === index}" 
                        v-for="(item, index) in ['登录','注册']"
                        :key="index" 
                        @click="handleChangeTab(index)">
                            {{item}}
                        </span>
                    </el-row>
    
                    <!-- 登录功能组件 -->
                    <LoginForm v-if="currentTab == 0"/>
    
                    <!-- 注册功能组件 -->
                    <RegisterForm v-if="currentTab == 1" @toLogin="currentTab = 0"/>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
// 1.引入登录组件
import LoginForm from '@/components/user/loginForm.vue'
// 2.引入注册组件
import RegisterForm from '@/components/user/RegisterForm.vue'
export default {
    props:['data'],
    components: {
      // 2.注册登录组件
      LoginForm,
      RegisterForm
    },
    data () {
        return {
            currentTab:0,
            // 乘机人应该是一个数组，里面的每个对象都是一个乘机人，如果想删除的话，只需要 push / splice
            users :[
                {
                    username:'范小威',
                    id:'412828199702063313'
                },
            ],
            insurances:[],
            contactName:'小威',
            contactPhone:'18336200155',
            captcha:'000000',
            invoice:false,
            contactRules:{
                contactName:[
                    {
                        required:true,
                        message:'请输入联系人姓名',
                        trigger:'blur'
                    }
                ],
                contactPhone:[
                    {
                        required:true,
                        message:'请输入手机号码',
                        trigger:'blur'
                    }
                ],
                captcha:[
                    {
                        required:true,
                        message:'请输入验证码',
                        trigger:'blur'
                    }
                ]
            }
        }
    },

    /*
    计算属性:依旧是属性，输出一个被使用的属性，如果没有用，是永远不会被执行的(主要作用:被调用)
            1.如果想要用计算属性，不需要渲染的计算属性替代watch监听器，可以走一个僻静
            2.我们先将计算属性渲染出来
            3.然后藏起来不让用户看见
    */

    computed: {
       totalPrice () {
           let res = 0
            // 1.机票价格
            res += this.data.base_price * this.users.length

            // 2.保险价格
            // 第一轮遍历:所有选中的id(当前北选中的保险 this.insurances),第二轮遍历:原来的保险总数据 this.data.insurances
            this.insurances.forEach(selectedId => {
                // 这轮遍历拿到的id需要到原来总的保险数据中查找出对应的价格
                // 所有保险数据在 this.data.insurances,通过遍历可以拿到每个保险的对象
                this.data.insurances.forEach(elementId => {
                    if (elementId.id == selectedId) {
                        res += elementId.price * this.users.length
                    }
                })
            })
            console.log(res);

            // 1.子传父,给发组件发送数据
            this.$emit('sendTotalPrice',res)
            return res
       }
    },

    // watch 默认不变化不触发
    // 解决方案一: 手动在创建时触发一次
    // created() {
    //     this.calcTotalPrice();
    // },

    /*
    😋😋分析：计算总金额:需要使用兄弟组件传值的方式 (OrderForm.vue --> order.vue --> OrderAside.vue)
           1.首先要监听表单 users 和 保险的变化，确保能够触发变动
           2.封装一个函数:每次变动重新算出最新价 (机票价/保险价/机建税)
           3.在监听器里面调用这个函数
    */ 
    // watch:{
    //     // users() {
    //     //     // 计算总价格
    //     //     console.log('乘机人变化了');
    //     //     this.calcTotalPrice()
    //     // },

    //     //方案二: 把 watch 改造成 页面一进来马上触发一次
    //     users: {
    //         handler () {
    //             console.log('乘机人变化了');
    //             this.calcTotalPrice()
    //         },
    //         immediate: true
    //     }, 

    //     insurances() {
    //         // 计算总价格
    //         console.log('保险变化了');
    //         this.calcTotalPrice()
    //     }
    // },

    methods: {
        // 切换tab栏时触发
        handleChangeTab(index) {
          // 点击tab栏进行切换
           this.currentTab = index;
        },
        // 移除乘机人表单项 的校验结果
        clearErrUers (users) {
            this.$refs.contactUsersForm.clearValidate(users)
        },
        // 清除 失焦后 再进入表单时的校验
        // clearValidate：移除表单项的校验结果。
        // 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果--Function(props: array | string) 
        clearErrorMsg(propName) {
            this.$refs.contactForm.clearValidate(propName)
        },
        
        // 计算总价格
        calcTotalPrice () {
            let res = 0
            // 1.机票价格
            res += this.data.base_price * this.users.length

            // 2.保险价格
            // 第一轮遍历:所有选中的id(当前北选中的保险 this.insurances),第二轮遍历:原来的保险总数据 this.data.insurances
            this.insurances.forEach(selectedId => {
                // 这轮遍历拿到的id需要到原来总的保险数据中查找出对应的价格
                // 所有保险数据在 this.data.insurances,通过遍历可以拿到每个保险的对象
                this.data.insurances.forEach(elementId => {
                    if (elementId.id == selectedId) {
                        res += elementId.price * this.users.length
                    }
                })
            })
            console.log(res);

            // 1.子传父,给发组件发送数据
            this.$emit('sendTotalPrice',res)
        },

        // 添加乘机人
        handleAddUsers(){
            this.users.push({
                username:'',
                id:''
            });
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            this.$axios({
                url: '/captchas',
                method: 'post',
                data: {
                    tel: this.contactPhone
                }
            }).then(res=>{
                console.log(res.data);
                if (res.data.code) {
                    this.$message.success('获取到验证码：'+res.data.code)
                }
            })
        },

        // 提交订单
        handleSubmit(){
            // console.log('提交请求');
            // console.log(this.users);
            // console.log(this.insurance);
            // console.log(this.contactName);
            // console.log(this.contactPhone);
            // console.log(this.captcha);

            const data = {
                users: this.users,
                insurances: this.insurances,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                invoice: this.invoice,
                seat_xid: this.$route.query.seat_xid,
                air: this.$route.query.id,
                captcha: this.captcha
            }

            this.$axios({
                method:'post',
                url:'/airorders',
                data,
                // 这里要注意: Bearer 后面一定要有空格
                headers:{
                    Authorization:'Bearer ' + this.$store.state.userstore.userInfo.token
                }
            }).then(res => {
                console.log(res.data);
                const {data, message} = res.data

                if (message == '订单提交成功') {
                    // this.$message.success('订单提交成功')
                    this.$message.success(res.data.message)
                    this.$router.push('/air/pay?id='+ data.id)
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:10px;
    }

    // 这里是每个乘机人的外容器 
    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }

    .main{
        height: 100%;
        margin:0 auto;
        position: relative;
        
        .form-wrapper{
            width:400px;
            margin:0 auto;
            background:#fff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            overflow:hidden;
            
            .tabs{
                span{
                    display: block;
                    width:50%;
                    height: 50px;
                    box-sizing: border-box;
                    border-top:2px #eee solid;
                    background:#eee;
                    line-height: 48px;
                    text-align: center;
                    cursor: pointer;
                    color:#666;

                    &.active{
                        color:orange;
                        border-top-color: orange;
                        background:#fff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>