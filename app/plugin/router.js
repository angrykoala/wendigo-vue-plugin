/* global WendigoVuePlugin */
"use strict";

const VueModule = require('./vue_module');
const Route = require('../models/route');

module.exports = class VueStore extends VueModule {
    getAll() {
        this._validateAction();
        return this._browser.evaluate(() => {
            const items = [];
            WendigoVuePlugin.vue.$router.options.routes.forEach(route => {
                items.push({
                    name: route.name,
                    path: route.path,
                    redirect: route.redirect
                });
            });
            return items;
        }).then((rawRoutes) => {
            return rawRoutes.map(r => new Route(r));
        });
    }
};
