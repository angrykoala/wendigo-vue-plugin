"use strict";

const assert = require('assert');
const Wendigo = require('wendigo');
const configUrls = require('../config.json').urls;
const utils = require('../test_utils');

describe("Vue Routes", function() {
    this.timeout(5000);
    let browser;

    before(async() => {
        browser = await Wendigo.createBrowser();
    });
    after(async() => {
        await browser.close();
    });


    it("Get All Routes", async() => {
        await browser.open(configUrls.index);
        const routes = await browser.vue.router.getAll();
        assert.strictEqual(routes.length, 3);
        assert.strictEqual(routes[0].name, "main-page");
        assert.strictEqual(routes[0].path, "/");
        assert.strictEqual(routes[0].redirect, undefined);
    });

    it("Vue Not Detected Error", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.vue.router.getAll();
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("Get All Routes Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.vue.router.getAll();
        }, `FatalError: Cannot perform action before opening a page.`);

        browser2.close();
    });
});
