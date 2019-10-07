const path = require("path"),
    express = require("express"),
    bodyParser = require("body-parser"),
    expressHbs = require("express-handlebars"),
    apiRoute = require("./src/routes/apiRoutes"),
    templateRoute = require("./src/routes/templateRoutes"),
    app = express(),
    session = require("express-session");
    
// hbs view
app.engine(
    "hbs",
    expressHbs({
        layoutsDir: path.join(__dirname, "/src/views/layouts"),
        partialsDir: __dirname + "/src/views/partials/",
        defaultLayout: "main",
        extname: "hbs"
    })
);
//.registerPartials(__dirname + "/src/views/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views"));


// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src")));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use("/api", apiRoute);
app.use("/", templateRoute);

app.listen(3000);


