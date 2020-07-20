
<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="教师信息"></el-page-header>
    <el-divider></el-divider>
    <el-form ref="form"  label-width="120px">
      <el-form-item label="输入教师昵称">
        <el-input v-model="goodnickName" />
      </el-form-item>
      <el-form-item label="输入教师简介">
        <el-input v-model="goodintro" type="textarea" />
      </el-form-item>
      <el-form-item label="输入教师姓名">
        <el-input v-model="goodrealname" type="textarea" />
      </el-form-item>
      <el-form-item label="输入教师密码">
        <el-input v-model="goodpassword" type="textarea" />
      </el-form-item>
      <el-form-item label="输入教师电话">
        <el-input v-model="goodtel" type="textarea" />
      </el-form-item>
      <el-form-item label="输入教师工作">
        <el-input v-model="goodjob" type="textarea" />
      </el-form-item>
      <el-form-item label="输入教师肖像">
        <!-- <el-input v-model="goodportrait" type="textarea" /> -->
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          name="imgFile"
          :on-success="upImgSuccess"
          multiple
          >
          <el-button size="small" type="primary">点击上传</el-button>
          <img class="teacher-img" v-if="goodportrait" :src="baseUrl+goodportrait" alt="">
        </el-upload>
        </el-form-item>
      <el-form-item>
        <el-button v-if="this.$route.params.op!=3" type="primary" @click="onSubmit">创建</el-button>
        <el-button v-if="this.$route.params.op==3" type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add,update } from "@/api/teacher";
import { log } from 'util';
export default {
  data() {
    return {
      uploadUrl: BASE_API + 'path/addImg',
      baseUrl: CDN_URL,
      goodnickName:'',
      goodintro:'',
      goodrealname:'',
      goodpassword:'',
      goodtel:'',
      goodjob:'',
      goodportrait:'',
      goodteaId:'',
      listLoading : false
    }
  },
  created(){
    if(this.$route.params.op==3){
      // infor({
      //   teaId:id
      // }).then(res => {
      // console.log(res);
      // })
      this.goodnickName=this.$route.params.row.nickName;
      this.goodintro=this.$route.params.row.intro;
      this.goodrealname=this.$route.params.row.realname;
      this.goodpassword=this.$route.params.row.password;
      this.goodtel=this.$route.params.row.tel;
      this.goodjob=this.$route.params.row.job;
      this.goodportrait=this.$route.params.row.portrait;
      this.goodteaId=this.$route.params.row.teaId;

      console.log(this.$route.params.row);
      
    }
  },
  methods: {
    upImgSuccess(res){
      console.log(res)
      // this.courseData.img_url = res.data.accessPath
      this.goodportrait = res.data.relativePath;
    },
    onSave(){
      if((this.goodnickName.length==0) || (this.goodintro.length==0) || (this.goodrealname.length==0) || (this.goodpassword.length==0)
       || (this.goodtel.length==0) || (this.goodjob.length==0) || (this.goodportrait.length==0))
      {
        this.$message.error("请确认输入");
      }
      else{
        this.listLoading = true
        update({
          teaId:this.goodteaId,
          nickName:this.goodnickName,
          realname:this.goodrealname,
          password:this.goodpassword,
          tel:this.goodtel,
          intro:this.goodintro,
          job:this.goodjob,
          portrait:this.goodportrait
        }).then(res => {
          this.listLoading = false
          if( res.errno * 1 === 101) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            setTimeout(res => {
              this.$router.push('/teacher/index')
            }, 1500)
          } else {
            this.$message.error(res.errmsg);
          }
        })
      }
    },
    onSubmit() {
      if((this.goodnickName.length==0) || (this.goodintro.length==0) || (this.goodrealname.length==0) || (this.goodpassword.length==0)
      || (this.goodtel.length==0) || (this.goodjob.length==0) || (this.goodportrait.length==0))
      {
        this.$message.error("请确认输入");
      }
      else{
        this.listLoading = true
        add({
          nickName:this.goodnickName,
          realname:this.goodrealname,
          password:this.goodpassword,
          tel:this.goodtel,
          intro:this.goodintro,
          job:this.goodjob,
          portrait:this.goodportrait
        }).then(res => {
          this.listLoading = false
          if( res.errno * 1 === 101) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            setTimeout(res => {
              this.$router.push('/teacher/index')
            }, 1500)
          } else {
            this.$message.error(res.errmsg);
          }
        })
      }
      
    },
    onCancel() {
      this.$router.push('/teacher/index')
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.teacher-img{
  width: 100px;
  vertical-align: middle;
}
</style>

