//import user-model
const router = require('express').Router();
const Users = require('../users/users-model.js');
const restricted = require('./restricted.js')
const bcryptjs = require('bcryptjs');

/*
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
*/
/*
router.get('/', restricted, (req, res) => {
    Users.find()
    .then( users => {
        res.status(200).json(users);
    })
    .catch( error => {
        res.status(500).json(error)
    })
})
*/
router.post('/login', (req, res) => {
    //res.status(200).json({message: `Logged in`})
    let { username, password } = req.body

    Users.findBy({ username })
    .first()
    .then( user => {
        if(user && bcryptjs.compareSync(password, user.password)) {
            req.session.username = user.username;
            res.status(200).json({ message: `Welcom ${user.username}, you've got a cookie!`})
        } else {
            res.status(401).json({ message: "You've got the wrong credential"})
        }
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

router.delete('/', (req, res) => {
    if(req.session) {
        req.session.destroy();
    } 
    res.status(200).json({ message: "Good Bye!"})
})


module.exports = router;