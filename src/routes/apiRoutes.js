
var express = require('express');
var apiRouter = express.Router();
const fetch = require('node-fetch');
const path = require('path');
const xhr = require('../helpers/xhr');
const baseUrl = 'http://localhost:3000';

var sliderContent, categoryContent, productContent;
const fetchApiResponse = (path) => {
    let p1 = xhr(`${baseUrl}/mockResponse/${path}/index.get.json`);
    let p2 = xhr(`${baseUrl}/mockResponse/categories/index.get.json`);
    Promise.all([
        p1.catch(error => { return error }),
        p2.catch(error => { return error })
    ]).then(value => {
        if (path === 'banners') {
            sliderContent = value[0];
        } else if (path === 'products') {
            productContent = value[0]
        }
        categoryContent = value[1];
    })
}
apiRouter.get('/home', (req, res, next) => {
    fetchApiResponse('banners');
    res.render('home', { homeScript: true, sliderContent: sliderContent, categoryContent: categoryContent })
});
apiRouter.get('/products', (req, res, next) => {
    fetchApiResponse('products');
    res.render('products', { productScript: true, productContent: productContent, categoryContent: categoryContent })
});

apiRouter.use('/addToCart/:id', (req, res, next) => {
    productId = req.params.id;
    var product = productsJSOn.filter((item) => {
        return item.id == productId;
    });
    if(cartItems.length !== 0 ){
         cartItems.forEach((item) => {
            if(item.id === productId) {
                console.log(item);
            console.log("1");
             item.count++;

            }else  {
                return cartItems.push({
            id: product[0].id,
            count: 1,
            name: product[0].name,
            img: product[0].img})}

        })
    } else cartItems.push({
            id: product[0].id,
            count: 1,
            name: product[0].name,
            img: product[0].img
        })

    fs.writeFile(path.join(rootDir, 'src', 'data', 'cartItems.json'), JSON.stringify(cartItems), function(err) {
        if (err) throw err;
        console.log('complete');
    }
    );

});

apiRouter.get('/', function(req, res, next) {
    console.log(req.body);
    fetchApiResponse('banners');
    res.render('home', { homeScript: true, sliderContent: sliderContent, categoryContent: categoryContent })
});

module.exports = apiRouter;