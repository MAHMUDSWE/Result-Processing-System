const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

const jwtAuthentication = require('./middlewares/jwt.middleware');
const errorHandling = require('./middlewares/errorHandling.middleware');

const app = express();

const adminRoute = require("./routes/admin.route");
const studentRoute = require("./routes/student.route");
const teacherRoute = require("./routes/teacher.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.use(jwtAuthentication);
app.use(errorHandling);

app.use(adminRoute);
app.use(studentRoute);
app.use(teacherRoute);

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