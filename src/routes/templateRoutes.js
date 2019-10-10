
const express = require('express'),
    templateRoute = express.Router(),
    api = require('../helper/xhr'),
    baseUrl = 'http://localhost:3000',
    constants = require('./../utils/locales/en');

templateRoute.get(['/', '/home'], (req, res, next) => {
    Promise.all([
        api(`${baseUrl}/api/banners`),
        api(`${baseUrl}/api/categories`),
        api(`${baseUrl}/api/cart`)
    ]).then(([sliderContent, categoryContent, cart]) => {
        res.render('home', { sliderContent, categoryContent, cart })
    })
        .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/products', (req, res, next) => {
    Promise.all([
        api(`${baseUrl}/api/products`),
        api(`${baseUrl}/api/categories`),
        api(`${baseUrl}/api/cart`)
    ]).then(([productContent, categoryContent, cart]) => {
        res.render('products', { productContent, categoryContent, cart })
    })
        .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/login', (req, res, next) => {
    api(`${baseUrl}/api/cart`)
    .then(cart => res.render('login', {cart}))
    .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/register', (req, res, next) => {
    api(`${baseUrl}/api/cart`)
    .then(cart => res.render('registration', {cart}))
    .catch((err) => res.send(constants.API_ERROR));
});

module.exports = templateRoute;

