const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost');

const Face = require('./models/face');

const fdetect = require('face-detect');
const Canvas = require('canvas');

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

app.get('/hello', (req, res) => {
  Face.find({}).sort('-time').limit(15).exec((err, faces) => {
    if (err) {
      return res.json(err);
    }

    res.render('hello', {
      faces: faces
    });
  });
});

app.post('/login', (req, res) => {
  let durl = req.body.photo;
  let myCanvas = new Canvas(640, 480);
  let myImage = new Canvas.Image();
  myImage.onload = () => {
    myCanvas.getContext('2d').drawImage(myImage, 0, 0);
    let results = fdetect.detect_objects({
      canvas: myCanvas,
      interval: 5,
      min_neighbors: 1
    });
    if (results.length) {
      // found this face! save it
      let f = new Face({
        url: req.body.photo,
        time: new Date()
      });

      f.save((err) => {
        if (err) {
          return res.json(err);
        }

        res.redirect('/hello')
      });
    } else {
      res.render('fail');
    }
  };
  myImage.src = req.body.photo;
});

app.get('/clear', (req, res) => {
  Face.find().remove((err) => {
    if (err) {
      return res.json(err);
    }
    res.redirect('/hello');
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log('app is running');
});

module.exports = app;
