# Camera

Code for workshop "Fun with getUserMedia(): Green Screens and Fever Dreams"

Covers getUserMedia() and new ImageCapture browser APIs

Plus some fun with TensorFlow, audio and video tags

## Dependencies

You need to install OpenCV (version 2) before installing opencv and other JS modules from NPM.

```bash
brew install opencv@2
npm install
npm start
```

On Heroku, go to the Settings panel and add these buildpacks in this order:

```
https://github.com/automata/heroku-buildpack-opencv.git
heroku/nodejs
```

Then push your code up.

```
git push heroku master
```

## License

Open source, MIT license
