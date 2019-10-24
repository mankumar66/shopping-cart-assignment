const path = require("path"),
    express = require("express"),
    bodyParser = require("body-parser"),
    expressHbs = require("express-handlebars"),
    apiRoute = require("./src/routes/apiRoutes"),
    templateRoute = require("./src/routes/templateRoutes"),
    app = express();
    
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
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views"));


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoute);
app.use("/", templateRoute);

app.listen(3000);


