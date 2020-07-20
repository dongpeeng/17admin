<template>
  <div id="program-details">
    <el-page-header @back="$router.back()" content="批改编程题"></el-page-header>
    <el-divider></el-divider>

    <el-card class="box-card">
      <div slot="header">
        <span>题目</span>
      </div>
      <div class="text item" v-html="title"></div>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>描述</span>
      </div>
      <div class="text item" v-html="content"></div>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>学生答案</span>
      </div>
      <div class="text item" >
        <el-tabs v-model="activeName">
          <el-tab-pane label="html" name="html">
            <div v-html="htmlAnswer"></div>
          </el-tab-pane>
          <el-tab-pane label="css" name="css">
            <div v-html="cssAnswer"></div>
          </el-tab-pane>
          <el-tab-pane label="js" name="js">
            <div v-html="jsAnswer"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header">
        <span>批注</span>
      </div>

      <div class="text item">
        <quill-editor ref="text" v-model="notation" class="myQuillEditor" :options="editorOption" />
      </div>
    </el-card>

    <div class="program-footer">
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </div>

  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { getDetails, update } from '@/api/program'
export default {
  data() {
    return {
      listLoading: true,
      umcId: this.$route.params.id,
      tag: this.$route.params.tag,
      notation: '',
      title: '',
      htmlAnswer: '',
      cssAnswer: '',
      jsAnswer: '',
      content: '',
      editorOption: {
        placeholder: '请输入批注信息',
      },
      activeName: 'html'
    }
  },
  components: {
    quillEditor
  },
  computed: {
  },
  methods: {
    // 提交
    submit() {
      this.listLoading = true;
      update({
        umcId: this.umcId,
        notation: this.notation,
        tag: this.tag
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          this.$message({
              message: '批注成功',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/program/index')
            }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    getData(data) {
      this.listLoading = true
      
      getDetails({
        umcId: this.umcId,
      }).then(res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.title = res.data.title || '';
          this.htmlAnswer = res.data.htmlAnswer || '';
          this.cssAnswer = res.data.cssAnswer || '';
          this.jsAnswer = res.data.jsAnswer || '';
          this.notation = res.data.notation || '';
          this.content = res.data.content || '';
        } else {
          this.$message.error(res.errmsg);
        }
      })
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #program-details{
    padding: 20px;
    
    .box-card{
      margin-bottom: 30px;
    }
    .program-footer{
      text-align: right;
    }
  }
</style>