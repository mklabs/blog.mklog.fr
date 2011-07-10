Title: Création d'application jQuery à grande échelle - Guide par Addy Osmani
Author: Mickael Daniel
Date: Dec 29 2010 15:00:00 GMT+0100 (CDT)
Translation: This article is the french translation of excellent Addy Osmani's post[http://addyosmani.com/blog/large-scale-jquery/](http://addyosmani.com/blog/large-scale-jquery/). Awesome work, thank you Addy for letting me translate this. All credits is due to you.
Categories: javascript, jquery
Tags: Code org., Webapp Architecture

**Récemment [Addy Osmani](http://addyosmani.com) à publié un article incroyablement fourni et détaillé sur [les solutions que nous avons à notre disposition pour construire des applis jQuery à grande échelle](http://addyosmani.com/blog/large-scale-jquery/). Superbe travail et offrant à la communauté dans son ensemble une incroyable ressource autour de l'architecture des applications web modernes. Je suis réellement fasciné par ce sujet, principalement du au fait d'être intervenu pendant plus de deux ans sur une application de grande envergure utilisant massivement jQuery (et jQuery UI) coincé avec une toolkit maison malheureusement loin de toutes les bonnes pratiques et designs patterns qui émergent aujourd'hui, avec les conséquences que ça implique sur un projet d'une telle taille. Je pense sérieusement que le post d'Addy représente une des ressources les plus aboutis sur le sujet, avec une liste complète et détaillée des solutions à notre disposition pour simplifier et industrialiser notre pratique du front-end dans le contexte d'application jQuery (et JavaScript en général).**

**Merci M. Osmani pour avoir écrit ce brillant article et me donner l'accord de le traduire en Français, tout le crédit vous ait dû. Je pense sincèrement qu'il est dans notre intérêt de prendre conscience des outils à notre disposition et des problèmes qu'ils tentent de résoudre. Le but ici est, avant tout, d'aider à promouvoir ces bonnes pratiques et professionnalisation de la pratique du front-end.**

_**Post original: [http://addyosmani.com/blog/large-scale-jquery/](http://addyosmani.com/blog/large-scale-jquery/)**_

Aujourd'hui, nous allons nous pencher sur les outils et options que vous avez à votre disposition pour concevoir des applications d'entreprise à grande échelle utilisant jQuery. Bien que jQuery soit une excellente librairie offrant une collection d'outil très bien conçu pour le développement, sa tendance à rester compact et à rendre le DOM facile à utiliser implique qu'il ne fournit pas forcément une infrastructure clairement définie pour créer de larges applications.

jQuery permet par contre de normaliser les choses à travers les différents navigateurs et se place comme un superbe outil de manipulation du DOM et helper Ajax. En l'utilisant pour ces forces, vous pouvez sélectionner quelques excellents outils à utiliser avec jQuery en tant que toolkit pour vos développement de web apps à plus grande échelle.

Quelques développeurs ont soutenu dans le passé que concevoir des applications RIAs en utilisant Dojo, MooTools ou YUI pouvait être plus approprié pour des applications Javascript à grande échelle que de simplement opter pour jQuery. Cependant, je crois que vous pouvez implémenter une solution utilisant jQuery qui est tout aussi appropriée sans trop d'effort additionnels.

Dans cet article, nous nous pencherons sur les manières de concevoir un toolkit pour application à grande échelle avec jQuery en identifiant les solutions que vous avez de disponible pour le moment concernant la gestion des dépendances, MVC avec jQuery, templating, tests, minification et plus.

## Gestion des dépendances

Quand vous concevez des applications à large échelle avec jQuery, il se peut que vous ayez des dépendances entre vos scripts que vous souhaiteriez charger dans un certain ordre ou dynamiquement dépendant de leur besoin (en prenant un exemple très simple, vous pouvez avoir le souhait de charger function.js avant de charger app.js) - un script loader peut vous assister dans cette voie. Bien que la technique traditionnelle qui n'utilise que la structure hiérarchisée de tags est également valide, les script loaders, de nos jours, offre quelques fonctionnalités supplémentaires que vous pouvez trouver utile, eg. charger des scripts différents dépendant des fonctionnalités qu'un navigateur supporte ou comme mentionné plus tôt, dynamiquement dépendant de certaines conditions ou besoins.

Les deux scripts loaders les plus plébiscités sur le marché en ce moment sont RequireJS(de James Burke) et LabJS(par Kyle Thompson). Depuis quelques temps, il y avait une discussion pour savoir si l'un ou l'autre était meilleur, mais en réalité, ils ont tout deux leurs propres avantages. De mon expérience, une des meilleures fonctionnalités de RequireJS est son support de ‘modules’ structurés pour votre code tandis que LabJS est le meilleur quand vous n'avez pas besoin de fonctionnalités additionnelles et préférez quelque chose de plus léger.

Si vous souhaitez en lire plus sur le choix d'utilisation de Require ou LabJS pour votre projet, jetez un oeil à [ce post](http://msdn.microsoft.com/en-us/scriptjunkie/ff943568). Dans le but de vous faire gagnez un peu de temps, j'ai aussi inclus quelques autre options pour la gestion des dépendances si ces deux solutions ne correspondent pas tout à fait vos besoins.

* RequireJS – J'en recommande l'utilisation si vous prévoyez de garder votre code modulaire. Les modules tentent de limiter leur impact sur le namespace global et d'être plus explicite à propos de leur dépendances immédiates. RequireJS offre également un outil d'optimisation qui vous permet de combiner et grouper vos scripts en une collection plus concises de scripts minifiés qui se chargent rapidement. 
[http://requirejs.org/docs/jquery.html](http://requirejs.org/docs/jquery.html)

* LabJS – Il marche le mieux quand vos scripts ont besoin d'être chargés efficacement dans un ordre particulier et que vous êtes à la recherche d'une solution plus légère que RequireJS ou n'êtes pas intéressé dans son approche modulaire de la gestion des dépendances. [http://www.labjs.com](http://www.labjs.com) (et tentez YepNope JS, un excellent script loader conditionnel qui utilise LabJS en interne d'Alex Sexton - [http://www.yepnopejs.com](http://www.yepnopejs.com)).

* StealJS – Un autre excellent gestionnaire de dépendances. Steal fait parti de JavascriptMVC mais vous pouvez l'utiliser individuellement. Inclut également concaténation, compression et nettoyage du code. [http://jupiterjs.com/news/stealjs-script-manager](http://jupiterjs.com/news/stealjs-script-manager)

* JSL Script Loader – Encore une autre alternative décente qui supporte le lazy loading, chargement ordonné, prévention de code dupliqué et caching. Peut-être pas aussi bien testé que LabJS ou Require [http://www.andresvidal.com/jsl](http://www.andresvidal.com/jsl)

* Bootstrap - une option moins garni en fonctionnalités que les autres mais fait son boulot. Meilleure option si vous êtes à la recherche d'une solution minimale sans fioritures [https://bitbucket.org/scott_koon/bootstrap](https://bitbucket.org/scott_koon/bootstrap)
 

## MVC & Organisation pour les applications jQuery à grande échelle

Les design patterns et patterns d'architecture vous permettent de créer des parties de codes ré-utilisables, plus structurées et ordonnées basés sur des patterns existant qui ont été essayé et testé dans l'ingénierie logicielle. Utiliser un design pattern au sein de votre application est quelques chose considéré comme nécessaire, spécialement quand vous essayez de vous assurez que le style du code et sa structure est cohérente quand des équipes sont impliquées dans la conception de l'application.

Assez souvent dans le développement moderne des applications web, le pattern MVC (model-view-controller) est employé à cette fin, cependant il existe d'autre patterns populaires que vous pouvez trouver tout aussi utile si vous pensez que MVC n'est pas pour vous.

Ci-dessous, je m'apprête à vous guider à travers quelques unes des solutions MVC pour jQuery et Javascript que je recommenderais, cependant si vous souhaitez en lire plus sur les design patterns en JS pour décider lequel répond le mieux à vos besoin, n'hésitez pas à jeter un oeil à mon [livre gratuit](http://addyosmani.com/blog/essentialjsdesignpatterns/) sur ce sujet pour plus d'options.

### MVC avec JavaScript & jQuery

MVC est un pattern architectural utilisé souvent coté serveur lors de la création d'applications web (eg. en utilisant Rails, Pyton, Php, Java ou .net). Avec ceci en tête, quelques développeurs JavaScript sont divisés quant à savoir si les applications utilisant jQuery doivent être segmentées dans des structures MVC similaires, ou, si elles seraient mieux adaptées en existant simplement comme du code modulaire plus fondamentale à la place.

L'argument est que qu'une structure MVC propre coté serveur devrait suffire tandis que d'autres pensent que'au fur et à mesure que la complexité et l'échelle des applications jQuery augmentent, spécialement à un niveau d'entreprise, nous avons besoin d'un pattern comme MVC en place. Je suis daccord avec ce dernier point de vue, bien que dépendant du cas d'utilisation, d'autres patterns peuvent être tout aussi utile ici.

Cette section se concentre à assistez ceux qui ont déjà décidé de l'utilisation d'MVC avec jQuery.

### Comment fonctionne le Pattern MVC?

Traditionnellement avec MVC, vous séparez vos objets en trois composants principaux (ou responsabilités) quand vous concevez votre application. Mon interprétation de ces catégories est la suivante:

* Model - Les modèles dans votre application représente connaissance et données. Par exemple: les méthodes get/set tombent dans cette catégorie. Le modèle est isolé et ne connaît rien des vues ou contrôleurs.

* View - Les vues, depuis une perspective d'application web, peuvent être considérées comme l'UI, l'interface utilisateur. Elles sont généralement simple et n'effectuent pas nécessairement de la logique de validation, elles routent toujours l'entrée par un système de callback. Les vues sont isolées et ne connaissent rien des modèles ou contrôleurs.

* Controller – Le contrôleur se situe juste entre le modèle et la vue. Il effectue tout code métier nécessaire / manipulation de données pour récupérer les données du modèle vers la vue. Les contrôleurs effectuent la plupart de la validation qui provient de la vue et sont conscient de la vue et du modèle.

### Pourquoi je recommande d'utiliser JavaScriptMVC

JavaScriptMVC a reçu quelques revues positives et est actuellement considéré par quelques uns comme le framework le plus complet pour le développement d'application jQuery à grande échelle disponible en ce moment. Je partage également cette vue et quelques autres collègues qui se sont attaqués au sujet du développement d'application Javascript à grande échelle dans le passé également.

Ceci étant dit, si vous êtes habitués à concevoir vos applications webs en utilisant des conventions plus traditionnelles (cad plus lourd coté serveur, plus léger coté client), vous trouverez peut-être l'approche JMVC du développement comme demandant un petit changement de mentalité.

Par exemple, si une portion importante de votre application est basé sur du Javascript, le garder modulaire, organisé, testé et propre requièrent l'utilisation d'un toolkit complet et c'est justement une des choses que vous obtenez avec JMVC. La plupart des développeurs sont probablement habitués à implémenter ces patterns pour leur code coté serveur, mais il est temps de les considérer pour le code coté client également.

En parlant avec Justin Meyer du projet JMVC, peut-être qu'une des confusions les plus importantes est qu'il voit les nouveaux venus ne pas comprendre exactement ce que le projet a à offir. Dans cette partie de l'article, j'aimerais aider à clarifier cela.

JMVC peut vraiment être considérer pour deux choses - à la fois un ensemble d'outils de développement intégrés et une architecture MVC répétable. L'avantage de JMVC est qu'il propose une voie claire pour ajouter de nouvelles fonctionnalités et répond à beaucoup des préoccupations que vous devez avoir sur votre projet.

Premièrement, la partie MVC de JavaScriptMVC représente:

* Model – Une manière de packager et d'organiser les requêtes Ajax et l'appel aux services.
* Controller – Un générateur de widget jQuery.
* View – Template coté client.

Ensuite, en terme d'outils de développement intégrés qu'offre le projet, vous obtenez également la liste d'outils ci-dessous. Bien que ceux-ci soient difficilement considérés comme essentiels, l'intégration propre de telles fonctionnalités signifie que vous n'avez pas à concevoir votre propre toolkit pour les gérer:

* Gestion de dépendances, builds de productions (avec Less et CoffeeScript)
* Tests unitaires et fonctionnels automatisés
* Documentation

Quelques uns ont soutenus que JMVC était ‘overkill’ comme solution. Je ne serais d'accord avec ceci que si l'application que vous concevez utilise seulement une part minimale de Javascript, ou qu'il soit assez compact pour ne pas tirer grand bénéfice de l'utilisation d'une telle boîte à outil.

Pour tous les autres cas, JMVC offre plus que des avantages au point de justifier son utilisation pour vos projets.

Dans le but d'être complet, j'ai inclus nombre d'autres options pour ajouter MVC dans vos projets si vous souhaitez une alternative à JMVC.

#### Options

##### JavaScriptMVC (Recommendé)
Solution MVC mature qui inclut tests, gestion des dépendances, outils de builds, templates coté client. Parfait pour les applications larges où une solution tout-en-un pour organiser et concevoir du code est requis. Récemment utilisé par Grooveshark dans leur ré-écriture d'application. 

* Video Preview: [http://cdn.javascriptmvc.com/videos/2_0/2_0_demo.htm](http://cdn.javascriptmvc.com/videos/2_0/2_0_demo.htm)
* Démos et téléchargement: [http://www.javascriptmvc.com/#&who=getcode](http://www.javascriptmvc.com/#&who=getcode) [https://github.com/jupiterjs/srchr](https://github.com/jupiterjs/srchr)
  
##### Backbone 
Excellent pour une solution MVC où vous sélectionnez les composants additionnels que vous sentez fonctionner le mieux pour votre projet. Backbone offre le ‘backbone’ (squelette) dont vous avez besoin pour organiser votre code en utilisant le pattern MVC (mais gardez à l'esprit que le C dans MVC représente Collections et pas Controllers).

* [http://documentcloud.github.com/backbone/](http://documentcloud.github.com/backbone/)
* [http://ryandotsmith.heroku.com/2010/10/a-backbone-js-demo-app-sinatra-backend.html](http://ryandotsmith.heroku.com/2010/10/a-backbone-js-demo-app-sinatra-backend.html)
* [http://documentcloud.github.com/backbone/docs/todos.html](http://documentcloud.github.com/backbone/docs/todos.html)
* [http://bennolan.com/2010/11/24/backbone-jquery-demo.html](http://bennolan.com/2010/11/24/backbone-jquery-demo.html)


##### SproutCore
Alors qu'il s'éxecute dans le navigateur, SproutCore étend MVC pour inclure une interface serveur, un affichage qui ‘peint’ votre interface pour contrôler l'état de votre application. Yehuda Katz qui est profondément impliqué dans le projet est également en train de travailler à ajouter la modularité à SC et cette option devrait également être disponible bientôt. Recommandé pour des applications qui souhaite avoir une ‘richesse’ comparable aux applis desktop. Considéré overkill pour des applications de plus petite envergure. Utilisé par Apple parmi d'autres.

* Video preview: [http://vimeo.com/16774060](http://vimeo.com/16774060)
* Demos and download:
  * [http://wiki.sproutcore.com/w/page/12412938/Hello-World-Tutorial](http://wiki.sproutcore.com/w/page/12412938/Hello-World-Tutorial)
  * [http://www.sproutcore.com/get-started/](http://www.sproutcore.com/get-started/)


##### Knockout JS
Utilise MVVM (qui est considéré comme MVC avec un syntaxe déclarative). C'est principalement une réponse pour ceux qui utilise Javascript pour les interface utilisateurs mais propose également un gestionnaire de dépendances, système de templating et fonctionne bien avec jQuery. Peut nécessiter une courbe d'apprentissage pour comprendre l'utilisation massive du data-binding.
  
* [http://knockoutjs.com/documentation/introduction.htm](http://knockoutjs.com/documentation/introduction.htm)
* [http://knockoutjs.com/examples/](https://github.com/paulca/eyeballs.js)


##### Eyeballs JS
Un framework MVC par Paul Campbell qui est connu pour son implication dans le monde Ruby. Eyeballs fonctionne avec de nombreuses librairies mais offre une couche de fonctionnalités pour organiser votre code. Il vise à être à la fois agnostique et modulaire. Eyebals dispose d'une certaine aura si vous êtes un développeur Ruby et je recommanderais son utilisation si vous utilisez principalement Ruby pour concevoir votre code coté serveur
  
  * [https://github.com/paulca/eyeballs.js](https://github.com/paulca/eyeballs.js)
  

##### Sammy JS
Sammy.js est un plugin jQuery léger qui vous permet de facilement définir des applications basé sur les ‘routes’. Quand le C dans MVC représente Controller, certains considérerait Sammy.js comme le meilleur framework controller disponible en ce moment mais il ne fournit pas exactement la partie Model et vue. Sammy vaut tout de même le détour dans la conception d'application JS single page qui demandent un niveau d'organisation.

* [https://github.com/quirkey/sammy](https://github.com/quirkey/sammy)


**Ressources additionnelles concernant les patterns pour applications jQuery à grande échelle:**

* [Simple Inheritence](http://ejohn.org/blog/simple-javascript-inheritance/) de John Resig
* [Using Inheritence Patterns To Organize Large jQuery Apps](http://alexsexton.com/?p=51) avec Alex Sexton
* [The Object Literal pattern](http://ajaxian.com/archives/show-love-to-the-object-literal) recommandé par Rebecca Murphey


## Templating

Le templating est devenue un sujet chaud récemment dans le monde Javascript et pour une très bonne raison - il peut fournir la définition d'un ‘template’ que vous affichez plus facilement, plus proprement et d'une manière beaucoup plus lisible que de simplement utiliser quelque chose comme une concaténation traditionnelle au sein d'un tableau itérant sur vos données.

Que sont les templates? Et bien, fondamentalement les templates coté clients contiennent du markup avec des fonctions d'expressions où le template peut être appliqué un objet donnée ou des tableaux et est rendu au sein de l'arbre DOM. Il existe quelques options disponibles pour utiliser du templating au sein de votre application jQuery ou Javascript, mais la syntaxe utilisée pour définir vos templates ne diffère jamais énormément.

Les liens suivants sont les options populaires pour du templating en Javascript. J'ai trouvé personnellement jQuery-tmpl et Mustache les plus utiles dans mes propres projets, cependant encore une fois pour ceux qui sentent ces solutions comme overkill, j'ai listé des solutions de rechange que vous pouvez évaluer selon vos besoins. 

* jQuery-tmpl [http://github.com/jquery/jquery-tmpl](http://github.com/jquery/jquery-tmpl) (tutorial video [ici](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-an-introduction-to-jquery-templating/))

* Mustache.js [https://github.com/janl/mustache.js](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-using-the-mustache-template-library/) (tutorial video [ici](http://net.tutsplus.com/tutorials/javascript-ajax/quick-tip-using-the-mustache-template-library/))

* Dust.js (one of Alex’s recommendations) - [http://akdubya.github.com/dustjs/](http://akdubya.github.com/dustjs/)

* Handlebars de Yehuda Katz (une extension de Mustache) - [https://github.com/wycats/handlebars.js](https://github.com/wycats/handlebars.js)

* jQote [http://aefxx.com/jquery-plugins/jqote/](http://aefxx.com/jquery-plugins/jqote/)

* PURE [http://beebole.com/pure/index.html](http://beebole.com/pure/index.html)

* Nano [https://github.com/trix/nano](https://github.com/trix/nano)
 

## Communication entre les Modules

Bien qu'il s'agisse peut-être de quelque chose que vous essayez de résoudre en utilisant une solution maison, l'utilisation de l'approche pub/sub ou des custom events est idéal pour implémenter une communication simple entre les modules de votre application. Ci-dessous, vous pouvez trouver des liens vers différentes implémentations pub/sub qui varient en ce qu'elles offrent. En ce moment, la version de Ben Alman est mon implémentation de préférence étant compact et utilisant les custom event jQuery.

* [Ben Alman’s pub/sub on GitHub](https://gist.github.com/743922) (Cette version mise à jour contient deux variations)

* [@phiggins jQuery.pubsub](http://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js)

* [PubSubJS](http://roderick.dk/blog/2010/10/12/introducing-pubsubjs-a-library-for-doing-publish-subscribe-in-javascript/)

* [An Introduction To jQuery Custom Events](http://jupiterjs.com/news/a-simple-powerful-lightweight-class-for-jquery)

* [jsSignals – Custom Events/Messaging for jQuery](http://millermedeiros.github.com/js-signals/)
 

## Processus de Build et Concaténation de Script

Avec des applications jQuery et JS à grand échelle, il est important d'avoir un processus de build (build process) en place pour assiter dans l'automatisation d'un nombre de tâches relatives à la génération d'un livrable final de votre code. Ceci peut ne pas être nécessaire pour les website classiques qui n'utilisent que quelques lignes de jQuery, mais les applis web sérieuses doivent définitivement considérer avoir un build process bien conçus pour assister les tests unitaires, concaténation de scripts, minification et autre tâches. Je recommande généralement d'utiliser ‘Ant’ pour les process de build car je pense personnellement qu'il s'agit de la solution la plus répandue dans son genre dans la communauté Javascript. Pour commencer avec les scripts de build Ant pour des projets Javascript, jetez un oeil à ce [tutorial très utile](http://www.javascriptr.com/2009/07/21/setting-up-a-javascript-build-process/).

Maintenant, jetons un oeil aux options et outils concernant la concaténation: 

* Librairie Ruby pour prétraitement et concaténation des sources Javascript [http://getsprockets.org/](http://getsprockets.org/)

* Combiner et concaténer des fichiers Javascript en utilisant Ant et YUI Compressor [http://www.samaxes.com/2009/05/combine-and-minimize-javascript-and-css-files-for-faster-loading/](http://www.samaxes.com/2009/05/combine-and-minimize-javascript-and-css-files-for-faster-loading/) and [http://www.javascriptr.com/2009/07/21/setting-up-a-javascript-build-process/](http://www.javascriptr.com/2009/07/21/setting-up-a-javascript-build-process/)

* Utilsier Google Closure Compiler pour compiler des applications JS avec Ant [http://groups.google.com/group/closure-compiler-discuss/browse_thread/thread/92278e7a84736f3c](http://groups.google.com/group/closure-compiler-discuss/browse_thread/thread/92278e7a84736f3c)

* Concaténer programmatiquement des fichiers en utilisant seulement Ant [http://stackoverflow.com/questions/1373564/how-to-programmaticly-concatenate-with-ant](http://stackoverflow.com/questions/1373564/how-to-programmaticly-concatenate-with-ant)

* Concaténer des fichiers avec MVC et .NET [http://www.codeplex.com/MvcScriptManager](http://www.codeplex.com/MvcScriptManager)

* Smasher - Smasher est une application PHP5 basé sur un outil interne utilisé par Yahoo! Search. Il combine de multiples fichiers Javascript, les prétraite, et minifie leur contenu. [http://github.com/jlecomte/smasher](http://github.com/jlecomte/smasher)

* Jake (utilisé avec Cappuccino): [http://cappuccino.org/discuss/2010/04/28/introducing-jake-a-build-tool-for-javascript/](http://cappuccino.org/discuss/2010/04/28/introducing-jake-a-build-tool-for-javascript/)
 

## Minification de Script

La minification est une partie critique du build process pour toute applications de taille importante utilisant du Javascript. Lors de la livraison des scripts dans un environnement de procduction (spécialement un sur lequel vous pouvez avoir un gros trafic), tout octet additionnel compte, c'est pourquoi vous devriez idéalement minifier votre code plutôt que de juste inclure des version non-minifiées/non-compréssées qui forcent vos utilisateur à attendre plus longtemps pour ces scripts à être chargés.

Le processus de minification peut parfois nécessiter de petites modifications dans l'outil pour tirer le meilleur parti de celui-ci, mais faîtes moi confiance quand je dis que ce temps passé vaut amplement l'investissement. Il peut étre considéré comme intéressant de noter qu'au dessus de jQuery, nous sommes constamment en train de tester de nouveaux outils de minification et un outil n'est jamais gravé dans la pière - juste parce que vous optez pour Google's Closure compiler en 2010 ne signifie pas que vous ne passerez pas à UglifyJS en 2011 par exemple. Votre processus de build peut être assez flexible pour accommoder ces changements.

Souvenz vous que la minification fait idéalement partie d'un script de concaténation.(Note: JavaScript MVC couvre ces deux étapes si vous optez pour utiliser MVC dans votre application).

**Options**

* Google Closure Compiler [http://code.google.com/closure/compiler/](http://code.google.com/closure/compiler/)

* YUI Compressor [http://developer.yahoo.com/yui/compressor/](http://developer.yahoo.com/yui/compressor/) (et automatiser ceci avec Packer [ici](http://johannburkard.de/blog/programming/javascript/automate-javascript-compression-with-yui-compressor-and-packer.html))

* Minifier [http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=34488](http://johannburkard.de/blog/programming/javascript/automate-javascript-compression-with-yui-compressor-and-packer.html)

* UglifyJS (Recommandé car il montre des gains en terme de minification prométants parmi les autres) [https://github.com/mishoo/cl-uglify-js](https://github.com/mishoo/cl-uglify-js)

* Packer for .NET [http://svn.offwhite.net/trac/SmallSharpTools.Packer/wiki](http://svn.offwhite.net/trac/SmallSharpTools.Packer/wiki)

* Dojo Toolkit’s ShrinkSafe [http://www.dojotoolkit.org/](http://www.dojotoolkit.org/)

* JSMin – The JavaScript minifier [http://www.crockford.com/javascript/jsmin.html](http://www.crockford.com/javascript/jsmin.html)
 

## Tests

Les applications jQuery production-ready ont besoin d'être lourdement testé pour assurer que votre code à la fois **et** se comporte comme prévu - c'est particulièrement critique quand l'on conçoit des applications à grande échelle car vous ne souhaitez pas que la première expériences de vos utilisateurs soit votre application qui plante.

Avant d'entrer plus en avant dans les détails dans cette section, je devrais dire que indépendamment du fait de savoir jusqu'à quel point votre couverture de code est complet, rien n'empêche d'avoir un humain qui n'écrit pas le code de naviguer et tester votre code/application. Ceci étant dit, jetons un oeil à des solutions de tests plus avancées. 

Les tests unitaires sont quelques chose que je suggère comme un must mais dans cette secion, je vais également inclure des liens vers des ressources sur d'autres aspects des test d'application jQuery qui peuvent se prouver utiles dépendant de ce que vous faîtes.

### Tests unitaire pour votre code JavaScript/jQuery en utilisant QUnit

Un build process solide avec support des tests unitaires devrait être utilisé pour tester et livrer toute application jQuery sérieuse. Le test fonctionnel manuel est super depuis une perspective interface utilisateur, mais les test unitaires vous permettront de tester votre code pour découvrir si tout son fonctionnement interne se comporte comme prévu. Ci-dessous un bon tutorial sur comment débuter avec [QUnit](http://docs.jquery.com/Qunit) - un outil de test unitaire populaire pour le framework jQuery qui est très simple à utiliser. Vous pouvez alternativement vouloir tester [JSUnit](http://www.jsunit.net/) ou [FireUnit](http://fireunit.org/) mais QUnit reste de loin le plus utilisé des trois et mon outil de tests unitaire préféré.
http://net.tutsplus.com/tutorials/javascript-ajax/how-to-test-your-javascript-code-with-qunit/

### Tests unitaire avec FuncUnit de JavascriptMVC

FuncUnit, comme recommandé par Alex, permet de facilement manipuler des élements et des apspects comme la simulation d'interaction utilisateur. FuncUnit lui même est un add-on de QUnit et les tests que vous créez avec peuvent être exécuté dans un navigateur ou avec Selenum. Il permet également d'automatiser des tests QUnit dans EnvJS. 

[http://jupiterjs.com/news/funcunit-fun-web-application-testing](http://jupiterjs.com/news/funcunit-fun-web-application-testing)

### Mocker les requêtes ajax avec MockJax & jQuery

Le plugin MockJax est un outil de développement et de test vraiment fantastique pour intercepter et simuler des requêtes ajax faîtes avec jQuery avec un impact minimal dans le code de production. Je le recommande pour tester des applications web qui fréquemment utilise des connection Ajax. TamperData est aussi utile pour des tests de ce type. Lisez le tutorial complet d'utilisation de MockJax ci-dessous.

[http://enterprisejquery.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development/](http://enterprisejquery.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development/)

### Débuter avec le TDD (Test-Driven Devleopment) pour jQuery

Le concept de développement piloté par les tests est plutôt simple. A chaque fois que vous voulez ajouter une fonctionnalité à votre application, vous avez besoin d'écrire un test pour ceci avant d'écrire tout code pour cette fonctionnalité. Pour écrire un test, vous avez besoin de comprendre complètement les spécifications et contraintes pour ce que fait cette fonctionnalité. Au début, votre test va bien sûr échouer, mais le but est de coder une solution pour cette fonctionnalité qui est considéré comme accomplie si le test passe. Voici un excellent tutorial sur comment débuter avec le TDD pour jQuery avec Elijah Manor.

[http://msdn.microsoft.com/en-us/scriptjunkie/ff452703.aspx](http://msdn.microsoft.com/en-us/scriptjunkie/ff452703.aspx)

### Test jQuery automatique avec lancement de navigateur, Execution de test et Rapport de résultats

Si vous concevez une application web à grande échelle qui repose lourdement sur du Javascript, il y a des chances pour vouloir tester votre code sur des navigateurs différents, mais aussi sur différentes plateformes. Vous pouvez y parvenir sans le besoin d'effectuer beaucoup de travail manuel en utilisant quelques frameworks existants. John Resig recommande [Web Driver](http://code.google.com/p/webdriver) (Java), [Watir](http://wtr.rubyforge.org/) (Ruby) ou [JSTestDriver](http://code.google.com/p/js-test-driver) pour y parvenir. [Selenium RC](http://seleniumhq.org/projects/remote-control) est aussi populaire à cette tâche. Ceux-ci sont les meilleurs outils à utiliser si le test est effectué en interne. Si vous souhaitez utiliser une source externe de système pour le test, se référer à la secion suivant.

### Debugguer et tester JavaScript dans un environnement scripté avec Envjs et BumbleBee

Evnjs est un outil offrant une implémentation Javascript du navigateur en un environnement de scripting réutilisable. Ceci permet aux développeurs d'efficacement exécuter jQuery et Javascript dans une console ce qui peut se prouver utile à des fins de debug. L'implémentation par défaut d'Envjs est Rhino.

Rhino (Java) est un superbe outil pour éxecuter du Javascript soit dans une forme shell ou contenu dans une autre application - en mode shell il peut être utilisé en tant que debuggueur comme mentionné précédemment. Rhino convertit essentiellement du code JavaScript en des classes Java destinées à être utilisées dans des applications côté serveur. Si votre build process est basé sur Ant ou quelque chose de similaire, placer le jar de Rhino dans votre classpath vous permettrait d'exécuter facilement du JavaScript.

Un bon toolkit de test pour Envjs est BumbleBee qui a été publié cette année. BumbleBee combine Rhino, JSpec, Envjs et Ant pour fournir une solution "out of the box" où les tests et les specs peuvent facilement être ajoutés dans votre build automatisé.

### Test automatisé d'interface utilisateur piloté par jQuery

UITest est un framework de test d'UI automatisé recommandé pour les projet jQuery écrit par Menno van Slooten. Bien que encore assez jeune en terme de maturité, vous pouvez trouver quelques bons exemples sur comment utiliser ce framework sur la page officiel github ou via la conférence originale de Menni sur ce sujet à la jQuery Bay Area Conference, slides [ici](http://www.slideshare.net/mennovanslooten/jquery-bay-area-conference-2010). Vous pouvez également trouver des informations additionnelles récentes sur le testing d'interface utilisateur pour des applications Javascript, [ce post](http://devermind.com/testing/selenium-vs-coded-ui-my-perspective/) discuttant de Selenium et Coded UI en tant qu'alternatives.

[https://github.com/mennovanslooten/UITest](https://github.com/mennovanslooten/UITest)

 

## Conclusion

J'espère que vous avez trouvé ce guide sur la création d'applications jQuery à grand échelle utile. Tandis qu'une solution unique et globale peut paraître quelque chose de souhaitable pour la communauté dans son ensemble, le but de ce post était de vous fournir toutes les options qui sont (à ma connaissance) disponibles pour mettre en place votre propre toolkit pour le développement d'application à grande échelle.

Si vous et votre équipe avez la flexibilité nécessaire pour décider la meilleure chose qui peut être accomplie avec cette information à cette égard, j'espère avoir réussi  à réduire une partie du temps que vous pourriez avoir par ailleurs consacré à la recherche sur ce sujet.

Si vous êtes à la recherche d'une solution tout-en-un, JavaScriptMVC est probablement la solution la plus proche disponible, option mature et soutenue. Je vous encourage à l'essayer si vous sentez qu'il vous bénéficiera plus qu'une solution maison le ferait. Rappelez-vous que bien qu'allant dans le détail, JMVC est également entièrement modulaire. Ceci signifie que si vous le souhaitez, vous pouvez juste utiliser FuncUnit, le Controller et StealJS et les utiliser en tant que toolkit personnel sans trop de travail supplémentaire.

Quelque soit la direction que vous vous prendrez vec la création d'application à grande échelle, sachez qu'il existe suffisamment d'outils et ressources au sein de la communauté JavaScript pour vous aider à débuter.

 

## Pour aller plus loin

* [On jQuery and large applications with  Rebecca Murphey](http://blog.rebeccamurphey.com/on-jquery-large-applications)
* [On ‘Rolling Your Own’ Large jQuery Apps with Alex Sexton](http://alexsexton.com/?p=106)
* [jQuery UI Developer’s Guide (for those wishing to use $.widget etc)](http://jqueryui.com/docs/Developer_Guide)
* [Nicholas Zakas – Scalable JavaScript Application Architecture](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture)
* [Tech Behind The New GrooveShark (Good Article On Large Scale jQuery App Dev)](http://blog.jerodsanto.net/2010/12/the-tech-behind-the-new-grooveshark/)
* [Cody Lindley’s excellent list of client-side development links for app development](http://blog.codylindley.com/links)
* JavaScript Documentation Tools: [JSDoc](http://jsdoc.sourceforge.net/), [YUI Doc](http://developer.yahoo.com/yui/yuidoc/) or [PDoc](http://pdoc.org/)

