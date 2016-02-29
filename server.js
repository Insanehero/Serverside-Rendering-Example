//Using babel to live compile server ES6 code to ES5 for development purposes.
require('babel-register')({
  presets: [ 'es2015', 'react' ],
  extensions: [".jsx", ".js"]
});

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var route = require('./src/server/run');
var app = express();

var compiler = webpack(config);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
}));

app.use('/', route);

app.listen(3000, () => {
  console.log("port 3000");
});
