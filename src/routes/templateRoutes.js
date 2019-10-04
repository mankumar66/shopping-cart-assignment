
var express = require('express'),
    templateRoute = express.Router(),
    path = require('path'),
    xhr = require('../mockResponse/helper/xhr'),
    baseUrl = 'http://localhost:3000';

templateRoute.get(['/', '/home'], (req, res, next) => {
    Promise.all([
        xhr(`${baseUrl}/xhr/banners`),
        xhr(`${baseUrl}/xhr/categories`)
    ]).then(([sliderContent, categoryContent]) => {
    res.render('home', { homeScript: true, sliderContent: sliderContent, categoryContent: categoryContent })
    })
    .catch((err) => res.send("Something went wrong, please try again"));
});
templateRoute.get('/products', (req, res, next) => {
    Promise.all([
        xhr(`${baseUrl}/xhr/products`),
        xhr(`${baseUrl}/xhr/categories`)
    ]).then(([productContent, categoryContent]) => {
    res.render('products', { productScript: true, productContent: productContent, categoryContent: categoryContent })
    })
    .catch((err) => res.send("Something went wrong, please try again"));
});
templateRoute.get('/login', (req, res, next) => {
    res.render('login', { loginScript: true })
});
templateRoute.get('/register', (req, res, next) => {
    res.render('registration', { loginScript: true, registrationScript: true })
});

module.exports = templateRoute;
