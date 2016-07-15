var path = require('path');
var webpack = require('webpack');

var nodeDev = process.env.NODE_ENV;
var production = nodeDev === 'production';

var webpackCofig = {
  entry: {
  	index: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build/assets/'),
  	publicPath: "/assets/",
    filename: '[name].bundle.js'       
  },
  module: {
  	loaders: [
  	  {test: /\.js$/,loader: "babel",exclude: "node_modules/"},
			{test: /\.css$/,loader: 'style!css!autoprefixer?{browsers:["last 2 version", "> 1%"]}'}, 
			{test: /\.less$/,loader: 'style!css!autoprefixer?{browsers:["> 0.01%", "last 2 version"]}!less'},  	  
			{test: /\.(jpg|png|gif|mp3|mp4|json)$/,loader: "url?limit=8192"}
  	]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
  ]

};

if (production) {
  webpackCofig.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  webpackCofig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
  webpackCofig.entry.index.unshift(
    'webpack-dev-server/client?http://localhost:8181/',
    'webpack/hot/dev-server'
  );
}

module.exports = webpackCofig;
