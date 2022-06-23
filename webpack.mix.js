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

mix.js('resources/js/pages/login.js','public/js/login.js')
    .js('resources/js/dir/messageTemplate.js','public/js/dir')
    .js('resources/js/pages/password-addon.init.js','public/js/pages')
    .js('resources/js/pages/theme-style.init.js','public/js/pages')
    .js('resources/js/pages/validation.init.js','public/js/pages')
    .js('resources/js/app.js','public/js')
    .js('resources/js/request.js','public/js')
    .js('resources/js/pages/chat.js','public/js/pages')
    .js('resources/js/pages/users.js','public/js/pages')
    .js('resources/js/pages/index.init.js','public/js/pages');