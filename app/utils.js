"use strict";

const {AssertionError} = require('./errors');
module.exports = {
    invertify(cb, msg) {
        return cb().then(() => {
            return Promise.reject(new AssertionError(msg));
        }, (err) => {
            if (err instanceof AssertionError) return Promise.resolve();
            else return Promise.reject(err);
        });
    },
    compareObjects(obj1, obj2) {
        if (!obj1 || !obj2) return false;
        const k1 = Object.keys(obj1);
        const k2 = Object.keys(obj2);
        if (k1.length !== k2.length) return false;
        for (const k of k1) {
            if (obj1[k] !== obj2[k]) return false;
        }
        return true;
    },
    stringify(element) {
        if (typeof element === 'object' && !(element instanceof RegExp)) {
            element = JSON.stringify(element);
        }
        return String(element);
    }
};
