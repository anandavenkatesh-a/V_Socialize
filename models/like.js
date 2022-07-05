

const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    likeable:{
        type:mongoose.Types.ObjectId,
        required:true,
        refPath: 'docModel'
    },
    docModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps:true
});
const Like = mongoose.model('Like',likeSchema);


module.exports = Like;