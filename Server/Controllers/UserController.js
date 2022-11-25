import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'


//get a User
export const getUser = async(req,res)=>{
    const id = req.params.id;

try {
    const user = await UserModel.findById(id);

    if(user){
        const {password, ...otherdetails}= user._doc
        res.status(200).json(otherdetails)
    }

    else{
        res.status(404).json("No Such user exists")
    }
} catch (error) {
    res.status.json({error})
}
}

//update user

 export const updateUser = async(req,res)=>{
    const id = req.params.id;
    const{currentUserId,currentAdminStatus,password}= req.body

    if(id === currentUserId||currentAdminStatus){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body,{new:true})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(404).json("Cannot update user")
    }
 }

 //delete user

 export const deleteUser = async (req, res)=>{
    const id = req.params.id

    const{currentUserId, currentAdminStatus}= req.body;
    if(id === currentUserId || currentAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json("User Deleted Sucessfully")
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    else{
        res.status(400).json("You are not authorized to delete the user")
    }

 }


 //follow a user
 export const followUser = async(req,res)=>{
    const id = req.params.id;

    const{currentUserId}= req.body

    if(currentUserId === id){
        res.status(403).json("You cannot follow yourself")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(!followUser.followers.includes(currentUserId))
            {
                await followUser.updateOne({$push: {followers: currentUserId}})
                await followingUser.updateOne({$push: {following: id}})
                res.status(200).json("user is followed")
            }
            else{
                res.status(403).status("The user is already followed by you")
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
 }




 //unfollow user
 export const unfollowUser = async(req,res)=>{
    const id = req.params.id;

    const{currentUserId}= req.body
    console.log(currentUserId)
    console.log(id)

    if(currentUserId === id){
        res.status(403).json("You cannot follow yourself")
    }
    else{
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(currentUserId)

            if(followUser.followers.includes(currentUserId))
            {
                await followUser.updateOne({$pull: {followers: currentUserId}})
                await followingUser.updateOne({$pull: {following: id}})
                res.status(200).json("user is unfollowed")
            }
            else{
                res.status(403).status("The user is not followed by you")
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
 }