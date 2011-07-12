Title: RequireJS ➤ mo-du-la-ri-té !
Author: Mickael Daniel
Date: Mar 06 2011 14:00:00 GMT+0100 (CDT)
Categories: javascript
version: requirejs-0.23.0

Il existe des dizaines de "script loader" aujourd'hui, avec différents degrés de complexité / fonctionnalité, nous permettant de charger nos fichiers javascript dynamiquement. Beaucoup d'entre eux font parties de framework spécifique, comme les loaders dans Dojo, YUI ou encore JavascriptMVC (Steal). 

Il existe également deux très bonnes alternatives à  la fois solides, très bien testées, indépendantes de tout toolkit et capable de résoudre des problèmes de chargement de ressource complexes: LABjs (Loading and Blocking JavaScript) et RequireJS.

Cet article se concentrera sur RequireJS, solution de script loading et gestion de dépendances créée par [James Burke](http://tagneto.blogspot.com/), qui est basé sur le système de gestion de dépendances de l'excellente librairie Dojo et de la spécification CommonJS, plus particulièrement sur l'[API Asynchronous Module Definition](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) (plus d'infos [ici](http://tagneto.blogspot.com/2010/12/standards-and-proposals-for-javascript.html) ou [là](http://www.sitepen.com/blog/2010/11/04/requirejsamd-module-forms/)).

J'essaierais de vous fournir une rapide vue d'ensemble de cette outil, suivie d'une petite démonstration de ce à quoi peut ressembler le développement aidé par requirejs, en espérant vous inciter à le considérer dans vos projets.

## RequireJS

Quand un projet atteint une certaine taille, la gestion des scripts peut devenir compliqué. Vous avez besoin d'être sûr de d'inclure vos sources dans le bon ordre, et vous avez besoin de sérieusement commencer à  penser à concaténer vos différents fichiers pour déploiement, de manière à  ce qu'une seule, ou un nombre très limité de requêtes HTTP soit faîtes pour charger les scripts. Vous aurez peut être aussi le souhait de charger du code à la volée, après chargement initial de la page.

RequireJS est fortement basé sur Dojo et CommonJS, il vous encourage donc à  traiter des scripts comme des modules. Comment un script diffère d'un module? Normalement, un script est juste un fichier javascript qui peut ajouter des variables au namespace global, il peut également impliquer des dépendances diverses et variées. Les modules essayent de limiter leur impact sur le global namespace et tentent d'être plus explicite par rapport à  la spécification de leur dépendances immédiates. 

Tandis que RequireJS se concentre à offrir d'excellents outils pour écrire du javascript modulaire, il supporte aussi le chargement de script plus classique. RequireJS fournit également un outil d'optimisation qui vous permet de combiner et grouper vos sources en collections plus petites de scripts minifiés. La fonction de tracking des dépendances permet de délivrer des 'bundles' hautement optimisés pour environnement de production, en effectuant une analyse de votre code et permettant très facilement de combiner vos scripts sans avoir à changer ni code, ni markup.    

Cet exemple présente le format classique pour chargement de scripts avec RequireJS.

    <script src="scripts/require.js"></script>
    <script>
        require(["some/module", "script1.js", "script2.js"], function(someModule) {
          // Cette fonction sera éxecutée quand toutes les dépendances spécifiées seront
          // chargées et disponibles. Cette fonction peut étre éxecutée avant que la page
          // ne soit chargée (ce n'est pas un document.ready!)

          // Le callback en lui-même est optionnel.
        });
    </script>

Notez la fonction de callback. L'injection de scripts à  la volée comporte un petit effet kiss cool: la page sera "débloquée" de manière à  ce qu'elle puisse continuer le chargement de ses ressources en parallèle du chargement des scripts, mais ceci implique également la distinction du chargement des scripts de l'événement load de la page. 

Si vous êtes habitué à attacher des comportement et initialiser votre code durant l'événement DOM-ready en assumant que tous vos scripts sont chargés et disponibles (comme c'est le cas avec des tags `script`), ceci n'est plus vrai. Vous devez utiliser le mécanisme de callback de requireJS pour s'assurer du chargement des scripts avant l'exécution de codes supplémentaires.

