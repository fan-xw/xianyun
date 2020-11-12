<template>
   <!-- model:表单数据对象
        rules:表单验证规则 -->
   <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">
        <!-- 3.Form-Item中的prop属性设置需要校验的字段名 -->
        <el-form-item class="form-item" prop="username">
            <!-- 1.修改data的form数据，然后使用v-model绑定到对应的表单字段。 -->
            <el-input 
            placeholder="用户名/手机" v-model="form.username" @focus="hideErrMsg('username')">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password"
            @focus="hideErrMsg('password')">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
import { login } from '@/apis/user.js'
export default {
    data () {
        return {
            // 表单数据
            form: {
                username:'13800138000',
                password:'123456'
            },

            // 表单规则
            // 2.通过rules属性传入验证规则
            rules: {
                username: [
                    { 
                        required: true, 
                        message: '请输入用户名', 
                        trigger: 'blur' 
                    },
                ],
                password: [
                    { 
                        required: true, 
                        message: '请输入密码', 
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        message: "密码不能小于六位",
                        trigger: "blur",
                    },
                ],
            },
        }
    },

    methods: {
        // 💐💐💐第一种方案：

        // 4.进行登录验证
        // handleLoginSubmit () {
        //     // 发送登录请求前，需要一次性校检整个表格
        //     // 1.先拿到表格对象
        //     // 2.使用Elemnet-ui的函数校检表格
        //     // 3.合法输入则发送请求
        //     // this.$refs.form.validate((isValid,obj) => {}),可以是回调，也可以作为 promise

        //     /* validate:对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
        //        并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise, Function(callback: Function(boolean, object))*/
        //     this.$refs.form.validate()
        //     // .then 它的作用是为 Promise 实例添加状态改变时的回调函数
        //     .then((isValid) => {
        //         if (isValid) {
        //             console.log('应该发送请求');
        //             console.log(this.form);
        //             this.$axios({
        //                 url:'/accounts/login',
        //                 method:'post',
        //                 data:this.form
        //             }).then(res => {
        //                 console.log(res.data);
        //                 if (res.data.token) {
        //                     this.$message.success('登录成功')
        //                 }
        //             })
        //         }    
        //     })
        //     // Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
        //     .catch((err) => {
        //         console.log('不可以发送请求');
        //         console.log(err);
        //     })
        // },

        // 💐💐💐第二种方案： 

        // async handleLoginSubmit () {
        //     const isValid = await this.$refs.form.validate()
        //      if (isValid) {
                
        //         const res = await this.$axios({
        //             url:'/accounts/login',
        //             method:'post',
        //             data:this.form
        //         })

        //         if (res.data.token) {
        //             this.$message.success('登录成功')
        //         }
        //      } 
        // }

        // 💐💐💐第三种方案:采用封装的axios
        async handleLoginSubmit () {
            const isValid = await this.$refs.form.validate().catch((err) => {
                
            })
             if (isValid) {
                
                const res = await login(this.form).catch((err) => {
                     this.$message.error('用户名或密码错误')
                })
                console.log(res);

                if (res && res.status == 200) {
                    this.$message.success('登录成功');
                    // 🌾🌾🌾1.实现登录，并保存数据到store的state中 使用 commit 方法
                    this.$store.commit('userstore/setUserInfo',res.data)
                    // 登录成功，跳转到首页
                    this.$router.push({path:'/'})
                }
             } 
        },

        // 🤳🤳🤳清理表单项错误信息
        // 当输入框聚焦需要清理当前输入项的错误提示：优化体验
        // 1.拿到当前 form 对象
        // 2.调用里面的 clearValidate 函数
        // 3.传入希望清理的 prop
        hideErrMsg (propname) {
        /*1.clearValidate:移除表单项的校验结果。
          2.传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
          3.Function(props: array | string)*/
            this.$refs.form.clearValidate(propname)
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>