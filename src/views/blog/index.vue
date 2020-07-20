<template>
  <div id="blog-list">
    <el-page-header @back="$router.back()" content="博客列表">
    </el-page-header>
    <el-divider></el-divider>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="blogId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="author.name"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="postDate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="blog-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, delBlog } from '@/api/blog'
export default {
  data() {
    return {
      listLoading: true,
      tableData: [],
      pageSize: 10, // 每页显示条数
      currentPage: 1,
      total: 0
    }
  },
  computed: {
  },
  methods: {
    goDetails(data) {
      this.$router.push(`/blog/comment/${data.blogId}`)
    },
    del(_data){
      this.$confirm('此操作将永久删除博客且无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBlog({
          id: _data.blogId
        }).then(res => {
          if (res.errno * 1 === 101) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            setTimeout(() => {
              this.getData();
            }, 1500)
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
      
      getList({
        page: this.currentPage,
        maxCount: this.pageSize
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          this.total = res.data.pageData.total
          this.tableData = res.data.pageData.list
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    handleCurrentChange(val) {
      this.getData();
    }
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #blog-list{
    padding: 20px;
  }
  .blog-footer{
    margin: 50px auto;
    text-align: center;
  }
</style>