<template>
  <div id="course-details">
    <div id="course-header">
      <el-page-header @back="$router.back()" content="节信息"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form class="section-wrapper" label-width="100px" size="medium">
      <el-form-item label="节名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="节简介">
        <el-input v-model="data.describe"></el-input>
      </el-form-item>
      <el-form-item label="节时长">
        <el-input v-model="data.duration"></el-input>
      </el-form-item>
      <el-form-item label="视频地址">
        <el-input v-model="data.courseUrl"></el-input>
      </el-form-item>
      <el-form-item label="选择教师">
        <el-select v-model="data.teaId" placeholder="请选择授课教师">
          <el-option v-for="(item, index) in teacherList" :key="index" :label="item.nickName" :value="item.teaId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="secId === -1" type="primary" plain size="mini" @click="onSubmit">保存</el-button>
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

import { getTeacherList, addSection, getSectionDetails, addSkill, updateSkill , updateSection} from '@/api/sectionDetails'
import { sep } from 'path';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      listLoading : true,      
      secId: this.$route.params.secId * 1,
      chapId: this.$route.params.chapterId * 1,
      data: {
        title: '',
        describe: '',
        duration: '',
        teaId: '',
        courseUrl: '',
        status: 0,
      },
      teacherList: []
    }
  },
  methods: {
    goChapter() {
      // this.$router.push('/course/chapter')
    },
    /**
     * 提交
     */
    onSubmit() {
      addSection({
        title: this.data.title,
        describe: this.data.describe,
        chapId: this.chapId,
        duration: this.data.duration,
        teaId: this.data.teaId,
        courseUrl: this.data.courseUrl
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(res => {
            // this.$router.push(`/course/section/${this.chapId}`)
            this.$router.back();
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
        console.log('success')
      })
      
    },
    getTeacherList(){
      getTeacherList().then((res)=>{
       console.log(res)
       this.teacherList = res.data.teacherList;
     })
    },

    /**
     * 获取章详情
     */
    getDetails() {
      getSectionDetails({
        secId: this.secId * 1
      }).then( res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.data = res.data.section
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    /**
     * 绑定提相关 请求题库系统 
     */
    addSkill() {
      // console.log(111)
      if(this.data.status) {
        this.listLoading = true
        addSkill({
          qtitle: this.data.title
        }).then(res => {
          if (res.errno * 1 === 101) {
            this.updateSection()
          } else {
            this.listLoading = false
            this.$message.error(res.errmsg);
          }
        }) 
      }
    },
    // 
    updateSection() {
      updateSkill({
        secId: this.secId,
        status: this.data.status * 1
      }).then( res => {
        this.listLoading = false
        if (res.errno * 1 === 101) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(res => {
            // this.$router.push(`/course/section/${this.chapId}`)
            this.$router.go(-1)
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    /**
     * 更新节
     */
    onUppdate() {
      this.listLoading = true;
      updateSection({
        title: this.data.title,
        describe: this.data.describe,
        chapId: this.chapId,
        duration: this.data.duration,
        teaId: this.data.teaId,
        courseUrl: this.data.courseUrl,
        secId: this.secId
      }).then(res => {
        this.listLoading = false;
        if(res.errno * 1 === 101) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          setTimeout(res => {
            // this.$router.push(`/course/section/${this.chapId}`)
            this.$router.back()
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
        console.log('success')
      })
    }

  },
  created() {
    this.getTeacherList()

    /**
     * 如果id是-1表示创建课程
     * 如果id不是-1表示编辑课程
     */
    if(this.secId * 1 !== -1){
      this.getDetails()
    } 
    
    /**
     * qtitle
     */
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