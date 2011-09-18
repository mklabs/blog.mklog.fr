Title: Présentation de Nabe
Author: Mickael Daniel
Date: Tue Jul 12 2011 08:07:46 GMT+0200 (CEST)
Categories: javascript, node
Tags: javascript, node, connect, blog

Il existe déjà de nombreux moteurs de blogs pour node, le plus connu étant certainement [Wheat](//gitbub.com/creationix/wheat), et j'ai décidé d'en ecrire un autre, "yet another one", et m'en excuse...

Cela a été aussi l'occasion de migrer vers cette solution, fait maison. Qui dit nouveau moteur, dit nouveau design, et j'ai décidé de rester avec le thèmes par défaut du projet. Adapté de [skeletton](http://www.getskeleton.com/) avec quelques modifs, les boutons sont implémentés grâce à [CSS3 GitHub Buttons ](http://nicolasgallagher.com/lab/css3-github-buttons/)([src](https://github.com/necolas/css3-github-buttons)). Le tout donne quelque chose qui se dégrade plutôt bien, et dont la lecture sur appareil mobile (pas testé tablette) est correcte. Il suffit "resizer" (du verbe du premier groupe) le navigateur pour en avoir un rapide aperçu.

<div class="actions button-container" style="margin-left: 4em;">
  <div class="button-group">
        <a href="//github.com/mklabs/nabe" class="button primary">source</a>
        <a href="//github.com/mklabs/nabe-demo" class="button">demo</a>
        <a href="//github.com/mklabs/blog.mklog.fr" class="button">source du blog</a>
        <a href="/nabe" class="button">readme</a>
    </div>
</div>

## Au commencement

[Les premiers commits](https://github.com/mklabs/nabe/tree/6a43b62d9e00cbd1d20ebf2e8fc5d26b54703851) se sont déroulé début avril, il s'agit un moteur de blog construit juste au dessus de [connect](http://senchalabs.github.com/connect/), sans base de donnée (yep, c'est une feature!) et se reposant sur le filesystem et git, si l'environnement le permet pour gérer posts et contenu du site.

Comme vous pouvez le voir aux niveaux des premiers commits (début avril), le truc s'appelait node-yabe, une petite référence au tutorial [Yabe](http://www.playframework.org/documentation/1.2.2/guide1) (Yet Another Blog Engine) de [Play](http://www.playframework.org/). En fait, l'idée était de coder un petit truc que j'aurais utilisé ensuite pour initier une série de post/tutos. Puis, de fil en aiguille, ré-écriture après ré-écriture, c'est devenu une solution un peu plus robuste, fortement inspiré de Wheat (le but était de rester compatible avec la structure des articles) en offrant quelques fonctionnalités supplémentaires comme notamment la possibilité d'effectuer une recherche (utilisant `git grep` en interne) et un début d'interface d'admin bien sympa.

## Wheat

Wheat est un super moteur de blog, codé pour les codeurs. L'idée (aussi présente dans bien d'autres solutions, mais coté node sûrement le premier) est d'écrire ses articles sous format markdown, du texte brute, le tout versionné par git. Avec éventuellement un backup sur github (ou ailleurs), on comprend vite que l'intérêt d'une DB est toute relative (a part nécessiter un environnement particulier pour les utilisateurs) si l'on parvient à gérer quelques informations sur les articles (titre, date publié, catégories ce genre de choses).

Wheat, comme d'autre solution similaire comme [toto](http://cloudhead.io/toto), utilise un format spécial en entête de post. Il s'agit d'un ensemble de metadata qui seront accessible au niveau des templates, et certains d'entre eux sont obligatoires pour que le système puisse déterminer la chronologie des posts et les afficher (title et date notamment).

    Title: What a node weekend !
    Author: John Doe
    Date: Apr 24 2011 17:08:00 GMT+0200 (CDT)

    There's no `sleep()` in JavaScript..

J'ai commencé à utiliser Wheat et n'ai pas été déçu. Passer d'une plateforme wordpress à quelque chose ressemblant à Wheat, c'est un peu comme l'histoire du textarea qui se change en textmate. Ca n'a juste pas de prix. Mais j'ai pu me rendre compte que Wheat est relativement difficile à customiser et adapter à certains besoins (Il n'est pas pensé pour. Le code est super mais n'utilise pas connect ou express, les modules n'existant pas à l'époque. D'ailleurs, pour wheat et connect, il s'agit du même auteur...).

De plus, les templates haml ne me correspondent pas tout à fait (ou l'inverse).

## And yet another blog engine...

[Nabe](https://github.com/mklabs/nabe) est donc né, l'idée venant de ce [template](https://github.com/paulirish/html5-boilerplate-server-configs/blob/master/node.js) pour ensuite évoluer vers la base de code présente aujourd'hui et offrant:

* Posts (...)
* Markdown (en utilisant [github-flavored-markdown](https://github.com/isaacs/github-flavored-markdown))
* Tags et Categories. Les catégories sont en fait des dossier et sous dossier dans `articles/`. Les fichiers markdown peuvent être placés à n'importe quel niveau (et permet donc de catégoriser un peu).
* une interface d'admin permettant de créer/éditer des posts, éventuellement accompagné de git commits (si l'env le permet)
* Révisions et historique des articles via les commits du repo.
* Recherche efficace, utilisant en interne `git grep`.
* Archives, par mois et années (concrètement, la fonctionnalité de recherche est utilisée).
* Colorisation du code via [Prettify](http://code.google.com/p/google-code-prettify/)
* Format des dates, mon petit coup de coeur en utilisant [globalize](https://github.com/jquery/globalize) qui permet juste de fournir une représentation d'une date (entre autre chose) dans un nombre impressionnant de langages différent (envie de dates correctement formatés pour un lectorat chinois, japonais ou russe? [No Problem](http://jquery.github.com/globalize/examples/browser/)!)
* Flux RSS (basique mais fonctionnel, le tout revient à modifier un fichier de template)
* Commentaire via Disqus
* la possibilité de définir des modules, qui étendent ou altèrent les fonctionnalités de nabe:
    * en réalité, l'interface d'admin est un module nabe
    * Un système très simple de pages. URL /route/ => /templates/pages/route.html
    * page projet github (généré a partir des readme du repo, ex [ici](/nabe) ou [ici](/nabe-demo))
    * Une API JSON. En fait, il s'agit d'un module effectuant une négociation de contenu hyper simplifié. Si la requête entrante dispose des entête http qu'il faut (le test se fait sur Accept), le retour de la response est soit du html(comportement classique), soit le model passés aux vues de l'application sous format JSON. On peut également curl le server avec un accept placé en text/plain pour récupérer le modèle sous format JSON mais sous format text/plain (et joliment décoré par [eyes]()).
        * Le but de ce module est de fournir la possibilité d'ajouter facilement une surcouche au thème implémentant une single-page app. Rien n'empêche de packager les vues (ou juste de les fournir aux middleware static de connect) pour les réutiliser coté client. Nabe déterminant automatiquement le format de response (json si requête xhr), rien de plus simple d'ajouter une petite appli Backbone pour pushStatiser tout ça (verbe du premier groupe). Il existe même un thème qui met en oeuvre cette approche _[sammo](https://github.com/mklabs/nabe-demo/tree/master/themes/sammo)_ (avec du sammyjs)
        
La mise en oeuvre des templates se fait avec jqtpl pour node (jQuery templates) mais je compte re-travailler l'implémentation de base pour utiliser Mustache. En théorie, n'importe quel moteur de template pourrait être utilisé en développant le module correspondant (un package npm spécial, dans `lib/ext`, implémentant un middleware connect et surchargeant une méthode de l'API.)

### Dates

Grâce à cette [librairie](//github.com/jquery/globalize) très utile, d'abord pensé pour le navigateur, le support des dates dans ce blog est une de ces forces. Deux options de configuration (format et culture) permettent de totalement changer le comportement de rendu des dates. Le nombres de cultures supportées est tout simplement [impressionnant](http://jquery.github.com/globalize/examples/browser/). Un merci tout particulier aux contributeurs du projet. Je crois que les fichiers de culture proviennent du framework .Net. Edit, c'est confirmé :) -->

> The Globalize culture files are generated JavaScript containing metadata and functions based on culture info in the Microsoft .Net Framework 4.

Donc merci .Net !

Soit dit en passant, Nabe n'utilise qu'une infime partie de Globalize, à savoir mise en forme des dates.

### Admin

La meilleure façon de se rendre compte de l'inteface d'admin est encore de l'essayer... en attendant, une série de screens devraient donner une bonne impression. Le design est directement inspiré des écrans de Chrome avec quelques petites différences bien sûr (sérieusement, vous la trouvez pas super bien faîte l'UI de Chrome ? Ce qu'il y a de vraiment intéressant, c'est que ces "vues" sont en fait... des webapps ! Qu'on peut inspecter et tout et tout).

[![Admin screen](/presentation-nabe/admin-list-of-posts.png "Nabe Admin Interface")](/presentation-nabe/admin-list-of-posts.png)

Pour l'instant l'admin se restreint à gérer les posts, à les lister (qu'on pourra peut être un jour paginer, trier, filtrer etc. oups filtrer c'est déjà possible) et permettre de charger un article (ou en créer un) dans un petit éditeur en ligne (pas un textarea! enfin pas directement). Cette éditeur est une version modifié de ace, modifié dans le sens où le parseur utilisé et la coloration mise en place se fait en fonction de la syntaxe markdown. Quelques petites fonctions bien sympa sont également accessible via raccourcis clavier ou bouton:

* Preview (Ctrl-P). Une boite de dialogue contenant la conversion HTML du markdown de l'éditeur.
* Save (Ctrl-S). Affiche une boite de dialogue permettant de spécifier un commit message (ou pas) et enregistrer (save modifie le contenu du fichier et effectue un commit si l'env le permet).
* Full-Screen (Ctrl-M). Quand on écrit, il souvent préférable d'avoir le plus d'espace disponible. Ce raccourci (Ctrl-M) permet d'aggrandir la taille du textarea à la taille de la fenêtre (Ctrl-M encore une fois pr réduire).

[![Edit screen](/presentation-nabe/admin-edit-presentation-nabe.png "Admin Edit Interface")](/presentation-nabe/admin-edit-presentation-nabe.png)
    
La page listant les posts du repo disposent également d'une possibilité de recherche (au niveau de la nav de gauche) permettant de filtrer la liste des posts dynamiquement (pas de rechargement de page, xhr sur keypress... peut etre gourmand mais a l'air d'etre stable).

Voici un exemple avec l'éditeur en mode fullscreen, plus la boite de dialogue preview.

[![Edit+Preview](/presentation-nabe/admin-fullscreen-preview.png "Edit+Preview")](/presentation-nabe/admin-fullscreen-preview.png)


Et un autre avec le preview en pleine page:

[![Edit+Preview](/presentation-nabe/admin-preview-in-fullscreen.png "Edit+Preview")](/presentation-nabe/admin-preview-in-fullscreen.png)


Il s'agit d'une première version, beaucoup d'idées restent à implémenter sur ce petit backend, notamment sur la gestion de la configuration, gestion des modules nabe (init/deactivate), changement du thème utilisé, etc. Bien qu'au final, je ne l'utilise que très peu (avantage du couple fichier texte brute format markdown + editeur de texte préféré).


## Nabe est né

J'ai donc créé ce petit projet, au départ appelé node-yabe pour devenir nabe, pour le fun et me donner l'occasion d'implémenter quelque chose qui va plus loin qu'un simple tutorial ou hello world.

Voici l'ensemble des fonctionnalités ciblés et direction prises au départ:

* jquery templates, idéallement faicilement remplaçable
* templates et pages facilement éditable
* code base limité, pas d'usine à gaz. 
    * Bien que le code se soit beaucoup plus ettofé, qu'il ait connue énormément de réfactorisation, que fonctions après fonctions aient été implémentées, la base de code restent relativement succinte et facile à prendre en main (même si j'ai toujours autant envie de tout jeter, pour tout reprendre).
* No database. Pas de base de données à installer sur les environnements, que ce soit en local ou sur le serveur de déploiement, seul l'accès au filesystem est requis.
* Support de Git. Si l'environnement le permet (abilité à "spawn" du [child process](http://nodejs.org/docs/v0.5.0/api/child_processes.html#child_process.spawn)), il permet d'accéder aux révisions et historique d'un article et d'effectuer une recherche au sein des articles (plûtot rapide...).
* Construire juste au dessus de Connect. Vu que son middleware router me le permet. Ré-implémenter le truc en utilisant express du départ serait très très intéressant (en tout cas, c'est une formidable occasion d'apprendre et vraiment rentrer dans du nodejs).
* Possibilité d'implémenter de nouvelles fonctionnalités ou modifier le comportement du moteur via des plugins/modules (ceci est arrivé bien après).
* Doit être fun (sinon ca sert a rien).

## FFFork

Si le projet correspond à vos besoins et avez le souhait de contribuer, forkez le et pushez vos changements sur github. C'est avec un grand plaisir que j'ai pu voir quelques forks pointer le bout de leur nez, dont celui de [knuthy](https://github.com/knuthy/) qui est allez assez loin avec l'idée de faire tourner son nabe avec du [Jade](http://jade-lang.com/) et du [Stylus](http://learnboost.github.com/stylus/). C'est un peu grâce à lui que j'ai repris le dev de nabe, j'avais un peu laissé le tout en pause... Donc Merci Knuthy !

Les modules Jades/Stylus présent dans le repo sont directement lié à son travail et ses expériementations.

Petite paranthèse également pour parler de [pullrequest.org](http://pullrequest.org/), peut-être le tout premier site à avoir utilisé nabe :) La version du code mis en place date un peu, le tout ayant évolué énormément évolué depuis... Mais Big up a vous les gars :)


## Pour finir...

Aujourd'hui, je suis heureux de povoir dire que la plupart des objectifs sont remplis et que le site que vous êtes en train de regarder tourne maintenant sur Nabe. C'est assez gratifiant de finir par blogguer au travers d'un outil que l'on a soi-même pensé et mis en oeuvre.

Le message ici, n'est pas tant de vous dire d'utiliser Nabe, car c'est une solution sympa tout ça tout ça, mais de vous motiver à partir dans le même esprit et vous mettre à coder votre propre solution ! Je vous assure que c'est une expérience très enrichissante et permet vraiment de rentrer en détail dans une techno ou plate-forme en vous forçant à résoudre des problèmes dont on n'a pas vraiment idée, avant d'y être confronté.

Il peut s'agir de node ou autre chose. Je vous avouerais que j'ai désormais très envie de tenter la même chose... En Play ! (Voilà, la boucle est bouclé :)
