"use strict";

const VueRouter = require('vue-router').default;
const pageComponents = {
    anotherPage: require('./components/another_page.vue'),
    main: require('./components/main.vue')
};

module.exports = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'main-page',
        component: pageComponents.main
    }, {
        path: '/another',
        name: "another-page",
        component: pageComponents.anotherPage
    }, {
        path: '*',
        redirect: "/"
    }]
});
