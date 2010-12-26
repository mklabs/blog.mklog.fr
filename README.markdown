
This repo holds the actual (well not yet..) articles for my personal blog. [Wheat](https://github.com/creationix/wheat) is used as a blog engine which is based on git filefilesystem and written to run in node.js

## Themes
Slight changes were made to wheat in there to allow the definition of several themes in skin/ directory.

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
    
    
* [Boilerplate theme](https://github.com/MkLabs/wheat-boilerplate-theme): A default theme (skin/default) brings the basic markup and structure followed by [html5 boilerplate](http://html5boilerplate.com/) in a blank theme.
* [Themeroller theme](https://github.com/MkLabs/wheat-themeroller-theme): You could also find a simple themeroller theme that uses the [jQuery UI CSS framework](http://wiki.jqueryui.com/w/page/12137970/jQuery-UI-CSS-Framework) (just some header/content markup), firstly to act as a simple example of building its own theme, secondly because I love the the jQuery UI CSS Framework.
* [Harmonious theme](https://github.com/MkLabs/wheat-harmonious-theme): This wheat theme is called Harmonious mainly due to its special banner that makes use of [Mr Doob's Harmony application](https://github.com/mrdoob/harmony). It also have some fancy css3 animations and use of the new HTML5 History API, directly inspired by the [new GitHub TreeSlider](https://github.com/blog/760-the-tree-slider).

## License

### Wheat:

* Wheat: MIT License

### Major components (coming from html5-boilerplate):

* Modernizr: MIT/BSD license
* jQuery: MIT/GPL license
* DD_belatedPNG: MIT license
* YUI Profiling: BSD license
* HTML5Doctor CSS reset: Creative Commons 3.0 BY
* CSS Reset Reloaded: Public Domain

#### Everything else:
* Articles and content: [WTF Public License](http://sam.zoy.org/wtfpl/COPYING) 