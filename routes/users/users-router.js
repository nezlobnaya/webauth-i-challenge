const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')


router.get('/', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        next(err)
    })
})

function restricted (req, res, next) {
    const  { username, password } = req.headers

    if(username && password) {
        Users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: 'You shall not pass!' })
            }
        })
    } else {
        res.status(400).json({
            message: 'please, provide username & password'
        })
    }
}

module.exports = router