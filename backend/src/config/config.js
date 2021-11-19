"use strict";
exports.__esModule = true;
var config = {
    mongo: {
        option: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            autoIndex: false,
            retryWrites: false
        },
        url: 'mongodb://localhost/blog-mern-ts'
    },
    server: {
        host: "localhost",
        port: 5000
    }
};
exports["default"] = config;
