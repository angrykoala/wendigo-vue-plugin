"use strict";

const path = require('path');
const express = require('express');
const app = express();

app.use((req, res, next) => { // To avoid 304
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});
app.use("/", express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

let server;

function dummy(port) {
    return new Promise((resolve) => {
        server = app.listen(port, () => {
            // console.log(`Dummy Listening To ${port}`);
            resolve();
        });
    });
}

dummy.close = function() {
    server.close();
};

module.exports = dummy;

if (require.main === module) {
    dummy(8002).then(() => {
        console.log("Dummy Listening in 8002"); //eslint-disable-line
    });
}
