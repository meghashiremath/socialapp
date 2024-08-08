const router= require("express").Router();
const { text } = require("express");
const Post = require("../models/Posts");


//create a post-feed
router.post("/",async(req,res)=>{
    const newPost=  new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    }
    catch(error){
        res.status(500).json(error);
    };
});

// comment on th post
router.put("/:id/comment",async(req,res)=>{
    try{        
        const post =await Post.findById(req.params.id);
        if(!post.comment.includes(req.body.userId)){
            await post.updateOne({$push:{comment:req.body.userId}})
            res.status(200).json("the post got a comment from the friend");
        } else{
            await post.updateOne({$pull:{comment:req.body.userId}})
            res.status(200).json("the post dont have  a comment from the friend");
        }
    }
    catch(error){
        res.status(500).json(error);
    };
})


//getting the friends on post feed
router.get("/timeline", async(req,res)=>{
    
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._Id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => { 
                return Post.find({userId: friendId})})
        )
        res.json(userPosts.concat(...friendPosts))
    }
    catch(error){
        res.status(500).json(error);
    };
})



module.exports = router; 