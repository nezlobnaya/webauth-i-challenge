const express =require('express')
const helmet = require('helmet')
const cors = require('cors')

const UsersRouter = require('./routes/users/users-router')
const AuthRouter = require('./routes/auth/auth-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use('/api/users', UsersRouter)
server.use('/api/auth', AuthRouter)

server.get('/', (req, res) => {
    res.send(`<h2>What's up guys?</h2>`)
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Bad mistake, Engineer!', err 
    })
})

module.exports =server