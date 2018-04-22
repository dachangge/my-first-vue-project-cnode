/**
 * Created by dcg on 2018/4/18.
 */
import Vue from "vue";
import Router from 'vue-router';
import MainSec from './components/MainSec.vue';
import TopicSec from "./components/topicSec.vue";
import UserSec from "./components/UserSec.vue";
import TopicCreate from "./components/TopicCreate.vue";
import MarkdownHelp from "./components/MakerdownHelp.vue"
import AuthorSec from "./components/AuthorSec.vue";
Vue.use(Router);
export default new Router({

    routes:[
      {
        path:'/',
        name:"home",
        components:{
          default:MainSec,
          aside:UserSec
        },
        props:{
          default:(route)=>({query:route.query.q}),
          aside:(route)=>({query:route.query.q})
        }
      },
      {
        path:'/topic/create',
        name:'topicCreate',
        components:{
          default:TopicCreate,
          aside:MarkdownHelp
        },
      },
      {
        path:'/topic/:id',
        name:'topic',
        props:{default:true,aside:true},
        components:{
          default:TopicSec,
          aside:AuthorSec
        },
      },

        // {
        //     path:'/home',
        //     name:'home',
        //     component:HelloWorld,
        //
        // },
        // {
        //     path:'/user/:id',
        //     name:'user',
        //     component:UserPage,
        //   //嵌套的子路由
        //   //   children: [
        //   //     {
        //   //       // 当 /user/:id/profile 匹配成功，
        //   //       // UserProfile 会被渲染在 User 的 <router-view> 中
        //   //       path: 'profile',
        //   //       component: UserProfile
        //   //     },
        //   //     {
        //   //       // 当 /user/:id/posts 匹配成功
        //   //       // UserPosts 会被渲染在 User 的 <router-view> 中
        //   //       path: 'posts',
        //   //       component: UserPosts
        //   //     }
        //   //   ]
        // },
    ]
})

