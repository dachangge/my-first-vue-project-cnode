<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/cnodejs.svg" title="cnode.svg">
    </router-link>

    <el-button type='text' @click="show = true">关于</el-button>
    <el-dialog  :visible.sync="show">
      TODO dailog内容
    </el-dialog>
  </div>
</template>
<script>
  export default {
      name:'cnodeHeader',
      data(){
          return {
              show:false,
          }
      },
      created(){
          console.log(this.$route,'route');
      }
  }
</script>
<style>
  .header{
    background: #324057;
    height: 3.6rem;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .header img {
    width: 10rem;
    height: 3.5rem;
    margin-left: 10rem;
  }

  .header button {
    display: inline-block;
    float: right;
    line-height: 3rem;
    margin-right: 10rem;
    font-weight: bold;
    font-size: 20px;
    color: white;
    letter-spacing: 2px;
    padding-top: 0.2rem;
  }
</style>
