const UserModel = require("../models/UserModel")
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const  registerUser =  async(req,res)=>{
    try {
        const { name, email , password, profile_pic } = req.body

        const checkEmail = await UserModel.findOne({ email })

        if(checkEmail){
            return res.status(400).json({
                message : "Already user exits",
                error : true,
            })
        }

        //password into hashpassword
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            profile_pic,
            password : hashpassword
        }

        const user = new UserModel(payload)
        const userSave = await user.save()

        return res.status(201).json({
            message : "User created successfully",
            data : userSave,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}



 const  login = async(req, res)=> {
    try {
        const { email, password ,userId} = req.body;

        // Check if email exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist",
                error: true
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Please check your password",
                error: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };
        console.log(tokenData,"tokenData");

        const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: "1d" });
        console.log(token,"token");

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
        console.log(cookieOptions,"cookieOptions");

        return res.cookie("token", token, cookieOptions).status(200).json({
            message: "Login successful",
            token: token,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

const userDetails = async(req,res)=>{
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        return res.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

const searchUser = async(req,res)=>{
    try {
        const { search } = req.body

        const query = new RegExp(search,"i","g")

        const user = await UserModel.find({
            "$or" : [
                { name : query },
                { email : query }
            ]
        }).select("-password")

        return res.json({
            message : 'all user',
            data : user,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

const logout = async(req,res)=>{
    try {
        const cookieOptions = {
            http : true,
            secure : true,
            sameSite : 'None'
        }

        return res.cookie('token','',cookieOptions).status(200).json({
            message : "session out",
            success : true
    })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

const UpdateUser = async(req,res)=>{
    try {
        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken(token)

        const { name, profile_pic } = req.body

        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic
        })

        const userInfomation = await UserModel.findById(user._id)

        return res.json({
            message : "user update successfully",
            data : userInfomation,
            success : true
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

// const Email = async(req,res)=>{
//     try {
//         const { email } = req.body

//         const checkEmail = await UserModel.findOne({email}).select("-password")

//         if(!checkEmail){
//             return res.status(400).json({
//                 message : "user not exit",
//                 error : true
//             })
//         }

//         return res.status(200).json({
//             message : "email verify",
//             success : true,
//             data : checkEmail
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message : error.message || error,
//             error : true
//         })
//     }
// }

// const password =async(req,res)=>{
//     try {
//         const { password, userId } = req.body

//         const user = await UserModel.findById(userId)

//         const verifyPassword = await bcryptjs.compare(password,user.password)

//         if(!verifyPassword){
//             return res.status(400).json({
//                 message : "Please check password",
//                 error : true
//             })
//         }

//         const tokenData = {
//             id : user._id,
//             email : user.email 
//         }
//         const token = await jwt.sign(tokenData,process.env.JWT_SECREAT_KEY,{ expiresIn : '1d'})

//         const cookieOptions = {
//             http : true,
//             secure : true,
//             sameSite : 'None'
//         }

//         return res.cookie('token',token,cookieOptions).status(200).json({
//             message : "Login successfully",
//             token : token,
//             success :true
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message : error.message || error,
//             error : true
//         })
//     }
// }

module.exports = {registerUser,userDetails,login,searchUser,logout,UpdateUser}






