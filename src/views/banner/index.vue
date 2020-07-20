<template>
  <div id="banner-list">
    <el-page-header @back="$router.back()" content="轮播图列表">
    </el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="banner-list-add" @click="addBanner">
      <i class="el-icon-plus"></i>
      添加轮播图
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
        prop="status_text"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="380">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="changeStatus(scope.row, 1)" type="text" size="small">上线</el-button>
          <el-button @click="changeStatus(scope.row, 2)" type="text" size="small">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBannerList, del, update } from '@/api/banner'
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
    setStatus(num) {
      if (num * 1 === 1) {
        return '上线'
      } else {
        return '下线'
      }
    },
    addBanner() {
      this.$router.push(`/banner/details/-1`)
    },
    goDetails(data) {
      this.$router.push(`/banner/details/${data.id}`)
    },
    changeStatus(data, _status) {
      this.listLoading = true
      let params = Object.assign({}, data, {
        status: _status
      })
      update(params).then(res => {
        this.listLoading = false
        let msg = _status == 1 ? '上线成功' : '下线成功'
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: msg,
            type: 'success'
          });
          this.getData();
        } else {
          this.$message.error(res.errmsg);
        }
        
      })
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
            this.getData();
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
      
      getBannerList().then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          res.data.forEach(ds => {
            ds.status_text = this.setStatus(ds.status)
          })
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
  #banner-list{
    margin-top: 30px;
    padding: 0 20px;

    #banner-list-add{
      float: right;
      margin-bottom: 20px;
    }
  }
</style>