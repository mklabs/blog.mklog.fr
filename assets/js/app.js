(function($, M, exports, undefined) {
  
  var app = {};

  // start all that jaz
  app.init = function init() {
    console.log('init');
    this.moment();
  };

  // configure moment js for automatic format on data-*
  app.moment = function moment() {
    $('[data-format]').each(function(i, val) {
      var t = $(this),
        txt = t.text(),
        now = M(txt),
        fmt = t.data('format') || 'fromNow';
      t.text(fmt === 'fromNow' ? now.fromNow() : now.format(fmt)).removeClass('date-hidden');
    });
  };


  exports.app = Object.create(app);
  $(app.init.bind(app));
})(this.jQuery, this.moment, this);
