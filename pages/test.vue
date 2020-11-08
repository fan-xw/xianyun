<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      user: {
              username: '13444444444',
              password: '2948041'
            }  
    }
  },
  methods:{
    login () {
      this.$axios({
                method: 'post',
                url: '/accounts/login',
                data: {
                    username: '13444444444',
                    password: '2948041'
                }
      }).then(res=>{
          console.log(res.data);
          // 添加 .catch(() => {}) 把错误给捕获掉
      }).catch(()=>{})
    }

  }
}
</script>

<style>

</style>