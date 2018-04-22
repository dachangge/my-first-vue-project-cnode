<template>
  <div class="container" v-loading = "getContent" >
    <h1>
      <span class="spanBtn" style="background: green;" v-if="top" >置顶</span>
      <span class="spanBtn" style="background: #aaa;" v-if="good">精品</span>
      <span class="title">{{title}}</span>
    </h1>
    <hr>
    <div v-html="content">
    </div>
    <reply-sec :reply="replies" :id="id" v-on:refresh="refresh"></reply-sec>
    <div class="topic-reply" style="margin-top: 1rem;" >
      <div class="aside-header">
            添加回复
      </div>
      <mavon-editor v-model="newreply" v-bind:subfield="false" v-bind:toolbars="toolbars" style="min-height:300px;"/>
      <el-button type="success" style="margin: 1rem 0;" :disabled="btnName != '回复'" @click="replyTopic" >{{btnName}}</el-button>

    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import ReplySec from "./ReplySec.vue";
  import { Loading } from 'element-ui';
  import {TOOLBARS} from "./TopicCreate.vue";
  import {ACCESSTOKEN} from "../main";
  export default{
    props: ['id'],
    components:{
      ReplySec
    },
    data(){
        return {
          getContent:true,
          content:'',
          top:false,
          good:false,
          title:"",
          replies:[],
          toolbars:TOOLBARS,
          newreply:'',
          btnName:'回复'
        }
    },
    name:'topicSec',
    methods:{
        refresh(){
          this.getContent = true;
          this.$root.Bus.$emit('needLoading',this.id);
          axios.get('https://cnodejs.org/api/v1/topic/'+this.id).then(res=>{
            this.getContent = false;
            if(res.status == 200){
              this.top = res.data.data.top;
              this.good = res.data.data.good;
              this.title = res.data.data.title;
              this.content = res.data.data.content;
              this.replies = res.data.data.replies;
              this.btnName = "回复";
              this.$root.Bus.$emit('getAuthor',res.data.data.author);
            }
          }).catch(err=>{
            this.getContent = false;
            console.error(err);
          })
        },
      replyTopic(){
            this.btnName = "回复中";
          axios.post("https://cnodejs.org/api/v1/topic/"+this.id+"/replies",{
            accesstoken:ACCESSTOKEN,
            content:this.newreply,
          }).then(res=>{
              if(res.status == 200){
                  this.refresh();
              }

          }).catch(error=>{
              console.error(error);
          })
      }
    },
    mounted(){
//        document.sr
        this.refresh();

    }
  }
</script>
<style>
.container{
  min-height:calc(100vh - 3rem);
}
.spanBtn{
  border-radius: .2rem;
  padding:0 .3rem ;
}
span.title{
  font-size:1.5rem;
}
.container img{
  height: auto;
  max-width: 100%;
}
</style>
