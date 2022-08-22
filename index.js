import express from "express";
import routerApi from "./routes/index.js";

// Importamos la función del boom:
import { logErr, errorHandler, boomErrorHandler } from "./middlewares/error.handler.js";
const expressApp = express();
const PORT = 3000;
expressApp.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto: ${PORT}`);
});

expressApp.use(express.json());
expressApp.use(express.text());


routerApi(expressApp);

// Aplicamos el método use() al boom en segundo lugar:
expressApp.use(logErr);
expressApp.use(boomErrorHandler);
expressApp.use(errorHandler);
