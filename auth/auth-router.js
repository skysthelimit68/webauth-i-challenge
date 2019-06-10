//import user-model
const router = require('express').Router();
const Users = require('../users/users-model.js');
const restricted = require('./restricted.js')


router.get('/', restricted, (req, res) => {
    Users.find()
    .then( users => {
        res.status(200).json(users);
    })
    .catch( error => {
        res.status(500).json(error)
    })
})

router.post('/login', restricted, (req, res) => {
    res.status(200).json({message: `Logged in`})
})


module.exports = router;