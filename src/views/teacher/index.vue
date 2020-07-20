<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="教师列表"></el-page-header>
    <el-divider></el-divider>
    <el-form :inline="true"  class="demo-form-inline">
      <el-button type="primary" @click="trans()">添加教师</el-button>
    </el-form>
    <el-table  :data="tableData" style="width: 100%"  @row-click="handleEdit">
      <el-table-column label="id" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teaId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.realname }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.realname }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>简介: {{ scope.row.intro }}</p>
            <div slot="reference" class="name-wrapper" >
              <el-tag size="medium">{{ scope.row.intro }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger" @click.stop="handleDelete(scope.row.teaId)">删除</el-button>
        </template>
        
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import { getTeacherlist, del,add,infor,update } from "@/api/teacher";
import { log } from 'util';
export default {
  data() {
    return {
      listLoading : true,
      tableData: [
      ]
    };
  },
  created(){
    this.getData();
  },
  methods: {
    handleEdit(row){
      let op=3;
      this.$router.push({
        name:"create",
        params:{
          op,
          row
        }
      })
    },
    trans(){
      let op=1;
      let ni=this.nowid
      this.$router.push({
        name:"create",
        params:{
          ni,
          op
        }

      })
    },
    getData(){
      getTeacherlist().then(res => {
        this.listLoading = false
        if (res.errno * 1 === 101) {
          this.tableData=res.data.teacherList
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    handleDelete(id) {
      this.listLoading = true;
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({
          teacherId:id
        }).then((res)=>{
          console.log(res)
          this.listLoading = false;
          if(res.errno * 1 === 101) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            setTimeout(res => {
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
      
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
