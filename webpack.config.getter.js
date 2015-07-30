'use strict';

module.exports = function(BUILD_ENV){
  var path = require('path');
  var webpack = require('webpack');
  var isDevelopment = (BUILD_ENV || process.env.BUILD_ENV) !== 'PROD';
  var isProduction = !isDevelopment;

  function resolve(pathName){
    return path.resolve(__dirname, pathName);
  }

  console.log('* Starting Webpack');
  console.log('* isDevelopment = ' + isDevelopment);

  /* Plugins */
  var basePlugins = [
      new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
      new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': isProduction ? '"production"' : '"development"'
        }
      })
  ];

  var developmentPlugins = [];

  var productionPlugins = [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.optimize.AggressiveMergingPlugin()
  ];

  var plugins = basePlugins.concat(isDevelopment ? developmentPlugins : productionPlugins);

  /* ------- */
  return {  
    entry: resolve('src/index.js'),
    output: {
      path: resolve('public/js'),
      filename: 'bundle.js',
      publicPath : 'js/'
    },
    module: {
      preLoaders: [
        {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "eslint-loader"}
      ],
      loaders: [
        {test: /\.js$/, exclude: /(node_modules|bower_components)/, loaders: ['babel-loader', 'react-map-styles']},
        {test: /\.scss$/, loaders: ["style","css","sass?sourceMap"]},
        {test: /\.css$/, loaders: ["style","css"]},
        {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
        {test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?limit=10000'},
        {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
      ]
    },
    eslint: {
        configFile: './.eslintrc'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {}
    },
    plugins: plugins,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? 'source-map' : false
  };
}