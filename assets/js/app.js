(function($, M, exports, undefined) {

  var app = {};

  var api = 'https://api.github.com';

  // start all that jazz
  app.init = function init() {
    this.moment();
    this.issues(location.pathname);
  };

  // configure moment js for automatic format on data-*
  app.moment = function moment() {
    $('[data-format]').each(function(i, val) {
      var t = $(this),
        txt = t.text(),
        now = M(+txt),
        fmt = t.data('format') || 'fromNow';

      t.text(/from/.test(fmt) ? now.fromNow() : now.format(fmt)).removeClass('date-hidden');
    });
  };

  // github-issues as blog comment system <3
  app.issues = function issues(path) {
    if(path === '/') return;

    var p = path.replace(/\/$/, '').split('/').slice(-1),
      reg = new RegExp(p),
      req = $.getJSON(api + '/repos/mklabs/blog.mklog.fr/issues?callback=?');

    req.success(function(res) {
      var data = res.data;
      console.log('filter out the results', data);
      if(!data || !data.length) return;

      var related = data.filter(function(issue) {
        return reg.test(issue.title);
      });

      var ln = related.length,
        comments = [];

      related.forEach(function(rel) {
        var req = $.getJSON(api + '/repos/mklabs/blog.mklog.fr/issues/' + rel.number + '/comments');
        req.success(function(data) {
          console.log('success>', res);
          comments.push({
            issue: rel,
            comments: data
          });

          next(null, comments);
        });

        req.error(console.error.bind(console));
      });

      function next(err, model) {
        ln--;
        if(err) return console.error(err);
        if(!ln) app.renderIssues(model);
      }
    });

    req.error(console.error.bind(console));
  };

  // render the issues / comments listing.
  //
  // - model   - a Hash object to pass to templates
  app.renderIssues = function renderIssues(model) {
    var tmpl = _.template($('#tmpl-issues').html()),
      target = $('.gh-issues');

    console.log('template is', tmpl);
    console.log('model is', {
      issues: model
    });

    target.html(tmpl({
      issues: model
    }));
  };


  exports.app = Object.create(app);

  $(app.init.bind(app));

})(this.jQuery, this.moment, this);
