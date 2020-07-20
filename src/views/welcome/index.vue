<template>
  <div class="dashboard-container">
    <div class="dashboard-text">hello {{ name }}</div>
    <p class="dashboard-title">欢迎进入青盟课堂管理系统</p>
    <div class="dashboard-content">
      <img src="@/assets/imgs/meng.png" alt="">
      <img src="@/assets/imgs/qing.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    color: #304156;
  }
  &-text {
    font-size: 20px;
    line-height: 46px;
  }
  &-title{
    margin: 50px auto 0;
    font-size: 40px;
    text-align: center;
  }
  &-content{
    // display: flex;
    margin: 80px auto 0;
    text-align: center;

    img{
      width: 220px;
    }
  }
}
</style>
