

var nabe = require('nabe'),
  moment = nabe.moment;


//
// Custom feed generator, just for the sake of controlling from which date
// the feed should begin. A silly workaround to feed spam when re-generating content.
//

var Feed = module.exports = nabe.Generator.extend({

  from: moment('03-01-2012', 'DD-MM-YYYY').valueOf(),

  generate: function generate(site) {
    nabe.log.info('feed:generator', 'Filtering posts for feed from ', moment(this.from).format('LL'));

    var from = this.from;

    var posts = site.posts.filter(function(post) {
      return from < post.get('time');
    });

    site.set('feed_posts', posts);
  }
});
