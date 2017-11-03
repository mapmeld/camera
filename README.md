# Camera

Code for workshop "Fun with getUserMedia(): Green Screens and Fever Dreams"

Covers getUserMedia() and new ImageCapture browser APIs

Plus some fun with TensorFlow, audio and video tags

## Dependencies

You need to install dependencies before JS modules from NPM

Node-Canvas installation help: https://github.com/Automattic/node-canvas/wiki

```bash
brew install cairo freetype  # on OSX
npm install
npm start
```

#### Heroku install

```bash
heroku stack:set cedar-14
heroku buildpacks:add --index 1 https://github.com/mojodna/heroku-buildpack-cairo.git
heroku addons:add mongolab
git push heroku master
```

## License

Open source, MIT license
