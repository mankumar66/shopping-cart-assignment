const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
var route = require('./src/routes/route');

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

app.use('/', route);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000);


