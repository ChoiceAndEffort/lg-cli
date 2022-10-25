import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home.vue';
import Index from '../views/index.vue';
import { AppMain } from 'gggj_lib';
import pkg from '../../package.json';
// console.log(pkg.name);
Vue.use(Router);

const routes = [
  {
    path: `/layout/${pkg.name}`,
    name: 'index',
    component: Index,
    redirect: `/layout/${pkg.name}/home`,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      }
    ]
  }
];

export default routes;
