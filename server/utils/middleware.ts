const requestLogger = (request, _response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });

  next();
};

const errorHandler = (error, _request, response, next) => {
  // console.error(error.message);
  console.log("sdlkfnslkdfnsldkfnsldkfnsldfksndlfknsdl");

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "UnhandledPromiseRejectionWarning") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

export = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
