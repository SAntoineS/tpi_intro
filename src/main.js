import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import './index.css';
import notFound from "@/404notFound/notFound";
import mainPage from "@/mainPage/mainPage";
import accountPage from "@/accountPage/accountPage";
import basketPage from "@/basketPage/basketPage";
import gameInfoPage from "@/gameInfoPage/gameInfoPage";

library.add(fas);
library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: mainPage },
    { path: '/account', component: accountPage },
    { path: '/basket', component: basketPage },
    { path: '/game/:gameName', component: gameInfoPage },
    { path: '/*', component: notFound}
  ]
});

Vue.config.silent = true;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
