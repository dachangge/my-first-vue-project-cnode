<template>
  <div>
        <div class="aside-header">
          <router-link to="/">主页</router-link>/
          <span>发布话题</span>
        </div>
    <div class="aside-content">
      <div>
        <el-form>
          <el-form-item label="选择版块">
          <el-select v-model="topicCnt.tab" placeholder="请选择">
            <!--<el-option label="问答" value="ask"></el-option>-->
            <!--<el-option label="分享" value="share"></el-option>-->
            <!--<el-option label="招聘" value="job"></el-option>-->
            <el-option label="测试" value="dev"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item >
            <el-input v-model="topicCnt.title" placeholder="标题字数10字以上"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <mavon-editor v-model="topicCnt.content" v-bind:subfield="false" v-bind:toolbars="toolbars" style="min-height:500px;"/>
      <el-button type="primary" :disabled="btnName !='提交'" style="margin:1rem 0;" @click="submitTopic">{{btnName}}</el-button>
    </div>
  </div>
</template>
<script>
  import VueMarkdown from 'vue-markdown';
  import axios from "axios";
  import {ACCESSTOKEN} from "../main";
  import router from "../router";
  export const TOOLBARS={
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
//    link: true, // 链接
//    imagelink: true, // 图片链接
    code: true, // code
//    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
//    htmlcode: true, // 展示html源码
    help: true, // 帮助
    trash: true, // 清空
    preview: true, // 预览
  }

  export default {
      name:'topicCreate',
    data(){
      return {
          topicCnt:{},
          toolbars:TOOLBARS,
          btnName:'提交'
      }
    },
    methods:{
      submitTopic(){
        if(!this.topicCnt.title ||!this.topicCnt.content || !this.topicCnt.tab ){
              return alert('请先编辑完整内容！');
        }
          this.btnName = "提交中";
          axios.post("https://cnodejs.org/api/v1/topics",{
            accesstoken:ACCESSTOKEN,
            title:this.topicCnt.title,
            tab:'dev',
            content:this.topicCnt.content
          }).then(res=>{
              if(res.status == 200){
                  router.push({ name: 'topic', params: {id:res.data.topic_id }});
              }
          })
      }
    },
    components:{
        VueMarkdown
      }
  }
</script>
<style>

</style>
