Title: Rebecca Murphey’s gist: ou comment se prouver qu’on ne connaît pas le JS. (Ou qu’on est damn good!)
Author: Mickael Daniel
Date: Nov 01 2010 15:51:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: Javascript

<img class="mk-blog-img" src="http://blog.mklog.fr/wp-content/uploads/2010/11/oops_20101101.jpg" alt="" width="151" height="170" /> Je suis tombé récemment sur ce <a href="http://blog.rebeccamurphey.com/in-search-of-javascript-developers-a-gist">post</a> de Rebecca Murphay, il s'agit principalement d'un exercice javascript ou l'on vous demande de reprendre des snippets de code et de les améliorer.

Rebecca est une référence dans le domaine, spécialement dans l’écosystème jQuery en étant contributrice de l'excellent <a href="http://www.amazon.com/jQuery-Cookbook-Solutions-Examples-Developers/dp/0596159773">jQuery Cookbook</a> et auteur de l’excellentissime <a href="http://jqfundamentals.com/book/book.html">jQuery Fundamentals</a> (j'en parlerais dans un prochain post).

L'initiative de Rebecca, à travers la création du <a href="http://gist.github.com/576723">gist</a>, visait à tenter de localiser un peu d'aide de développeur javascript compétent. Je vous invite à lire le post de Rebecca tout en vous conseillant fortement de suivre son blog, si jamais vous vous êtes de ceux qui s'intéresse à ce formidable langage qu'est le Javascript et les questions d'architecture frontend.

<!--more-->

Hier soir, je me suis amusé à forker ce petit défi, j'étais curieux de savoir où je me situais et si, par chance, j'aurais pu aspirer à travailler avec une telle pointure =). Autant mettre un terme au suspense, la réponse est non. Je me suis lamentablement planté sur deux questions en particulier, et ma tentative de réponse aux autres bien qu'acceptable parmi les réponses attendues par Rebecca, était loin d'être parfait et ne se rapprochait qu'avec difficulté des retours d'autres développeurs JS confirmés (bien que, au bout du compte, personne n'est sorti du lot aux yeux de l'auteur du gist =) )

Je vous propose ici de faire un tour d'ensemble de ce petit exercice, vous présenter ce que j'aurais proposé et insister sur les points qui font mal... Là ou je me suis planté. Quoi qu'il en soit, j'y ai (ré)appris des notions que je croyais maîtrisé, cela m'a secoué et qu'est ce que c'est bon! Pour cela, MERCI Rebecca!

<em>Je ne saurais trop vous conseiller de tenter ce défi, spécialement si vous vous assimilez comme un "bon" développeur JS. Vous seriez surpris des résultats =) et il s'agit d'un formidable exercice. Tout l'interêt de celui-ci prend tout son sens du moment qu'on ne regarde pas les réponses en cours de route, bien entendu...</em>
<h2>Question 1: Ecrire du code lisible mais concis.</h2>
<script src="http://gist.github.com/658450.js"> </script>
On commence "en douceur" ici avec une simple question visant à voir des propositions comprenant l'utilisation de l'opérateur ternaire au lieu d'un classique if-else-statement quand tout ce qui change se résume à un nom de méthode.

J'aurais proposer quelque chose comme:
<script src="http://gist.github.com/623957.js"> </script>

bien que la réponse attendu par l'auteur soit:
<script src="http://gist.github.com/658454.js"> </script>
La première proposition n'utilisant pas l'opération ternaire pour simplement changer le nom de la méthode appelée. L'auteur explique qu'il s'agit certainement d'une amélioration mais qu'il y avait la place pour un peu plus.


<h3>Question 2: Comprendre la portée des variables (Variable Scope)</h3>
<script src="http://gist.github.com/623981.js"> </script>
Concept très important à assimiler en javascript, bien que la question posée ici porte un peu à confusion et que la réponse attendue ne soit pas très claire. Ce que l'auteur attendait ici était d'entendre que le || statement était absurde, car foo aurait toujours la valeur 'world' à cause de ce qu'on appelle le <a href="http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting">variable hoisting</a> (sauvagement traduit par "levage de variable", je continuerais donc d'utiliser l'appellation anglo-saxonne...).

