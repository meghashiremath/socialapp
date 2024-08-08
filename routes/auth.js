const router= require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");

// register
router.post("/register", async(req,res)=>{
    
    //registerring the user details
    try{ 
        //encrypting the user password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
       

        // entering the user details
        const newUser= await new User({
            username:req.body.username,
            email:req.body.email,
            password: hash,
        })
       // save the user details
        const user= await newUser.save();
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json(error)} }  )    ;             


    //login
    router.post("/login", async(req,res)=>{
        try{ const user= await User.findOne({email:req.body.email});
                !user && res.status(404).send("user not found");
                const validPassword= await bcrypt.compare(req.body.password, user.password);
                !validPassword && res.status(400).send("wrong password");

                res.status(200).json(user)
            }
        catch(error){
            res.status(500).json(error)}
    });


module.exports = router; 