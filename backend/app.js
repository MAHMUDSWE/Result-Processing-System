const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const adminRoute = require("./routes/admin.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(adminRoute);

app.use((req, res, next) => {
    res.status(404).json({
        "message": "Error! Page not found",
    });
});

app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(401).json({
        "message": err,
    });
});

module.exports = app;