"use strict";

const Vue = require('vue/dist/vue.common');
const Vuex = require('vuex');
const VueRouter = require('vue-router').default;


Vue.use(VueRouter);
Vue.use(Vuex);
const router = require('./router');
const store = require('./store');


window.Vue=new Vue({ // eslint-disable-line
    el: '#container',
    data() {
        return {
            test: "hehe"
        };
    },
    store: store,
    router: router
});
