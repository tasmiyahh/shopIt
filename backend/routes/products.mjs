import express from "express"
import { createPrductReview, deleteReview, getProductDeleted, getProductDetails, getProductReviews, getProductUpdated, getProducts } from "../controllers/prodctcontroller.mjs"
import { newProduct } from "../controllers/prodctcontroller.mjs"
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.mjs"
const router = express.Router()

router.route("/products").get( getProducts) //authenticate user hoga tw get krskty ga //osk bad
// dekhy ga agradmin h  iska role tw access krskta h
// ta k sirf admin access krskty na k user 

//by default role user h models me tw hum ne yahan admin likhna para
router.route("/admin/products").post(isAuthenticatedUser ,authorizeRoles("admin") ,newProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/products").get(getProducts)
router.route("/admin/products/:id").put(isAuthenticatedUser ,authorizeRoles("admin") ,getProductUpdated)
router.route("/admin/products/:id").delete(isAuthenticatedUser ,authorizeRoles("admin") ,getProductDeleted)
router.route("/reviews")
.put(isAuthenticatedUser , createPrductReview)
.get(isAuthenticatedUser, getProductReviews)
router.route("/admin/reviews").delete(isAuthenticatedUser , authorizeRoles("admin"), deleteReview)

export default router

