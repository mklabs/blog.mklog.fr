(function($, M, exports, undefined) {

  var app = {};

  var api = 'https://api.github.com';

  // start all that jazz
  app.init = function init() {
    this.ghissues = $('#gh-comments');
    this.template = _.template($('#tmpl-issues').html());

    this.ghm = new Showdown.converter();
    this.ghm = this.ghm.makeHtml.bind(this.ghm);

    this
      .moment()
      .issues(location.pathname);
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

    return this;
  };

  // github-issues as blog comment system <3
  app.issues = function issues(path) {
    if(path === '/') return;

    var p = path.replace(/\/$/, '').split('/').slice(-1),
      reg = new RegExp(p),
      req = $.getJSON(api + '/repos/mklabs/blog.mklog.fr/issues?callback=?');

    req.success(function(res) {
      var data = res.data;
      if(!data || !data.length) return;

      var related = data.filter(function(issue) {
        return reg.test(issue.title);
      });

      var ln = related.length,
        comments = [];

      if(!ln) return app.renderIssues();

      related.forEach(function(rel) {
        var req = $.getJSON(api + '/repos/mklabs/blog.mklog.fr/issues/' + rel.number + '/comments?callback=?');
        req.success(function(data) {
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

    return this;
  };

  // render the issues / comments listing.
  //
  // - model   - a Hash object to pass to templates
  app.renderIssues = function renderIssues(model) {
    model = model || [];

    var num = model
      .map(function(issue) {
        return issue.comments.data.length + 1;
      })
      .reduce(function(a, b) {
        return a + b;
      }, 0);

    num = num + ' commentaire' + (num > 1 ? 's' : '');
    this.ghissues.html(this.template({ issues: model, ghm: this.ghm, num: num }));
    return this;
  };

  exports.app = Object.create(app);

  $(app.init.bind(app));

})(this.jQuery, this.moment, this);
