<template>
  <div id="course-list">
    <el-page-header @back="$router.back()" content="章列表"></el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="course-list-add" @click="addChapter()">
      <i class="el-icon-plus"></i>
      添加章
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="chapId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="350">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="goSection(scope.row)" type="text" size="small">编辑节</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getChapterList, delChapter } from '@/api/chapterList'
export default {
  data() {
    return {
      listLoading: true,
      courseId: this.$route.params.courseId, // 课程id
      tableData: []
    }
  },
  computed: {
  },
  methods: {
    addChapter() {
      this.$router.push(`/course/chapter/details/${this.courseId}/-1`)
    },
    goDetails(data) {
      this.$router.push(`/course/chapter/details/${this.courseId}/${data.chapId}`)
    },
    del(data) {
      this.listLoading = true
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delChapter({
          chapId: data.chapId
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },
    getData(data) {
      this.listLoading = true
      let params = {
        courseId: this.courseId
      }
      getChapterList(params).then(res => {
        console.log(res)
        this.listLoading = false
        this.tableData = res.data
      })
      
    },
    goSection(data) {
      this.$router.push(`/course/section/${data.chapId}/${this.courseId}`)
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