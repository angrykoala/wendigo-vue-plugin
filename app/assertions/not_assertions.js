"use strict";

const {AssertionError} = require('wendigo').Errors;
// const utils = require('../utils');

module.exports = class VueAssertions {
    constructor(browser, vuePlugin, vueAssertions) {
        this._assertions = vueAssertions;
        this._plugin = vuePlugin;
    }

    detected() {
        if (this._plugin.detected) throw new AssertionError("Expected Vue to not be detected.");
    }
};
