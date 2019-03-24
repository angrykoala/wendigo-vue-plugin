"use strict";

const {FatalError} = require('wendigo').Errors;

class VueNotFoundError extends FatalError {
    constructor(name) {
        super(name, "Vue not detected.");
    }
}

module.exports = {
    VueNotFoundError: VueNotFoundError,
    FatalError: FatalError
};
