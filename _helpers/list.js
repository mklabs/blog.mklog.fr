
// helper to return a list of something as html string.
//
// Takes an Array of Pages or Post and two additional `subpath` arguments to filter
// the results based on their `url` property. First one is the include pattern,
// second is the exclude pattern.

var list = module.exports = function list(items, include, exclude, options) {
  // todo: better args parsing
  var rinclude = new RegExp(include),
    rexclude = typeof exclude === 'string' ? new RegExp(exclude) : null;

  options = options || exclude;

  var result = items
    // include
    .filter(function(it) { return rinclude.test(it.url); })
    // exclude
    .filter(function(it) {
      if(!rexclude) return true;
      return !rexclude.test(it.url);
    })
    // build the result
    .map(function(it) {
      return options.fn ? options.fn(it) :
        '<li><a href=":url">:item</a></li>'
          .replace(/:item/, it.title)
          .replace(/:url/, it.url);
    }).join('\n');

  return new Handlebars.SafeString(options.fn ? result : ['<ul>', result, '</ul>'].join('\n'));
};

Handlebars.registerHelper('list', list);
