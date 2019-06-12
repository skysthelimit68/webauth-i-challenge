const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionsStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
    name: 'banana',
    secret: 'a delicious fruit',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24*60*60*1000,
        secure: false,
        httpOnly: true
    },
    store: new KnexSessionsStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval : 1000*60*60
    })
}

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js')

server.use(express.json());
server.use(helmet());
//server.use(cors());
//server.use(cors({credentials: true}))
server.use(cors( // this enables the cookie-keeping
    {
        credentials : true,
        origin : true,
    }
));
server.use(session(sessionConfig));

server.use('/api/users', usersRouter);
server.use('/api/restricted', authRouter)

module.exports = server;