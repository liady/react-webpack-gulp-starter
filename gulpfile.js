var gulp = require("gulp");
var gulpsync = require('gulp-sync')(gulp);
var server = require( 'gulp-develop-server' );
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackConfigGetter = require('./webpack.config.getter');
var env = require('gulp-env');

function sync(){
  return gulpsync.sync([].slice.call(arguments));
}

gulp.task("default", ["build-dev"]);

// Development build
gulp.task("build-dev", sync("set-dev-env", "webpack:build-dev"), function() {
  gulp.watch(["src/**/*"], ["webpack:build-dev"]); 
});

// Development build - webpack

// create a single instance of the compiler to allow caching
var devCompiler = null;

gulp.task("webpack:build-dev", ["set-dev-env"], function(callback) {
  
  if(!devCompiler){
      devCompiler = webpack(webpackConfigGetter());
  }
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err)
      throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({colors: true}));
    callback();
  });
});

gulp.task('set-dev-env', function() {
  env({
    vars: {
      BUILD_ENV: 'DEV'
    }
  });
});

// Production build
gulp.task("build", sync("set-prod-env", "webpack:build"));

// Production build - webpack
gulp.task("webpack:build", ["set-prod-env"], function(callback) {
  // run webpack
  webpack(webpackConfigGetter("PROD"), function(err, stats) {
    if(err)
      throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({colors: true}));
    callback();
  });
});

gulp.task('set-prod-env', function() {
  env({
    vars: {
      BUILD_ENV: 'PROD'
    }
  });
});

// //run server
// gulp.task( 'server:start', function() {
//  server.listen( { path: './server/server.js' } );
// });

// //restart server if server.js changed
// gulp.task( 'server:restart', function() {
//  gulp.watch( [ './server/*.js' ], server.restart );
// });

// gulp.task('server', ['server:start','server:restart']);