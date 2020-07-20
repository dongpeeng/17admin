<template>
  <div id="course-details">
    <div id="course-header">
      <el-page-header @back="$router.back()" content="章信息"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form ref="form" :model="data" label-width="100px" size="medium">
      <el-form-item label="名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input type="textarea" v-model="data.describe"></el-input>
      </el-form-item>
      <el-form-item v-if="chapId===-1">
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="Cancel()">取消</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="primary" @click="onUpdate">更新</el-button>
        <el-button @click="Cancel()">取消</el-button>
      </el-form-item>
    </el-form> 
  </div>
</template>

<script>

import { getChapterDetails, addChapter, updateChapter } from '@/api/chapterDetails'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      listLoading: true,
      chapId: this.$route.params.chapId*1,
      courseId: this.$route.params.courseId,
      data: {
        title: '',
        describe: ''
      }
    }
  },
  methods: {
    goSection() {
      this.$router.push(`/course/section/${this.chapId}`)
    },
    onSubmit() {
      console.log('submit!');
      addChapter({
        courseId: this.courseId,
        title: this.data.title,
        describe: this.data.describe
      }).then(res => {
        this.listLoading = false
        if (res.errno * 1 === 101) {
          this.$router.push(`/course/chapter/${this.courseId}`)
        } else {
          this.$message.error(res.errmsg);
        }
      })
      
    },
    /**
     * 获取章详情
     */
    getDetails() {
      getChapterDetails({
        chapId: this.chapId
      }).then(res => {
        this.listLoading = false
        if (res.errno * 1 === 101) {
          console.log(res)
          this.data = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    /**
     * 更新章信息
     */
    onUpdate() {
      this.listLoading = true;
      updateChapter({
        courseId: this.courseId,
        title: this.data.title,
        describe: this.data.describe,
        chapId: this.chapId
      }).then(res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push(`/course/chapter/${this.courseId}`)
          }, 1000)
        } else {
          this.$message.error(res.errmsg);

        }
      })
    },
    Cancel() {
      this.$router.go(-1);
    }
  },
  created() {

    /**
     * 如果id是-1表示创建章
     * 如果id不是-1表示编辑章
     */
     if(this.chapId * 1 == -1 ) {
        // this.getDetails()
      }
     if(this.chapId * 1 !== -1){
       this.getDetails()

     } 
  }
}
</script>

<style lang="scss" scoped>
  #course-details{
    padding: 20px;
    
    #course-header{
      .editor-btn{
        float: right;
      }
    }
  }
</style>