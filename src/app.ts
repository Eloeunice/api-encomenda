import express from "express";
import swaggerUi from "swagger-ui-express";
import { errorHandling } from "./middlewares/error-handling.js";
import routes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);
app.use(errorHandling);

export default app;
