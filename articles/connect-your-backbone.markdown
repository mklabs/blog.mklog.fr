Title: Backnode: Connect your Backbone
Author: Mickael Daniel
Date: Sun Jul 10 2011 00:04:56 GMT+0200 (CEST)
Categories: JavaScript, node, backbone

Un post pour vous parler d'une de mes dernières expérimentations. L'idée est de me fournir la possibilité d'utiliser Backbone et son API coté serveur, depuis un environnement node. Il existe [quelques tutos tutos](http://andyet.net/blog/2011/feb/15/re-using-backbonejs-models-on-the-server-with-node/) sur [le sujet](http://amir.unoc.net/how-to-share-backbonejs-models-with-nodejs), permettant notamment de partager les modèles Backbone. Mais je voulais un peu plus (ou différemment), ayant joué tout récemment avec l'API de Backbone et le support de l'history push state (depuis la version 0.5, yay!). J'ai beaucoup aimé la façon dont s'architecture une application avec Backbone, la façon dont sont défini les routes, le modèle object de la lib, le style, les partis pris et la technique. Le tout couplé à underscore donne un code juste super élégant, propre, structuré qui en même temps vous laisse une énorme liberté et ne décide de rien pour vous.

J'ai eu alors très envie d'utiliser la même chose coté serveur. Bien sûr, beaucoup de code de Backbone est relatif à de la manipulation DOM mais se restreint principalement au vue, et support de l'History. Ca m'a alors travaillé et ait commencé à jouer avec Backbone, dans un environnement node. La lib est suffisamment bien pensé pour être packagé et pensé pour être utilisé des deux cotés, mais il manque un petit quelque chose pour accrocher l'API de Backbone, et plus particulièrement Backbone.Router, avec le paradigme request/response d'un serveur web.

En partant sur l'idée d'un middleware connect (et du coup compatible express), voici ce que ça donne.

_TLDR; ? Rendez vous au dernier paragraphe :)_

## intro

Je connaissais depuis un moment cette fantastique librairie qu'est [Backbone](http://documentcloud.github.com/backbone/), j'avais lu la documentation, pas mal de tutos mais n'avait pas eu l'occasion de vraiment jouer avec. Je n'avais jusque là pas encore mis en place une appli pour me rendre compte à quel point Backbone est bien pensé.

J'ai eu l'immense plaisir et l'avantage d'assister samedi dernier, a mon deuxième atelier jsattitude, où la formule différait un peu. L'idée était de partir "from scratch" en mettant en place une appli backbone au dessus d'un mini backend qui reproduisait la navigation github. Cela a été prétexte a appréhender Backbone, Mustache pour le rendu des vues, un petit `Backbone.history.start({pushState: true})` pour gérer les transition des pages, support de l'offline en jouant avec du cache.manifest et storage avec [lawnchair](http://westcoastlogic.com/lawnchair/), etc. Bref, c'était dense ! J'ai en tout cas adoré la façon dont cela s'est déroulé, parfois difficile à suivre, mais ce genre d'exercice est super enrichissant. Et donne envie de creuser.

L'API et le design de Backbone est très élégant, composé de quelques composants principaux comme:

* Backbone.Router (avant Controller)
* Backbone.View
* Backbone.Model (et Collection)

