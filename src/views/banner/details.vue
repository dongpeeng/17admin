<template>
  <div id="banner-details">
    <el-page-header @back="$router.back()" content="轮播图信息">
    </el-page-header>
    <el-divider></el-divider>

    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="data.turnUrl"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="upImgSuccess"
          name="imgFile"
          multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，尺寸为：1280*510px</div>
        </el-upload>
        <img class="banner-img" v-if="data.url" :src="baseUrl+data.url" alt="">
      </el-form-item>
      <el-form-item>
        <el-button v-if="id == -1" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-else type="primary" @click="update">更新</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, getBannerById, update  } from '@/api/banner'
export default {
  data() {
    return {
      id: this.$route.params.id * 1,
      uploadUrl: BASE_API + 'path/addImg',
      baseUrl: CDN_URL,
      data: {
        title: '',
        turnUrl: '',
        url: ''
      }
    }
  },
  methods: {
    upImgSuccess(res) {
      if (res.errno == 101) {
        this.data.url = res.data.relativePath;
      } else {
        this.$message.error(res.errmsg);
      }
    },
    getDetails() {
      getBannerById({
        id: this.id
      }).then(res => {
        console.log(res)
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.data = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    update() {
      update({
        id: this.id,
        title: this.data.title,
        turnUrl: this.data.turnUrl,
        url: this.data.url,
        status: this.data.status
      }).then(res => {
        console.log(res)
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/banner')
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    onSubmit() {
      add({
        title: this.data.title,
        turnUrl: this.data.turnUrl,
        url: this.data.url,
        status: 2
      }).then(res => {
        console.log(res)
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/banner')
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    goBack() {
      this.$router.push('/banner')
    }
  },
  created() {
    if(this.id && this.id !== -1) {
      this.getDetails()
    }
  }
}
</script>

<style lang="scss" scoped>
  #banner-details{
    padding: 20px;

    .banner-img{
      width: 100px;
      vertical-align: middle;
    }
  }
</style>