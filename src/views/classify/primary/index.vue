<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" content="课程一级分类">
      </el-page-header>
      <el-divider></el-divider>
      <el-button
        class="add_btn"
        size="medium"
        type="primary"
        @click="handleAdd(PrimaryCourseData)"
      >+ 添加一级分类</el-button>
    </div>
    <el-table border :data="PrimaryCourseData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cateId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column class="handle_row" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="pages"
      small
      layout="prev, pager, next"
      :total="PrimaryCourseData.length"
      :page-size="2"
    ></el-pagination> -->
    <router-view />
  </div>
</template>

<script>
import { getCategory } from "@/api/classify";
import { delCategoryById } from "@/api/classify";
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      PrimaryCourseData: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getCategory().then(res => {
        console.log(res);
        if (res.errno * 1 === 101) {
          this.PrimaryCourseData = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    handleAdd(list, number) {
      this.$router.push({
        name: `PrimaryDetails`,
        params: {
          list,
          number: 0
        },
        query: {
          id: -1
        }
      });
    },
    handleEdit(index, obj, number) {
      this.$router.push({
        name: `PrimaryDetails`,
        params: {
          obj,
          number: 1
        },
        query: {
          id: obj.cateId
        }
      });
    },
    handleDelete(index, obj) {
      delCategoryById({
        cateId: obj.cateId
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          getCategory().then(res => {
            console.log(res);
            if (res.errno * 1 === 101) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              setTimeout(() => {
                this.PrimaryCourseData = res.data;
              }, 1500)
            } else {
              this.$message.error(res.errmsg);
            }
          });
        }
      });
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