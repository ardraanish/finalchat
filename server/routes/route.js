const express = require("express")
const { registerUser, userDetails,login,logout, searchUser, UpdateUser } = require("../controller/userController")

const router  = express.Router()

router.post("/register",registerUser )
router.post("/login", login)
// router.post("/password",password)
router.get('/user-details',userDetails)
router.post("/search-user",searchUser)
router.get('/logout',logout)
router.post("/update-user",UpdateUser)

module.exports = router