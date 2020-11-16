<template>
  <div class="post">
    {{content}}
    <client-only placeholder="Loading...">
      <!-- vue-editor 组件只会在客户端被渲染 -->
      <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
    </client-only>
    
  </div>
</template>

<script>
export default {
     data() {
       return {
         content:'',
         customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" },{ list: "bullet" }],["image", "code-block"]]
       }
     },
}
</script>

<style lang="less" scoped>

</style>