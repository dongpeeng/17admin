<template>
  <div id="section-list">
    <el-page-header @back="$router.push(`/course/chapter/${courseId}`)" content="课程节列表"></el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="section-list-add" @click="addSection">
      <i class="el-icon-plus"></i>
      添加节
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="secId"
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
          <el-button @click="goExcises(scope.row)" type="text" size="small">添加章节习题</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSectionList, delSection } from '@/api/sectionList'
export default {
  data() {
    return {
      listLoading: true,
      chapId: this.$route.params.chapterId,
      courseId: this.$route.params.courseId,
      data: [],
    }
  },
  computed: {
  },
  methods: {
    addSection() {
      this.$router.push(`/course/section/details/${this.chapId}/-1`)
    },
    goDetails(data) {
      this.$router.push(`/course/section/details/${this.chapId}/${data.secId}`)
    },
    del(data) {
      this.listLoading = true
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSection({
          secId: data.secId
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
      
    },
    getData(data) {
      this.listLoading = true
      let params = {
        chapId: this.chapId
      }
      getSectionList(params).then(res => {
        console.log(res)
        this.listLoading = false
        this.data = res.data
      })
      
    },
    goExcises(data){
      this.$router.push(`/course/section/excises/${data.secId}/${data.title}`)
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #section-list{
    padding: 20px;

    #section-list-add{
      float: right;
      margin-bottom: 20px;
    }
    .course-page{
      margin-top: 20px;
      text-align: right;
    }
  }
</style>