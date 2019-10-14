const express = require('express'),
    apiRouter = express.Router(),
    banners = require('./../mockResponse/banners/index.get.json'),
    categories = require('./../mockResponse/categories/index.get.json'),
    products = require('./../mockResponse/products/index.get.json'),
    addToCart = require('./../mockResponse/addToCart/index.post.json'),
    Cart = require('../modules/cart');

/* GET requests */
apiRouter.get("/banners", (req, res) => {
    res.json(banners);
});

apiRouter.get("/categories", (req, res) => {
    res.json(categories);
});

apiRouter.get("/products", (req, res) => {
    res.json(products);
});

apiRouter.get("/cart", (req, res) => {
    res.json(addToCart.cartItems);
});

/* POST requests */
apiRouter.post("/remove", (req, res, next) => {
    var productId = req.body.id;
    var cart = new Cart(addToCart.cartItems);
    cart.remove(productId);
    addToCart.cartItems = cart;
    res.json(addToCart.cartItems);
});

apiRouter.post("/addToCart", (req, res) => {
    let productId = req.body.id;
    let cart = new Cart(addToCart.cartItems);
    let product = products.filter(function (item) {
        return item.id == productId;
    });
    cart.add(product[0], productId);
    addToCart.cartItems = cart;
    res.json(addToCart);
});


module.exports = apiRouter;