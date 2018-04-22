<template>
  <div v-loading="getContent">
    <div class="aside-header" >
      作者
    </div>
    <div class="aside-content">
      <img :src="authorData.avatar_url" alt="">
      {{authorData.loginname}}
      <div class="aside-content-score" style="margin:.6rem 0;">
        积分：{{authorData.score}}
      </div>
      <i>“ 这家伙很懒，什么个性签名都没有留下。 ”</i>
    </div>

  </div>
</template>
<script>
  import axios from "axios";
  export default{
      name:'authorSec',
      props:['id'],
      data(){
          return {
            getContent:false,
            authorData:{}
          }
      },
    created(){

      this.$root.Bus.$on('getAuthor', value => {
        this.authorData =value ;
        this.getContent = false;
      });
      this.$root.Bus.$on('needLoading',(value) => {
        console.error('loading');
        this.getContent = true;
      });
    },
    beforeDestroy() {
//      this.$root.Bus.$off('getAuthor');
    },



  }
</script>
<style>

</style>
