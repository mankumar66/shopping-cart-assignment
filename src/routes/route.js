var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var Cart = require('../scripts/cart');
const rootDir = require('../../utils/path');
var products = JSON.parse(fs.readFileSync(path.join(rootDir, 'src', 'data', 'cartItems.json'), 'utf8'));
var bannersJSON = require(path.join(rootDir, 'src', 'server', 'banners', 'index.get.json'));
var categoriesJSOn = require(path.join(rootDir, 'src', 'server', 'categories', 'index.get.json'));
var productsJSOn = require(path.join(rootDir, 'src', 'server', 'products', 'index.get.json'));

router.get('/login', (req, res, next) => {
    res.render('login', { loginScript: true })

});
router.use('/addToCart/:id', (req, res, next) => {
    console.log(req.params.id);
    res.redirect('/');

});

router.get('/register', (req, res, next) => {
    res.render('registration', { loginScript: true, registrationScript: true })
});

router.use('/home', (req, res, next) => {
    // For fetching data from server
    /* request.get(bannerDataUrl, function (err, resp, body) {
        if (err) {
            throw new Error('Error');
        }
        else bannersJSON = resp;
    });
    request.get(categoryDataUrl, function (err, resp, body) {
        if (err) {
            throw new Error('Error');
        }
        else categoriesJSOn = resp;
    }); */
    res.render('home', { homeScript: true, sliderContent: bannersJSON, categoryContent: categoriesJSOn })
});

router.get('/products', (req, res, next) => {
    res.render('products', { productScript: true, productContent: productsJSOn, categoryContent: categoriesJSOn })
});

router.get('/', function (req, res, next) {
    res.render('home', { homeScript: true, sliderContent: bannersJSON, categoryContent: categoriesJSOn })
});

router.get('/add/:id', function(req, res, next) {

  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/');
  inline();
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router;