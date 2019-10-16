
const express = require('express'),
    templateRoute = express.Router(),
    api = require('../helper/xhr'),
    apiConsts = require('./../utils/apiConst'),
    constants = require('./../utils/locales/en');
    
    
/* GET requests */
templateRoute.get(['/', '/home'], (req, res, next) => {
    Promise.all([
        api(apiConsts.GET_BANNERS_API),
        api(apiConsts.GET_CATEGORIES_API),
        api(apiConsts.GET_CART_API)
    ]).then(([sliderContent, categoryContent, cart]) => {
        res.render('home', { sliderContent, categoryContent, cart, constants })
    })
        .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/products', (req, res, next) => {
    Promise.all([
        api(apiConsts.GET_PRODUCTS_API),
        api(apiConsts.GET_CATEGORIES_API),
        api(apiConsts.GET_CART_API)
    ]).then(([productContent, categoryContent, cart]) => {
        res.render('products', { productContent, categoryContent, cart, constants})
    })
        .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/login', (req, res, next) => {
    api(apiConsts.GET_CART_API)
    .then(cart => res.render('login', {cart, constants}))
    .catch((err) => res.send(constants.API_ERROR));
});

templateRoute.get('/register', (req, res, next) => {
    api(apiConsts.GET_CART_API)
    .then(cart => res.render('registration', {cart, constants}))
    .catch((err) => res.send(constants.API_ERROR));
});

/* Post requests */
templateRoute.post('/home', (req, res, next) => {
    console.log(req.body);
    res.redirect('/home');
});

module.exports = templateRoute;

