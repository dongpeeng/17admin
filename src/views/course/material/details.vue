<template>
  <div id="course-details">
    <div id="course-header">
      <el-page-header @back="$router.back()" content="资料详情"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form class="section-wrapper" label-width="100px" size="medium">
      <el-form-item label="资料名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="资料地址">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="uploadFile"
          name="uploadFile"
          multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">文件大小不能超过100M</div>
        </el-upload>
        <el-input v-model="data.url" readonly></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="id === -1" type="primary" plain size="mini" @click="onSubmit">保存</el-button>
        <el-button v-else type="primary" plain size="mini" @click="onUppdate">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getPathList } from '@/api/addCourse'
import { getUpdate } from '@/api/update'
import { getCourseGround } from '@/api/courseGround'

import { getById, add, update } from '@/api/material'
import { sep } from 'path';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      listLoading : true,      
      id: this.$route.params.id * 1,
      courseId: this.$route.params.courseId * 1,
      uploadUrl: BASE_API + 'path/uploadFile',
      data: {
        name: '',
        url: '',
      }
    }
  },
  methods: {
    uploadFile(res) {
      if (res.errno == 101) {
        this.data.url = res.data.relativePath;
      } else {
        this.$message.error(res.errmsg);
      }
    },
    /**
     * 提交
     */
    onSubmit() {
      add({
        name: this.data.name,
        url: this.data.url,
        courseId: this.courseId,
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(res => {
            this.$router.push(`/course/material/list/${this.courseId}`)
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
      
    },
    /**
     * 获取资料详情
     */
    getDetails() {
      getById({
        id: this.id * 1
      }).then( res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.data = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    /**
     * 更新
     */
    onUppdate() {
      this.listLoading = true;
      update({
        name: this.data.name,
        url: this.data.url,
        courseId: this.courseId,
        id: this.id,
      }).then(res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          setTimeout(res => {
            this.$router.push(`/course/material/list/${this.courseId}`)
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
        console.log('success')
      })
    }

  },
  created() {
    /**
     * 如果id是-1表示创建课程
     * 如果id不是-1表示编辑课程
     */
    if(this.id * 1 !== -1){
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