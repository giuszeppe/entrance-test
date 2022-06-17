const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js("resources/js/*.js", "public/js")
// .js("resources/js/pages/*.js", "public/js/pages")
// .sass("resources/scss/app.scss", "public/css")
// .sourceMaps();

let fs = require("fs");

let getFiles = function (dir) {
    // get all 'files' in this directory
    // filter directories
    return fs.readdirSync(dir).filter((file) => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

getFiles("resources/js").forEach(function (filepath) {
    mix.js("resources/js/" + filepath, "public/js").sourceMaps();
});
getFiles("resources/js/pages").forEach(function (filepath) {
    mix.js("resources/js/pages/" + filepath, "public/js/pages").sourceMaps();
});
