<template>
  <div id="vote">
    <el-page-header @back="$router.back()" content="视频大赛用户列表">
    </el-page-header>
    <el-divider></el-divider>

    <div class="vote-header">
      <el-input
        style="width:400px"
        placeholder="请输入搜索内容"
        v-model="keyword"
        clearable>
        <el-button slot="append" icon="el-icon-search" @click="getData()"></el-button>
      </el-input>
      <el-button @click="checkAll()">查看全部</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="userId"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="vote-page">
      <el-pagination background :page-size="maxCount" layout="prev, pager, next" :total="total"
        @current-change="handleCurrentChange">
     </el-pagination>
    </div>

    <el-dialog
      title="用户详情"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      
      <el-form  label-width="100px" :model="data">
        <el-form-item label="用户名">
          <el-input v-model="data.nickName" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="data.tel" readonly></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-input v-model="data.school" readonly></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="data.major" readonly></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="data.gender" readonly></el-input>
        </el-form-item>
        <el-form-item label="视频名称">
          <el-input v-model="data.vlogName" readonly></el-input>
        </el-form-item>
        <el-form-item label="百度网盘地址">
          <el-input v-model="data.vlogNetwork" readonly></el-input>
        </el-form-item>
        <el-form-item label="哔哩哔哩地址">
          <el-input v-model="data.vlogUrl"></el-input>
        </el-form-item>
        <el-form-item label="视频封面图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :on-success="uploadSuccess"
            name="imgFile"
            multiple>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，尺寸为：960*600px</div>
          </el-upload>
          <img class="vote-img" v-if="data.vlogImage" :src="baseUrl+data.vlogImage" alt="">
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, updateUser } from '@/api/activity'
export default {
  data() {
    return {
      baseUrl: CDN_URL,
      uploadUrl: BASE_API + 'path/addImg',
      dialogVisible: false,
      listLoading: true,
      page: 1,
      tableData: [],
      total: 0,
      maxCount: 10, // 每页显示条数
      keyword: '',
      data : {}
    }
  },
  computed: {
  },
  methods: {
    uploadSuccess(res) {
      if (res.errno == 101) {
        this.data.vlogImage = res.data.relativePath;
      } else {
        this.$message.error(res.errmsg);
      }
    },
    // 编辑信息
    edit(data) {
      this.data = data;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submit() {
      this.dialogVisible = true;
      updateUser(this.data).then( res => {
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '修改成功',
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
    checkAll() {
      this.keyword = ''
      this.page = 1
      this.getData()
    },
    getData() {
      this.listLoading = true
      
      getUserList({
        maxCount: this.maxCount,
        page: this.page,
        keyword: this.keyword
      }).then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false;
          this.tableData = res.data.pageData.list;
          this.total = res.data.pageData.total
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
      this.getData()
    },
  },
  created() {
    this.getData()
  }
}

</script>

<style lang="scss" scoped>
  #vote{
    margin-top: 30px;
    padding: 0 20px;

    .vote-header{
      margin-bottom: 20px;
    }
    .vote-page{
      margin-top: 50px;
      padding-bottom: 30px;
      text-align: center;
    }
    .vote-img{
      width: 100px;
    }
  }
</style>