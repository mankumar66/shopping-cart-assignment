const express = require('express'),
    apiRouter = express.Router(),
    banners = require('./../mockResponse/banners/index.get.json'),
    categories = require('./../mockResponse/categories/index.get.json'),
    products = require('./../mockResponse/products/index.get.json'),
    addToCart = require('./../mockResponse/addToCart/index.post.json');

apiRouter.get("/banners", (req, res) => {
    res.json(banners);
});

apiRouter.get("/categories", (req, res) => {
    res.json(categories);
});

apiRouter.get("/products", (req, res) => {
    res.json(products);
});

apiRouter.post("/addToCart", (req, res) => {
    res.json(addToCart);
});

module.exports = apiRouter;