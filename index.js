import express from "express";
import routerApi from "./routes/index.js";
import { logErr, errorHandler, boomErrorHandler } from "./middlewares/error.handler.js";

// Importamos cors:
import cors from "cors";

const expressApp = express();
const PORT = 3000;
expressApp.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto: ${PORT}`);
});

expressApp.use(express.json());
expressApp.use(express.text());

// Creamos un array con los dominios que le daremos permisos:
const whitelist = ["http://localhost:8000", "https://unejemplocualquiera.com"];
// Creamos un objeto que verifique los permisos:
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};
// Le damos un use(options) a cors:
expressApp.use(cors(options));

routerApi(expressApp);

expressApp.use(logErr);
expressApp.use(boomErrorHandler);
expressApp.use(errorHandler);
