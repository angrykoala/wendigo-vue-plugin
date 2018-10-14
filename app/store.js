/* global WendigoVuePlugin */
"use strict";

const {VueNotFoundError, FatalError} = require('./errors');

module.exports = class VueStore {
    constructor(plugin, browser) {
        this._plugin = plugin;
        this._browser = browser;
    }

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


    _validateAction() {
        if (!this._browser.loaded) throw new FatalError(`Cannot perform action before opening a page.`);  // eslint-disable-line
        if (!this._plugin.detected) throw new VueNotFoundError();
    }
};
