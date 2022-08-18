//Import mongoose
const mongoose =  require('mongoose');
//Create schema definition using mapping notation & define what I want my data 
const booksSchemaDefinition = {
    booktitle: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    genre: {
        type: String,
        required: true
    },
    readingday: {
        type: Date
    },
    review: {
        type: String
    }
}
//Create a mongoose schema using the definition object
const booksSchema =  new mongoose.Schema(booksSchemaDefinition);

//Create a mongoose model using the mongoose schema
module.exports = mongoose.model('Book', booksSchema);

