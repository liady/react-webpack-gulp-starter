var gulp = require("gulp"),
    gulpsync = require('gulp-sync')(gulp),
    gutil = require("gulp-util"),
    ghPages = require('gulp-gh-pages');
    env = require('gulp-env'),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfigGetter = require('./webpack.config.getter');

var paths = {
  publicContentBase : "public/",
  publicJsPath: "/js/",
  jsSources: "src/**/*"
}

/*** DEFAULT TASK ***/

gulp.task("default", ["build-dev-server"]);


/*** DEVELOPMENT BUILD + SERVER ***/

gulp.task("build-dev-server", sync("set-dev-env", "webpack:dev-server"));

gulp.task("webpack:dev-server", function(callback) {
  // modify some webpack config options
  var config = webpackConfigGetter();
  config.devtool = "eval";

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    publicPath: paths.publicJsPath,
    contentBase : paths.publicContentBase,
    stats: {
      colors: true
    }
  }).listen(8181, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack:dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8181");
  });
});


/*** DEVELOPMENT BUILD + WATCH ***/

gulp.task("build-dev", sync("set-dev-env", "webpack:build-dev"), function() {
  gulp.watch([paths.jsSources], ["webpack:build-dev"]); 
});

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
  setEnv('DEV');
});


/*** PRODUCTION BUILD ***/

gulp.task("build", sync("set-prod-env", "webpack:build"));

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
  setEnv('PROD');
});

/*** GITHUB PAGES ***/

gulp.task('gh-pages', ["build"], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});


/*** HELPER FUNCTIONS ***/

function setEnv(buildEnv){
  env({
    vars: {
      BUILD_ENV: buildEnv
    }
  });
}

function sync(){
  return gulpsync.sync([].slice.call(arguments));
}


/*** NODE SERVER INIT (requires server file in /server/server.js) ***

// run server
var server = require('gulp-develop-server');

gulp.task( 'server:start', function() {
 server.listen( { path: './server/server.js' } );
});

// restart server if server.js changed
gulp.task( 'server:restart', function() {
 gulp.watch( [ './server/*.js' ], server.restart );
});

gulp.task('server', ['server:start','server:restart']);
*/