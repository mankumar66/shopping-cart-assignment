const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const apiRoute = require('./src/routes/apiRoutes');
const templateRoute = require('./src/routes/templateRoutes');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));

app.use('/', apiRoute);
app.use(templateRoute);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);


