// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import store from './store'

Vue.config.productionTip = false;

// Components
import App from './App.vue'

import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Catalog from './pages/Catalog.vue'
import Product from './components/Product.vue'

Vue.use(VueFire);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        // {path: '/', component: Auth},
        // {path: '/catalog', component: App},
        {path: '/product/:key', name: 'product', component: Product},
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/', component: Catalog }
    ]
});


window.Vue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});