'use strict';
const colors = require('colors/safe');
const Mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/pos'
const err = console.error;
const log = console.log;

module.exports = {
    connect: () => {
        Mongoose.connect(mongoUrl);

        Mongoose.connection.on('error', (e) => {
            err('Mongoose can not open connection');
            err(e);
            process.exit();
        });

        Mongoose.connection.on('connected', () => {
            log(colors.green('Connection DB ok', mongoUrl));
            // Mongoose.set('debug', true);
        });

        Mongoose.connection.on('disconnected', () => {
            err(colors.red('Connection DB lost'));

            setTimeout(() => {
                Mongoose.connect(mongoUrl);
                err('DB reconnection');
            }, 15000);
        });
    }
};