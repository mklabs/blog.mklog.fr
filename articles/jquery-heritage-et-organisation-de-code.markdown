Title: jQuery, héritage et organisation de code
Author: Mickael Daniel
Date: Feb 06 2011 15:00:00 GMT+0100 (CDT)
Categories: Javascript, jQuery

Alex Sexton (membre de la team jQuery, co-host YayQuery, créateur de la librairie YepNope, etc.) a écrit un article excellent il y a quelques temps de cela sur l'[utilisation de patterns d'héritage](http://alexsexton.com/?p=51) pour organiser une application Javascript utilisant jQuery et adoptant une approche "bridge" particulièrement élégante et s'inspirant énormément de la Widget Factory de jQuery UI (Scott Gonzalez).

Il explique que de nos jours, la plupart des développeurs web tendent à oublier les paradigmes appris dans les autres langages pour écrire du code correctement structuré. Il l'explique par le fait que jQuery vous laisse une grande liberté quand l'on vient à penser en terme de structuration de code ou d'héritage et ne pousse donc personne dans une direction ou une autre. Bien souvent, dans d'autres framework, un pattern est offert et exclusivement utilisé (dojo declare/provide/require et son système de package, MooTools Class, YUI, etc.), ce qui généralement abouti sur un code plus uniforme et robuste qu'une chaîne indentée interminable d'instructions jQuery.

## L'approche Sexton

Voici quelques ressources sur le sujet d'[Alex Sexton](http://twitter.com/SlexAxton) qui réellement a effectué un travail d'évangélisation énorme sur le sujet.

### Superclassy Inheritence with Javascript

[Superclassy Inheritence with Javascript](http://alexsexton.com/?p=94)

<iframe src="http://player.vimeo.com/video/9998565" width="700" height="394" frameborder="0"></iframe><p><a href="http://vimeo.com/9998565">Superclassy Inheritance with Javascript - Alex Sexton - NCJS 02/20/10</a> from <a href="http://vimeo.com/yayquery">yayQuery</a> on <a href="http://vimeo.com">Vimeo</a>.</p>

<div style="width:425px; margin: auto;" id="__ss_3036379"><strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/SlexAxton/superclassy-inheritance-in-javascript" title="Superclassy Inheritance In Javascript">Superclassy Inheritance In Javascript</a></strong><object id="__sse3036379" width="425" height="355"><param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=alexsexton-superclassyinheritanceinjavascript-100130160253-phpapp01&stripped_title=superclassy-inheritance-in-javascript&userName=SlexAxton" /><param name="allowFullScreen" value="true"/><param name="allowScriptAccess" value="always"/><embed name="__sse3036379" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=alexsexton-superclassyinheritanceinjavascript-100130160253-phpapp01&stripped_title=superclassy-inheritance-in-javascript&userName=SlexAxton" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed></object><div style="padding:5px 0 12px">View more <a href="http://www.slideshare.net/">presentations</a> from <a href="http://www.slideshare.net/SlexAxton">Alex Sexton</a>.</div></div>

Présentation tout bonnement excellente sur les différents pattern d'héritage à notre disposition et démonstation de l'approche bridge (Dom &lt;&gt; Object).

[Lien vers la démo](http://alexsexton.com/inheritance/demo/)

### How To Manage Large jQuery Apps

<div style="width:425px; margin: auto;" id="__ss_3843303"><strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/SlexAxton/how-to-manage-large-jquery-apps" title="How To Manage Large jQuery Apps">How To Manage Large jQuery Apps</a></strong><object id="__sse3843303" width="425" height="355"><param name="movie" value="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=largejqueryapps-100424175106-phpapp02&stripped_title=how-to-manage-large-jquery-apps&userName=SlexAxton" /><param name="allowFullScreen" value="true"/><param name="allowScriptAccess" value="always"/><embed name="__sse3843303" src="http://static.slidesharecdn.com/swf/ssplayer2.swf?doc=largejqueryapps-100424175106-phpapp02&stripped_title=how-to-manage-large-jquery-apps&userName=SlexAxton" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="355"></embed></object><div style="padding:5px 0 12px">View more <a href="http://www.slideshare.net/">presentations</a> from <a href="http://www.slideshare.net/SlexAxton">Alex Sexton</a>.</div></div>

Encore une petite merveille sur la gestion de larges applications jQuery: Encapsulation, modularité et réutilisation de code. Alex nous présente avec brio quatre composantes essentielles et la manière de les mettre en oeuvre:

1. Inheritence Model
2. Configurable Mixin Options
3. DOM to Object Bridge
4. Dependency Management

Tout simplement incontournable.

## Choix de la forme de modularité

Javascript dispose de nombreuses options et "moyens" d'implémenter un pattern d'héritage (prototypal, classical, pseudo-classical). Voici quelques très bonnes ressources sur le sujet dont je vous conseille vivement la lecture:

* [Javascript: The Good Parts (Chapter 5)](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
* [Prototypal Inheritance in Javascript](http://javascript.crockford.com/prototypal.html) - Douglas Crockford
* [Object-Oriented Javascript](http://www.amazon.com/Object-Oriented-JavaScript-high-quality-applications-libraries/dp/1847194141) - Stoyan Stefanov
* [Javascript Override Patterns](http://webreflection.blogspot.com/2010/02/javascript-override-patterns.html) - Andrea Giammarchi
* [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) - John Resig
* [Javascript Patterns](http://www.amazon.com/gp/product/0596806752?ie=UTF8&tag=rebasbl-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596806752) - Stoyan Stefanov

Alex explique que le choix de votre forme de modularité est une étape importante, c'est donc une décision que vous devrez prendre en pesant le pour et le contre, en analysant scrupuleusement vos besoins et en quoi le choix d'un pattern y répondra (ou pas).

Si vous venez d'un background purement classique en terme d'héritage (Je travaille quotidiennement sur du Java, donc je connais ce monde...), l'approche classique vous correspondra certainement le mieux (auquel cas je conseillerais Simple Javascript Inheritence de John Resig). Ma préférence personnelle se porte sur l'approche prototype et l'utilisation d'Object.create (introduit ds ES5, [ici](http://kangax.github.com/es5-compat-table/) pour une table de compatibilité complète).

Rentrons maintenant dans le vif du sujet par la présentation de la technique DOM to Object Bridge mise en oeuvre par Alex et l'utilisation que l'on peut en faire conjointement avec une approche prototype / classical.

Niveau markup, restons simple avec un simple div vide:

    <div class="myapp-modulename-feature"></div>

Ensuite, vient le code javascript et la fonction dom ready:

    $(function() {

    	// $.fn.feature est un plugin jQuery classique, retournant la sélection jQuery.
    	var domFeature = $('.myapp-modulename-feature').feature({
    		name: 'My Super Awesome Feature'
    	});
	
    	// Possibilité d'accés rapide à l'objet feature (celui comportant notre logique)
    	// la clé é utiliser est le nom du plugin (trés similaire à la récupéreration de l'instance d'un widget jQuery UI).
    	var feature = domFeature.data('feature');

    	// l'API de l'objet feature peut contenir des manipulations DOM complexes
    	// qui sont complétement décorellé de la "logique métier". 
    	feature.doSomething();	// Peut effectuer une manipulation du DOM.
    });
		
Le markup HTML pourrait maintenant ressembler à:

    <div class="myapp-modulename-feature">
    	<h1>My Super Awesome Feature</h1>
    	<p>
    		I am generated markup. 
    	</p>
    </div>

Alex explique que la clé ici est que nous ne sommes pas forcés d'appeler quelque chose comme elem.append(); comme nous n'avons pas à nous soucier de ce qu'il se passera si un objet feature est appellé avec la fonction doSomething. Il considère ceci comme la clé d'un développement modulaire (et je suis plutôt d'accord, une abstraction du DOM est nécessaire et une approche centré sur celui-ci mène inévitablement à une pile de code inmaintenable).

Ce niveau d'abstraction permet de garder le quoi et le comment séparé, ou faiblement couplé. L'autre point très important et qui contribue à rendre cette approche si intéressante est que nous avons la possibilité claire et bien définie d'obtenir notre Objet et notre dom élement - que l'on se trouve d'un coté ou de l'autre:

* Si votre point d'entrée est un élement DOM, vous pouvez facilement accéder à son Object relatif dans votre App, ce qui est particulièrement utile pour répondre aux interactions utilisateurs.
* Codez votre site en utilisant des objets, mais avez toujours un accès facile à son élement DOM relatif.

Ce concept que l'on peut retrouver dans la Widget Factory revient à stocker l'instance de notre objet dans le data-store de l'élément DOM via l'utilisation de la méthode $.data de jQuery.

Comme vous pouvez le voir, implémenter cette technique est plutôt simple (le tout est d'avoir l'idée et l'inspiration) et comme l'explique Alex, l'implémentation devrait nécessiter beaucoup moins de réflexions et de difficultés que de traverser le dom via une immense châine jQuery.

## L'école prototype (the prototypal way)

    var feature = {
    	init: function(options, elem) {
    		// Merge des options passés en paramétres avec les options par défaut
    		// Nos fameux mixins options
    		this.options = $.extend({},this.options,options);
		
    		// Sauvegarde des référence de l'élement jQuery et de l'élement DOM
    		this.element = $(elem)
    		this.dom = elem;
		
    		// appel de méthode
    		// préfixé par _ pour indiquer un état privé 'fictif'
    		this._build();
    	},
	
    	options: {},
	
    	doSomething: function(msg) {
    		msg = msg || "Something just have been done";		
    		console.log("Hey, I'm doing something ! ", this, arguments);
    		this.element.append('<p> ' + msg + '</p>');				
    	},
	
    	_build: function() {
    		// Dans le meilleure des mondes, nous utiliserions un mécanisme de templating comme jQuery.tmpl ou Mustache
    		// mais le templating est un peu hors du scope du présent post
    		this.element.html('<h1>'+this.options.name+'</h1>');
    	}
    };

    var f = Object.create(feature);
		
L'utilisation d'un objet littéral me propulse directement dans l'approche prototype. L'utilisation du module pattern est également possible et se marie plutôt bien avec l'approche prototype. Le module pattern est idéal pour gérer et implémenter la notions de variables / méthodes privées, simplement une fonction qui utilise à son avantage le pouvoir des closures et retourne un objet qui dispose d'un accès privé à des variables qui ne seront pas disponible en dehors du scope de la fonction.

    // Module Pattern (kind of), sans les () sur la fin pour auto-exécuter la fonction anonyme. Ce sera fait 
    // lors de l'appel à Object.create
    var module = (function() {

    	var build = function() {
    		this.element.html('<h1>'+this.options.name+'</h1>');
    	};

    	return {
    		options: {},
	
    		init: function(options, elem) {
    			// Merge des options passés en paramétres avec les options par défaut
    			this.options = $.extend({},this.options,options);
		
    			// Sauvegarde des référence de l'élement jQuery et de l'élement DOM
    			this.element = $(elem)
    			this.dom = elem;
		
    			// appel de méthode via apply ou call pour placer le context (ou binding)
    			// La différence d'importance avec le pattern précédent c'est que la fonction privé build n'est pas rattaché 
    			// à notre objet mais est une fonction classique gardé 'alive' par l'utilisation de la closure parente.
    			// Etant donné que nous ne pouvons pas appeller la méthode avec le contexte de this, effectué implicitement
    			// par la syntaxe this._build(). Nécessaire car build utilise this dans son fonctionnement interne.
    			// on pourrait également utiliser $.proxy
    			build.apply(this);
    		},
	
    		doSomething: function(msg) {
    			msg = msg || "Something just have been done";		
    			console.log("Hey, I'm doing something ! ", this, arguments);
    			this.element.append('<p> ' + msg + '</p>');				
    		}
    	}
    });

    var feature = Object.create(module());
    feature.init({some: 'option'}, domElement);
    feature.doSomething(); // ok
    feature.build(); // error

Il existe certains avantages à utiliser cette approche. Elle s'inscrit dans la ligné directe du langage, et des méthodes comme jQuery.extend permettent facilement d'accéder à une forme d'héritage multiple.


## L'école classical

L'implémentation Simple-Inheritence de John Resig est vraiment une petite merveille que je conseille à tous ceux venant d'un background OOP "classique" car cette approche tend à "mimiquer" les concepts et paradigmes que nous connaissons déjà. Il existe de nombreuses solutions (simple-inheritence, MooTools Class, Prototype Class, Base2, ...). Les API les plus avancées vous donnent même un accès rapide aux méthodes des superclasses.

Voici un petit exemple suivant l'implémentation Simple-Inheritence:
		
    var Feature = Class.extend({
    	options: {},

    	init: function(options, elem) {
    		this.options = $.extend({}, this.options, options);
    		this.element = $(elem)
    		this.dom = elem;
    		this.build();
    	},
    	build: function() {
    		this.$elem.html('<h1>'+this.options.name+'</h1>');
    	},
    	doSomething: function(steps) {
    		msg = msg || "Something just have been done";		
    		console.log("Hey, I'm doing something ! ", this, arguments);
    		this.element.append('<p> ' + msg + '</p>');
    	}
    });

    var ExtFeature = Feature.extend({
      init: function(options, elem) {
        this._super(options, elem);
        this.blameJava = true;
      }
    });

    var myFeature = new ExtFeature({some: 'options'}, domElement);
    myFeature instanceof Feature; // true
    myFeature instanceof ExtFeature; // true

## Qu'est ce que l'on vient juste d'obtenir?
		
Comme vous pouvez le voir, ces objets sont faciles à lire, comportant des fonctions simples et concises disposant d'une préocupation claire et bien définie. Dans l'utilisation de ce pattern, nous appelons des méthodes de l'API comme doSomething mais pas nécessairement de méthodes internes comme build (idéallement, il ne devrait en pratique pas étre possible de le faire, d'où ma préférence pour le module pattern).

Autre avantages implicite mais non des moindre, la conception de votre JS passant par une API claire et bien définie, la testabilité de votre code vient de faire un bond énorme. Il est beaucoup plus facile de tester unitairement des méthodes simples, concises et dont la précocupation est clairement délimitée qu'une horrible châine jQuery. L'abstraction du DOM est la clé.

Un code ainsi organisé est beaucoup plus facile à tester, modifier et lire.  Alex explique également qu'il devient également beaucoup plus facile de changer la maniére dont les choses fonctionnent en interne sans changer la manière dont l'API de votre objet est utilisée. Par exemple, nous pouvons changez la méthode doSomething pour alerter une chaîne de caractères au lieu de simplement l'ajouter à un élement DOM (impossible sur un code jQuery classique, fortement couplé au DOM, et chainé jusqu'à plus soif). Il suffit de changer le fonctionnement interne de la méthode doSomething en gardant l'utilisation de celle-ci inchangée (ses appels).

Souvent, le plus difficile lorsque que l'on se penche sur l'orientée objet en JS et les différentes options à notre disposition est de visualiser comment l'appliquer dans "la vrai vie™", comment utiliser à notre avantage tout ces jolis patterns dans un monde fait de DOM et d'évenement utilisateurs.

Pour cela, Alex nous propose une voie claire et bien définie, que chaque objet devrait suivre.

### Première étape: Configurable Mixin Options

Les objets se doivent de suivre l'interface suivante et l'init prendra généralement un hash object (nos options) qui seront "mergés" avec un certains nombre d'options par défaut, via l'utilisation de jQuery.extend. Pour ce faire, chaque méthode init se doit de suivre ce comportement:

    var someRandomPlugin = {
      init: function(options) {
        this.options = $.extend(){this.options, options);
      },
      options: {
        selector: ".some-random-plugin",
        duration: 100
      },
  
      mixinsAreAwesome: function() {
        console.log(this.options);
        return "Mixins are awesome";
      }
    };
    
    var o = Object.create(someRandomPlugin);
    o.init({duration: 500});
    o.mixinsAreAwesome(); // log {selector: ".some-random-plugin", duration: 500}
    
### Seconde étape: DOM &lt;&gt; Object

Voici l'idée: 

* Si votre point d'entrée est un élement DOM, vous pouvez facilement accéder à son Object relatif dans votre App, ce qui est particulièrement utile pour répondre aux interactions utilisateurs.
* Codez votre site en utilisant des objets, mais avez toujours un accès facile à son élement DOM relatif.

#### 1. Créer votre objet

    var someRandomPlugin = {
      init: function(options, elem) {
        this.options = $.extend(){this.options, options);
      
        this.elem = $(elem); // Obj -> DOM
        this.dom = elem; // On garde une référence à l'élement DOM de base, sait-on jamais.
    
        this.buildEvent();
      },
      options: {
        selector: ".some-random-plugin",
        duration: 100
      },
  
      buildEvent: function(param) {
        this.elem.bind('click', $.proxy(this.clickHandler, this));
    
        // D'autres peuvent suivrent
      },
  
      clickHandler: function(e) {
        console.log("Don't dare clicking me !", this.elem);
    
        // Grâce à $.proxy, j'ai accès à l'instance de mon objet via this
      }
    };


#### 2. Créer un "Bridge"

Le "bridge" que nous allons avoir à créer est probablement la partie la plus intéressante de ce pattern et fortement inspiré du fonctionnement de la Widget Factory de jQUery UI. Cette approche dispose réellement d'avantages certains:

    // S'assurer de la présence d'Object.create (introduit ds ES5)
    (function(){
    	if (typeof Object.create === 'function') {
    		return;
    	}

    	function F(){}
    	Object.create = function( o ) {
    		F.prototype = o;
    		return new F();
    	};
    })();

    (function($) {
    	$.fn.feature = function(options) {
    		// On n'agit pas sur des élement absent - via conseils Paul Irish's (10 Things I learned)
    		if(!this.length) {
    			return this;
    		}
		
    		return this.each(function() {
    			// Création d'un nouvel objet Feature via le prototypal Object.create
    			var obj = Object.create(Feature);
    			// var obj = Object.create(Feature()); // déclinaison Module Pattern
			
    			// Appel de la fonction d'initialisation, note "constructeur" (kind of)					
    			obj.init(options, this); // this ici référence l'élement dom
			
    			// Enfin, on attache l'instance de notre objet Feature à notre élément DOM.
    			$.data(this, 'feature', obj); // ou $(this).data('feature', obj) mais légérement moins performant
    		});
    	}
    })(jQuery);
		
L'idée d'instancier un objet et de l'attacher à l'élément DOM me fait beaucoup penser au fonctionnement de la Widget Factory de jQuery UI, idée carrément brillante. Pouvoir disposer d'un moyen venant du DOM de récupérer l'instance de notre objet (et inversement si l'on se trouve au niveau de notre objet) est particulièrement important.

Désormais, nous avons séparé la création du plugin (notre bridge) du code (notre logique) en lui-même. Nous utilisons le plugin pour attacher des objets (avec le pattern d'héritage de votre choix) à des élements DOM et inversement, mais le plugin en lui-méme ne contient que du code de connection et d'initialisation.

Nous venons juste de nous fournir un niveau de modularité particulièrement poussé (non sérieux, c'est énorme...).

    // Fonction principale de notre appli / site
    $(function(){
      $('.feature').feature({
        selector: 'select[name="marvelous"]'
      });
  
      // obj disponible via $('.feature').data('feature') d'où l'on peut accéder à l'ensemble de l'API...
    });

La widget factory va un peu plus loin dans ce principe et fournit une superbe API pour créer des plugins "statefull" en fournissant un socle et une abstraction commune (création de notre objet (classe pour parler vulguairement) sous le namespace $.ui, mixin des options avec ceux par défaut, "peuplage" de différentes propriétés d'instance - this.elem, this.widgetBaseClass etc.)

L'appel aux méthodes d'un widget se fait alors en passant des strings à notre plugin qui délègue alors l'appel à l'instance du widget correspondante (et permettant de ne pas casser la "chaîne"). De ce fait, il m'apparaît de plus en plus claire que la Widget Factory peut étre un superbe outil pour organiser notre code jQuery. De plus, depuis la version 1.8, un important refactoring a été apporté à la Widget Factory apportant son lot d'amélioration (introduction du support d'héritage de widget, API plus consistante etc.).

Voici un bout de code qui pourrait servir comme un très bon point de départ pour l'écriture d'une fonction de 'bridge' qui pourrait vous aider à attacher votre code avec un plugin donné. Il apparaît en effet évident que d'écrire le même plugin d'initialisation de nombreuses fois (pour chaque nouvel objet) deviendra rapidement obsolète et en contradiction avec le principe DRY du modèle d'héritage que nous essayons de mettre 
en place. Comme l'explique Alex, ce code est fortement inspiré de l'implémentation de Scott Gonzalez (créateur de la Widget Factory et lead dev sur jQuery UI). 

    $.plugin = function(name, object) {
    	$.fn[name] = function(options) {
    		// arguments, pseudo-array, on passe par le prototype d'Array
    		var args = Array.prototype.slice.call(arguments, 1);
    		return this.each(function(){
    			// On récupére l'instance si elle existe depuis le data-store de l'élement DOM
    			var instance = $.data(this, name);
			
    			if(instance) {
    				// Si l'instance existe, options est une string représentant le nom de la méthode é appeller
    				instance[options].apply(instance, args);
    			} else {
    				// L'instance n'existe pas. Go l'instancier et la stocker dans le data-store de notre élément DOM.
    				instance = $.data(this, name, Object.create(object));
				
    				// Appel de la fonction "constructeur", notre fonction d'intialisation
    				instance.init(options, this);
    			}
    		});
    	};
    };


    // Avec l'objet Feature:
    $.plugin('feature', Feature); // object litteral
    $.plugin('feature', Feature()); // Module pattern, mais l'on pourrait adapter notre bridge pour qu'il "éxecute" notre Module pour nous si jamais Feature est de type function.
		
[Cette autre exemple](http://pastie.org/517177) vous montre l'utilisation de cette méthode par Scott Gonzales avec l'approche Simple-Inheritence de John Resig, également très élégant.

    <!doctype html>
    <html>
    <head>
    	<meta charset="utf-8">
    	<title>Extensible jQuery</title>
	
    	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
    	<script type="text/javascript" src="simple-inheritance.js"></script>
    	<script type="text/javascript">
    	$.plugin = function(name, object) {
    		$.fn[name] = function(options) {
    			var args = Array.prototype.slice.call(arguments, 1);
    			return this.each(function() {
    				var instance = $.data(this, name);
    				if (instance) {
    					instance[options].apply(instance, args);
    				} else {
    					instance = $.data(this, name, new object(options, this));
    				}
    			});
    		};
    	};
	
    	var Stepper = Class.extend({
    		init: function(options, element) {
    			this.options = $.extend({
    				value: 0,
    				stepSize: 1
    			}, options);
    			this.element = $(element);
    			this.display();
    		},
    		stepUp: function(steps) {
    			this.options.value += this.options.stepSize * steps;
    			this.display();
    		},
    		stepDown: function(steps) {
    			this.options.value -= this.options.stepSize * steps;
    			this.display();
    		},
    		value: function() {
    			return this.options.value;
    		},
    		display: function() {
    			this.element.html(this.options.value);
    		}
    	});
	
    	var Pager = Stepper.extend({
    		init: function(options, element) {
    			this._super(options, element);
    			this.options.pageSize = this.options.pageSize || 10;
    		},
    		pageUp: function() {
    			this.options.value += this.options.pageSize * this.options.stepSize;
    			this.display();
    		},
    		pageDown: function() {
    			this.options.value -= this.options.pageSize * this.options.stepSize;
    			this.display();
    		}
    	});
	
    	$.plugin('stepper', Stepper);
    	$.plugin('pager', Pager);
	
    	$(document).ready(function() {
		
    		// instantiate and use a stepper via jQuery
    		$('#stepper').stepper({ value: 5 });
    		var stepper = $('#stepper').data('stepper');
		
    		console.log(stepper.value());
		
    		$('#stepper').stepper('stepUp', 3);
    		console.log(stepper.value());
		
		
    		// instantiate and use a pager via jQuery
    		$('#pager').pager({ value: 30 });
    		var pager = $('#pager').data('pager');
		
    		console.log(pager.value());
		
    		$('#pager').pager('stepUp', 3);
    		console.log(pager.value());
		
    		$('#pager').pager('pageUp');
    		console.log(pager.value());
		
		
    		// instantiate and use a stepper directly
    		var stepper2 = new Stepper({ value: 20 }, '#stepper2');
		
    		console.log(stepper2.value());
		
    		stepper2.stepDown(2);
    		console.log(stepper2.value());
		
		
    		// modify stepper
    		Function.prototype.partial = function() {
    			var fn = this,
    				args = $.makeArray(arguments);
			
    			return function() {
    				return fn.apply(this, args.concat(arguments));
    			};
    		};
    		Stepper.prototype.increment = Stepper.prototype.stepUp.partial(1);
		
    		$('#stepper').stepper('increment');
    	});
    	</script>

    </head>
    <body>

    <h1>Extensible jQuery</h1>

    <p>This page shows that any class system can be used in conjuction with jQuery.plugin.</p>

    <div id="stepper"></div>
    <div id="pager"></div>
    <div id="stepper2"></div>

    </body>
    </html>
		

## Euh, ouais, et l'héritage dans tout ça ?!

On y vient! La façon dont vous ferez héritez vos objets d'autres objets dépendra directement de votre choix d'implémentation mais l'idée restera la méme.

Ce que j'aime dans la prototypal way, c'est qu'elle se marie trés bien avec les modules patterns et litteral object et l'utilisation de la fonction extend de jQuery. On accède ainsi très simplement é une forme d'héritage multiples.

    var thinger = $.extend(Object.create(Base()), Object.create(AnotherObject()), {
    	// litteral ici, mais nous aurions pu utiliser le module pattern
    	myStuff: function() {
    		// On ajoute ici toute propriétés / méthodes spécifique é notre object Thinger
    		// Si myStuff existe dans la chaîne du prototype (dans Base, AnotherObject ou Object), 
    		// la méthode sera surchargé. 
		
    		return "Top Moumoute";
    	}
    });
		

Vous pouvez également voir un exemple d'héritage mise en oeuvre de l'approche Simple-Inheritence avec l'exemple plus haut Scott Gonzales (var Pager = Stepper.extend({});).

## Mot de la fin

L'approche d'Alex Sexton est tout simplement énorme et vous permet d'accéder à un niveau de modularité rarement atteint. Vous pouvez parfaitement utiliser la forme d'héritage de votre choix et l'utiliser dans un contexte d'application jQuery. La gestion des dépendances est également un point critique de toute application web. Le degré de modularité ainsi atteint implique un grand nombre de chargement de fichiers, ce qui est un peu contre-performant. C'est ici que l'utilisation d'une solution de gestions de dépendances et de script loading se prouve le plus utile. Javascript ne le permet pas par défaut comme le font beaucoup d'autres langages (includre, require, système de packages, etc.), mais des solutions robustes existent dont LABjs et RequireJS. Le prochain post représentera sûrement la seconde partie de ce billet avec la mise en pratique de cette approche DOM to Bridge et l'utilisation de RequireJS qui se marie particulièrement bien avec cette approche.
