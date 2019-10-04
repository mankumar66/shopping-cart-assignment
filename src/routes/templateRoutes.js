
const express = require('express'),
    templateRoute = express.Router(),
    path = require('path'),
    api = require('../helper/xhr'),
    baseUrl = 'http://localhost:3000';

templateRoute.get(['/', '/home'], (req, res, next) => {
    Promise.all([
        api(`${baseUrl}/api/banners`),
        api(`${baseUrl}/api/categories`)
    ]).then(([sliderContent, categoryContent]) => {
    res.render('home', { sliderContent: sliderContent, categoryContent: categoryContent })
    })
    .catch((err) => res.send("Something went wrong, please try again"));
});
templateRoute.get('/products', (req, res, next) => {
    Promise.all([
        api(`${baseUrl}/api/products`),
        api(`${baseUrl}/api/categories`)
    ]).then(([productContent, categoryContent]) => {
    res.render('products', { productContent: productContent, categoryContent: categoryContent })
    })
    .catch((err) => res.send("Something went wrong, please try again"));
});
templateRoute.get('/login', (req, res, next) => {
    res.render('login', { loginScript: true })
});
templateRoute.get('/register', (req, res, next) => {
    res.render('registration', { registrationScript: true })
});

module.exports = templateRoute;
