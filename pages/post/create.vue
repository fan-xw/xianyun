<template>
  <div class="contianer">
    <!-- 发表新攻略列 -->
    <div class="details" v-loading="isLoading">
      <h2>发表新攻略</h2>
      <p class="create-des">分享你的个人游记，让更多人看到哦</p>
      <el-form ref="form" :model="form" label-position="left">
        <!-- 标题输入框 -->
        <el-form-item>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <el-form-item>
          <client-only>
            <vue-editor
              v-model="form.content"
              :useCustomImageHandler="true"
              @image-added="imgUpload"
              :editor-toolbar="customToolbar"
            />
          </client-only>
        </el-form-item>
        <!-- 选择城市 -->
        <el-form-item class="selectcity" label="选择城市" label-width="70px">
          <el-col :span="7">
            <el-autocomplete
              v-model="form.city"
              :fetch-suggestions="queryCitySearch"
              :trigger-on-focus="false"
              @select="handleCity"
              :highlight-first-item="true"
              placeholder="请选择游玩城市"
            ></el-autocomplete>
          </el-col>
        </el-form-item>
        <!-- 发布或者保存草稿 -->
        <el-form-item>
          <el-button type="primary" size="small" @click="submitAtricle"
            >发布</el-button
          >
          <span class="or">或者</span>
          <span class="savedrafts">
            <a href="#" @click.prevent.stop="saveDrafts">保存到草稿</a>
          </span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 草稿箱 -->
    <div class="draft">
      <div class="draftcon">
        <h4>草稿箱（{{ draftItem.length }}）</h4>
        <!-- 草稿列表 -->
        <div class="draft-item" v-for="(item, index) of draftItem" :key="index">
          <p class="draft-title">
            <a href="#" @click.prevent="secDraft(index)">{{ item.title }}</a>
          </p>
          <p class="draft-info">
            <span class="time">{{ item.time | formatDate }}</span>
            <span class="handler">
              <i class="el-icon-edit" @click="secDraft(index)"></i>
              <i class="el-icon-delete" @click="delDraft(index)"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      form: {
        title: "",
        content: "",
        city: "",
      },
      customToolbar: [
        ["bold", "italic", "underline", "strike"], //加粗 斜体 下划线
        [{ header: 1 }, { header: 2 }], //h1 h2 标题
        ["image"], //图片
      ],
      // 草稿列表
      draftItem: [],
    };
  },
  filters: {
    formatDate(val) {
      let arr = val
        .toLocaleDateString()
        .split("/")
        .map((v) => {
          if (v.length == 1) {
            return (v = "0" + v);
          }
          return v;
        });
      return arr.join("-");
    },
  },

  methods: {
    imgUpload(file, Editor, cursorLocation, resetUploader) {
      // 1.上传图片
      let formData = new FormData();
      formData.append("files", file);
      // console.log("上传图片");
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
      })
        .then((result) => {
          // console.log(result);
          let url = result.data[0].url; // Get url from response
          // 拿到图片地址
          // 要放入富文本框当中
          Editor.insertEmbed(
            cursorLocation,
            "image",
            this.$axios.defaults.baseURL + url
          );
          // 将图片插入到富文本框之后还要重置上传功能
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击发布文章
    submitAtricle() {
      // 验证表单数据
      const rules = {
        title: {
          value: this.form.title,
          message: "文章标题不能为空!",
        },
        content: {
          value: this.form.content,
          message: "文章内容不能为空!",
        },
        city: {
          value: this.form.city,
          message: "选择城市不能为空!",
        },
      };
      let vaild = true; //验证结果
      Object.keys(rules).forEach((v) => {
        if (!vaild) return;
        if (!rules[v].value) {
          vaild = false;
          this.$confirm(rules[v].message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning",
          });
        }
      });
      if (this.$store.state.userstore.userInfo.token) {
        this.$axios({
          method: "POST",
          url: "/posts",
          data: this.form,
          headers: {
            Authorization:
              "Bearer " + this.$store.state.userstore.userInfo.token,
          },
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.$message.success("发布成功");
            this.$router.push("/post");
          }
        });
      }
    },

    // 输入城市时候触发的方法
    async queryCitySearch(value, showList) {
      const cityList = await this.searchCity(value);
      if (cityList.length > 0) {
        this.id = cityList[0].id;
      }
      showList(cityList);
    },
    // 获取城市接口
    searchCity(value) {
      return new Promise((resolve, reject) => {
        if (!value) {
          return resolve([]);
        }
        this.$axios({
          url: "/cities",
          // url: "/airs/city",
          params: {
            name: value,
          },
        }).then((res) => {
          console.log(res);
          const { data } = res.data;
          // 下拉列表要有value字段
          const arr = data.map((value) => {
            return {
              ...value,
              value: value.name,
            };
          });
          resolve(arr);
        });
      });
    },
    // 初始化草稿箱方法
    showDraft() {
      let draftList = JSON.parse(localStorage.getItem("draftList")) || [];
      this.draftItem = [];
      draftList.forEach((v) => {
        this.draftItem.push({ title: v.title, time: new Date() });
      });
    },
    // 保存草稿
    saveDrafts() {
      // 判断是否写了标题
      if (this.form.title.trim() == "") {
        this.$message({
          message: "请添加一个标题~",
          type: "warning",
        });
        return;
      }
      // 判断当前草稿箱长度是否超过10 超过了就提醒用户
      if (this.draftItem.length >= 10) {
        this.$message({
          message: "最多只能保存10份草稿哦~",
          type: "warning",
        });
        return;
      }
      // 1.看看本地草稿中有没有有就从本地取
      let draftList = JSON.parse(localStorage.getItem("draftList")) || [];
      // 2.遍历本地的草稿，看看是否保存的标题在本地草稿中存在
      if (JSON.parse(localStorage.getItem("draftList"))) {
        JSON.parse(localStorage.getItem("draftList")).forEach((item, index) => {
          // 2.1如果存在就将这个删除
          if (item.title == this.form.title) {
            draftList.splice(index, 1);
          }
        });
      }
      // 3.再将当前写的文章添加到本地草稿列表
      draftList.push(this.form);
      // 4.存储到本地
      localStorage.setItem("draftList", JSON.stringify(draftList));
      //5.渲染草稿箱列表
      this.draftItem = [];
      draftList.forEach((item) => {
        this.draftItem.push({ title: item.title, time: new Date() });
      });

      this.form.title = "";
      this.form.content = "";
      this.form.city = "";
      this.$message({ message: "保存成功", type: "success" });
    },
    // 选择草稿
    secDraft(index) {
      let drafts = JSON.parse(localStorage.getItem("draftList")).slice(
        index,
        index + 1
      );
      this.form = drafts[0];
    },
    // 删除草稿
    delDraft(index) {
      this.$confirm("确定删除该草稿吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let draftList = JSON.parse(localStorage.getItem("draftList"));
          draftList.splice(index, 1);
          localStorage.setItem("draftList", JSON.stringify(draftList));
          //重新渲染草稿箱列表
          this.showDraft();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },

    handleCity() {},
  },
};
</script>

<style lang="less" scoped>
.contianer {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  min-height: 300px;
  margin: 20px auto 0px;
  // 发表攻略详细样式
  .details {
    width: 750px;
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .create-des {
      font-size: 12px;
      color: #999;
      margin-bottom: 10px;
    }
    .or {
      margin-left: 10px;
    }
    .selectcity {
      margin-top: 80px;
    }
    .savedrafts {
      a {
        color: orange;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    // 富文本编辑器样式
    .quillWrapper {
      height: 350px;
    }
  }
  // 草稿箱样式
  .draft {
    width: 225px;
    box-sizing: border-box;
    .draftcon {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      h4 {
        margin-bottom: 10px;
        font-weight: 400;
        color: #666;
        font-size: 16px;
      }
      .draft-item {
        margin-bottom: 10px;
        font-size: 14px;
        .draft-title {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          a {
            &:hover {
              color: orange;
              text-decoration: underline;
            }
          }
        }
        .draft-info {
          display: flex;
          justify-content: space-between;
          .time {
            color: #999;
          }
          .handler {
            i {
              cursor: pointer;
              font-size: 16px;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>