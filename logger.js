const { func } = require("joi");

function log(req, res, next) {
    console.log('Autenticando...');
    next();
}

module.exports = log;