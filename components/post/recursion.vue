<template>
  <div class="recursion">
    <div class="mianbox">
      <span>管理员</span><br />
      <parentComment
        v-if="commentData.parent"
        :parentData="commentData.parent"
      />
      {{ commentData.content }}
    </div>
  </div>
</template>

<script>
import parentComment from "@/components/post/parentComment.vue";
export default {
  components: {
    parentComment,
  },
  props: ["commentData"],
};
</script>

<style lang="less" scoped>
.mianbox {
  width: 700px;
  border: 1px solid #eee;

  margin: 10px;
  padding: 10px;
  span {
    font-size: 12px;
  }
}
</style>