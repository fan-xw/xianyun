<template>
  <div class="commentTime">
    <item v-if="parent.parent" :parent="parent.parent"></item>
    <div class="recursion">
      <el-row :gutter="30" type="flex">
        <el-col :span="20"
          ><div class="grid-content bg-purple">
            <div>
              {{ parent.account.nickname }}
              {{ parent.updated_at | formatDate }}
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="10"
          ><div class="grid-content bg-purple">{{ parent.level }}</div></el-col
        >
      </el-row>
      <p style="font-size: 16px; margin: 10px 50px">{{ parent.content }}</p>
      <!-- 评论图片模块 -->
      <div class="comment_picture" v-if="(parent.ipcs = '')">
        <div class="demo-image__preview">
          <el-image style="width: 100px; height: 100px" :src="parent.ipcs">
          </el-image>
        </div>
      </div>
      <div class="reply">
        <el-row :gutter="20">
          <el-col :span="6" :offset="22"
            ><div class="grid-content bg-purple">回复</div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date.js";

export default {
  props: ["parent"],
  name: "item",
  // 转换时间戳
  filters: {
    formatDate(time) {
      //   time = time * 1000;
      let date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style lang="less" scoped>
.commentTime {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  .comment_picture {
    margin-left: 20px;
  }
}
</style>