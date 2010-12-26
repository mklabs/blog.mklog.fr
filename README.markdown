# Wheat Boilerplate

An attempt to bring the rock-solid template [html5-boilerplate](http://html5boilerplate.com/) in the nifty [Wheat](http://github.com/creationix/wheat) blog engine. 

* a basic template for the layout (layout.haml taking markup from html5-boilerplate)
* the same for stylesheets (style.css & handled.css). Both are directly coming from html5-boilerplate.
* JS with plugin.js/script.js.
* Modernizr 1.6 & jQuery 1.4.4 waiting for you.

## Themes
Slight changes were made to wheat in this branch to allow the definition of several themes in skin/ directory.

Each theme now has its dedicated repertory that contains all of its haml template & public files (css/js, favicon and so on.).

Wheat can be set up to use a specific theme when requiring and invoking wheat, usually done in the app.js file.

    var Connect = require('connect');

    module.exports = Connect.createServer(
      Connect.logger(),
      Connect.conditionalGet(),
      Connect.cache(),
      Connect.gzip(),
      require('wheat')(__dirname, {theme: 'themeroller'})
    ).listen(3000);

Just change the value of the theme configuration options to match a correct theme in the skin/ directory.

### Boilerplate Theme
A default theme (skin/default) brings the basic markup and structure followed by html5 boilerplate in a blank theme.

### jQuery UI CSS Framework Theme
You could also find a simple themeroller theme that uses the jQuery UI themeroller framework (just some header/content markup), firstly to act as a simple example of building its own theme, secondly because I love the the jQuery UI CSS Framework.

[github.com/MkLabs/wheat-themeroller-theme](https://github.com/MkLabs/wheat-themeroller-theme)

### Themes as submodules
Default & themeroller themes are set up as git submodules.

To bring them up, just init & update theme using the following command:

    git submodule update --init

## ToDo

* A full support of html comments and IE conditional ones in haml-js is required to work with Modernizr (now done by messing up html and haml markup in the layout file). The haml.js version embed in there is slightly modified to deal with 'one-row' comments (html and haml). Indented ones are not yet (and need further work).
* Alternative to haml markup (ejs?, jade?) for devs that aren't familiar with haml and the ruby world.

## License

### Wheat

* Wheat: MIT License

### Major components (coming from html5-boilerplate)

* Modernizr: MIT/BSD license
* jQuery: MIT/GPL license
* DD_belatedPNG: MIT license
* YUI Profiling: BSD license
* HTML5Doctor CSS reset: Creative Commons 3.0 BY
* CSS Reset Reloaded: Public Domain