// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from "./router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export const ACCESSTOKEN="0c1f5d95-fe81-4796-9669-4d132f4d7ce1";
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$ELEMENT = {size:'small'};
/* eslint-disable no-new */
new Vue({
  el: '#app',
    router,
  components: { App },
  template: '<App/>',
  data(){
     return {
       Bus:new Vue()
     }
  }
})
