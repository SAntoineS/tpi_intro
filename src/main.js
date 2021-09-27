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


import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'
Vue.component('Modal', VueModal)

import Notifications from 'vue-notification'
Vue.use(Notifications)

library.add(fas);
library.add(fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueRouter);

import CountryFlag from 'vue-country-flag'
Vue.component('country-flag', CountryFlag)

import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)

// Import the Auth0 configuration
import {domain, clientId} from "./auth/auth_config.json";
// Import the plugin here
import {Auth0Plugin} from "./auth";

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: mainPage},
        {
            path: '/account', component: accountPage
        },
        {path: '/basket', component: basketPage},
        {path: '/game/:gameName', component: gameInfoPage},
        {path: '/*', component: notFound}
    ]
});

Vue.config.silent = true;
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
