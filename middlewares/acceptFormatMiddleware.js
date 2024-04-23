const accepts = require('accepts');

function acceptFormatMiddleware(req, res, next) {
    const accept = accepts(req);
    const acceptedTypes = accept.types();

    // Vérifier si JSON est accepté
    if (acceptedTypes.includes('application/json')) {
        req.preferredFormat = 'json';
    }
    // Vérifier si XML est accepté 
    else if (acceptedTypes.some(type => type.includes('xml'))) {
        req.preferredFormat = 'xml';
    }
    else {
        req.preferredFormat = 'json'; // Definir JSON par defaut 
    }

    next();
}

module.exports = acceptFormatMiddleware;
