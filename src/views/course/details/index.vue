<template>
  <div id="course-details">
    <div id="course-header">
      <el-page-header @back="$router.back()" content="基本课程信息"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form ref="form" :model="courseData" label-width="100px" size="medium">
      <el-form-item label="课程名称">
        <el-input v-model="courseData.name"></el-input>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input v-model="courseData.price"></el-input>
      </el-form-item>
      <el-form-item label="课程级别">
        <el-select v-model="courseData.level" placeholder="请选择课程级别">
          <el-option v-for="(item, index) in courseLevel" :key="index" :label="item.name" :value="item.level"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择教师">
        <el-select v-model="courseData.teaId" placeholder="请选择授课教师">
          <el-option v-for="(item, index) in teacherList" :key="index" :label="item.nickName" :value="item.teaId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程简介">
        <quill-editor ref="text" v-model="courseData.intro" class="myQuillEditor" :options="editorOption" />

        <!-- <el-input type="textarea" v-model="courseData.intro"></el-input> -->
      </el-form-item>
      <el-form-item label="课程描述">
        <el-input type="textarea" v-model="courseData.desc"></el-input>
      </el-form-item>
      <el-form-item label="课程图片">
        <!--div><input type="file"  v-on:change="getImg($event)"/></div-->
       <el-upload
        class="upload-demo"
        :action="uploadUrl"
        name="imgFile"
        :on-success="upImgSuccess"
        multiple
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，尺寸：800*480px</div>
        <img v-if="courseData.img_url" class="course-img" :src="baseUrl+courseData.img_url" alt="">
      </el-upload>
      </el-form-item>
      <el-form-item label="关联path">
        <el-select v-model="courseData.pathId" placeholder="请选择活动区域">
          <el-option :value="0" label="暂不选择"></el-option>
          <el-option v-for="(item,index) in pathArr" :key="index"  :value="item.pathId" :label="item.pathName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联标签">
        <el-select v-model="courseData.markId" >
          <el-option v-for="(item,index) in tagList" :key="index"  :value="item.id" :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="添加课程资料">
        <el-switch v-model="metrial">
        </el-switch>
      </el-form-item>
      <el-form-item label="资料名称" v-if="metrial">
        <el-input v-model="courseData.metrial_name"></el-input>
      </el-form-item>
      <el-form-item label="资料地址" v-if="metrial">
        <el-input v-model="courseData.metrial_url"></el-input>
      </el-form-item> -->
    </el-form> 
    <el-form label-width="100px" size="medium">
      <el-form-item>
        <el-button type="primary" v-if="id==-1" @click="onSubmit">创建</el-button>
        <el-button type="primary" v-else @click="onUpdate">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { getPathList } from '@/api/addCourse'
