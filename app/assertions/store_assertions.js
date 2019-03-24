"use strict";

const {AssertionError} = require('wendigo').Errors;
const utils = require('../utils');

module.exports = class StoreAssertions {
    constructor(store) {
        this._store = store;
    }

    state(key, expected, msg) {
        this._store._validateAction("assert.vue.store.state");
        return this._store.getState(key).then((value) => {
            let areEqual;
            if (typeof expected === 'object') areEqual = utils.compareObjects(expected, value);
            else areEqual = value === expected;
            if (!areEqual) {
                if (!msg) msg = `Expected state "${key}" to be "${utils.stringify(expected)}", "${utils.stringify(value)}" found.`;
                throw new AssertionError("assert.vue.store.state", msg);
            }
        });
    }

    getter(key, expected, msg) {
        this._store._validateAction("assert.vue.store.getter");
        return this._store.getter(key).then((value) => {
            let areEqual;
            if (typeof expected === 'object') areEqual = utils.compareObjects(expected, value);
            else areEqual = value === expected;
            if (!areEqual) {
                if (!msg) msg = `Expected getter "${key}" to be "${utils.stringify(expected)}", "${utils.stringify(value)}" found.`;
                throw new AssertionError("assert.vue.store.getter", msg);
            }
        });
    }
};
