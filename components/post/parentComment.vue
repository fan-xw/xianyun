<template>
  <div class="subbox">
    <span>管理员</span><br />
    <parent v-if="parentData.parent" :parentData="parentData.parent" />
    {{ parentData.content }}
  </div>
</template>

<script>
export default {
  name: "parent",
  props: ["parentData"],
};
</script>

<style lang="less" scoped>
.subbox {
  margin: 3px;
  padding: 3px;
  border: 1px solid #e3e3e3;

  font-size: 14px;
  color: #888;
}
</style>