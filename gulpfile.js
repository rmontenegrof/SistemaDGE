var elixir = require('laravel-elixir');
require('laravel-elixir-browserify-official');

elixir.config.notifications = false;
elixir.config.sourcemaps = false;
elixir.config.js.browserify.transformers.push({
    name: 'browserify-ngannotate',
    options: {}
});

elixir(function(mix) {

  // public   pasa los css a public.css
  mix.sass([
    'public.scss',
    './node_modules/angular-toastr/dist/angular-toastr.min.css',
    './node_modules/angular-loading-bar/build/loading-bar.min.css',
    './node_modules/ui-select/dist/select.css',
    '/vendor/smartadmin/smartadmin-production-plugins.scss',
    '/vendor/smartadmin/smartadmin-production.scss',
    '/vendor/smartadmin/smartadmin-skins.scss',
  ], 'public/css/public.css')

  mix.browserify('public/app.js', 'public/js/public.js');

	// versioning
  mix.version([
    'js/public.js',
    'css/public.css',
  ])
});
