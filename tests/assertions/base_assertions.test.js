"use strict";

const Wendigo = require('wendigo');
const configUrls = require('../config.json').urls;
const utils = require('../test_utils');

describe("Base Assertions", function() {
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
        await browser.assert.vue.detected();
    });

    it("Vue Detected Throws", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.detected();
        }, `[assert.vue.detected] Vue not detected.`);
    });

    it("Vue Is Not Detected", async() => {
        await browser.open(configUrls.notVue);
        await browser.assert.vue.not.detected();
    });

    it("Vue Not Detected Throws", async() => {
        await browser.open(configUrls.index);
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.not.detected();
        }, `[assert.vue.not.detected] Expected Vue to not be detected.`);
    });
});
