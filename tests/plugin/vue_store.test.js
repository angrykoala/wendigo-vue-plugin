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

    beforeEach(async() => {
        await browser.open(configUrls.index);
    });

    after(async() => {
        await browser.close();
    });


    it("Get Store State With Key", async() => {
        const count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
    });

    it("Get Store State Invalid Key", async() => {
        const test = await browser.vue.store.getState("not-a-key");
        assert.strictEqual(test, undefined);
    });

    it("Get Complete Store State", async() => {
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

    it("Get Store State Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.vue.store.getState("count");
        }, `FatalError: Cannot perform action before opening a page.`);

        browser2.close();
    });

    it("State Update", async() => {
        let count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
        await browser.clickText("Add");
        count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 1);
        await browser.assert.text("#count", "1");
    });

    it("Commit", async() => {
        let count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
        await browser.vue.store.commit("addOne");
        count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 1);
        await browser.assert.text("#count", "1");
    });

    it("Commit Vue Not Detected", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.vue.store.commit("addOne");
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("Commit Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.vue.store.commit("addOne");
        }, `FatalError: Cannot perform action before opening a page.`);

        browser2.close();
    });

    it("Commit Invalid Method", async() => {
        await browser.vue.store.commit("not-a-commit");
        const count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
        await browser.assert.text("#count", "0");
    });

    it("Dispatch", async() => {
        const result = await browser.vue.store.dispatch("addTwoAction");
        assert.strictEqual(result, 2);
        const count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 2);
        await browser.assert.text("#count", "2");
    });

    it("Dispatch Invalid Action", async() => {
        const result = await browser.vue.store.dispatch("fakeAction");
        assert.strictEqual(result, undefined);
        const count = await browser.vue.store.getState("count");
        assert.strictEqual(count, 0);
        await browser.assert.text("#count", "0");
    });

    it("Dispatch Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.vue.store.dispatch("addTwoAction");
        }, `FatalError: Cannot perform action before opening a page.`);
        browser2.close();
    });

    it("Dispatch Vue Not Detected", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.vue.store.dispatch("addTwoAction");
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("Dispatch With Promise Error");

    it("Getter", async() => {
        const count = await browser.vue.store.getter("getCount");
        assert.strictEqual(count, 0);
        await browser.assert.text("#count", "0");
    });

    it("Getter Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.vue.store.getter("getCount");
        }, `FatalError: Cannot perform action before opening a page.`);
        browser2.close();
    });

    it("Getter Vue Not Detected", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.vue.store.getter("getCount");
        }, `VueNotFoundError: Vue not detected.`);
    });
});
