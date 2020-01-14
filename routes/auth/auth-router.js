const router = require('express').Router()
const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')

router.post('/register', (req, res, next) => {
    let user = req.body
    user.password = bcrypt.hashSync(user.password, 10)

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(err => {
        next(err)
    })
})

router.post('/login', (req, res, next) => {
    let { username, password } =req.body

    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                message: `${user.username} logged in`
            })
        } else {
            res.status(401).json({
                message: 'You shall not pass!'
            })
        }
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router