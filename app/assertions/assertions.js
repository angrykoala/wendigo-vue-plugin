"use strict";

const {AssertionError} = require('wendigo').Errors;
const VueNotAssertions = require('./not_assertions');

module.exports = class VueAssertions {
    constructor(browser, vuePlugin) {
        this._plugin = vuePlugin;
        this._notAssertions = new VueNotAssertions(browser, vuePlugin, this);
    }

    get not() {
        return this._notAssertions;
    }

    detected() {
        if (!this._plugin.detected) throw new AssertionError("Vue not detected.");
    }
};
