
const User =require("../models/User")
const router= require("express").Router();

//update user
router.put("/:id", async(req,res)=>{
    if(req.body.userId===req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        catch(error){
            res.status(500).json(error)
        }}
        try{
            const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            res.status(200).json("account update has been done")
        }
        catch(error){
            res.status(500).json(error)
        }
    }else{
        return  res.status(403).json("OOPs!!It is not your account...")} 
    }
);

//accept the friend request

router.put("/:id/accept", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user =await User.findById(req.params.id);
            const currentUser =await User.findById(req.body.userId);
            if(!user.friends.includes(req.body.userId)){
                await user.updateOne({ $push:{friends:req.body.userId}});
                await currentUser.updateOne({ $push:{following:req.body.userId}});
                res.status(200).json("user has been accepted")
        }else{
            return  res.status(403).json("you are already friend with this user ")} }
        catch(error){
            res.status(500).json("error")
    }}
    else{
        return  res.status(403).json("you can't make friend with yourself")} 
    
})
//unfriend the friend 

router.put("/:id/unfriend", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user =await User.findById(req.params.id);
            const currentUser =await User.findById(req.body.userId);
            if(user.friends.includes(req.body.userId)){
                await user.updateOne({ $pull:{friends:req.body.userId}});
                await currentUser.updateOne({ $pull:{following:req.body.userId}});
                res.status(200).json("user has been unfriended")
        }else{
            return  res.status(403).json("you are already unfriend with this user ")} }
        catch(error){
            res.status(500).json("error")
    }}
    else{
        return  res.status(403).json("you can't make unfriend with yourself")} 
    
})
module.exports=router