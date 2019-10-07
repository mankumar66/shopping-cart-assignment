
const express = require('express'),
    templateRoute = express.Router(),
    api = require('../helper/xhr'),
    Cart = require('../modules/cart'),
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
    res.render('login');
});

templateRoute.get('/register', (req, res, next) => {
    res.render('registration');
});

templateRoute.get('/addToCart/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    api(`${baseUrl}/api/products`).
        then(products => {
            let product = products.filter(function (item) {
                return item.id == productId;
            })
            cart.add(product[0], productId);
            api(`${baseUrl}/api/addToCart`, {
                method: 'POST',
                body: JSON.stringify(cart),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => {
                    req.session.cart = cart
                    res.redirect('/products');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

templateRoute.get('/cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems
    });
});

module.exports = templateRoute;

