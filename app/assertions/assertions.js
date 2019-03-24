"use strict";

const {AssertionError} = require('wendigo').Errors;
const VueNotAssertions = require('./not_assertions');
const StoreAssertions = require('./store_assertions');

module.exports = class VueAssertions {
    constructor(browser, vuePlugin) {
        this._plugin = vuePlugin;
        this._storeAssertions = new StoreAssertions(vuePlugin.store);
        this._notAssertions = new VueNotAssertions(browser, vuePlugin, this);
    }

    get not() {
        return this._notAssertions;
    }

    get store() {
        return this._storeAssertions;
    }

    detected() {
        if (!this._plugin.detected) throw new AssertionError("assert.vue.detected", "Vue not detected.");
    }
};
