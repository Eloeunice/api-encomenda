import { EnsureAuthenticationMiddleware } from "../middlewares/ensure-authentication.js";
import DeliveriesController from "../controllers/deliveriesController.js";
import { Router } from "express";


const deliveriesRoutes = Router();
const ensureAuthenticationMiddleware = new EnsureAuthenticationMiddleware();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticationMiddleware.handle)

deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.getAll);
deliveriesRoutes.patch("/:id/status", deliveriesController.update);


export default deliveriesRoutes