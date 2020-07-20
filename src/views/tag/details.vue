<template>
  <div id="tag-details">
    <el-page-header @back="$router.back()" content="标签详情"></el-page-header>
    <el-divider></el-divider>
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :rows="2" v-model="data.description"></el-input>
      </el-form-item>
      <el-form-item label="关联分类">
        <el-select v-model="data.categoryId" >
          <el-option v-for="(item,index) in categoryList" :key="index"  :value="item.cateId" :label="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-success="upImgSuccess"
          name="imgFile"
          multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，尺寸：1200*600px</div>
          <img class="tag-img" v-if="data.url" :src="baseUrl+data.url" alt="">
        </el-upload>
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
import { add, update, getMarkById } from '@/api/tag'
import { getCategory } from "@/api/classify";

export default {
  data() {
    return {
      id: this.$route.params.id * 1,
      uploadUrl: BASE_API + 'path/addImg',
      baseUrl: CDN_URL,
      data: {
        description: '',
        title: '',
        url: '',
        categoryId: ''
      },
      categoryList: []
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
      getMarkById({
        id: this.id
      }).then(res => {
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.data = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    update() {
      let params = Object.assign({}, this.data, {
        id: this.id
      })
      update(params).then(res => {
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/tag')
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    onSubmit() {

      add(this.data).then(res => {
        this.listLoading = false
        if(res.errno * 1 === 101 ) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/tag')
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    goBack() {
      this.$router.push('/tag')
    },
    getCategory() {
      getCategory().then(res => {
        console.log(res);
        if (res.errno * 1 === 101) {
          this.categoryList = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
  },
  created() {
    this.getCategory();
    if(this.id && this.id !== -1) {
      this.getDetails()
    }
  }
}
</script>

<style lang="scss" scoped>
  #tag-details{
    padding: 20px;

    .tag-img{
      width: 100px;
      vertical-align: middle;
    }
  }
</style>