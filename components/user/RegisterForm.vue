<template>
  <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item">
                <el-input 
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item">
                <el-input 
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
  data () {
    return {
      form:{},
      rules:{}
    }
  },

  methods: {
    // 发送验证码
    handleSendCaptcha () {

    },

    // 实现注册事件
    handleRegSubmit () {

    }
  }
}
</script>

<style lang="less" scoped>

</style>