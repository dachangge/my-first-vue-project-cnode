<template>
  <div class="reply">
    <div class="reply-header">
        {{reply?reply.length:0}}回复
    </div>
    <template  v-for="item of reply" class="reply_item" v-bind:class="{ goodReply: item.ups.length>=10 }">
      <span  style="float: right;color:#999;">
        <i class="el-icon-success doUp" ></i>{{item.ups?item.ups.length:0}}
        <i class="el-icon-edit-outline doUp" @click="replying(item)"></i>
      </span>
      <img :src="item.author.avatar_url" style="width:2.5rem;height:2.5rem;vertical-align: bottom" >
      <span class="user_link">{{item.author.loginname}}</span>
      <div v-html="item.content" class="reply_content"></div>
        <div v-show="item.replying">
          <mavon-editor v-model="item.replycontent" v-bind:subfield="false" v-bind:toolbars="toolbars" style="min-height:200px;"/>
          <el-button type="success" style="margin: 1rem 0;" :disabled="btnName != '回复'" @click="replyOther(item)" >{{btnName}}</el-button>
        </div>
    </template >
  </div>
</template>
<script>
  import axios from "axios";
  import {TOOLBARS} from "./TopicCreate.vue";
  import {ACCESSTOKEN} from "../main";
  export default {
      name:"replySec",
      props:['reply','id'],
      data(){
          return {
              btnName:'回复',
              toolbars:TOOLBARS,
              replyItem:{},
          }
      },
    methods:{
      replying(item){
          item.replying=true;
          item.replycontent = '@'+item.author.loginname;
      },
      replyOther(item){
          this.btnName = "回复中";
          axios.post("https://cnodejs.org/api/v1/topic/"+this.id+"/replies",{
            accesstoken:ACCESSTOKEN,
            content:item.replycontent,
            reply_id:item.id
          }).then(res=>{
              console.log(res);
              if(res.status == 200){
                  this.$emit('refresh');
                  this.btnName="回复";
              }
          }).catch(err=>{
              conole.log(res);
          })
      }
    }
  }

</script>
<style>
  .reply{
    margin-top:2rem;
    border:1px solid #ddd;
  }
  .reply-header{
    padding-left:2rem;
    background-color:#ddd;
    height:3rem;
    line-height: 3rem;
    border-top-left-radius: .2rem;
    border-top-right-radius: .2rem;
  }

  .user_link{
    color:#bbb;
  }
  .user_link:hover{
    color:#555;
    cursor: pointer;
  }
  .reply_item{
    border-bottom:1px solid #ddd;
    padding:.3rem;
  }
  .reply_content{
    padding: 1rem 1rem 1.5rem;
  }
  .doUp{
    margin-right: 0.5rem;
  }
  .doUp:hover{
    cursor: pointer;
  }
  .goodReply{
    background:#f4fcf0;
  }

</style>
