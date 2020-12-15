import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'normalize.css';
// import store from "./store";
import './assets/icons/iconfont.css';
import './assets/sass/main.sass';
import './element';
import './components/global'
import './global';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./registerServiceWorker";
import Navigation from 'vue-navigation';
Vue.use(Navigation, {router});
Vue.use(ElementUI);
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'handsontable/dist/handsontable.full.css'
Vue.use(VueCodeMirror)
// Vue.use(echarts);
Vue.config.productionTip = false;
console.log(process.env);
new Vue({
  router,
  render: h => {
    Vue.prototype.$h = h
    return h(App)
  }
}).$mount('#app')
