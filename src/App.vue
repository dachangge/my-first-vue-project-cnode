<template>
  <el-container >
    <el-header>
      <cnode-header></cnode-header>
    </el-header>
    <el-container >
      <el-aside style="width:70%;height:100%;overflow:hidden;margin:1rem;padding:.2rem .5rem;background: #fff;">
        <router-view ></router-view>
      </el-aside>
    <el-main style="width:30%;background-color: rgb(238, 241, 246);height:100%;margin-top:1rem;padding:0;">
        <router-view name="aside"></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CnodeHeader from "./components/CnodeHeader.vue";

export default {
  name: 'App',
  data(){
      return {
          title:'this is a todoLists',

      }
  },
  methods:{

  },
  watch:{
      '$route'(to,from){
        console.error(to,from);
      }
  },
  mounted(){

  },
  components:{
    CnodeHeader,
  }

}
</script>

<style>

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 6rem;
    display: flex;
    justify-content: space-around;
    font-size: 22px;
    word-break: break-all;
  }

  body,
  div,
  span,
  a,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  body{
    background:#e1e1e1
  }
  .aside-header{
    height:3.9rem;
    line-height: 3.9rem;
    background-color: #f6f6f6;
    color:#51585c;
    padding-left:1rem;
    border-bottom: 1px solid #ddd;
  }
  .aside-content{
    background:#fff;
    padding:0.6rem;
  }
  .aside-content img{
    width:3rem;
    vertical-align: middle;
  }
  .create-topic{
    background-color: #fff;
    padding:1rem 2rem;
    margin-top:1.3rem;
  }
</style>
