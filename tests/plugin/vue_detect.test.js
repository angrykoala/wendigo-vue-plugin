"use strict";

const assert = require('assert');
const Wendigo = require('wendigo');
const configUrls = require('../config.json').urls;

describe("Vue Detect", function() {
    this.timeout(5000);
    let browser;

    before(async() => {
        browser = await Wendigo.createBrowser();
    });
    after(async() => {
        await browser.close();
    });


    it("Vue Is Detected", async() => {
        await browser.open(configUrls.index);
        assert.ok(browser.vue);
        assert.strictEqual(browser.vue.detected, true);
    });

    it("Vue Is Not Detected", async() => {
        await browser.open(configUrls.notVue);
        assert.ok(browser.vue);
        assert.strictEqual(browser.vue.detected, false);
    });
});
