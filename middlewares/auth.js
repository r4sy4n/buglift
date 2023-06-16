const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const verify = ( request, response, next ) => {

    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.decode( token, SECRET );

    if( decoded ){
        next();
    }else{
        response.status( 401 ).send({ error: 'Unauthorized' });
    };
};

module.exports = verify;