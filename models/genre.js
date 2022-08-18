const mongoose = require('mongoose');

const schemaDefinition = {
    name: {
        type: String,
        required: true
    }
};

const genresSchema = new mongoose.Schema(schemaDefinition);
module.exports = mongoose.model('Genre', genresSchema);