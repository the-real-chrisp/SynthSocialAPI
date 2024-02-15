const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/synthSocialDB';

connect(connectionString);

module.exports = connection;