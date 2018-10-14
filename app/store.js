/* global WendigoVuePlugin */
"use strict";

const {VueNotFoundError} = require('./errors');

module.exports = class VueStore {
    constructor(plugin, browser) {
        this._plugin = plugin;
        this._browser = browser;
    }

    getState(key) {
        if (!this._plugin.detected) return Promise.reject(new VueNotFoundError());
        return this._browser.evaluate((k) => {
            const store = WendigoVuePlugin.vue.$store;
            if (!store) return null;
            if (k) return store.state[k];
            else return store.state;
        }, key);
    }
};
