const mongoose = require('mongoose');
const {dbHost, dbName, dbPort} = require('./config')

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}?authSource=admin`);

const db = mongoose.connection;
module.exports = db;