C'est un concept déroutant pour les non-initiés, même pour ceux qui se croyaient un peu moins débutant (eg. moi-même). Fondamentalement, le runtime Javascript scanne  l'ensemble du contenu d'une fonction à la recherche du mot clé var, avant d'exécuter cette fonction. Toute variable initialisée avec un mot clé var à l'intérieur de la fonction deviendra locale à toute cette fonction, (et c'est le point clé que j'avais manqué jusque là...) même si la variable est déja "utilisée" avant d'être initialisée (en l'occurence utilisée un niveau au dessus, dans une closure de plus haut niveau ou en portée globale).

Changer l'ordre de ces deux lignes de codes le montre parfaitement:
<script src="http://gist.github.com/658485.js"> </script>

<h3>Question 3: Travailler avec les Objets et Prototypes</h3>
<script src="http://gist.github.com/623983.js"></script> Cette question était à la recherche de compréhension basique de la notion de prototype en javascript.  Ces concepts, bien qu'assimilés comme basique, sont très importants et déroutent plus d'un débutant. Le javascript est <a href="https://developer.mozilla.org/fr/Guide_JavaScript_1.5/Langages_bas%C3%A9s_sur_les_classes_et_langages_bas%C3%A9s_sur_les_prototypes">un langage basé sur les prototypes</a>. Voici un extrait de la documentation mozilla sur ce sujet:

<blockquote>"Un langage basé sur les prototypes, comme JavaScript, ne fait pas cette distinction : il y a simplement des objets. Un tel langage possède la notion d'objet prototype, un objet utilisé comme modèle depuis lequel on obtient les propriétés initiales pour un nouvel objet. Tout objet peut spécifier ses propres propriétés, que ce soit à sa création ou à l'exécution. De plus, tout objet peut être associé au prototype d'un autre objet, ce qui permet à ce second objet de partager toutes les propriétés du premier."</blockquote>

Appliqué à notre question ici, il faut comprendre qu'un prototype peut être partagé entre plusieurs objets. Il s'agit grossièrement d'un patron de conception pour un objet, on peut modifier, que ce soit à sa création ou à l'exécution, ses propres propriétés, mais toute modifications à un prototype d'un objet entraîne la modification du prototype de tout objet le partageant.  Voici la réponse, prenez le temps de comprendre ce qu'il se passe, l'ensemble des concepts fondamentaux du prototype en JS est démontré ici:
<script src="http://gist.github.com/658496.js"> </script>

<h3>Question 4: Iterating over Objects</h3>
<script src="http://gist.github.com/623984.js"> </script>
Ici, l'auteur souhaite juste voir des proposition itérant sur un objet sans l'utilisation d'helpers comme jQuery.each (ou n'importe quel autre utilitaire d'itération d'une autre librairie). Le test hasOwnProperty peut sembler un peu "overkill" mais l'auteur était satisfait quand les propositions ne le laissaient pas de coté (test que j'ai omis...).

Réponse:
<script src="http://gist.github.com/658518.js"> </script>

<h3>Question 5: Résolution de problème d'une simplicité trompeuse</h3>
<script src="http://gist.github.com/623985.js"> </script>
Ici, l'auteur explique qu'au lieu de parcourir, une à une, chacune des réponse, il nous est demandé de visiter cette <a href="http://jsperf.com/rmurphey-foo-foo-foo/9">page JSPerf</a> pour voir quelques unes des variations et leur performance respective.

Je vous invite à lire attentivement le post de Rebecca concernant cette question qui en amène une autre: Lisibilité vs Performance.

