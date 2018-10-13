"use strict";
const path = require('path');

module.exports = {
    injectionScripts: {
        path: path.join(__dirname, "injection_scripts"),
        files: ["wendigo_vue_plugin.js"]
    }
};
