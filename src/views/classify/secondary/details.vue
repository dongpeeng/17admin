<template>
  <div class="list">
    <div>
      <el-page-header @back="$router.back()" :content="number==1?'编辑二级分类信息':'添加二级分类信息'"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form label-width="100px">
      <el-form-item label="pathID" v-if="pathId !== -1">
        <el-input v-model="pathId" placeholder="ID" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="path名称">
        <el-input v-model="pathIfo.pathName" clearable></el-input>
      </el-form-item>
      <el-form-item label="path分类">
        <el-select v-model="pathIfo.cateId">
          <el-option
            v-for="item in pathclass"
            :key="item.cateId"
            :label="item.cateName"
            :value="item.cateId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="path标签">
        <el-select v-model="pathIfo.markId">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="path简介">
        <el-input v-model="pathIfo.pathIntro" clearable></el-input>
      </el-form-item>
      <el-form-item label="path图片">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          name="imgFile"
          multiple
          :on-success="upImgSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <img class="path-img" v-if="pathIfo.pathImg" :src="baseUrl+pathIfo.pathImg" alt="">
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M，尺寸：150*150px</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="初级介绍">
        <el-input type="textarea" v-model="pathIfo.primaryIntro" clearable></el-input>
      </el-form-item>

      <el-form-item label="中级介绍">
        <el-input type="textarea" v-model="pathIfo.middleIntro" clearable></el-input>
      </el-form-item>

      <el-form-item label="高级介绍">
        <el-input type="textarea" v-model="pathIfo.seniorIntro" clearable></el-input>
      </el-form-item>

      <el-form-item label="多选题数量">
        <el-input v-model="pathIfo.mulCount" clearable></el-input>
      </el-form-item>
      <el-form-item label="单选题数量">
        <el-input v-model="pathIfo.singleCount" clearable></el-input>
      </el-form-item>
      <el-form-item label="编程题数量">
        <el-input v-model="pathIfo.programCount" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="pathId!==-1" class="btn" size="medium" type="primary" @click="ConfirmChange">确认修改</el-button>
    <el-button v-else class="btn" size="medium" type="primary" @click="AddPath">增加</el-button>
  </div>
</template>
<script>
import { updatePathById, addPathById, getPathById, getCategory } from "@/api/classify";
import { getMarkList } from '@/api/tag'

export default {
  data() {
    return {
      pathIfo: {
        pathName: '',
        cateId: '',
        pathIntro: '',
        pathImg: null,
        markId: ''
      },
      pathList: [],
      pathId: this.$route.query.pathId * 1,
      value: "",
      fileList: [],
      pathclass: [],
      thisname: "",
      thisid: "",
      thisoption: "",
      thisproduce: "",
      thispathImg: "",
      number: "",
      listLoading: true,
      baseUrl: window.CDN_URL,
      uploadUrl: BASE_API + 'path/addImg',
      tagList: []
    };
  },
  created() {
    this.getSelectData();
    this.getTagList();
    if (this.pathId * 1 !== -1) {
      this.getDetails();
    }
  },
  methods: {
    getSelectData() {
      getCategory().then(res => {
        console.log(res);
        if (res.errno * 1 === 101) {
          this.pathclass = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    getDetails(){
      getPathById({
        pathId: this.pathId
      }).then( res => {
        this.listLoading = false;
        if (res.errno * 1 === 101) {
          this.pathIfo = res.data
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    upImgSuccess(res) {
      if (res.errno == 101) {
        // console.log(res);
        // this.thispathImg = res.data.accessPath;
        this.pathIfo.pathImg = res.data.relativePath;
        
        // console.log(this.thispathImg);
      }
    },
    getRouterData() {
      this.pathIfo = this.$route.params.obj;
      this.pathList = this.$route.params.list;
      this.pathId = this.$route.params.nowIndex;
      this.pathclass = this.$route.params.primarylist;
      this.number = this.$route.params.number;
    },
    ConfirmChange() {
      updatePathById({
        pathName: this.pathIfo.pathName,
        pathId: this.pathId,
        pathImg: this.pathIfo.pathImg,
        cateId: this.pathIfo.cateId,
        pathIntro: this.pathIfo.pathIntro,
        markId: this.pathIfo.markId,
        mulCount: this.pathIfo.mulCount,
        singleCount: this.pathIfo.singleCount,
        programCount: this.pathIfo.programCount,
        primaryIntro: this.pathIfo.primaryIntro,
        middleIntro: this.pathIfo.middleIntro,
        seniorIntro: this.pathIfo.seniorIntro
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          setTimeout(res => {
            this.$router.push('/classify/secondList');
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      });
      console.log(this.pathIfo);
    },
    AddPath() {
      addPathById({
        pathName: this.pathIfo.pathName,
        pathImg: this.pathIfo.pathImg,
        cateId: this.pathIfo.cateId,
        pathIntro: this.pathIfo.pathIntro,
        markId: this.pathIfo.markId,
        mulCount: this.pathIfo.mulCount,
        singleCount: this.pathIfo.singleCount,
        programCount: this.pathIfo.programCount,
        primaryIntro: this.pathIfo.primaryIntro,
        middleIntro: this.pathIfo.middleIntro,
        seniorIntro: this.pathIfo.seniorIntro
      }).then(res => {
        console.log(res);
        if (res.errno == 101) {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          setTimeout(res => {
            this.$router.push('/classify/secondList');
          }, 1500)
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getTagList(data) {
      this.listLoading = true
      
      getMarkList().then(res => {
        if(res.errno * 1 === 101) {
          this.listLoading = false
          this.tagList = res.data;
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.list{
  padding: 20px;
}
.btn {
  float: right;
  margin: 20px 0px 20px 20px;
}
.path-img{
  width: 60px;
  vertical-align: middle;
}
</style>