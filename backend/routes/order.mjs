import express from 'express'
import { getOrderDetails, myOrders, newOrder , updateOrder ,allOrders, deleteOrder } from '../controllers/orderControllers.mjs'
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.mjs'
const router = express.Router()

router.route("/orders/new").post(isAuthenticatedUser,newOrder)
router.route("/orders/:id").get(isAuthenticatedUser,getOrderDetails)
router.route("/me/orders").get(isAuthenticatedUser,myOrders)
router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"), allOrders)
router.route("/admin/orders/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateOrder)
router.route("/admin/orders/:id").delete(isAuthenticatedUser,authorizeRoles("admin"), deleteOrder)


export default router