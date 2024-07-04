module.exports = function errorHandler(err, req, res, next) {
    // console.log(err.name, err.status, err.message, `<<<<< console.log from errorHandler for debugging`);
  
    let status = err.status || 500;
    let message = err.message || "Internal server error";
    switch (err.name) {
      case "SequelizeUniqueConstraintError":
      case "SequelizeValidationError":
        status = 400;
        message = err.errors[0].message;
        break;
      case "NotFound":
        status = 404;
        message = err.message;
        break;
    }
    res.status(status).json({ message });
  };
  