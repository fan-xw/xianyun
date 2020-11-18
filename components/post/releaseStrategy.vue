<template>
  <div class="strategy">
    <!-- 左边模块 -->
    <div class="left">
      <h2>发表新攻略</h2>
      <p>分享你的个人游记，让更多人看到哦！</p>
      <!-- 标题输入框 -->
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="title"
            placeholder="请输入标题"
            class="input"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 富文本框 -->
      <client-only
        ><VueEditor
          v-model="content"
          :editorToolbar="customToolbar"
          :config="config"
          class="editor"
      /></client-only>
      <!-- 搜索城市 -->
      <el-form :inline="true">
        <el-form-item label="选择城市">
          <el-input
            v-model="city"
            placeholder="请搜索游玩城市"
            :fetch-suggestions="querySearch"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 发布按钮 -->
      <el-row>
        <el-button type="primary" size="small" @click="handlePublish"
          >发布</el-button
        >
        或者
        <el-button type="text" style="color: #ffb900">保存到草稿</el-button>
      </el-row>
    </div>
    <!-- 草稿箱 -->
    <div class="drafts">
      <h2>草稿箱(0)</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      title: "",
      city: "",
      cities: [],
      // 配置富文本框
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: "1" }, { header: "2" }],
        ["image"],
      ],
    };
  },
  methods: {
    // 发布按钮
    // 判定输入框内容是否为空 提示用户
    handlePublish() {
      if (this.title.trim() === "") {
        this.$message.error("标题不能为空");
        return;
      } else if (this.city.trim() === "") {
        this.$message.error("游玩城市不能为空");
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.strategy {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .left {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .input {
      width: 750px;
    }
    .editor {
      margin-bottom: 20px;
    }
  }

  .drafts {
    width: 200px;
    border: 1px solid #ddd;
    padding: 10px;
    height: 31.6px;
    h2 {
      margin-bottom: 10px;
      color: #666;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>