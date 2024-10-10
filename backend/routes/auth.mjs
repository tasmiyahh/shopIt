import express from "express"
import { allUsers, deleteUser, forgotPassword, getUserDetails, getUserProfile, registerUser, resetPassword, updatePassword, updateProfile, updateUser } from "../controllers/authControllers.mjs" //yahan import iya or phir route bnaye
import {loginUser} from "../controllers/authControllers.mjs"
import { logoutUser } from "../controllers/authControllers.mjs"
import {authorizeRoles, isAuthenticatedUser} from "../middlewares/auth.mjs"
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser,getUserProfile)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route("/admin/users/:id").get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
router.route("/admin/users/:id").put(isAuthenticatedUser, authorizeRoles('admin'),updateUser)
router.route("/admin/users/:id").delete(isAuthenticatedUser, authorizeRoles('admin'),deleteUser)
export default router



