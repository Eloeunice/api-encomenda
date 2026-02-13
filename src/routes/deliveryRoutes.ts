import { EnsureAuthenticationMiddleware } from "../middlewares/ensure-authentication.js";
import DeliveriesController from "../controllers/deliveriesController.js";
import { Router } from "express";


const deliveriesRoutes = Router();
const ensureAuthenticationMiddleware = new EnsureAuthenticationMiddleware();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticationMiddleware.handle)

deliveriesRoutes.post("/", (req, res) => {
    return res.status(201).json({message : "Delivery created"});
})


export default deliveriesRoutes