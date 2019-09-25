const path = require('path');
const express = require('express');
const rootDir = require('./utils/path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
// Will be needed for fetching data from server
/* const request = require('request'); */
var bannersJSON = require(path.join(rootDir, 'src', 'server', 'banners', 'index.get.json'));
var categoriesJSOn = require(path.join(rootDir, 'src', 'server', 'categories', 'index.get.json'));

const app = express();

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/login', (req, res, next) => {
    res.render('login', { loginScript: true })

});

app.get('/register', (req, res, next) => {
    res.render('registration', { loginScript: true, registrationScript: true })
});

app.use('/home', (req, res, next) => {
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

app.get('/products', (req, res, next) => {

    res.render('products', { productScript: true })
});

app.get('/', (req, res, next) => {
    res.render('home', { homeScript: true, sliderContent: bannersJSON, categoryContent: categoriesJSOn })
});

app.listen(3000);


