/* global WendigoVuePlugin */
"use strict";

const VueModule = require('./vue_module');

module.exports = class VueStore extends VueModule {
    getState(key) {
        this._validateAction();
        return this._browser.evaluate((k) => {
            const store = WendigoVuePlugin.vue.$store;
            if (!store) return null;
            if (k) return store.state[k];
            else return store.state;
        }, key);
    }

    getter(key) {
        this._validateAction();
        return this._browser.evaluate((k) => {
            const store = WendigoVuePlugin.vue.$store;
            if (!store) return null;
            return store.getters[k];
        }, key);
    }

    commit(name, data) {
        this._validateAction();
        return this._browser.evaluate((n, d) => {
            const store = WendigoVuePlugin.vue.$store;
            return store.commit(n, d);
        }, name, data);
    }

    dispatch(name, data) {
        this._validateAction();
        return this._browser.evaluate((n, d) => {
            const store = WendigoVuePlugin.vue.$store;
            return store.dispatch(n, d);
        }, name, data);
    }
};
