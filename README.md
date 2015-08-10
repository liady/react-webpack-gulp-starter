# React Minimal Boilerplate

A very lean React boilerplate, using webpack and gulp. [Demo](http://liady.github.io/react-webpack-gulp-starter/)

## Dev Build + Server
Run the following commands:
```
$ npm install
$ gulp
```
Navigate your browser to `localhost:8181` to see the results. The files are watched, so all changes are automatically built and served.

## Dev Build
Run the following commands:
```
$ npm install
$ gulp build-dev
```
The bundled file is created in `public/js/bundle.js`. The files are watched, so all changes are automatically built.
Load `public/index.html` in the browser to see the results.

## Production Build
Run the following commands:
```
$ npm install
$ gulp build
```
The bundled file is created in `public/js/bundle.js`

## File structure
```
public/
    js/
        bundle.js
    index.html
src/
    components/
        Item.js
        List.js
        Root.js
    styles/
        styles.scss
    index.js
gulpfile.js
package.json
webpack.config.getter.js
```

## Included libraries
- [Webpack](http://webpack.github.io/)
- [Babel](https://babeljs.io/)
- [Gulp](http://gulpjs.com/)
- [React](http://facebook.github.io/react/)
    - [Awesome React](https://github.com/enaqx/awesome-react)
    - [Introduction resources](https://github.com/facebook/react/wiki/Articles-and-Videos)
    - [Examples](https://github.com/facebook/react/wiki/Examples)
    - [Complementary Tools](https://github.com/facebook/react/wiki/Complementary-Tools)
- [ReactCSS](http://reactcss.com/)
- [MaterialUI](http://material-ui.com/)

### Pull requests are welcome!

## License

[MIT](http://rem.mit-license.org)
