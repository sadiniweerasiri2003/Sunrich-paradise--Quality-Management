const mongoose= require('mongoose');

const Schema=mongoose.Schema;
const replySchema=new Schema({
    inquiryid :{
        type : String,
        required: true
    },
    reply: {
        type: String,
        required:true
    }
})
    const Reply = mongoose.model('Reply', replySchema);

module.exports=Reply;