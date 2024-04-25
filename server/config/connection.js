const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://0.0.0.0:10000/googlebooks');

module.exports = mongoose.connection;
