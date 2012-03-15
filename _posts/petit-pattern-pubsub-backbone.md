<!--config
{
  "Title": "Un petit pattern pubsub avec Backbone",
  "Author": "Mickael Daniel",
  "Date": "Wed Mar 14 2012 16:55:00 GMT+0100 (Paris, Madrid)",
  "Categories": "javascript",
  "Tags": "javascript, backbone"
}
config-->


Un petit article pour présenter un petit pattern pubsub que j'expérimente et affine
sur plusieurs applications Backbone. Pour l'instant, j'en suis très satisfait et m'a
aidé sur plusieurs points.

L'idée est:

* d'utiliser l'event spécial `all` de Backbone pour écouter tous les évenements de
  l'appli

* de se reposer sur une simple convention de "namespacing" des évenements

* de "walker" l'object application (le point d'entrée de l'appli) et exécuter la
  bonne méthode, du bon composant.

Ce pattern se repose sur le fait que l'application soit organisée via un namespace et
point d'entrée unique (et global) de l'appli (exit donc, requirejs qui permet de s'en
passer).

## Simple backbone pubsub

Il existe un nombre incroyable d'implémentation dites "pubsub" pour nos dévelopements
front. Certains sont simplistes et peuvent être écrit en une 20aine de lignes,
d'autres vont plus loin au niveau fonctionnalités (et a fortiori plus de complexité).

Backbone ne propose pas un système dit pubsub de base, mais fournit par contre
`Backbone.Events`
([src](http://documentcloud.github.com/backbone/docs/backbone.html#section-15)). Il
s'agit de ce qu'on appelle un mixin qui peut être utilisé et mergé avec n'importe
quel objet (son prototype) pour lui ajouter une api trigger/bind. C'est en fait ce
qui est fait en interne pour chacun des composant fournis par Backbone (View,
Model/Collection, Router. History également).

L'idée principal du pubsub et de disposer d'un "bus de communication" centralisé et
unique à notre appli. On peut donc penser à utiliser `Backbone.Events` pour fabriquer
un objet destiné à assurer ce rôle. Encore mieux, on peut penser à concevoir notre
"top-level namespace" (le point d'entrée de l'appli) de cette façon.

J'aime bien l'idée de considérer le namespace de l'application, ex. app, comme le
moyen d'y accéder. Pouvant si besoin jouer le rôle de mediator dans la communication
et appliquer un peu plus de logique. Ainsi non seulement l'objet app servira à
contenir l'ensemble des sous namespace (ui, model, etc.), mais il aura les méthodes
nécessaire pour emettre ou écouter des évenements.

Dans [backbone-boilerplate](https://github.com/tbranyen/backbone-boilerplate) (super
projet, que je vous conseille fortement), on peut par exemple voir ce pattern mis en
oeuvre [ici](https://github.com/tbranyen/backbone-boilerplate/blob/40e49ba/app/namespace.js#L53).

L'application, qui peut être un simple objet sur lequel on attache le reste des vues
/ models / routers, peut aussi être directement un object à qui l'on a ajouté l'api Event.

    var app = _.extend({}, Backbone.Events);
    app.ui = {};
    ...

De cette façon, on dispose rapidement d'un mécanisme pubsub au sein de notre
application, sans aucune dépendances externes (aussi légère soit-elle), avec une
sémantique qui me plait bien.

    // depuis n'importe ou dans l'appli
    app.trigger('something');

    // idem.. depuis un autre composant
    app.bind('something', function() {
      // Logic...
    });


Bien sûr, le nom de la variable `app` est arbitraire et peut être changée de projet
en projet. Idéallement, on prendra un nom relativement court, deux ou trois lettres
suffisent.

### Object.create

Une déclinaison que je préfère en utilisant `Object.create`:

    var app = Object.create(Backbone.Events);

Je tends a préférer cette approche car elle laisse l'object `app` et ses propriétés
clean en ayant les méthodes du mixin Backbone.Events contenu au niveau de son
prototype (__proto__ au niveau de l'instance). C'est juste plus clean dans ma console
:p

Plus sérieusement, cette alternative est tout à fait valide et justifiée du moment
que vous avez accès à `Object.create` (addition ES5), soit en contrôlant les
navigateurs cibles, soit en se reposant sur un shim ES5
([es5-shim](https://github.com/kriskowal/es5-shim) fait aujourd'hui parti de ma stack
par défaut).

## Petit pattern pubsub bien pratique

Maintenant que l'on a notre structure en place, on peut parler de ce pattern pubsub
d'execution automatique de méthode.

Concrètement, il me permet de ne plus avoir à gérer les `bind` explicites au niveau
de mes objets mais de se reposer sur cette convention. Généralement, mes `bind`
depuis les composants Backbone ressemblent toujours à:

    app.bind('something', this.method.bind(this));

**Note** Je n'utilise pas ou peu `_.bind` et `_.bindAll` au profit de
`Function.protype.bind`. Question d'habitude coté node ou j'utilise beaucoup `.bind`.
Ici encore, cela suppose la présence d'es5-shim, mais il s'agit là juste d'une
question de préférence. Je suppose que le principal étant de comprendre les
implications et d'utiliser ce avec quoi on est le plus à l'aise.

Il s'agit donc presque toujours d'une méthode d'un de mes composants (souvent les
vues) qui est executé lorsque qu'un évenement survient (a contrario d'une fonction
anonyme passé à `app.bind`).

Partant de ce postulat, j'ai donc expérimenté l'approche suivante:

* les évenements dans l'application sont délimités par `:`.

* chaque "partie" de l'évenement représente un "niveau" au sein de la structure de
  l'objet app.

* la dernière partie de l'évenement représente toujours le nom de la méthode a appeller.

* doit être un noop lorsque l'un des niveau n'a pu être trouvé, ou méthode absente
  (grosso-modo, pas d'erreur et silent fail).

* ne doit pas dénaturer le concept du pubsub, et se comporter de la même façon.

Ainsi, si depuis un composant, je lance un `app.trigger('ui:panel:change')`, le
système tentera d'appeller la méthode `app.ui.panel.change`. Il s'agit par exemple
dans mon cas d'utilisation de la méthode `change` de la vue `panel` qui est attachée
au sous-namespace `ui` de mon objet application `app`. Très simpliste...


    // handy walk the application object to bridge event triggered to function calls
    //
    //    app.trigger('ui:panel:change');
    //    // invoke the app.ui.panel.change method
    //
    app.on('all', function(ev) {
      var parts = ev.split(':'),
        args = Array.prototype.slice.call(arguments, 1);

      if(parts.length < 2) return;
      var memo = app;
      parts.forEach(function(name) {
        var ns = memo[name];
        if(!ns) return;
        // invoke!
        if(typeof ns === 'function') return ns.apply(memo, args);
        // or continue the walk through
        memo = ns;
      });
    });

Une petite quinzaine de ligne pour implémenter cette fonctionnalité qui me rend de
sacrés services. Certains pourront détester cette approche, personnellement j'en suis
fan (car feignant).

Cela me permet grosso modo d'éliminer une étape dans le processus, et de ne plus
avoir à explicitement "binder" mes composants à certains évenements tout en me
donnant la possibilité d'appeller absolument n'importe quelle méthodes de n'importe
lequel de mes composants. Et cela, en restant tout aussi découplé que l'approche
classique.

Cela marche très bien pour moi, cele pourrait peut être marcher pour vous ☺

Pour avoir un aperçu du code global (et un poil plus évolué), voici un [gist](https://gist.github.com/2037864)
illustrant cette approche.


