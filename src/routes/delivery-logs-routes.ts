import { Router } from "express";
import DeliveryLogsController from "../controllers/delivery-logs-controller.js";

import { EnsureAuthenticationMiddleware } from "../middlewares/ensure-authentication.js";

const deliveryLogsRoutes = Router();
const ensureAuthenticationMiddleware = new EnsureAuthenticationMiddleware();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  ensureAuthenticationMiddleware.handle,
  deliveryLogsController.create,
);
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticationMiddleware.handle,
  deliveryLogsController.show,
);

export default deliveryLogsRoutes;
