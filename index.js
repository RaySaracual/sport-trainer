require('dotenv').config()
require ('./config.js');
const Server = require('./models/server.js');
const server = new Server();

server.start()