RequireJS dispose d'un système de plugins qui vous permet d'ajouter de nouveaux types de chargement ou de types de dépendances. Il existe des plugins natifs concernant le chargement de ressources i18n, de fichiers textes, traiter des services JSONP en tant que dépendances, et forcer l'ordre d'exécution des dépendances. Les plugins et leur utilisation sont spécifiés par l'utilisation d'un point d'exclamation.

**Exemple d'utilisation avec le plugin order:** 		

    require(["order!script1.js", "order!script2-a.js", "order!script3.js"], function() {
      // Cette fonction est exécutée une fois que tous les scripts ont été chargés et executés.
      // Etant donné que le plugin order a été utilisé, chaque scripts a été chargé séquentiellement.
      script1();
      script2();
      script3();
    });
		
Par défaut, les dépendances que l'on require ne seront pas exécutées dans un ordre précis, ainsi, elles ne doivent pas être dépendantes les unes des autres.
		
**Exemple d'utilisation avec le plugin text et utilisation conjointe avec jquery-tmpl:** 		

    require(['text!views/templates/index.html'], function(indexTmpl) {
      // les templates sont chargés par requireJS et rendus disponibles en arguments de fonction.
      $.tmpl(indexTmpl, data)
        .appendTo($('.requirejs-text-loading-rocks-with-templating'));
    });
		
Est devenu mon approche favorite pour travailler avec les templates js (peu importe le moteur utilisé, Mustache, jquery-tmpl, underscore, etc.). RequireJS permet de s'abstraire de cette notion et de ne pas avoir à contenir ses templates au sein de son markup HTML (même ignoré par le browser) tout comme le besoin de contenir du markup HTML au sein des sources JS. Je préfère avoir mes fichiers de templates indépendant les uns des autres et contenu dans leur propre fichier. Ce plugin text est idéal dans ce cas d'utilisation car il permet:

* de récupérer ces fichiers templates comme dépendances de modules
* de s'abstraire complètement du besoin de contenir du markup html dans les sources JS tout comme le besoin de récupérer les fichiers templates via appels xhr (Ajax)
* de les injecter automatiquement pour environnement de prod dans les bundles générés par le build d'optimisation de RequireJS.

Du tout bon.

**Exemple d'utilisation avec le plugin i18n, directement tiré de la [documentation officielle](http://requirejs.org/docs/api.html#i18n):** 		

    require(["i18n!my/nls/colors"], function(colors) {
      console.log("The name for red in this locale is: " + colors.red);
    });
	
RequireJS impose une certaine convention sur la localisation de vos bundles. Le plugin i18n assume la présence d'un répertoire "nls" dans lequel l'ensemble des bundles i18n seront stockés, chacun dans son répertoire "local" (exemple pour un bundle i18n fr: nls/fr-fr/colors.js). Il nous restera alors à créer le fichier i18n de base ainsi que les fichiers de traductions nous intéressant:

    //Contenu de nls/colors.js
    define({
      "root": {
        "red": "red",
        "blue": "blue",
        "green": "green"
      },
      "fr-fr": true
    });
		
    // Contenu de nls/fr-fr/colors.js
    define({
      "red": "rouge",
      "blue": "bleu",
      "green": "vert"
    });
		
		
		
