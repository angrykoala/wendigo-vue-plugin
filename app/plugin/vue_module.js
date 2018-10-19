"use strict";

const {VueNotFoundError, FatalError} = require('../errors');

module.exports = class VueModule {
    constructor(plugin, browser) {
        this._plugin = plugin;
        this._browser = browser;
    }

    _validateAction() {
        if (!this._browser.loaded) throw new FatalError(`Cannot perform action before opening a page.`);  // eslint-disable-line
        if (!this._plugin.detected) throw new VueNotFoundError();
    }
};
