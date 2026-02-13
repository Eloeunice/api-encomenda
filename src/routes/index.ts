import { Router } from "express";
import sessionsRoutes from "./sessionsRoutes.js";

import userRoutes from "./userRoutes.js";
import deliveriesRoutes from "./deliveryRoutes.js";
import deliveryLogsRoutes from "./delivery-logs-routes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

export default routes;
