<template>
  <div id="comment-list">
    <el-page-header @back="$router.back()" content="博客评论列表">
    </el-page-header>
    <el-divider></el-divider>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="commId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="user.name"
        label="评论者">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="postDate"
        label="评论">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBlogDetail, delComment } from '@/api/blog'
export default {
  data() {
    return {
      id: this.$route.params.id,
      listLoading: true,
      tableData: [],
      total: 0,
    }
  },
  computed: {
  },
  methods: {
    
    goDetails(data) {
      this.$router.push(`/blog/details/${data.id}`)
    },
    del(_data){
      this.$confirm('此操作将永久删除博客且无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delComment({
          id: _data.commId
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
      getBlogDetail({
        id: this.id
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          this.tableData = res.data.commentList
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #comment-list{
    padding: 20px;
  }
</style>