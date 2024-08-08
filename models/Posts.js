const mongoose= require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

//post feed schema
const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        require: true,       
    },

    desc:{
        type:String,
        require: true,
        max:500,
        
    },
    comment:{
        type:Array,
        default:[]       
    }

},
{timestamps:true});

module.exports = mongoose.model("Posts", PostSchema);