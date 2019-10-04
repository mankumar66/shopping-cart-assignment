const path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    expressHbs = require('express-handlebars'),
    apiRoute = require('./src/routes/apiRoutes'),
    templateRoute = require('./src/routes/templateRoutes'),
    app = express(),
    session = require('express-session');
// hbs view
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: path.join(__dirname, '/src/views/layouts'),
        defaultLayout: 'main',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/views'));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))
// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/xhr', apiRoute);
app.use('/', templateRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
});

app.listen(3000);


