const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    filename : {
        type : String,
        required :true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref  : 'user'
    },
    url : {
        type : String,
    },
    post : {
        type : mongoose.Types.ObjectId,
        ref : 'posts'
    }
})


module.exports = Image = mongoose.model('image', ImageSchema)