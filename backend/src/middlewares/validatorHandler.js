const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  //middlewares de fomra dinamica, usando proopiedad de closhurs de javascript
  return (req, res, next) => {
    const data = req[property];

    const { error } = schema.validate(data, {abortEarly: false}); //abortealr envia todos loe esrorres de foma conjunta  no  1 x 1
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
module.exports = validatorHandler;
