function logErrors(err, req, res, next){
  console.log("logErrors msg")
console.log(err);
next(err); //midlleware de error
}

function errorHandler(err, req, res, next){
  console.log("errorHandler msg")
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });

}

function boomErrorHandler(err, req, res, next){
 if (err.isBoom) {
  const {output} = err;
  res.status(output.statusCode).json(output.payload);
 }
 next(err);
}

module.exports ={logErrors, errorHandler, boomErrorHandler}
