//import user-model
const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/restricted.js')
const bcryptjs = require('bcryptjs');


router.get('/', restricted, (req, res) => {
    Users.find()
    .then( users => {
        //res.status(200).json(users);
        res.json({ users, session: req.session})
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


/*
router.post('/login', restricted, (req, res) => {
    res.status(200).json({message: `Logged in`})
})
*/

module.exports = router;