**Exemple d'utilisation d'un service JSONP (ici twitter trends/current) en tant que dépendances, directement tiré de la [documentation officielle](http://requirejs.org/docs/api.html#jsonp):**


    require(["http://search.twitter.com/trends/current.json?callback=define"], function (trends) {
      // L'objet trends sera la réponse de l'api directement consommable
      // au sein de notre callback
      console.log(trends);
    });

Attention, seuls les retours JSONP de type json object sont supportés. Toute réponse comportant un array, une string ou un number ne fonctionnera pas. En effet, l'idée ici est de spécifier la fonction define (sur laquelle nous nous pencherons par la suite) en tant que paramètre callback à l'appel JSONP. Donc ici, `callback=define` indique à l'API appelée d'entourer la réponse JSON avec la fonction define de RequireJS. Brillant! Mais attention, la documentation souligne les limitations, problèmes et cas d'utilisation de cette technique.

### Les modules RequireJS

RequireJS encourage l'utilisation de modules. Les modules dans RequireJS sont définis via l'utilisation de la fonction `define()`, où la liste des dépendances et fonction de callback sont fournies. La fonction de callback est appelée une fois que toute les dépendances sont résolues et prêtes à être consommées. Si les dépendances utilisent aussi define et se plient à la convention RequireJS, alors vous pourrez en récupérer une référence (paramètre) dans la fonction de callback. Il s'agit tout simplement d'une approche ultra modulaire et permettant de complètement annihiler le besoin de variables globales (qui sont à éviter à tout prix).

Il ne devrait y avoir qu'une seule définition de module par fichier. L'outil d'optimisation peut, dans un contexte de prod, combiner différents modules en bundles optimisés.  


	define(["service/modularityftw"], function (service) {
	 
	    // Cette fonction est appellée une fois que la dépendance service est chargée et définie. 
	    // L'argument de fonction, service, sera notre référence au module service.
      
	 
	    // La valeur retournée par cette fonction représentera la définition de notre module ici présent.
	 
	    return {
	 
	        service: Object.create(service),
	 
	        o: function () {
	            this.service.whenever();
	        },
	 
	        m: function () {
	            this.service.whatever();
	        },
	        
	        g: function () {
	            this.service.goOoOoOoOOOo();
	        }
	    }
	});

Notez la dépendance qui n'inclue pas de suffixe ".js". On pourrait aussi utiliser le préfixe .js, cela a une incidence sur le chemin utilisé par RequireJS pour résoudre la dépendance. Nous y reviendrons rapidement dans la seconde partie de cet article.

Les modules RequireJS peuvent éviter le besoin d'exporter des variables dans le namespace global, et vu que toutes les dépendances sont référencés via des string, cela rend possible d'avoir de multiples version d'un module sur une même page.

En utilisant les modules, notre tout premier exemple pourrait ressembler à:

    
    require(["some/module", "script1", "script2"], function(someModule, script1, script2) {
    	// Cette fonction sera éxecutée quand toutes les dépendances spécifiées seront
    	// chargées et disponible. Cette fonction peut étre éxecutée avant que la page
    	 // ne soit chargée (ce n'est pas un document.ready!)
	 
    	 // Le callback en lui-même est optionnel.
    });

*Contenu de some/module.js*

    define(function () {
	 
  	    // définition du module ici
	 
  	    // var module = ...;
	 
  	    // on retourne l'api publique rendue disponible au reste de l'appli
  	    return module;
  	});
	 
*Contenu de script1.js*
	 
    define(["script1-a"], function (script1a) {
	 
      return {};
    });


Ce module peut parfaitement spécifier une liste de dépendances directes, rappelez vous que les les deps avec require (et sans plugin order!) ne sont pas chargées dans un ordre précis. Si un script dépend d'un autre, alors il devra nécessairement le faire savoir par la définition de ses dépendances lors de sa définition.
	 
	 
*Contenu de script2.js*

    define(["script2-a", "script2-b"], function (script2a, script2b) {
	 
	 
      return {};
	 
    });
	 

### RequireJS Optimization Tool

[L'outil d'optimisation fourni par RequireJS](http://requirejs.org/docs/optimization.html) rend facile la tâche de concaténation, minification de vos scripts en "bundles" optimisés, offrant ainsi l'accès aux meilleures performances tout en permettant à vos sources JS de rester modulaire. Il combine les scripts relatifs ensemble et les minifie en utilisant UglifyJS (Node mode par défaut) ou Closure Compiler (en utilisant Java). Il peut également prendre soin de l'optimisation de vos fichiers CSS référencés par la directive `@import` tout en prenant soin d'enlever les commentaires.

Le build d'optimisation intègre un outil de tracking de dépendances très bien fait qui analyse le source de vos scripts pour déterminer l'ordre de celles-ci et délivrer un bundle hautement optimisé et ne nécessitant aucun changement au niveau de vos sources. Modularité et performance, RequireJS offre le meilleur des deux mondes.

Etant donnée que cet outil est un outil en ligne de commande, son utilisation est des plus faciles et est conçue pour être intégré à vos processus de build ou déploiement (voir ce [gist](https://gist.github.com/825117) de Miller Medeiros qui nous montre comment l'intégrer avec Ant). 

## RequireJS et jQuery

Dans [cet article précédent](http://blog.mklog.fr/article/jquery-heritage-et-organisation-de-code), je vous ai parlé de la brillante approche DOM to Object Bridge de Mr. Sexton couplée à la forme d'héritage de votre choix. Dans la deuxième partie de ce billet, nous essaierons d'étendre l'application de cette approche en l'utilisant conjointement avec RequireJS.

Nous nous pencherons sur son utilisation effective, dans le contexte d'une application jQuery, et essaierons de voir comment RequireJS peut être couplé avec l'approche DOM to Object Bridge et la forme d'héritage de votre choix.

### Utilisation de RequireJS avec jQuery

Le plus facile reste de [récupérer un build de jQuery qui inclue RequireJS](http://requirejs.org/docs/download.html). Ce build exclue les parties de RequireJS qui peuvent dupliquer certaines des fonctionnalités jQuery.

Ensuite, utiliser RequireJS est plutôt simple: juste à inclure require-jquery, ensuite faire un require sur votre fichier application (le bootstrap). L'exemple suivant assume que jQuery, et tous les autres scripts sont dans le répertoire script/
    
    <!DOCTYPE html>
    <html>
        <head>
            <title>jQuery+RequireJS</title>
        </head>
        <body>
            <h1>jQuery+RequireJS</h1>

            <script src="scripts/require-jquery.js"></script>
            <script>require(["scripts/app.js"]);</script>
        </body>
    </html>


L'appel à `require["scripts/app"]` indique à RequireJS de charger le fichier scripts/app.js.

Vous avez également la possibilité encore plus clean de traiter jQuery comme un module à part entière.

    <!DOCTYPE html>
    <html>
        <head>
            <title>jQuery AMD+RequireJS</title>
        </head>
        <body>
            <h1>jQuery AMD+RequireJS</h1>

            <script src="scripts/require.js"></script>
            <script>require(["scripts/app"]);</script>
        </body>
    </html>

avec scripts/app.js ressemblant à
    
    require(['lib/jquery'], function($) {
    	// Dans cette déclinaison, le fichier jQuery ne s'expose pas au niveau du namespace global
    	// mais se définit en tant que module RequireJS / AMD.
	 
    	 $(function(){
    		// dom-ready
    	 });
	 
    });
		
Attention, dans cette version, il faudra que jQuery se définisse en tant que module asynchrone, ce qui n'est pas le cas par défaut. D'où le besoin de modifier les sources de jQuery pour l'entourer dans un appel `define` et prendre le soin de retourner jQuery à la fonction de callback de `define`. (une petite adaptation de `return (window.jQuery = window.$ = jQuery);` en levant l'exposition à l'objet window). Une autre petite déclinaison impliquerait l'ajout de cette ligne `define([], function () { return jQuery; } );` juste avant l'export de jQuery au niveau de l'objet global. Se référer à [ce commit](https://github.com/jquery/jquery/commit/6ffa730721a8ebcd128f3dc202706e46d9cfe249) pour de plus amples informations.

Concrètement, qu'est ce que app.js? Un autre appel à require pour charger tout les scripts dont on peut avoir besoin et tout travail d'initialisation que l'on peut vouloir effectuer pour une page. Tandis que vous pouvez utiliser la fonction require au sein d'un tag script en inline dans une page HMTL, il est fortement conseillé de prendre avantage du chargement asynchrone apporté par RequireJS en plaçant ce bout de script dans son fichier dédié. Cela permet aussi une meilleure optimisation grâce à l'outil de build fourni par RequireJS.

    <script data-main="script/app" src="script/require-jquery.js"></script>
 
indiquera à RequireJS d'effectuer cette appel automatiquement pour nous. L'attribut data-main indique alors le fichier à charger.

Voici un exemple un peu plus concret de fichier de type application bootstrap, tiré de [cette mini application](https://github.com/mklabs/html5boilerplate-site/tree/gh-pages/src/docs/js) permettant d'intégrer un wiki github à une page web.

    /**
    *
    * Main app file, this one is responsible of the load of any used modules so as to their initialization
    * against dom elements.
    *
    * Keep in mind that you can get a quick access to the internal stored object with container.data('modulename')
    *
    */
    (function($) {

        require(

        // Load in modules  
        ['app/modules/wiki', 'app/modules/messaging', 'app/modules/history', 'app/modules/highlight'],

        function(wiki, messaging, history, highlight) {
          
           // bridge method, a way to make your application code available to the jQuery API
           $.bridge('wikiConvertor', wiki);
           $.bridge('messaging', messaging);
           $.bridge('history', history);
           $.bridge('highlight', highlight);
           
            $(function() {
              var container = $('#container');

              container
                  // hashchange bindind & back button support stuff
                  .history()

                  // Our main module
                  .wikiConvertor({
                      wikiPath: container.data('wiki') || '',
                      main: '.wikiconvertor-content'
                  })

                  // Add messaging support, user feedback and so on
                  .messaging()

                  // Allow the hightlight of code snippets using SyntaxHighligter
                  .highlight();

            });
        });

    })(this.jQuery);
    
Voici donc le script chargé au départ de la petite appli "wikiConvertor". Le chargement des quatre modules de l'application y est fait, que l'ont peut retrouver en tant qu'arguments dans notre fonction de callback. Ces dépendances sont utilisées au niveau de la fonction [$.bridge](https://gist.github.com/853849) permettant de lier notre code applicatif aux éléments DOM en passant par l'API jQuery.

Un module est différent d'un fichier script traditionnel dans le sens où il se contraint à définir un objet correctement "scopé" qui ne pollue pas le namespace global. Il peut explicitement spécifier un ensemble de dépendances et récupérer un point de contrôle sur celles-ci sans avoir à se reposer sur des objets globals. Le lien se fait via l'utilisation d'argument de fonction pour récupérer une référence à ces dépendances. Les modules dans RequireJS sont une extension du [Module Pattern](http://www.yuiblog.com/blog/2007/06/12/module-pattern/), avec l'avantage notable de ne pas avoir à se reposer sur la portée globale pour référencer nos modules (même si l'on adopte la bonne pratique de contraindre notre code applicatif à un seul namespace global, il s'agit d'un point important).

Concrètement, un module chargé ainsi devra suivre la structure suivante:

    define(['base'], function(base) {
      
      var module = {
        init: function(options, elem) {
          // travail d'initialisation. appellée lors de la création du module
          // events binding, dom manipulation, etc.
          // this.options, this.element et d'autres props sont disponibles grâce à base
        },
        
        doStuff: function(){
          // var ...
        }
      };
      
      // simple multiple inheritence
      return $.extend({}, base, Object.create(module));
    });
    
avec base.js définissant un objet que doivent hériter l'ensemble des autres modules "bridgable" de l'appli. Cela permet d'éviter tout travail d'initialisation répétitif concernant options et élément.

    define(function() {
      return Object.create({
          setup: function(options, elem, name) {
              this.options = $.extend({}, this.options, options);
              this.element = $(elem);
              this.dom = elem;
              this.name = name;


              // Also add a css class as a CSS Hook
              this.element.addClass(name.toLowerCase());
          }
      });
    });

Jusque ici, ni la méthode init, ni la méthode setup n'a été appelée. Cette étape est gérée par $.bridge qui offre un helper sous la forme d'un mini plugin jQuery permettant d'accéder à notre API et modèle d'héritage. L'appel à $.bridge en lui-même ne sert qu'à étendre le prototype de jQuery en ajoutant la méthode correspondante. Les méthodes setup (dans base) et init(dans les sous-modules) sont alors appelées lors de l'utilisation effective de cette méthode:

    $.bridge('messaging', messaging);
    $(function() {
      // init/setup appellée lors de l'initialisation du module messaging pour 
      // tout les élements.mod-message
      var msgs = $('.mod-message').messaging({
        optional: 'options'
      }),
      
      // ici c correspond à l'instance jQuery représentant les élements .mod-message
      // on peut accéder à l'api du module à partir du dom via $.data/$.fn.data
      module = msgs.eq(0).data('messaging');
      
      // log propriétés/méthods pour le module du premier élement de la collection jQuery
      console.log(module);
      
    });

Lors de de l'instruction `$('.mod-message').messaging({options: 'optional'});`, le bridge s'occupera de créer une nouvelle instance du module messaging pour chaque élément de la collection jQuery vous assurant encapsulation et modularité.

## RequireJS: Utilisation avancée (ou s'en rapprochant)

Dans cette troisième et dernière partie, nous essaierons de faire le tour des différentes manières que nous avons à notre disposition pour créer un module et d'identifier les différents patterns que l'on peut mettre en oeuvre.

### Hash Object: Simple objet de paires clé-valeurs

		define({
			path: '../',
			suffix: '.markdown'
		});
		
Ce module ainsi défini, ne dispose d'aucune dépendances, et n'est qu'une collection de paires clé-valeurs. Il nous suffit de passer un objet à la fonction define.	Marche très bien pour tout objet config par exemple, global à l'application. Cette méthode est également utilisée lorsque requireJS est utilisé pour traiter un service JSONP en tant que dépendances (réponse JSONP passé à la fonction define). C'est aussi la syntaxe à utiliser si le module que l'on veut définir ne dispose que d'une API publique (toutes les propriétés/méthodes sont alors publiques).

### Pattern Object

Ce pattern retourne un objet, et la fonction de définition peut contenir d'autres variables qui ne seront pas visible en dehors du scope de la fonction.

La syntaxe rappelle beaucoup le module pattern. Ici, ce code ne spécifie aucune dépendances et contient une fonction d'initialisation du module. Il peut retourner un objet (mais n'y est pas forcé) contenant une API publique et disposant d'un accès privé au scope de la fonction parente. C'est ce retour de fonction qui s'enregistre auprès de RequireJS comme un module disponible pour les autres parties de l'applications.

    	// simple
		define(function () {
	    // Init ici et privates variable ici
		  // var private = ...
			return {
			      // public api
		        color: "black",
		        size: "unisize"
		    }
		});
		
		
		// assumant l'utilisation de jQuery, nous pouvons utiliser $.proxy pour encore plus de contrôle
		define(function () {
      
			// On peut utiliser ce scope à notre avantage pour spécifier un ensemble de variables privés à notre module
      		// Ne sera pas accesible du reste de l'application...
      		var privateObj = {
        		prop: true,
        		omg: function(just, got, to, a, new, level) {
          			console.log('cause variable are so hype this days');
        		},
        
        		yay: function() {
          			console.log('thxbye', this.prop);
        		}
      		};
		  
		  	// ... a moins que l'on décide de le faire
		  	// retourne une API publique
			return {
				yay: $.proxy(privateObj.yay, privateObj)
			}
		});

[$.proxy](http://api.jquery.com/jQuery.proxy/) est une méthode introduite depuis la version 1.4 permettant de faciliter le binding (ou context: le sens du mot clé this) d'une méthode. C'est vraiment très puissant dans le contexte d'application jQuery car elle permet vraiment de limiter le besoin de fonction anonyme et utilisation d'apply/call. Il devient très facile de penser ses gestionnaires d'événements ou autres (xhr, animate, etc.) de manière plus orienté objet, et s'inscrivant dans la logique de notre application. Bref, très bon et à utiliser le plus possible.

Voici le même pattern mis en oeuvre avec une listes de dépendances: 

		define(['service', 'config'], function (service, config) {
		    // Les dépendances du présent module sont disponible en tant qu'argument de fonctions.

			va private = "Hey I'm private stuff";		    
		
			return {
		        foo: "bar",
		        yep: "nope",
		        execute: function(options) {
		        	service.getStuff(options || config);
		        }
		    }
		});
		
    
### Pattern Factory

L'idée est de retourner une fonction, qui, quand appelée, retourne une instance d'un objet étant définit à l'intérieur du module RequireJS. Le code suivant, tiré de la [présentation ffco](http://www.slideshare.net/rmurphey/functionality-basedorg) de Rebecca Murphey, retourne une factory pour créer des instances de Person. L'approche utilisée suit l'école prototype (`Object.create`) avec l'utilisation conjointe de `$.extend`.

    require.def(function() {
      var Person = {
        intro : 'My name is ',
        outro : '. You killed my father. Prepare to die.',

        speak : function() {
          console.log(
            this.intro, 
            this.firstName, 
            this.lastName,
            this.outro
          );
        }
      };

      return function(config) {
        return $.extend(Object.create(Person), {
          firstName : config.firstName,
          lastName : config.lastName
        });
      };
    });
    
Voici une déclinaison de ce pattern factory avec l'approche classical et l'utilisation de [simple inheritence de Resig](http://ejohn.org/blog/simple-javascript-inheritance/):

    require.def(function() {
  
      var Person = Class.extend({
        intro : 'My name is ',
        outro: '. You killed my father. Prepare to die.'
        init: function(fistName, lastName){
          this.firstName = fistName;
          this.lastName = lastName;
        },
        speak: function() {
          console.log(
            this.intro,
            this.firstName,
            this.lastName,
            this.outro
          );
        }
      });

      return function(config) {
        return new Person(config.firstName, config.lastName);
      };
    });

### Chargement conditionnel des ressources

Tiré du slide [jquerysbestfriends.com](http://jquerysbestfriends.com/#slide20) d'Alex Sexton.

    define('factory', (Object.create) ? [] : ['fill/objCreate'], function() {
      var myCoolObject = {
        func1: function() {},
        func2: function() {}
      };
      // return a function that returns an obj
      return function(){
        return Object.create(myCoolObject);
      };
    });

Ou un petit yepnope appliqué à RequireJS... Juste brillant! Combinez le avec l'utilisation de modernizr et vous avez quelque chose vous permettant de charger finement vos [polyfills](http://remysharp.com/2010/10/08/what-is-a-polyfill/) en utilisant RequireJS (ou utilisez juste [yepnope](http://yepnopejs.com/) dont la version 1.0 vient tout juste de sortir!). Modernizr n'ajoute pas les fonctionnalités manquantes aux navigateurs: à la place, il détecte la disponibilité de ces fonctionnalités et nous offre le moyen d'atteindre un niveau de contrôle très fin indépendamment des capacités du navigateurs. Ceci dit, si vous êtes intéressé, vous aurez peut-être tout intérêt à jeter un oeil ici: [HTML5 Cross browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)

## Encore

J'espère que vous avez apprécier cet aperçu rapide à RequireJS et êtes prêt à le considérer pour vos applications. C'est vraiment par la pratique que vous pourrez vous rendre compte à quel point cet outil est puissant, tant au niveau de l'amélioration des performances, que, et surtout, du niveau de granularité et de modularité qu'il peut apporter dans votre processus de développement.

Dans cet article, je ne me suis penché que sur l'utilisation de RequireJS dans l'environnement du navigateur, mais il a été conçu pour pouvoir être utilisé également dans d'autres environnement javascript comme Rhino ou [Node](http://requirejs.org/docs/node.html). Cela ouvre de très belles perspectives et l'on peut déjà voir quelques expériences très prometteuses comme [Unified codebases with Dojo, Node, and RequireJS: the holy grail of DRY code](http://zetafleet.com/blog/unified-codebases-with-dojo-node-and-requirejs-the-holy-grail-of-dry).