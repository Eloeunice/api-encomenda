import { Router } from "express";
import DeliveryLogsController from "../controllers/delivery-logs-controller.js";

import EnsureAuthenticationMiddleware from "../middlewares/ensure-authentication.js";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  EnsureAuthenticationMiddleware,
  deliveryLogsController.create,
);
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  EnsureAuthenticationMiddleware,
  deliveryLogsController.show,
);

export default deliveryLogsRoutes;
