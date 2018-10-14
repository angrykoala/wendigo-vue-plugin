"use strict";

const assert = require('assert');
const Wendigo = require('wendigo');
const configUrls = require('../config.json').urls;
const utils = require('../test_utils');

describe("Vue Store", function() {
    this.timeout(5000);
    let browser;

    before(async() => {
        browser = await Wendigo.createBrowser();
    });
    after(async() => {
        await browser.close();
    });


    it("Get Store State With Key", async() => {
        await browser.open(configUrls.index);
        const count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
    });

    it("Get Complete Store State", async() => {
        await browser.open(configUrls.index);
        const state = await browser.vue.store.getState();
        assert.strictEqual(state.count, 0);
        assert.strictEqual(state.user.uid, "42");
        assert.strictEqual(state.user.name, "arthur");
    });

    it("Vue Not Detected Error", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.vue.store.getState();
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("State Update", async() => {
        await browser.open(configUrls.index);
        let count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
        await browser.clickText("Add");
        count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 1);
    });
});
