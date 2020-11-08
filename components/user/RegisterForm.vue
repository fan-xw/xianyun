<template>
  <el-form :model="form" 
           ref="form" 
           :rules="rules" 
           class="form">
            <el-form-item class="form-item" prop="username">
                <el-input placeholder="用户名手机" v-model="form.username" @focus="hideErrMsg('username')">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input placeholder="验证码" v-model="form.captcha" @focus="hideErrMsg('captcha')">
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input placeholder="你的昵称" v-model="form.nickname" @focus="hideErrMsg('nickname')">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input placeholder="密码" 
                          type="password"
                          v-model="form.password"
                          @focus="hideErrMsg('password')">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input placeholder="确认密码" type="password" v-model="form.checkPassword" @focus="hideErrMsg('checkPassword')">
                </el-input>
            </el-form-item>

            <el-button class="submit" type="primary" @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
// 🌞🌞🌞1.引入验证码获取api   🍰🍰🍰1.引入注册的axios请求
import { getCaptcha, register } from '@/apis/user.js'
export default {
  data () {
    // 由于校验函数只是在 data 使用,没必要写在methods方法里面
    // 校检确认密码
    const validateCheckPass = (rule,value,callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value != this.form.password) {
        callback(new Error('两次输入的密码请保持一致'))
      } else {
        callback()
      }
    }

    return {
      // 表单数据
      form: {
        username: "",   // 登录用户名/手机
        password: "",    // 登录密码
        checkPassword: "", // 确认密码
        nickname: "",	// 昵称
        captcha: "",		// 手机验证码
      },
      // 🌱🌱1.验证规则
      rules:{
        username: [
          {
            required:true,
            message:'请输入用户名/手机号码',
            trigger:'blur'
          }
        ],   
        password: [
          {
            required:true,
            message:'请输入密码',
            trigger:'blur'
          },
          {
              min: 6,
              message: "密码不能小于六位",
              trigger: "blur",
          }
        ],  
        // 确认密码的规则验证
        checkPassword:[
          {
            // 这里的校验并非默认自带的校验方式
            // 而是需要自定义,所以 判断标准和提示语都要自己写
            // 给一个函数作为 valdator 即可
            validator:validateCheckPass,
            trigger:'blur'
          }
        ],
        nickname: [
          {
            required:true,
            message:'请输入昵称',
            trigger:'blur'
          }
        ],
        captcha: [
          {
            required:true,
            message:'请输入手机验证码',
            trigger:'blur'
          }
        ],	
      }
    }
  },

  methods: {
    // 🌞🌞🌞2.发送验证码
    handleSendCaptcha () {
      // 使用正则规则:规定手机号第一位是1,剩下的九位数字在 3-9 中取
      const regexp = /^1[3456789]\d{9}$/
      // RegExp.prototype.test()方法为指定正则表达式和指定字符串执行一次匹配，返回true或false
      if (!regexp.test(this.form.username)) {
        return this.$message.error('请输入正确手机号')
      }
      // 🌞🌞🌞3.验证码 api 请求
      getCaptcha(this.form.username).then(res=>{
        console.log(res.data);
        if (res.data.code) {
          this.$message.success('成功获取验证码:' + res.data.code)
        }
      })  
    },

    // 🍰🍰🍰2.实现注册事件
    handleRegSubmit () {

      // 🍰🍰🍰3.全局校检表单是否填写完毕，完毕后再发送
      this.$refs.form.validate().then(isValid => {
        if (isValid) {

          // 🍰🍰🍰4.拿取data数据
          // const data = {
          //   username:this.form.username,
          //   nickname:this.form.nickname,
          //   captcha:this.form.captcha,
          //   password:this.form.password
          // }

          // 另外一种方案:
          // 这里用 ... 剩余运算语法，拿出剩余的数据
          const { checkPassword, ...data} = this.form
  
          register(data).then(res => {
            console.log(res.data);
            if (res) {
              this.$store.commit('userstore/setUserInfo',res.data)

              // 第一种操作可以是直接完成登录跳转到主页
              // this.$message.success('注册成功')
              // this.$router.push('/')

              // 第二种操作可以是跳转登录表单进行登录
              // 因为这个注册表单,跟登录表单同属于 login.vue 页面的子组件, 自己没法切换(相当于兄弟之间传值)需要先经过父组件
              this.$message.success('注册成功')
              // 子组件发出事件
              this.$emit('toLogin')
            }
          })
        }
      })
    },
    
    // 清理表单项错误信息：当输入框聚焦需要清理当前输入项的错误提示:优化体验
    // 1.拿到当前 form 对象
    // 2.调用里面的 clearValidate 函数
    // 3.传入希望清理的 prop
    hideErrMsg (propname) {
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