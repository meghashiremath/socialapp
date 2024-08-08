const mongoose= require("mongoose");

//user schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:5,
        max:20,
        unique:false
        
    },
    email:{
        type:String,
        require: true,
        max:20,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min:5
    },
    friends:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},
{timestamps:true});

module.exports = mongoose.model("User", UserSchema);