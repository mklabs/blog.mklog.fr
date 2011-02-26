Title: HTML5 Boilerplate Documentation... en mode Boilerplate !
Author: Mickael Daniel
Date: Feb 15 2011 00:00:01 GMT+0100 (CDT)
Categories: Javascript, HTML5

Ce billet (rapide) me permettra de parler de ma dernière petite expérience. Et elle concerne Boilerplate et sa documentation.

L'idée était de localement ou à distance (via les webservices github):

* récupérer le contenu du wiki d'un repo github.
* utiliser [showdown](http://www.showdown.im/) pour effectuer la conversion markdown &#x2192; html
* afficher le contenu du wiki de manière plus personnelle. 

Je trouvais intéressant l'idée de récupérer le contenu du wiki boilerplate au format markdown (un des formats utilisés sur les wikis github), de les convertir en markup html et de les afficher avec ce style si particulier qu'a le site officiel d'[html5 boilerplate](html5boilerplate.com). Le tout donnant prétexte à construire une petite webapp.

Vous pouvez voir une petite démo actuellement disponible [ici](//mklabs.github.com/html5boilerplate-site/) et le source [ici](//github.com/mklabs/html5boilerplate-site/tree/gh-pages).

## HTML5  ♥ Boilerplate

A la base, cette petite expérience menée sur un weekend était avant toute chose une opportunité pour moi de travailler sur des trucs cools. Un prétexte à créer quelque chose qui se rapproche d'une wepapp et me donner l'opportunité d'essayer "dans la vrai vie" quelques uns des patterns présentés par certains génies dans le domaine (Rebecca Murphey, Alex Sexton dans ce cas précis). C'était aussi ma façon d'exprimer my boilerplate love.

Arrivé un moment, il se trouve que je diposais de quelque chose de pas trop mal, plutôt sympa et ai pris l'envie (et courage) d'envoyer un mail sur la mailing list boilerplate en parlant de cette petite expérience. Je ne m'attendais pas à grand chose, au mieux, susciter quelques réactions.

Il se trouve que l'intégration de la documentation du projet (gérée via wiki du repo github officiel) au sein du site était quelque chose dont les membres et responsables étaient apparemment en train de penser... Je ne m'y attendais vraiment pas, et vous laisse découvrir le contenu du [thread](http://groups.google.com/group/html5boilerplate/browse_thread/thread/165b4a0a0d8c5727) ;) Il y a donc de grandes chances pour que cette petite idée mise en place sur un coup de tête soit intégrée au siteweb du projet !

Cette petite appli a été conçue avec beaucoup d'amour (un peu comme quand je fais un gâteau, sauf que je cuisine jamais), et j'ai eu beaucoup de plaisir à la concevoir. Boilerplate est magique, plus je creuse et travaille avec, plus j'en apprends.

C'est aussi pour ça que je conseille à tous de jeter un oeil (et de près) à Boilerplate, [tout particulièrement au contenu du wiki](https://github.com/paulirish/html5-boilerplate/wiki). Creuser les sources et la documentation est un excellent moyen d'apprendre et Boilerplate contient tellement de bonnes choses...

C'est ce que j'aime le plus dans ce projet. Non seulement il t'offre un condensé incroyable de bonnes pratiques et d'optimisations par défaut mais il réussit également à faire de toi un meilleur développeur front.

## La wepapp !

Encore une fois, je me suis vraiment éclaté à essayer de construire quelque chose de sympa visuellement (en même temps, en partant du markup et style du site officiel, il aurait été vraiment difficile de faire autrement...) et relativement bien conçue techniquement (enfin je crois).

En vrac, voici les composants mis en oeuvre dans la dernière version:

* [requirejs](//requirejs.org/)
* [showdown](//showdown.im)
* [pubsub](https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js)

Absolument tout est fait client-side et a été décomposé en modules bien distincts qui sont au nombre de quatre:

* [le module wiki](//mklabs.github.com/html5boilerplate-site/src/docs/js/app/modules/wiki.js) - Module principal responsable de la plupart des actions utilisateurs et manipulation du DOM.
* [le module history](//mklabs.github.com/html5boilerplate-site/src/docs/js/app/modules/history.js) - pour ajouter la gestion du back/forward button.
* [le module messaging](//mklabs.github.com/html5boilerplate-site/src/docs/js/app/modules/messaging.js) - pour gérer les retours utilisateurs (notemment sur xhr), mais pourrait être étendue à la gestion d'un widget dédié (affichant des messages applicatifs par exemples ou gérant plus finement les différents cas d'erreurs).
* [le module highlight](//mklabs.github.com/html5boilerplate-site/src/docs/js/app/modules/highlight.js) - pour ajouter la fonction de coloration des extraits de code provenant du wiki

La communication entre les composants est géré via pubsub et permet vraiment de limiter le couplage de chacune des parties de l'appli. Chaque module s'enregistre ou écoute des ‘topics’ et réagit en fonction. Si jamais un module est n'est pas initialisé ou inclus, le reste de l'application continue de fonctionner parfaitement.

Un module particulier de [type service](//mklabs.github.com/html5boilerplate-site/src/docs/js/app/services/markdown.js) est responsable des manipulations xhr et fournit une API que peuvent consommer les autres modules. Il s'agit fondamentalement d'une abstraction envers $.ajax et intègre également un mécanisme simplifié de cache (toute requête xhr déjà effectuée est évitée et les données sont récupérées du cache).

Le tout a été mis en oeuvre en suivant quelques patterns d'organisation de code:

* Objet litteral
* Module Pattern
* Object.create + $.extend
* DOM &#x2194; Object Bridge

J'ai vraiment considéré le développement de cette appli comme un terrain d'expérience pour essayer d'implémenter ces quelques designs patterns et me donner l'occasion d'appréhender requirejs dans le contexte d'une vrai application et voir ce que les modules requirejs peuvent apporter en terme d'architecture, modularité et encapsulation. Je compte travailler un tuto détaillé présentant étape par étape comment a été conçue cette appli: prise en main de requirejs, utilisation de pubsub, mise en place d'un modèle d'héritage avec Object.create + $.extend et l'initialisation des modules grâce à l'approche DOM to Object Bridge.