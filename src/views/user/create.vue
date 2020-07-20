
<template>
  <div class="app-container">
    <el-page-header @back="$router.back()" content="创建用户"></el-page-header>
    <el-divider></el-divider>
    <el-form ref="form"  label-width="120px">
      <!-- <el-form-item label="密码">
        <el-input v-model="pass"/>
      </el-form-item> -->
      <el-form-item label="手机号">
        <el-input v-model="tel"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="创建用户成功" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="用户密码" >
          <el-input readonly :value="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { register } from "@/api/user";
export default {
  data() {
    return {
      dialogFormVisible: false,
      listLoading : false,
      tel: '',
      password: ''
    }
  },
  created(){
  },
  methods: {
    onSubmit(){
      register({
        tel: this.tel,
      })
      .then( res => {
        // handle success
        if( res.errno * 1 === 0) {
          //注册失败
          this.$message.error(res.errmsg);
        } else if(res.errno * 1 === 1){
          //已经存在
          this.$message.error(res.errmsg);
        }else if(res.errno * 1 === 101){
          //注册成功
          this.password = res.pass
          this.dialogFormVisible = true
        } else {
          this.$message.error(res.errmsg);
        }
      })
    },
    confirm() {
      this.dialogFormVisible = false
      this.$router.push('/user/list');
    },
    onCancel() {
      this.$router.push('/user/list');
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.teacher-img{
  width: 100px;
  vertical-align: middle;
}
</style>

