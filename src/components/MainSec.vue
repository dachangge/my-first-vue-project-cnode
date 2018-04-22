<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" @click="getData('all')">全部</el-menu-item>
      <el-menu-item index="1" @click="getData('ask')">问答</el-menu-item>
      <el-menu-item index="2"  @click="getData('share')">分享</el-menu-item>
      <el-menu-item index="3"  @click="getData('job')">招聘</el-menu-item>
      <el-menu-item index="4"  @click="getData('good')">精华</el-menu-item>
      <el-menu-item index="5"  @click="getData('dev')">测试</el-menu-item>
    </el-menu>
    <div >

    </div>
    <div class="msg_row" v-for="item of items"  @mouseover="addUnderLine" @mouseout="removeUnderLine">
      <img :src="item.author.avatar_url" alt="">
      <span style="background: green;" v-if="item.top" >置顶</span>
      <span style="background: #aaa;" v-if="item.good">精品</span>
      <span v-if="!item.top && !item.good" style="opacity: 0;">展位</span>
      <strong @click="goToUrl(item.id)">{{item.title}}</strong>
      <b style="float: right;font-size:0.8rem;font-weight: normal;color:#ccc;">{{item.date}}</b>
    </div>
  </div>

</template>
<script>
  import router from "../router"
  import  axios from "axios";
  export function calcDate(str){
    let date =new Date(str);
    let date2 = new Date();
    if(date2.getFullYear() != date.getFullYear()){
      return date2.getFullYear() - date.getFullYear()+'年前';
    }
    else if(date2.getMonth() != date.getMonth()){
      return date2.getMonth() - date.getMonth()+'月前';
    }
    else if(date2.getDate() != date.getDate()){
      return date2.getDate() - date.getDate()+'天前';
    }
    else if(date2.getHours() != date.getHours()){
      return date2.getHours() - date.getHours()+'小时前';
    }
    else if(date2.getMinutes() != date.getMinutes()){
      return date2.getMinutes() - date.getMinutes()+'分前';
    }
    else if(date2.getSeconds() != date.getSeconds()){
      return date2.getSeconds() - date.getSeconds()+'秒前';
    }
  }
  export default {
      name:'mainSec',
      data(){
          return {
            activeIndex:'0',
            items:[]
          }
      },
    mounted(){
      this.activeIndex='0';
      this.getData('all');
    },
      methods:{
//        calcDate(str){
//            let date =new Date(str);
//            let date2 = new Date();
//            if(date2.getFullYear() != date.getFullYear()){
//                return date2.getFullYear() - date.getFullYear()+'年前';
//            }
//            else if(date2.getMonth() != date.getMonth()){
//                return date2.getMonth() - date.getMonth()+'月前';
//            }
//            else if(date2.getDate() != date.getDate()){
//                return date2.getDate() - date.getDate()+'天前';
//            }
//            else if(date2.getHours() != date.getHours()){
//                return date2.getHours() - date.getHours()+'小时前';
//            }
//            else if(date2.getMinutes() != date.getMinutes()){
//                return date2.getMinutes() - date.getMinutes()+'分前';
//            }
//            else if(date2.getSeconds() != date.getSeconds()){
//                return date2.getSeconds() - date.getSeconds()+'秒前';
//            }
//        },
        getData(str){
          router.push({name:'home',query:{tab:str}});
            axios.get("https://cnodejs.org/api/v1/topics",{
                params:{
                    tab:str
                }
            }).then(res=>{
                console.log(res);
                if(res.status == 200){
                    this.items = res.data.data;
                    this.items.forEach(it=>{
                        it.date = calcDate(it.last_reply_at);
                    })
                }
            }).catch(err=>{
                console.error(err);
            })
        },
        handleSelect(a,b){
            console.log(a,b);
        },
        addUnderLine(e){
            if(e.target.tagName == 'STRONG'){
              e.target.style.textDecoration='underline';
            }
            if(e.target.className == 'msg_row'){
              e.target.style.backgroundColor = '#eee';
            }
        },
        removeUnderLine(e){
          if(e.target.tagName == 'STRONG') {
            e.target.style.textDecoration = 'none';
          }
          if(e.target.className == 'msg_row'){
            e.target.style.backgroundColor = '';
          }
        },
        goToUrl(id){
          router.push({ name: 'topic', params: {id:id }});
        }
      }
}
</script>
<style>
div.msg_row{
  height:2.4rem;
  padding:10px;
  border-bottom:1px solid #f0f0f0;
  line-height:2.4rem;
  position: relative;
  text-overflow: ellipsis;
}
  div.msg_row > img{
    height:100%;
  }
div.msg_row > span{
  font-size:0.8rem;
  padding:0.1rem;
  border-radius: 0.3rem;
  vertical-align: top;
  cursor: default;
  }
  div.msg_row strong{
    max-width: 70%;
    display: inline-block;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

</style>
