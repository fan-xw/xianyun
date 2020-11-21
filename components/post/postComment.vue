<template>
  <div class="comment">
    <!-- 评论，分享图标模块 -->
    <div class="icon">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="5"
          ><div class="grid-content bg-purple-light">
            <el-tooltip
              class="item"
              effect="dark"
              content="评论"
              placement="top"
            >
              <span @click="clickOutline"><i class="el-icon-edit"></i></span>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分享"
              placement="top"
            >
              <span @click="open3"><i class="el-icon-edit-outline"></i></span>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 评论模块 -->
    <div class="postComment">
      <span>评论</span>
      <div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <!-- 上传图片组件 -->
        <div class="picture">
          <el-row :gutter="24" type="flex">
            <el-upload
              :action="this.$axios.defaults.baseURL + '/upload'"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
            <el-col :span="6" :offset="14"
              ><div class="grid-content bg-purple">
                <el-button type="primary" @click="submitReply">提交</el-button>
              </div></el-col
            >
          </el-row>
        </div>
      </div>

      <!-- 递归组件模块 -->
      <div class="recursion" v-for="(item, index) in commentList" :key="index">
        <el-row :gutter="30" type="flex">
          <el-col :span="20"
            ><div class="grid-content bg-purple">
              <div>
                <ul>
                  <li>
                    <img
                      :src="
                        $axios.defaults.baseURL + item.account.defaultAvatar
                      "
                      alt=""
                      style="width: 12px"
                    />
                  </li>
                  <li>{{ item.account.nickname }}</li>
                  <li>{{ item.updated_at | formatDate }}</li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="6" :offset="10"
            ><div class="grid-content bg-purple">{{ item.level }}</div></el-col
          >
        </el-row>
        <p style="font-size: 16px; margin: 10px 50px">{{ item.content }}</p>
        <!-- 评论图片模块 -->
        <div class="comment_picture">
          <div class="demo-image__preview">
            <el-image style="width: 100px; height: 100px" :src="item.ipcs">
            </el-image>
          </div>
        </div>
        <!-- 回复按钮 -->
        <div class="reply">
          <el-row :gutter="20">
            <el-col :span="6" :offset="22"
              ><div class="grid-content bg-purple">回复</div></el-col
            >
          </el-row>
        </div>
        <commentsTime v-if="item.parent" :parent="item.parent" />
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageList.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date.js";
import commentsTime from "@/components/post/commentsTime.vue";
export default {
  components: {
    commentsTime,
  },
  data() {
    return {
      textarea: "",
      pics: [],
      img: [],
      commentList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      pageList: {}, //翻页数据
      currentPage: 1,
      //默认每页显示2条
      pageSize: 2,
      //当前页码的下标
      pageIndex: 1,
    };
  },
  // 转换时间戳
  filters: {
    formatDate(time) {
      //   time = time * 1000;
      let date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  mounted() {
    this.reply();
    // this.$axios({
    //   url: "/posts/comments",
    //   params: {
    //     _limit: 10,
    //   },
    // }).then((res) => {
    //   console.log(res.data.data);
    //   this.commentsList = res.data.data;
    // });
  },
  methods: {
    // 封装获取评论函数
    reply() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _limit: this.pageSize,
          _start: (this.pageIndex - 1) * this.pageSize,
        },
      }).then((res) => {
        console.log("这里是评论", res.data);
        this.pageList = res.data;
        this.commentList = res.data.data;
      });
    },
    handleSizeChange(newPageSize) {
      this.pageSize = newPageSize;
      console.log("1", this.pageSize);
      this.pageIndex = 1;
      this.reply();
    },
    handleCurrentChange(newPageIndex) {
      this.pageIndex = newPageIndex;
      console.log("2");
      this.reply();
    },
    //封装获取评论函数

    //点击评论文章，清除回复id
    clickOutline() {
      this.closeReply();
    },
    //清理回复评论数据
    closeReply() {
      this.$store.commit("user/closeReply");
      //就让输入框高亮，输入框绑定 ref='input'属性拿到输入框
      this.$refs.input.focus();
    },
    submitReply() {
      //判断搜索为空或有空格时
      if (
        this.textarea.replace(/[]/g, "").length == 0 &&
        this.pics.length == 0
      ) {
        //防止弹出多个提示框
        this.$message.closeAll();
        this.$message.warning("请输入评论内容或者图片");
        return;
      }
      //data 是下面发送请求需要的参数，用一个对象打包参数
      let data = {
        content: this.textarea,
        post: this.$route.query.id,
        pics: this.pics,
      };
      // 判断 reply.follow 有数据,就将回复id的参数 follow 添加到 data 对象里面
      if (this.$store.state.user.reply.follow) {
        date.follow = this.$$store.state.user.reply.follow;
      }
      console.log("评论内容：", data);
    },
    //点击分享提示未开通分享功能
    open3() {
      this.$message(
        {
          message: "暂时还没有开通分享功能",
          type: "warning",
        },
        2000
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  .icon {
    font-size: 40px;
    margin-bottom: 20px;
    span > i {
      color: orange;
      padding-left: 10px;
    }
  }
  .postComment {
    font-size: 18px;

    span {
      display: block;
      margin-bottom: 20px;
    }
    .picture {
      margin-top: 10px;
    }
  }
  .recursion {
    margin-top: 30px;
    width: 100%;

    border: 1px solid #ccc;
    font-size: 12px;
    padding: 20px;
    margin-bottom: 20px;

    ul > li {
      float: left;
    }
    .comment_picture {
      width: 100px;
      height: 100px;
      border: 2px dotted #ccc;
      margin-left: 20px;
    }
  }
}
</style>