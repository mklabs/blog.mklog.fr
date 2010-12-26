Title: Gist de la semaine: 2 things I learned (among 10) from Paul Irish (from the jQuery source)
Author: Mickael Daniel
Date: Nov 20 2010 00:53:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: Javascript, jQuery

Dans la série gist de la semaine, j'ai décidé cette semaine de vous faire partager deux patterns que j'ai découvert alors que je regardais le screencast <a href="http://vimeo.com/12529436 ">Paul Irish : 10 Things I Learned from the jQuery Source</a>, permettant d'oublier setInterval et eval.  Je vous conseille fortement d'y jeter un oeil si vous vous intéressez au JS et à jQuery en particulier. De plus, ses screencasts sont plutôt marrants, pleins d'easter egg et de subtilités(loopsiloopsiloo!). Et si vous ne le faîtes pas encore, je vous conseille également très fortement de suivre le podcast <a href="http://yayquery.com/">yayQuery</a> (version Audio/Vidéo au choix!).

<!--more-->

<h2>Asynchronous recursion</h2>
Récursion asyncrhone de par chez nous. Vous avez peut-être déja entendu parler de setInterval, et du fait qu'il est déprécié et souvent considéré comme une mauvaise pratique, pouvant apporter des comportements innatendus. Voilà pourquoi:
<script src="https://gist.github.com/707336.js"> </script>

Ce code va basiquement appeller doStuff toutes les 100ms, sans aucune considération pour l'appel à doStuff qui peut prendre finalement plus de 100ms. On peut se retrouver avec des situations délicates, si ce n'est pas chaotiques. En tout cas, ce n'est certainement pas une situation dans laquelle on souhaite se retrouver. 

On peut cependant faire beaucoup mieux (et ceci en regardant yayQuery):
<script src="https://gist.github.com/707366.js"> </script>

Ce code fait a peu prés la même chose, à la différence près que setTimeout attend que doStuff ait bel est bien fini son boulot avant d'enregistrer un callback à exécuter dans 100ms. On garde donc ce délai de 100ms qu'on appliquait avec setInterval.

Un petit mot sur arguments.callee qui référence la fonction parent (la closure autour self-executed, clotûre auto executé de par chez nous... (function(){})();), le hic étant qu'arguments.callee est devenu déprécié dans ES5. Le seul moyen de contourner ceci est d'utiliser une fonction nommée (le nom est au choix!) au niveau de notre closure.
<script src="https://gist.github.com/707370.js"> </script>

Yay! (Ou vous pouvez aussi utiliser la version de Paul Irish loopsiloopsiloo qui est un super nom de fonction!) Ce petit pattern de récusion est vraiment sympa et très élégant. Il s'applique aussi parfaitement bien au contexte XHR où l'on remplace l'utilisation de setTimeout par l'helper ajax de votre choix (et de votre librairie préférée):
<script src="https://gist.github.com/707371.js"> </script>

Permettant par exemple d'implémenter un simple long-polling ou d'effectuer le chargement asyncrhone d'un arbre récursivement.

Propre, simple, efficace, puissant, que demander de plus? Ah si, suivez <a href="http://yayquery.com/">yayQuery</a>.

<h2>Parlons eval...</h2>
Et d'une alternative plutôt sexy qu'on peut retrouver dans la méthode <a href="http://api.jquery.com/jQuery.parseJSON/">parseJSON</a> introduit dans la version 1.4.1, que vous pouvez retrouver <a href="https://github.com/jquery/jquery/blob/master/src/core.js#L545">ici</a>.

<script src="https://gist.github.com/707417.js"> </script>

L'équivalent de:
<script src="https://gist.github.com/707420.js"> </script>

Mais que se passe t-il? (Façon <a href="http://www.youtube.com/watch?v=5KVw8lIosWI">Les Inconnus</a>)

SI l'on se risque à tenter dans notre console javascript le statement (new Function("return x = 10")), vous devriez voir: 
<img class="mk-blog-img" src="http://blog.mklog.fr/wp-content/uploads/2010/11/anonymous.png" />
<div class="clear"></div>
Ce code ici n'est pas très propre et n'est que prétexte à expliquer ce qu'il se passe. Assigner 10 à la variable globale x est à éviter <span>;)</span>

L'utilisation du constructor Function vous permet de créer une fonction anonyme (qui n'est pas nommé) à partir d'une string. Appliqué à un retour JSON, cela donnerait: 
<img class="mk-blog-img" src="http://blog.mklog.fr/wp-content/uploads/2010/11/badass-not-evals.png" alt="BadAss not evals" />
<div class="clear"></div>

Wooow, je viens juste d'apprendre comment me passer d'eval... Bien que la meilleure façon reste de ne pas en avoir besoin <span rt-90>;)</span>

Au fait, vous ai-je déjà dit de vous abonner au podcast <a href="http://yayquery.com/">yayQuery</a>?