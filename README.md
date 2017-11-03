# Camera

Code for workshop "Fun with getUserMedia(): Green Screens and Fever Dreams"

Covers getUserMedia() and new ImageCapture browser APIs

## Basic Dependencies

You can run all of the examples except 'Reverse-Facebook' with JS modules from NPM

```
npm install
npm start
```

## Advanced dependencies

To run the 'Reverse-Facebook' example, next install MongoDB and the dependencies for ```node-canvas```:

Node-Canvas installation help: https://github.com/Automattic/node-canvas/wiki

```bash
brew install mongodb cairo  # on OSX
mongod &
npm install mongoose canvas face-detect --save
```

In ```app.js```, un-comment the lines about ```mongoose```, ```fdetect```, or ```canvas```.

```
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
