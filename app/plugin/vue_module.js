"use strict";

const {VueNotFoundError, FatalError} = require('../errors');

module.exports = class VueModule {
    constructor(plugin, browser) {
        this._plugin = plugin;
        this._browser = browser;
    }

    _validateAction(name) {
        if (!this._browser.loaded) throw new FatalError(name, `Cannot perform action before opening a page.`);
        if (!this._plugin.detected) throw new VueNotFoundError(name);
    }
};
