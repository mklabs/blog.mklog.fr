
var stringify = module.exports = function stringify(context, options) {
  // escape any inner content?
  var pages = context.pages || [];

  if(context.pages) context.pages = context.pages.map(escape);
  if(context.post) context.posts = context.posts.map(escape);

  if(typeof context === 'string') context = escape(context);

  return JSON.stringify(context, null, 2);
};

Handlebars.registerHelper('stringify', stringify);

function escape(o) {
  var content = o.content || o,
    isStr = typeof o === 'string',
    str = Handlebars.Utils.escapeExpression(content).slice(0, 100);

  if(!isStr) o.content = str;

  return isStr ? str : o;
};
