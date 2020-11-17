<template>
  <div class="comment">
    <p>评论</p>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
    };
  },
};
</script>

<style lang="less" scoped>
.comment {
  width: 700px;
  .upload-demo {
    margin-top: 20px;
  }
}
</style>