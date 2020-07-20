<template>
  <div id="banner-list">
    <el-page-header @back="$router.back()" content="闯关活动列表">
    </el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="banner-list-add" @click="addBarrier">
      <i class="el-icon-plus"></i>
      添加关卡
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
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="380">
        <template slot-scope="scope">
          <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="addExercises(scope.row, 1)" type="text" size="small">添加习题</el-button>
          <el-button @click="addMaterial(scope.row, 1)" type="text" size="small">添加资料</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="添加关卡"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      
      <el-form  label-width="100px" :model="data">
        <el-form-item label="关卡名称">
          <el-input v-model="data.title"></el-input>
        </el-form-item>
        <el-form-item label="单选题数量">
          <el-input v-model="data.singleCount"></el-input>
        </el-form-item>
        <el-form-item label="多选题数量">
          <el-input v-model="data.mulCount"></el-input>
        </el-form-item>
        <el-form-item label="编程题数量">
          <el-input v-model="data.programCount"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="status == 'add'" type="primary" @click="submit()">确 定</el-button>
        <el-button v-else type="primary" @click="update()">确 定</el-button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
import { add, del, update, getPassList, getPassById } from '@/api/activity'
export default {
  data() {
    return {
      dialogVisible: false,
      listLoading: true,
      page: 1,
      tableData: [],
      total: 0,
      pageSize: 10, // 每页显示条数
      status: 'add',
      data : {
        title: '',
        singleCount: '',
        mulCount: '',
        programCount: ''
      }
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
    addBarrier() {
      this.data = {};
      this.status = 'add';
      this.dialogVisible = true;
    },
    change(data) {
      this.status = 'update';
      this.data = data;
      this.dialogVisible = true;
    },
    addExercises(data) {
      this.$router.push(`/activity/excises/${data.id}`)
    },
    addMaterial(data) {
      this.$router.push(`/activity/material/${data.id}`)
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submit() {
      this.dialogVisible = false;
      add({
        title: this.data.title,
        singleCount: this.data.singleCount,
        mulCount: this.data.mulCount,
        programCount: this.data.programCount
      }).then( res => {
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.getData();
          }, 1000)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },

    update() {
      this.dialogVisible = false;
      update({
        id: this.data.id,
        title: this.data.title,
        singleCount: this.data.singleCount,
        mulCount: this.data.mulCount,
        programCount: this.data.programCount
      }).then( res => {
        this.data = {};
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          setTimeout(() => {
            this.getData();
          }, 1000)
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
          passId: data.id
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
      
      getPassList().then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
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