"use strict";

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


    it("Assert Store State", async() => {
        await browser.assert.vue.store.state("count", 0);
    });

    it("Assert Store State Fails", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.state("count", 2);
        }, `Expected state "count" to be "2", "0" found.`);
    });

    it("Assert Store State Fails, Key Doesn't Exists", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.state("notValue", 2);
        }, `Expected state "notValue" to be "2", "undefined" found.`);
    });

    it("Assert Store State Fails Custom Message", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.state("count", 2, "state fails");
        }, `state fails`);
    });

    it("Assert Store State Object", async() => {
        await browser.assert.vue.store.state("user", {
            uid: "42",
            name: "arthur"
        });
    });

    it("Assert Store State Object Fails", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.state("user", {
                uid: "45",
                name: "arthur2"
            });
        }, `Expected state "user" to be "{"uid":"45","name":"arthur2"}", "{"uid":"42","name":"arthur"}" found.`);
    });

    it("Vue Not Detected Error In State", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.assert.vue.store.state("count", 0);
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("Assert Store State Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.assert.vue.store.state("count", 0);
        }, `FatalError: Cannot perform action before opening a page.`);

        browser2.close();
    });

    it("Assert After State Update", async() => {
        await browser.clickText("Add");
        await browser.assert.vue.store.state("count", 1);
    });

    it("Assert Store Getter", async() => {
        await browser.assert.vue.store.getter("getCount", 0);
    });

    it("Assert Store Getter Fails", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.getter("getCount", 2);
        }, `Expected getter "getCount" to be "2", "0" found.`);
    });

    it("Assert Store Getter Fails, Key Doesn't Exists", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.getter("notValue", 2);
        }, `Expected getter "notValue" to be "2", "undefined" found.`);
    });

    it("Assert Store Getter Fails Custom Message", async() => {
        await utils.assertThrowsAssertionAsync(async() => {
            await browser.assert.vue.store.getter("getCount", 2, "getter fails");
        }, `getter fails`);
    });

    it("Vue Not Detected Error In Getter", async() => {
        await browser.open(configUrls.notVue);
        await utils.assertThrowsAsync(async() => {
            await browser.assert.vue.store.getter("getCount", 0);
        }, `VueNotFoundError: Vue not detected.`);
    });

    it("Assert Store Getter Before Open", async() => {
        const browser2 = await Wendigo.createBrowser();
        await utils.assertThrowsAsync(async() => {
            await browser2.assert.vue.store.getter("getCount", 0);
        }, `FatalError: Cannot perform action before opening a page.`);

        browser2.close();
    });

    it("Assert Getter After State Update", async() => {
        await browser.clickText("Add");
        await browser.assert.vue.store.getter("getCount", 1);
    });
});
