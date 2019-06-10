//import user-model
const router = require('express').Router();
const Users = require('./users-model.js');
const bcryptjs = require('bcryptjs');


router.get('/', restricted, (req, res) => {
    Users.find()
    .then( users => {
        res.status(200).json(users);
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcryptjs.hashSync(user.password, 8);
    user.password = hash;
    Users.add(user) 
    .then( user => {
        res.status(201).json(user);
    })
    .catch( error => {
        res.status(500).json(error);
    })
})

router.post('/login', restricted, (req, res) => {
    res.status(200).json({message: `Logged in`})
})


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



module.exports = router;