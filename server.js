const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')

const UsersRouter = require('./routes/users/users-router')
const AuthRouter = require('./routes/auth/auth-router')
const db = require('./data/db-config')

const server = express()

const KnexSessionStore = connectSessionKnex(session)

const sessionConfig = {
    name: 'trackpad life',
    secret: 'monsoon demons are messing with my gutters',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 100 * 60 * 60
    })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

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