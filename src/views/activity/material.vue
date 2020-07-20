<template>
  <div id="activity-material-list">
    <el-page-header @back="$router.back()" content="闯关任务资料">
    </el-page-header>
    <el-divider></el-divider>
    <el-button type="primary" id="activity-material-add" @click="addMaterial">
      <i class="el-icon-plus"></i>
      添加资料
    </el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资料名称"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="380">
        <template slot-scope="scope">
          <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delMaterila(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <el-form label-position="left" label-width="80px" :model="material">
        <el-form-item label="资料名称">
          <el-input v-model="material.name"></el-input>
        </el-form-item>
        <el-form-item label="资料链接">
          <el-input v-model="material.url" readonly></el-input>
          <el-upload
            class="upload-demo"
            drag
            name="uploadFile"
            :action="uploadUrl"
            multiple
            :on-success="uploadSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">文件大小不能超过100M</div>
          </el-upload>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogConfig.status == 'add'" type="primary" @click="submit">添 加</el-button>
        <el-button v-if="dialogConfig.status == 'change'" type="primary" @click="updateMaterial">更 新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getPassMaterialList } from '@/api/activity'
  import { add, del, getById, update } from '@/api/material'

  export default {
    data() {
      return {
        listLoading: false,
        uploadUrl: BASE_API + 'path/uploadFile',
        dialogVisible: false,
        passId: this.$route.params.id,
        tableData: [],
        dialogConfig: {
          status: 'add',
          title: ''
        },
        material: {
          id: '',
          name: '',
          url: ''
        }
      }
    },
    methods: {
      addMaterial() {
        this.material = {}
        this.dialogVisible = true
        this.dialogConfig.status = 'add'
        this.dialogConfig.title = '添加资料'
      },
      updateMaterial() {
        this.listLoading = true;
        update({
          id: this.material.id,
          url: this.material.url,
          name: this.material.name,
          passId: this.passId
        }).then(res => {
          this.listLoading = false;
          if(res.errno * 1 === 101 ) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            setTimeout(() => {
              this.dialogVisible = false;
              this.getData();
            }, 1000)
          } else {
            this.$message.error(res.errmsg);
          }
        })
      },
      submit() {
        this.listLoading = true;
        add({
          url: this.material.url,
          name: this.material.name,
          passId: this.passId
        }).then(res => {
          this.listLoading = false;
          if(res.errno * 1 === 101 ) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            setTimeout(() => {
              this.dialogVisible = false;
              this.getData();
            }, 1000)
          } else {
            this.$message.error(res.errmsg);
          }
        })
      },
      change(data) {
        this.material = data
        this.dialogVisible = true
        this.dialogConfig.status = 'change'
        this.dialogConfig.title = '修改资料'
      },
      delMaterila(data) {
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
            if (res.errno * 1 === 101) {
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
          this.listLoading = false
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });   
      },
      // 上传图片成功
      uploadSuccess(res) {
        if (res.errno == 101) {
          this.material.url = res.data.relativePath;
        } else {
          this.$message.error(res.errmsg);
        }
      },
      getData() {
        this.listLoading = true;
        getPassMaterialList({
          id: this.passId
        }).then(res => {
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
      this.getData();
    }
  }
</script>


<style lang="scss" scoped>
  #activity-material-list{
    margin-top: 30px;
    padding: 0 20px;

    #activity-material-add{
      float: right;
      margin-bottom: 20px;
    }
  }
</style>