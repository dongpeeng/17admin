<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" content="课程二级分类"></el-page-header>
      <el-divider></el-divider>
      <el-button
        class="add_btn"
        size="medium"
        type="primary"
        @click="handleAdd(SeconderyCourseData,PrimaryCourseData)"
      >+ 添加二级分类</el-button>
    </div>
    <el-table v-if="SeconderyCourseData.length!=0" border :data="SeconderyCourseData" style="width: 100%">
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.pathId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.pathName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column class="handle_row" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row,PrimaryCourseData)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="GoExcises(scope.row)">添加path习题</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="pages"
      small
      layout="prev, pager, next"
      :total="SeconderyCourseData.length"
      :page-size="2"
    ></el-pagination> -->
    <router-view />
  </div>
</template>
<script>
import { getPath, getCategory, delPathById } from "@/api/classify";

export default {
  data() {
    return {
      PrimaryCourseData: [],
      SeconderyCourseData: [],
      listLoading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // getCategory().then(res => {
      //   console.log(res);
      //   this.listLoading = false;
      //   this.PrimaryCourseData = res.data;
      // });
      getPath().then(res => {
        console.log(res);
        this.listLoading = false
        if (res.errno * 1 === 101) {
          this.SeconderyCourseData = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    handleAdd(list, primarylist, number) {
      this.$router.push({
        name: `SecondDetails`,
        params: {
          list,
          primarylist,
          number: 0
        },
        query: {
          pathId: -1,
          cateId: -1
        }
      });
    },
    handleEdit(index, obj, primarylist, number) {
      this.$router.push({
        name: `SecondDetails`,
        params: {
          obj,
          primarylist,
          number: 1
        },
        query: {
          pathId: obj.pathId,
          cateId: obj.cateId
        }
      });
    },
    handleDelete(index, obj) {
      this.listLoading = true;
      delPathById({
        pathId: obj.pathId
      }).then(res => {
        this.listLoading = false;
        if (res.errno == 101) {
          // getCategory().then(res => {
          //   console.log(res);
          //   this.PrimaryCourseData = res.data;
          // });
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          getPath().then(res => {
            if (res.errno * 1 === 101) {
              this.SeconderyCourseData = res.data;
            } else {
              this.$message.error(res.errmsg);
            }
          });
        } else {
          this.$message.error(res.errmsg);
        }
      });
      // this.SeconderyCourseData.splice(index, 1);
    },
    GoExcises(_data) {
      console.log(_data)
      this.$router.push(`/classify/secondExcises/${_data.pathId}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.list{
  padding: 20px;
}
.add_btn {
  float: right;
  margin-bottom: 10px;
}
.pages {
  float: right;
}
</style>