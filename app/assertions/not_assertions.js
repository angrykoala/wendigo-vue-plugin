"use strict";

const {AssertionError} = require('wendigo').Errors;

module.exports = class VueAssertions {
    constructor(browser, vuePlugin, vueAssertions) {
        this._assertions = vueAssertions;
        this._plugin = vuePlugin;
    }

    detected() {
        if (this._plugin.detected) throw new AssertionError("assert.vue.not.detected", "Expected Vue to not be detected.");
    }
};
