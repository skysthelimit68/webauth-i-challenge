const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const usersRouter = require('../users/users-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', usersRouter);

module.exports = server;