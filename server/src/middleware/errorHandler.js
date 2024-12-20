const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error'

    res.status(error.statusCode).json({ 
        status: false, 
        message: error.message,
    });
};
  
module.exports = errorHandler;