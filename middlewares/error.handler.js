function logErr (err, req, res, next) {
  console.log(err);
  next(err);
};

function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

// Agregamos una función para el boom:
function boomErrorHandler (err, req, res, next) {
	// Debemos verificar si el error es de tipo boom:
	if (err.isBoom) {
		const { output } = err;
		// Si es de tipo boom debemos finalizarlo con una respuesta para
		// que no envíe el error al siguiente middleware:
		res.status(output.statusCode).json(output.payload);
	};
	// Y si no es de tipo boom le damos next():
	next(err);
};

// Exportamos la función del boom
export { logErr, errorHandler, boomErrorHandler };
