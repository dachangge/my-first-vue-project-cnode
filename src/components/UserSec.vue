<template>
  <div >
    <div class="aside-header" >
      个人信息
    </div>
    <div class="aside-content">
      <img :src="userData.avatar_url" alt="">
      {{userData.loginname}}
      <div class="aside-content-score" style="margin:.6rem 0;">
        积分：{{userData.score}}
      </div>
      <i>“ 这家伙很懒，什么个性签名都没有留下。 ”</i>
    </div>
    <div class="create-topic" >
      <el-button type="success" size="medium" @click="goToCreate">发布话题</el-button>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import {ACCESSTOKEN} from "../main";
  import router from "../router";
  export default{
      name:'userSec',
      data(){
          return {
            userData:{}
          }
      },
      methods:{
        goToCreate(){
            router.push({name:"topicCreate"});
        }
      },
      mounted(){
          let data = localStorage.getItem(ACCESSTOKEN);
          if(data){
              this.userData = JSON.parse(data);
          }
          else{
            axios.post("https://cnodejs.org/api/v1/accesstoken",{accesstoken:ACCESSTOKEN}).then(res=>{
              if(res.status == 200){
                axios.get("https://cnodejs.org/api/v1"+"/user/"+res.data.loginname).then(r=>{
                  if(r.status == 200){
                      localStorage.setItem(ACCESSTOKEN,JSON.stringify(r.data.data));
                      this.userData = r.data.data;
                  }
                })

              }
            })
          }

      }
  }
</script>
<style>

</style>
