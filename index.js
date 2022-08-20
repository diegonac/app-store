import express from "express";
import routerApi from "./routes/index.js";
const expressApp = express();
const PORT = 3000;
expressApp.listen(PORT, () => {
	console.log(`Servidor levantado en el puerto: ${PORT}`);
});

expressApp.use(express.json());
expressApp.use(express.text());

routerApi(expressApp);
