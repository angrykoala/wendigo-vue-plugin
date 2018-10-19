"use strict";


module.exports = class Route {
    constructor(data) {
        this.name = data.name;
        this.path = data.path;
        this.redirect = data.redirect;
    }
};
