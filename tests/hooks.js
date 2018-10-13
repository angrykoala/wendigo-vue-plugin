"use strict";

const dummyServer = require('./dummy_server/index.js');
const Wendigo = require('wendigo');
const WendigoVuePlugin = require('../index.js');

before(() => {
    Wendigo.registerPlugin(WendigoVuePlugin);
    return dummyServer(3457);
});

after(async() => {
    await Wendigo.stop();
    dummyServer.close();
});