<h3>Question 6: Meilleures pratiques jQuery & DRY</h3>
<script src="http://gist.github.com/623987.js"> </script>
Il ya un tas de mauvaises pratiques ce petit extrait. Tout d'abord, faire la même sélection, souvent répétée, indique que l'auteur ne comprends fondamentalement pas comment son code fonctionne, ou les coûts qu'il peut induire. La sélection ne devrait être faite qu'une fois, puis mise en cache (par une simple assignation à une variable). De plus, les appels de méthodes devraient être chaînés.

Voici un début de réponse:
<script src="http://gist.github.com/658547.js"> </script>

<h3>Question 7: Asynchrone</h3>
<script src="http://gist.github.com/623988.js"> </script>
Cette question reste relativement simple. L'auteur voulait s'assurer de la compréhension des concepts fondamentaux des requêtes asynchrones: On ne peut pas définir la valeur d'une variable à l'intérieur d'un callback XHR(XMLHttpRequest) et attendre que cette variable soit définit et disponible immédiatement.

La solution implique juste d'attendre que la requête asynchrone soit terminé avant d'exécuter le code qui dépend de la variable foo définie.

Réponse:
<script src="http://gist.github.com/658574.js"> </script>

<h3>Question 8: DRY</h3>
<script src="http://gist.github.com/623989.js"> </script>
Le code répétitif est idiot. Vraiment idiot. Le degré vers lequel on veut "assécher" (j'adore les traductions en bon français, lire DRYer...) est sujet à débat, mais pour l'auteur (et on la comprend), cet extrait exige quelques améliorations. Voici ce que l'auteur attendait:
<script src="http://gist.github.com/658579.js"> </script>

<h3>Question 9: Manipulation DOM</h3>
<script src="http://gist.github.com/623990.js"> </script>
C'est une question sur laquelle je me suis lamentablement vautré, où j'ai essayé d'utiliser une "factory" appelé dans chaque itération permettant de créer une petite centaine de fois de nouveaux élements DOM... A absolument ne pas faire! Les seules améliorations que j'apportais dans mon petit exercice personnel sont la correction de l'utilisation de la variable globale i, et la sélection faites pour #thinger et #gizmo 200 fois cachés avant la boucle.

D'un point de vue des performances, on n'ajoute pas 202 élements dans l'arbre DOM, un par un. Il vaut mieux passer par un seul "append" (manipulation du DOM) avec une chaîne de caractère préalablement construite. (Bien que le best of the best reste d'utiliser des système de templating JS ;) Mixer markup HTML avec code JS est tellement difficile à maintenir). 

Voici la solution proposée par l'auteur:
<script src="http://gist.github.com/658650.js"> </script>

<h3>Question 10: Couplage lâche (Loose Typing)</h3>
<script src="http://gist.github.com/623991.js"> </script>
Les nombres en javascript sont vraiment trompeurs. Des mots de l'auteur: "Numbers in JavaScript suck, especially when the user enters them."

Ici, le principal problème pouvant être rencontré est la conversion implicite faîte par le runtime javascript quand on "ajoute" différents type, ici Number et String (le paramètre tip serait vraisemblablement de type String, puisque fourni par l'utilisateur). Une conversion implicite des objet de type Number est faîte en String, le résultat consistant en une simple concaténation de String. Pas vraiment le résultat attendu.

Voici une début de réponse proposé par l'auteur:
<script src="http://gist.github.com/658624.js"> </script>


<h3>Question 11: Array Mapping</h3>
<script src="http://gist.github.com/623993.js"> </script>
L'auteur, à travers cette question, était à la recherche d'utilisation de méthode de mapping pour retourner un tableau en exécutant une fonction sur chacun des élements du tableau. Elle explique que certaines des propositions se contentait d'utiliser une méthode forEach (ce que j'ai fait) pour itérer sur le tableau, puis pousser les résultats dans un nouveau tableau préalablement créé. 

Voici la réponse:
<script src="http://gist.github.com/658625.js"> </script>