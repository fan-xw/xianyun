<template>
  <div>
    <button @click="submitLogin">登录</button>
  </div>
</template>

<script>
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
       
    }
  },
  methods:{
    // login () {
    //   this.$axios({
    //             method: 'post',
    //             url: '/accounts/login',
    //             data: {
    //                 username: '13444444444',
    //                 password: '2948041'
    //             }
    //   }).then(res=>{
    //       console.log(res.data);
    //       // 添加 .catch(() => {}) 把错误给捕获掉
    //   }).catch(()=>{})
    // }
    submitLogin () {
      login({
        username:'12345678765432',
        password:'234654543643'
      })
    }

  }
}
</script>

<style>

</style>