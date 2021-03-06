/* global WendigoVuePlugin */
"use strict";

const path = require('path');
const config = require('../../config');
const VueStore = require('./store');
const VueRouter = require('./router');

const injectionScriptsPath = config.injectionScripts.path;
const injectionScripts = config.injectionScripts.files;

module.exports = class VuePlugin {
    constructor(browser) {
        this._browser = browser;
        this._store = new VueStore(this, browser);
        this._router = new VueRouter(this, browser);
        this._vueDetected = false;
    }

    get detected() {
        return Boolean(this._vueDetected);
    }

    get store() {
        return this._store;
    }

    get router() {
        return this._router;
    }

    _afterOpen() {
        const promises = injectionScripts.map((s) => {
            return this._browser.page.addScriptTag({ // Not using wrapper as this is before loaded is true
                path: path.join(injectionScriptsPath, s)
            });
        });
        return Promise.all(promises).then(() => {
            return this._browser.evaluate(() => {
                return WendigoVuePlugin.detectVue();
            }).then((detected) => {
                this._vueDetected = detected;
            });
        });
    }
};
