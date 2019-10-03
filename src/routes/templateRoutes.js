
var express = require('express');
var templateRoute = express.Router();
const path = require('path');
const rootDir = require('../../utils/path');

templateRoute.get('/login', (req, res, next) => {
    res.render('login', { loginScript: true })
});
templateRoute.get('/register', (req, res, next) => {
    res.render('registration', { loginScript: true, registrationScript: true })
});

module.exports = templateRoute;