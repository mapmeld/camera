// web server modules
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

// MongoDB module
const mongoose = require('mongoose');

// face-detection module
// read requirements for installing node-canvas: https://github.com/Automattic/node-canvas/wiki
// on Heroku see README or: https://github.com/mojodna/heroku-buildpack-cairo/issues/16
const fdetect = require('face-detect');
const Canvas = require('canvas');

// MongoDB database model
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'localhost');
const Face = require('./models/face');

// set up web server
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express['static'](__dirname + '/static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(compression());

// homepage
app.get('/', (req, res) => {
  res.render('index');
});

// list of submitted photos
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

// delete all submitted photos
app.get('/clear', (req, res) => {
  Face.find().remove((err) => {
    if (err) {
      return res.json(err);
    }
    res.redirect('/hello');
  });
});

app.post('/login', (req, res) => {
  // read in image from Data URI
  let durl = req.body.photo;

  // create node-canvas Image to place content into
  let myImage = new Canvas.Image();
  myImage.onload = () => {
    // create a node-canvas Canvas with the same width and height as the image
    let myCanvas = new Canvas(myImage.width, myImage.height);
    myCanvas.getContext('2d').drawImage(myImage, 0, 0);

    // give face-detect a Node-Canvas to see the photo
    let results = fdetect.detect_objects({
      canvas: myCanvas,
      interval: 5,
      min_neighbors: 1
    });
    if (results.length) {
      // found this face! save it and wait for confirmation callback
      let f = new Face({
        url: req.body.photo,
        time: new Date()
      });

      f.save((err) => {
        if (err) {
          return res.json(err);
        }

        // show all faces, including the new one
        res.redirect('/hello')
      });
    } else {
      // no face :-(
      res.render('fail');
    }
  };

  // set the source of the node-canvas Image
  myImage.src = req.body.photo;
});

// start the server
app.listen(process.env.PORT || 8080, () => {
  console.log('app is running');
});

module.exports = app;