import { getUpdate } from '@/api/update'
import { getCreateCrouse, updateCourse} from '@/api/createCrouse'
import { getMarkList } from '@/api/tag'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  data() {
    return {
      uploadUrl: BASE_API + 'path/addImg',
      baseUrl: CDN_URL,
      id: this.$route.params.id,
      fileList: [],
      pathArr:[],
      metrial: false,
      teacherList: [],
      courseLevel: [
        {
          name: '初级',
          level: 1
        },
        {
          name: '中级',
          level: 2
        },
        {
          name: '高级',
          level: 3
        }
      ],
      courseData: {
        name: '',
        price: '',
        level: '',
        intro: '',
        desc: '',
        img_url: '',
        pathId: 0,
        // metrial_name: '',
        // metrial_url: '',
        teacherid: '',
        courseId: '',
        markId: ''
      },
      tagList: [],
      editorOption: {
        // modules: {
          // theme: 'bubble',
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value
          // },
          // toolbar: []
        // }
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    upImgSuccess(res){
      if (res.errno == 101) {
        this.courseData.img_url = res.data.relativePath;
      } else {
        this.$message.error(res.errmsg);
      }
    },
    goChapter() {
      this.$router.push('/course/chapter')
    },
    onSubmit() {
      let params ={
        title:this.courseData.name,
        courseImage:this.courseData.img_url,
        pathId:this.courseData.pathId,
        describe:this.courseData.desc ,
        price:this.courseData.price,
        duration: this.courseData.duration,
        preCourseIntro:this.courseData.intro,
        courseUrl: this.courseData.courseUrl,
        // resId:this.courseData.metrial_url,
        // resName:this.courseData.metrial_name,
        teaId: this.courseData.teaId,
        level: this.courseData.level,
        markId: this.courseData.markId
      }
      getCreateCrouse(params).then((res)=>{
         if (res.errno * 1 === 101) {
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.$router.push("/course/list")
        }
         else {
          this.$message.error(res.errmsg);
        }

      })
     
    },
    /**
     * 更新课程
     */
    onUpdate() {
      let params ={
        title:this.courseData.name,
        courseImage:this.courseData.img_url,
        pathId:this.courseData.pathId,
        describe:this.courseData.desc ,
        price:this.courseData.price,
        duration: this.courseData.duration,
        preCourseIntro:this.courseData.intro,
        courseUrl: this.courseData.courseUrl,
        // resId:this.courseData.metrial_url,
        // resName:this.courseData.metrial_name,
        courseId: this.id,
        teaId: this.courseData.teaId,
        level: this.courseData.level,
        markId: this.courseData.markId
      }
      updateCourse(params).then((res)=>{
        console.log(res)
         if (res.errno * 1 === 101) { 
          this.$message({
            message: "更新成功",
            type: 'success'
          });
          this.$router.push("/course/list")
        }
         else {
          this.$message.error(res.errmsg);
        }

      })
    },
    onCancel(){
      this.$router.push("/course/list")
    },
    getImg(e) {
      console.log(e)
      let file = e.target.files[0]
      // let aa = new fileReader(file)
      // console.log(file)
      // let reader = new FileReader();
      // reader.readAsDataURL(file);
      // console.log(reader) 
      // reader.readAsBinaryString(file);
      // this.courseData.img_url =  reader.readyAsBinaryString(file)
      // console.log(this.courseData.img_url)
    },
      
    handlePreview() {

    },
    handleRemove() {

    },
    beforeRemove() {

    },
    handleExceed() {

    },
    pathData(){
      getPathList().then((res)=>{
        if (res.errno * 1 === 101) {
          this.pathArr = res.data.pathList; 
          this.teacherList = res.data.teacherList;
          this.tagList = res.data.markList;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    updateData(){
      let params = {
        courseId:this.$route.params.id
      }
      getUpdate(params).then((res)=>{
        if (res.errno * 1 === 101) {
          this.courseData.name = res.data.course.title;
          this.courseData.price = res.data.course.price;
          this.courseData.level = res.data.course.level;
          this.courseData.intro = res.data.course.preCourseIntro;
          this.courseData.desc = res.data.course.describe;
          // this.courseData.metrial_name = res.data.course.resName;
          // this.courseData.metrial_url = res.data.course.resId;
          this.courseData.teaId = res.data.course.teacher.teaId;
          this.courseData.pathId = res.data.course.pathId;
          this.courseData.img_url = res.data.course.image;
          this.courseData.markId = res.data.course.markId;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
   

    /**
     * 获取课程详情
     */
    getDetails() {

    },
    getTagList(data) {
      this.listLoading = true
      
      getMarkList().then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false
          this.tagList = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
  },
  created() {

    /**
     * 如果id是-1表示创建课程
     * 如果id不是-1表示编辑课程
     */
    if(this.id * 1 == -1 ) {
      // this.getDetails()
    }
    if(this.id * 1 !== -1){
      this.updateData()
    } 
    // this.getTagList();
    this.pathData()
    // this.goChapter()
    

    
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
    .course-img{
      width: 150px;
      vertical-align: middle;
    }
  }
</style>