const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

const schemaDefinition = {
    username: { type: String },
    password: { type: String }
}

const mongooseSchema = new mongoose.Schema(schemaDefinition);

mongooseSchema.plugin(plm);

module.exports = new mongoose.model('User', mongooseSchema);