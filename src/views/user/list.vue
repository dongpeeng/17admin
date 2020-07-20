<template>
  <div id="user-list">
    <el-page-header @back="$router.back()" content="用户列表"></el-page-header>
    <el-divider></el-divider>

    <div class="user-list-header">
      <el-input
        style="width:400px"
        placeholder="请输入用户名"
        v-model="name"
        clearable>
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>

      <el-button @click="getData">查看全部</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="_id"
        label="ID"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <!-- <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column> -->
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="date"
        label="注册日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllUserInfor, searchUserMessage, getAllFenyeUserInfor } from '@/api/user'

export default {
  data() {
    return {
      name: '',
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
      this.$router.push(`/user/details/${data._id}`)
    },
    search() {
      this.listLoading = true
      searchUserMessage({
        name: this.name
      }).then(res => {
        this.listLoading = false
        this.name = '';
        if(res.errno * 1 === 101 ) {
          this.tableData = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    getPageData() {
      console.log(this.pageSize)
      console.log(this.page)
      this.listLoading = true
        getAllFenyeUserInfor({
          pagesize: this.pageSize,
          page: this.page
        }).then(res => {
          this.listLoading = false
          if (res.errno * 1 === 101) {
            this.total = res.total
            this.tableData = res.data;
          } else {
            this.$message.error(res.errmsg);
          }
        })
    },
    getData() {
      this.listLoading = true
      
      getAllUserInfor().then(res => {
        this.listLoading = false
        if(res.errno * 1 === 101) {
          this.tableData = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    /**
     * 切换页码请求数据
     */
    handleCurrentChange(val) {
      this.page = val
      this.getPageData()
    },
  },
  created() {
    // this.getData()
    this.getPageData()
  }
}

</script>

<style lang="scss" scoped>
  #user-list{
    padding: 20px;

    .user-list-header{
      margin-bottom: 20px;
    }

    #course-list-add{
      float: right;
      margin-bottom: 20px;
    }
    .course-page{
      margin-top: 20px;
      text-align: right;
    }

    .el-pagination{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>