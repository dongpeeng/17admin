<template>
  <div id="tag-list">
    <el-page-header @back="$router.back()" content="标签列表"></el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="course-list-add" @click="addTag">
      <i class="el-icon-plus"></i>
      添加标签
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
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
        width="380">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { del, getMarkList } from '@/api/tag'

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
  },
  methods: {
    addTag() {
      this.$router.push(`/tag/details/-1`)
    },
    goDetails(data) {
      this.$router.push(`/tag/details/${data.id}`)
    },
    del(data) {
      this.listLoading = true
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({
          id: data.id
        }).then(res => {
          this.listLoading = false
          if(res.errno * 1 === 101 ) {
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
      
      getMarkList().then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false
          this.tableData = res.data;
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
  #tag-list{
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