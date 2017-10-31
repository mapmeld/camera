const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const cv = require('opencv');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express['static'](__dirname + '/static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(compression());


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', (req, res) => {
  var durl = req.body.photo;
  cv.readImage(durl, (err, im) => {
    if (err) {
      return res.json(err);
    }
    im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
      if (err) {
        return res.json(err);
      }
      return res.json(faces);
    });
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('app is running');
});

module.exports = app;
