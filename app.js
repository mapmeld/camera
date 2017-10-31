const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const mongoose = require('mongoose');
const csrf = require('csurf');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express['static'](__dirname + '/static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(process.env.PORT || 8080, () => {
  console.log('app is running');
});

module.exports = app;
