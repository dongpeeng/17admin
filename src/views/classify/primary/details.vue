<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" :content="cateId!=-1?'编辑一级分类信息':'添加一级分类信息'">
      </el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form label-width="80px">
      <el-form-item label="课程ID">
        <el-input v-if="courseIfo" :placeholder="courseIfo.cateId" :disabled="true"></el-input>
        <el-input v-else placeholder :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input placeholder="请输入分类名称" v-model="courseIfo.cateName" clearable></el-input>
      </el-form-item>
      <el-form-item label="题目数量">
        <el-input placeholder="请输入题目数量" v-model="courseIfo.exercisesCount" clearable></el-input>
      </el-form-item>
      
    </el-form>
    <el-button v-if="cateId != -1" class="btn" size="medium" type="primary" @click="ConfirmChange">确认修改</el-button>
    <el-button v-else class="btn" size="medium" type="primary" @click="AddCourse">增加</el-button>
  </div>
</template>
<script>
import { updateCategoryById, addCategoryById, getCategoryById } from "@/api/classify";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      // thisname: "", //通过iput输入的每个课程的name
      courseIfo: {
        cateName: '',
        cateId: '',
        exercisesCount: ''
      }, //课程信息：id，name
      cateId: this.$route.query.id, //课程id
      // courseList: [], //课程列表
      // number: ""
    };
  },
  methods: {
    getRouterData() {
      this.courseIfo = this.$route.params.obj;
      this.courseList = this.$route.params.list;
      this.number = this.$route.params.number;
      console.log(this.courseIfo);
      console.log(this.courseList);
    },
    ConfirmChange() {
      updateCategoryById({
        name: this.courseIfo.cateName,
        cateId: this.courseIfo.cateId,
        exercisesCount: this.courseIfo.exercisesCount
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/classify/primarylist');
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      });
      console.log(this.courseIfo);
    },
    AddCourse() {
      addCategoryById({
        name: this.courseIfo.cateName,
        exercisesCount: this.courseIfo.exercisesCount
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/classify/primarylist');
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    getDetails() {
      getCategoryById({
        cateId: this.cateId
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          this.courseIfo = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      });
    }
  },
  created() {
    // this.getRouterData();
    if(this.cateId * 1 !== -1) {
      this.getDetails()
    }
  }
};
</script>
<style lang="scss" scoped>
.list{
  padding: 20px;
}
.btn {
  float: right;
  margin: 20px 0px 20px 20px;
}
</style>