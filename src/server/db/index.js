let dbconfig = require('./mongo').default;

export const connect = dbconfig.connect;
export const controllers = dbconfig.controllers;