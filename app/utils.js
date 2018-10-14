"use strict";

const {AssertionError} = require('../errors');
module.exports = {
    invertify(cb, msg) {
        return cb().then(() => {
            return Promise.reject(new AssertionError(msg));
        }, (err) => {
            if (err instanceof AssertionError) return Promise.resolve();
            else return Promise.reject(err);
        });
    }
};
