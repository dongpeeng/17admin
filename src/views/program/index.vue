<template>
  <div id="program-list">
    <el-page-header @back="$router.back()" content="编程题批改列表"></el-page-header>
    <el-divider></el-divider>

    <div class="program-list-header">
      <el-form ref="form" label-width="120px" label-position="left" size="medium">
        <el-form-item label="状态">
          <el-radio-group v-model="status" @change="getData()">
            <el-radio  :label="1">未批改</el-radio>
            <el-radio  :label="2">已批改</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="tag" @change="getData()">
            <el-radio :label="0">path题目</el-radio>
            <el-radio :label="1">分类题目</el-radio>
            <el-radio :label="2">闯关题目</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="根据关键字搜索">
          <el-input
            style="width:400px"
            placeholder="请输入内容"
            v-model="keyword"
            clearable>
            <el-button slot="append" icon="el-icon-search" @click="getData(true)"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <!-- <el-button @click="getList(2)">已批改</el-button>
      <el-button @click="getList(1)">未批改</el-button> -->
      <el-divider></el-divider>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="umcId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="题目名称">
        <template slot-scope="{row}">
          <div v-html="row.title"></div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        :prop="statusText(status)"
        label="状态">
      </el-table-column> -->
      <el-table-column
        prop="commitDate"
        label="提交时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="goDetails(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="program-footer">
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
import { getList } from '@/api/program'
export default {
  data() {
    return {
      keyword: '',
      listLoading: true,
      tableData: [],
      pageSize: 10, // 每页显示条数
      currentPage: 1,
      total: 0,
      status: 1,
      tag: 0
    }
  },
  computed: {
    statusText(status) {
      if (status * 1 === 1) {
        return '未批改'
      } else if (status * 1 === 2) {
        return '已批改'
      } else {
        return ''
      }
    }
  },
  methods: {
    goDetails(data) {
      this.$router.push(`/program/details/${data.umcId}/${this.tag}`)
    },
    getData(data) {
      this.listLoading = true
      let _params = {
        page: this.currentPage,
        maxCount: this.pageSize,
        status: this.status,
        tag: this.tag
      }
      if(data) {
        _params = Object.assign(_params, {
          keyword: this.keyword
        })
      }
      getList(_params).then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          this.total = res.data.pageData.total
          this.tableData = res.data.pageData.list
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    getList(_status) {
      this.status = _status;
      this.getData()
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
  #program-list{
    padding: 20px;
    .program-list-header{
      margin: 40px auto;

      input{
        width: 200px;
      }
    }
    .program-footer{
      margin: 50px auto;
      text-align: center;
    }

  }
</style>