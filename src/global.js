import Vue from 'vue';
import router from './router';
import config from './config';
import filters from './filters';
import directives from './directives';
import enums from './utils/enums';
import database from './utils/database';
import _ from './utils/lodash';
import utils from './utils';
import api from './api'
import './api/config';
import echarts from 'echarts';
import dayjs from 'dayjs';
import sqlFormatter from "sql-formatter";
// import api from './api/index';
// import login from './utils/password';

// Vue.prototype.$login = login;
Vue.prototype.$config = config;
Vue.prototype.$enums = enums;
Vue.prototype.$filters = filters;
Vue.prototype.$apis = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$sqlfmt = sqlFormatter;
Vue.prototype.$database = database;
// 全局注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

// 全局注册指令
for (let key in directives) {
  const directiveName = _.kebabCase(key);
  Vue.directive(directiveName, directives[key]);
}

// Vue.prototype.$api = api

Vue.prototype.$_ = _;

Vue.prototype.$utils = utils;

Vue.prototype.$dayjs = dayjs;

Vue.prototype.$search = async (table) => {
  if (table && table.api) {
    let query = _.cloneDeep(table.query) || {};
    if (!table.hidePagination) {
      query.pageNum = table.pagination.pageNum;
      query.pageSize = table.pagination.pageSize;
    }
    table.loading = true;
    try {
      let resp = null;
      if (table.apiMethod){
        resp = await Vue.prototype.$get(table.api, query)
      } else {
        resp = await Vue.prototype.$post(table.api, query)
      }
      let data = resp.data;
      table._empty = data.list && data.list.length > 0 ? false : true
      let number = ((parseInt(data.pageNum) - 1) * parseInt(data.pageSize)) + 1;
      data.list.forEach(item => {
        Vue.set(item, 'number', number);
        // item.number = number;
        number++;
      });
      if (table.hiddenFields) {
        data.list.forEach(item => {
          Vue.set(item, 'hiddenFields', true);
        });
      }
      table.data = data.list;
      table.pagination.total = data.total;
      if (table.selection && table.selection.init.length > 0 && table.ref) {
        table.data.forEach((row) => {
          let index = table.selection.init.findIndex(item => item.selectId === row.selectId && item.flag === 0)
          if (index >= 0) {
            table.ref.$refs['ycTable'].toggleRowSelection(row, true);
            table.selection.init[index].flag = 1
          }
        })
      }
      // console.log(table)
    } catch (e) {
      console.log(e);
    }
    table.loading = false;
  }
}

// 用来控制table组件传入的参数, 保证里面的对象都有
  Vue.prototype.$standardTableData = table => {
    const _table = {
      loading: false,
      api: null,
      query: {},
      searchData: [],
      hasCheckbox: false,
      columns: [],
      pagination: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
    return Object.assign(_table, table);
  }
Vue.prototype.$noPageSearch = async table => {
  if (table && table.api) {
    let query = _.cloneDeep(table.query) || {};
    if (!table.hidePagination) {
      query.pageNo = table.pagination.pageNo;
      query.pageSize = 10;
    }
    table.loading = true;
    try {
      let data = await Vue.prototype.$post(table.api, query);
      if (data instanceof Array) {
        table.data = data;
      } else {
        table.data = data.list;
        table.pagination.total = data.total;
      }
    } catch (e) {
      console.log(e);
    }
    table.loading = false;
  }
}

Vue.prototype.$userInfo = () => {
  let u = sessionStorage.getItem('userInfo');
  if (!u) {
    return router.replace({
      name: 'Login'
    })
  }
  return JSON.parse(u);
}

// Vue.prototype.$validatePermission = (url) => {
//   if (!sessionStorage.getItem('buttonList')) return false;
//   let buttonList = JSON.parse(sessionStorage.getItem('buttonList'));
//   // return buttonList.some(t => t.pageUrl === url)
//   console.log(buttonList.includes(url));
//   return buttonList.includes(url);
// }

// Vue.prototype.$downloadFile = url => {
//   if (!url) return;
//   window.open(url);
//   // window.location.target = '_blank'
//   // window.location.href = url
// }

// Vue.prototype.$exportFile = (url, query) => {
//   if (!url) return
//   let str = '?'
//   for (let item in query) {
//     if (!query.hasOwnProperty(item)) continue
//     if (query[item] && item !== 'pageNo' && item !== 'pageSize') {
//       str += `${item}=${query[item]}&`
//     }
//   }
//   const exportUrl = config.apiBaseUrl + url + str.substr(0, str.length - 1)
//   if (process.env.NODE_ENV === 'development') {
//     window.open('https://efi-dev.yun-chang.com' + exportUrl)
//   } else {
//     window.open(exportUrl)
//   }
// }
