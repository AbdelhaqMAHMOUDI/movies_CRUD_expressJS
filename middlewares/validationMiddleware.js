function validationMiddleware(req, res, next) {
    const validationError = false; 
    if (validationError) {
        res.status(422).send('Validation impossible');
        validationError = false; 
    } else {
        validationError = true; 
        next();
    }
}

module.exports = validationMiddleware;
