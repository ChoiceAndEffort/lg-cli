import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
import './assets/styles/common.scss';
import './assets/styles/public-page.scss';

import pkg from '../package.json';

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  //props-基座传递过来的参数
  const { container, defaultSettings } = props;
  const propsStore = props.store;
  router = new VueRouter({
    mode: 'hash',
    routes
  });

  router.beforeResolve((to, from, next) => {
    addVisitedViews(to);
    next();
  });

  function addVisitedViews(to) {
    let tabsArr =
      propsStore?.getters.menuList[propsStore?.getters.menuLevel1Active]
        .children;
    if (defaultSettings?.whiteList.find((whitePath) => to.path == whitePath))
      return; //白名单
    if (propsStore?.getters.visitedViews.find((item) => to.path == item.path))
      return; //已有
    if (tabsArr?.[0].action == to.path) return; //首页
    propsStore?.commit('app/ADD_VISITEDVIEWS', {
      hash: to.hash,
      meta: to.meta,
      params: to.params,
      path: to.path,
      query: to.query
    });
  }

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(
    container ? container.querySelector(`#${pkg.name}`) : `#${pkg.name}`
  );
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  // console.log("[vue] vue app bootstraped");
}
export async function mount(props) {

  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
