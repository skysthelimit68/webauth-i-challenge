const bcryptjs = require('bcryptjs');
const Users = require('../users/users-model.js');

//middleware
function restricted(req, res, next) {
    const { username, password } = req.headers;
    if( username && password ) {
        Users.findBy({ username })
        .first()
        .then( user => {
            if(user && bcryptjs.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: 'You shall not pass'})
            }
        })
        .catch( error => {
            res.status(500).json({error})
        })
    } else {
        res.status(400).json({message: 'please log in with a valid username and password'})
    }
}

module.exports = restricted;