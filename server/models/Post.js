const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    text :{
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref :'user'
    },
    likes:{
        type: Array,
    },
    comments:{
        type : Array
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Post = mongoose.model('post', PostSchema);