<template>
  <div id="course-list">
    <el-page-header @back="$router.back()" content="课程列表"></el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="course-list-add" @click="addCourse">
      <i class="el-icon-plus"></i>
      添加课程
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="courseId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="teacher.nickName"
        label="教师名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="380">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="regale(scope.row)" type="text" size="small">上架</el-button>
          <el-button @click="soldOut(scope.row)" type="text" size="small">下架</el-button>
          <el-button @click="editChapter(scope.row)" type="text" size="small">编辑章</el-button>
          <el-button @click="addMetrial(scope.row)" type="text" size="small">添加课程资料</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="course-page">
      <el-pagination background :page-size="pageSize" layout="prev, pager, next" :total="total"
        @current-change="handleCurrentChange">
     </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCourseList, delCourse } from '@/api/courseList'
import { getCourseGround } from '@/api/courseGround'
import { getCourseDecision } from '@/api/courseDecision'
import { getCourseRecomm } from '@/api/courseRecomm'
export default {
  data() {
    return {
      listLoading: true,
      page: 1,
      tableData: [],
      total: 0,
      pageSize: 10, // 每页显示条数
      
    }
  },
  computed: {
    // 总页数
    count() {
      if(this.total > 1) {
        console.log(this.total / 1 * 1)
        return this.total / 1 * 1
      } else {
        console.log(1)
        return 1 * 1
      }
    }
  },
  methods: {
    addMetrial(data) {
      this.$router.push(`material/list/${data.courseId}`)
    },
    addCourse() {
      this.$router.push('details/-1')
    },
    goDetails(data) {
      console.log(`details/${data.courseId}`)
      this.$router.push(`details/${data.courseId}`)
    },
    del(data) {
      this.listLoading = true
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCourse({
          courseId: data.courseId
        }).then(res => {
          this.listLoading = false
          if (res.errno * 1 === 101) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getData()
          } else {
            this.$message.error(res.errmsg);
          }
        })
      }).catch(() => {
        this.listLoading = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
      console.log(row);
    },
    regale(data){
      let params = {
        courseId : data.courseId
      }
      getCourseGround(params).then((res)=>{
          if (res.errno * 1 === 101) {
          this.$message({
            message: '上架成功',
            type: 'success'
          });
        }
         else {
          this.$message.error(res.errmsg);
        }
      })
    },
    soldOut(data){
      let params = {
        courseId : data.courseId
      }
      getCourseDecision(params).then((res)=>{
        if (res.errno * 1 === 101) {
          this.$message({
            message: '下架成功',
            type: 'success'
          });
        }
         else {
          this.$message.error(res.errmsg);
        }
      })
    },
    showCase(data){
      let params = {
        courseId : data.courseId
      }
      getCourseRecomm(params).then((res)=>{
         if (res.errno * 1 === 101) {
          this.$message({
            message: '首页展示成功',
            type: 'success'
          });
        }
         else {
          this.$message.error(res.errmsg);
        }
      })
    },
    cancelShowCase(data){
      let params = {
        courseId : data.courseId
      }
       getCourseGround(params).then((res)=>{
          if (res.errno * 1 === 101) {
          this.$message({
            message: '取消首页展示成功',
            type: 'success'
          });
        }
         else {
          this.$message.error(res.errmsg);
        }
      })

    },
    getData(data) {
      this.listLoading = true
      let params = {
        maxCount: this.pageSize,
        page: this.page,
      }
      getCourseList(params).then(res => {
        console.log(res)
        this.listLoading = false
        this.tableData = res.data.pageData.list;
        this.page = res.data.pageData.page;
        this.total = res.data.pageData.total;
      })
      
    },
    /**
     * 切换页码请求数据
     */
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    /**
     * 进入章列表
     */
    editChapter(data) {
      this.$router.push(`/course/chapter/${data.courseId}`)
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #course-list{
    padding: 20px;

    #course-list-add{
      float: right;
      margin-bottom: 20px;
    }
    .course-page{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>