Comme expliqué en tout début d'article, le tout m'a donné l'idée de jouer avec et essayer de faire tourner ces trois composants sous node, en faisant quelques concessions et parti pris sur ce dont on a besoin dans un environnement différent comme celui d'un serveur web (a moins qu'on utilise [jsdom](https://github.com/tmpvar/jsdom), définitivement à creuser).

## Comment

L'idée est de se raccrocher au cycle request/response d'un serveur web. Node est assez bas niveau et en même temps assez haut niveau pour nous permettre d'à peu près tout faire. connect et express le sont un peu également. On peut les voir comme des frameworks pour faire d'autres framework au dessus (comme http://railwayjs.com/ par exemple).

Dans connect (connect est la libs de middleware qu'utilise en interne express), chaque composant appellé middleware définit une couche, une fonction qui reçoit trois paramètres: request, response et next. Connect et Express étendent request ou response pour fournir des méthodes utiles (comme res.render chez express). Le dernier paramètre next est une fonction permettant de passer le contrôle aux prochains middlewares. Habituellement, une couche met fin à la réponse (en renvoyant quelque chose) ou fais appel à next() pour passer le boulot aux copains.

L'idée était alors de définir une couche connect acceptant une instance Backbone.Router (ou plusieurs) qui serait alors utilisé pour construire le router connect correspondant. Couplé avec des Backone.View un peu particulier, utilisant le même style que dans le navigateur mais au lieu de manipuler un élément du DOM, fin à la response avec une sortie, en utilisant Mustache pour le rendu des vues (ou tout autre moteur de template, vraiment l'idée est de prendre un hash (objet clé valeur), le passer à un fichier de template et récupérer une string en retour).

## Backnode

Qu'est ce que Backnode... Comme son nom l'indique, c'est en quelque sorte une copie couche au dessus de Backbone, imitant son API coté serveur. Chaque composant, hormis les vues sont en réalité directement les composants Backbone (quand je parle de composant, on peut parler de Class).

Il s'agit d'une première implémentation, une mise en oeuvre rapide pour voir si l'idée est faisable. J'ai voulu coder ça pour une utilisation personnelle et pour le fun, ce n'est vraiment pas testé contre tout type d'utilisation. Mais jusque là... Cela s'est prouvé plutôt plaisant de coder coté node avec une application Backbone...

Dans l'idéal et en théorie, on devrait pouvoir utiliser pratiquement (ou totalement), la même base de code des deux cotés. Backbone permet d'utiliser des Models (et Collection) qui utilisent en interne la méthode [`Backbone.sync`](http://documentcloud.github.com/backbone/#Sync) pour persister et récupérer les modèles. En pratique, coté client, il s'agirait d'une implémentation parlant à un service web (par défaut Backbone le fait pour vous, il suffit de définir la bonne url au niveau du modèle) ou en utilisant un  [adapter localStorage](http://documentcloud.github.com/backbone/docs/backbone-localstorage.html) ou [connecteur couchdb](https://github.com/janmonschke/backbone-couchdb) par exemple. 

Coté node, cela pourrait être une implémentation manipulant le filesystem, parlant à une base mongodb, couch, redis, etc. Du moment que l'on implémente ce qu'il faut où il faut, en théorie, c'est possible. En pratique, j'ai pu commencer à le faire avec le filesystem, où un  `fetch()` sur ma Collection devient possible me permettant de récupérer un ensemble de fichier.

### Installation

Ce package n'est pas npm publié, et ne le sera probablement pas. Mais un git clone + npm link suffit amplement (npm link crée un symlink global vers la lib, ayant le même résultat qu'un npm install fait en mode global (flag `-g`). Très pratique en dev).

    git clone https://github.com/mklabs/backnode
    cd backnode
    npm link
    
A partir de là, il suffit a partir de n'importe quel autre répertoire de faire un

    npm link backnode
    
pour pouvoir require la lib (ou simplement se créer un dossier node_module à la racine du projet et faire un git clone à cet endroit).

### Motivation

* *JavaScript everywhere* et une API consistante entre le client et le server.
* Une manière simple d'accéder aux Model, Views, Router de Backbone dans des appli connect ou express.
* Utiliser l'API pushState tout en restant accessible et copain avec les moteurs de recherche. Les navigateurs supportant l'api pushState ont de belles transitions et une appli single-page de façon transparente ("just feels faster", no #), les autres ne font que demander une réponse au serveur, tout ce qu'il y de plus classique et obtiennent le même rendu. 
* Les requête ajax recoivent exactement le même model que celui fourni aux vues, partagé coté client et serveur. Le serveur sait quelle réponse renvoyé en se basant sur un peu de négociation de contenu hyper simplifié (en se basant sur le header HTTP Accept) 
* Backbone.Router like API pour gérer les requêtes entrantes.
* Fournir juste assez d'abstraction pour utiliser les fonctionnalités de Backbone, son style et principes dans node.
	* Pas d'infrastucture realtime ou quoi que ce soit (il existe déjà pas mal de projets très bien sur le sujet, notamment [SocketStream](https://github.com/socketstream/socketstream) ou [Capsule](https://github.com/andyet/Capsule)), le but se restreint à juste gérer une requête entrante et générer une réponse.
* Template engine agnostic: tout comme backbone, le but est d'être capable d'utiliser n'importe quel moteur de template qui prend une chaîne de caractères (avec une éventuelle phase de compilation), des données et retourne une nouvelle chaîne de caractères.

### Ce qu'il reste à faire

* A peu près tout

##### et problèmes à résoudre

* Pas de DOM. Les Router, Model et Collection peuvent de base vivre en dehors du contexte du navigateur, pas de dépendances directes sur `document` ou autre chose. Ce n'est pas forcément le cas des vues (ou si l'on fait appel à des métodes manipulant l'history comme `navigate()`)
* La plupart des fichiers de template sont récupérés de manière synchrone par souci pratique, vu que la plupart du temps (en tout cas ds les exemples mis en place) les vues sont instanciées au démarrage du serveur, c'est acceptable (mais async ftw... donc à faire).
* Backbone.sync implémenté très rapidement pour parler au filesytem, d'autres expérimentations ac des db, nosql ou pas, seraient à faire. Pour l'instant, c'est du nonosql.
* Les vues sont en fait des classes qui dirigent le rendu d'un fichier de template. Backbone fournit un modèle OO très bien fait, et les vues peuvent être étendues. L'idée serait de pouvoir avoir une sorte de vues par composition, avec des vues héritant d'autres et offrant un système d'héritage de templates, même très simple. 

### Utilisation basique

##### et API souhaitée

Voici un exemple simple, 169 lignes de code, d'un mini wiki, prenant un dossier remplit de fichier markdown et générant un site web.



    // ## Backnode example

    // This is a quick implementation of a basic example of what a backnode app could look like

    // ##### Needs to figure out - 
    // how do we hook up in the request/response lifecycle time? 
    // in connect, express apps, actions gets request, response, next as funcion parameters
    // and would break Backbone API. May we put according object req/res/next (and taking care of updating
    // references for each request, will be overkill, performance-costly? may use EventEmitter for that
    // at the middleware level.)

    // we basically needs a way to acces them, one way or another. needs acess to request, response object, 
    // namely for being able to end the response. needs access to next() method as well, important to pass request
    // to following middleware if the response is not ended.

    // if the setup of req/res/next is done using class attributes, do we need to put them in Router(at least), Views
    // and Models? Models pretty sure that we shouldn't.

    // ##### Error handling
    // cannot just throw. Use of this.next(err);


    var Backnode = require('../../lib/backnode'),
    Backbone = Backnode.Backbone,
    _ = require('underscore'),
    connect = require('connect'),
    Mustache = require('mustache'),
    fs = require('fs'),
    md = require('github-flavored-markdown').parse,
    Path = require('path');

    var Page, Router, PageView;

    // ### Backbone.Router

    Router = Backnode.Router.extend({
      routes: {
        '':                'about',  // /about
        'about':                'about',  // /about
        'wiki':                 'about',  // /about
        'wiki/:page':           'post',   // /blog/blog-post
        'wiki/tag/:tag':        'tag',    // /blog/tag/node
        'search/:page/p:query': 'search'  // /search/one-page/p7
      },

      initialize: function() {
        // constructor/initialize new Router([options])

        // model may be Collections as well
        this.pages = new Pages();
        this.view = new PageView({model: this.pages});

      },

      // action, do something, usually generates response and res.end  
      about: function() {
        this.view.render();
        // actions can also pass control over next middleware
        // `this.next()`
      },

      search: function(page, query) {
        this.view.render();
      },

      post: function(post) {
        this.view.render(this.pages.getFile(post));
      }
    });

    // ### Page - Backbone.Model

    // will have to override sync, when fetching/saving we no longer
    // issues REST request to talk to the server, we already are the server

    // Instead, could think of various adapters to handle persistence (mongo
    // redis, couch, in memory, filesystem, ...)

    Page = Backnode.Model.extend({
      toJSON: function() {
        var page = Backnode.Model.prototype.toJSON.apply(this, arguments),

        progressivePath = [],

        pathSegments = page.path.replace(/\/$/, '').split('/');

        pathSegments = _.map(pathSegments.slice(0, -1), function(seg) {
           progressivePath.push(seg);
           var url = "/" + progressivePath.join('/') + '/';
           return '<a href="' + url + '"> ' + seg + '</a>';
        }).concat(pathSegments.slice(-1));

        page.content = md(page.content);
        page.segments = pathSegments.join(' / ');
        return page;
      }
    });


    Pages = Backnode.Collection.extend({
      model: Page,

      toJSON: function() {
        var json = Backnode.Collection.prototype.toJSON.apply(this, arguments);    
        return {
          title: 'Backbone on top of Connect for delicious applications',
          pages: json
        };
      },

      getFile: function(file) {
        return this.filter(function(page) {
          return page.get('file') === file;
        })[0];
      },

      comparator: function(page) {
        return page.get('file');
      },

      // when created (at server startup), get the list of all pages from the file system
      // and init the collection. Only called once, and on server startup, go sync
      initialize: function() {
        this.fetch();
      }
    });

    // ### PageView - Backbone.View

    // Get started with views by creating a custom view class. You'll want to override the render function, 
    // specify your template string.

    PageView = Backnode.View.extend({

      // Cache the template function for a single page.
      template: function(data) {
        return Mustache.to_html(this.templateStr, data); 
      },

      initialize: function(options) {
        // usually a filesystem call to get template string content.
        // If Views are initialized at server startup time, sync calls are fine

        // otherwise, could be wise to scans the entire package at startup, compile views and keeps
        // reference to either compiled function or template string for later use
        this.templateStr = fs.readFileSync('page.html').toString();
      },

      render: function(model) {
        model = model || this.model;
        model = model instanceof Backnode.Model ? new Pages(model) : model;
        this.res.end(this.template(model.toJSON()));
      }
    });


    // Override `Backbone.sync` to delegate to the filesystem.
    // TODO: cleanup and delegates each method>case in functions/method
    Backbone.sync = function(method, model, options, error) {

      if(method === "read") {
        if(model.file) {
          fs.readFile(Path.join(__dirname, 'test/backbonewiki/', model.file), function(err, content) {
            if(err) options.error(err);

            options.success({
              content: content 
            });
          });
        } else {
          fs.readdir(Path.join(__dirname, 'backbone-wiki'), function(err, files) {
            if (err) throw err;
            var ln = files.length,
            ret = [];
            _.each(files, function(file) {
              var ext = /\.md|\.mkd|\.markdown/,
              name = file.replace(/\.md|\.mkd|\.markdown/, '');

                // Special case for "app"
              if (!ext.test(file)) return;

              fs.readFile(Path.join(__dirname, 'backbone-wiki', file), function(err, content) {

                if(err) console.log(err);
                ret.push({
                  title: name,
                  file: file,
                  path: './wiki/' + file,
                  content: content.toString()
                });

                if(ln === 1) {
                  console.log(ret);
                  options.success(ret);
                }

                ln--;
              });
            });
          });
        }
      } else if(method === "create") {

      } else if(method === "update") {

      } else if(method === "create") {

      }
    };



    // a basic connect stack with a backnode middleware
    // it is the server version of a $(function() { new Router(); Backbone.history.start(); })
    connect.createServer()
      .use(connect.logger(':method :url :status :res[content-length] - :response-time ms'))
      .use(Backnode(Router))
      .use(connect.directory(__dirname))
      .use(connect.static(__dirname))
      .listen(4000);

    console.log('Server started, up and running on port 4000');



### Fonctionnel (ou presque)

* Router: la fonctionnalité basique de routing via l'API Backbone, faît en utilisant le middleware connect.router.
	* les paramètres de req.params sont récupérés et passé aux gestinnaires d'évenement (une méthode du Router) quand invoqués.
	* les instances de router passés à la couche middleware instance reçoivent les objets request, response et la fonction next (en tant que req, res, next). Mis à jour sur chaque requête entrante.
		* ex pour terminer la réponse depuis un Router: this.res.end('Backbone  ♥ Node  ♥');
		
## Conclusion

Jusque là, cela s'est prouvé très très plaisant de construire une application web en utilisant ce genre de procédé. L'exemple du repo utilise un use case de wiki très simple, utilisant le filesytem et les modèles Backbone pour gérer les fichiers et leur contenu, les vues Backbone pour définir les template utilisé, le tout orchestré par des Router Backbone, utilisant une API très proche de ce que l'on serait amené à coder coté client (l'idée serait d'utiliser juste des vues différentes, ou coder pour s'adapter en fonction de l'env. Adapter?).

_Note: Un merci tout particulier à Mr @jsattitude, cette journée était superbe, les composants utilisés juste super bons, le tout dans une bonne ambiance._
