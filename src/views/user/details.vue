
<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="分配权限"></el-page-header>
    <el-divider></el-divider>
    <el-form ref="form"  label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="name" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="tel" />
      </el-form-item>
      <el-form-item label="购买课程">
        <el-select v-model="courseId" >
          <el-option v-for="(item,index) in courseList" :key="index"  :value="item.courseId" :label="item.title"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, getVipCourse, insertVipCourse,personMessage } from "@/api/user";
export default {
  data() {
    return {
      listLoading : false,
      courseList: [],
      name: '',
      courseId: '',
      email: '',
      tel: ''
    }
  },
  created(){
    this.getData();
    this.getCourseList();
  },
  methods: {
    getData() {
      getUserInfo({
        "tokenIdArr": [
          {
            "tokenId": this.$route.params.id
          }
        ]
      }).then(res => {
        if (res.code * 1 === 1) {
          this.name = res.data[0].name;
          this.email = res.data[0].email;
          this.tel = res.data[0].tel;
        } else {
          this.$message.error(res.message);
        }
      })
      personMessage({
        tokenId: this.$route.params.id
      }).then(res => {
        console.log(res)
        if (res.code * 1 === 1) {
          
        } else {
          this.$message.error(res.message);
        }
      })
    },
    getCourseList() {
      getVipCourse().then(res => {
        console.log(res)
        if (res.errno * 1 === 101 ){
          this.courseList = res.data;
        } else {
          this.$message.error(res.message);
        }
      })
    },
    onSubmit(){
      insertVipCourse({
        tokenId: this.$route.params.id,
        courseId: this.courseId,
        status: 2
      })
      .then( res => {
        if(res.errno * 1 === 101){
          //注册成功
          this.$message({
            message: '分配成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/user/list');
          }, 1000)
        } else {
          this.$message.error(res.message);

        }
      })
    },
    onCancel() {
      this.$router.push('/user/list');
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

