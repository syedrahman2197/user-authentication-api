const profileModel = require("../models/profile");

const createProfile = async(req,res)=>{
    const {title, description} = req.body;

    const newProfile = new profileModel({
        title: title,
        description : description,
        userId : req.user
    });

    try {
        
        await newProfile.save();
        res.status(201).json(newProfile);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const updateProfile = async(req,res)=>{
    
    const id = req.params.id;
    const {title, description} = req.body;

    const newProfile = {
        title : title,
        description: description,
        userId : req.userId
    }

    try {
        await profileModel.findByIdAndUpdate(id, newProfile, {new : true});
        res.status(200).json(newProfile);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const deleteProfile = async(req,res)=>{
    
    const id = req.params.id;
    try {
        
        const profile = await profileModel.findByIdAndRemove(id);
        res.status(202).json(profile);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

const getProfile = async(req,res)=>{
    
    try {
        
        const profiles = await profileModel.find({userId : req.user});
        res.status(200).json(profiles);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {createProfile,updateProfile,deleteProfile,getProfile};