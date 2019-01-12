"use strict";

const {FatalError} = require('wendigo').Errors;

class VueNotFoundError extends FatalError {
    constructor() {
        super("Vue not detected.");
    }
}

module.exports = {
    VueNotFoundError: VueNotFoundError,
    FatalError: FatalError
};
