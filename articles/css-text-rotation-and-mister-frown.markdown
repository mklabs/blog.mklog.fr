Title: Gist de la semaine: CSS text rotation and Mr. Frown
Author: Mickael Daniel
Date: Nov 13 2010 19:12:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: Javascript, CSS3

Avec ce billet, j'initie une petite série intitulée <em><a href="/tag/gist-de-la-semaine/">Gist de la semaine</a></em>.

J'essaierais de vous fournir, régulièrement, des extraits de codes qui m'ont amusé ou intrigué. Celui-ci parlera des rotations de texte en CSS et du bout de code que j'ai écrit pour faciliter le processus pour la nouvelle page <a href="/aha-nothing-to-see-there-well-maybe-a-little/">404 de ce blog</a> et le "logo" (pas vraiment un, juste du texte). Cela s'accompagne d'un léger lifting sur le thème utilisé, avec l'adoption d'un ton plus "darky" et un peu d'exotisme sur les liens (text-shadow) mais tout ceci est un peu hors du propos de ce billet.

<h2>Mr. Frown</h2>
Il y a vraiment plein de bonnes choses dans HTML5 Boilerplate. Mon coup de coeur reste la page 404.html, là ou j'ai fait la connaissance de Mr. Frown (qui se cache aussi <a href="/mr-frown-waiting-for-you-there/">ici</a> ou <a href="/dont-click-too-many-times-on-mr-frown-he-doesnt-like-it-so-much/">là</a> le bougre).

Sans plus attendre, un extrait de ce fameux fichier 404 :
<script src="https://gist.github.com/675333.js"></script>

La partie nous intéressant le plus étant:
<script src="https://gist.github.com/675338.js"></script>

Je ne sais pas si cela voulu de la part des auteurs ou s'il s'agit d'un "bug", mais j'ai du ajouter ces préfixes (-webkit; -moz) pour permettre à la rotation de se faire sur les navigateurs webkit et gecko.

Cela nous permet d'inviter la Frown Family (et même de les amener en soirée):
<div class="mk-blog-demo-frown-family">
	<p><a href="#do-you-frawn"><span frown>:( </span></a></p>
    <p><span rt-0>*_*</span><span rt-0>o_O</span></p>
    <p><span rt-90>:)</span><span rt-90>;)</span><span rt-90>X)</span></p>
    <p><span rt-90>:D</span><span rt-90>:P</span><span rt-90>;p </span><span rt-90>:s</span></p>
    <p><span rt-90>:(</span><span rt-90>:'(</span><span rt-90>:(</span><span rt-90>=/</span><span rt-0>>_<</span></p>
	<p class="uncle-O"><span rt-90>:O</span></p>
</div>

Ces "smileys", par rapport à des images, ont l'avantage de n'avoir pratiquement aucun poids sur la page, aucune requête http, complètement intégré dans votre sémantique, leur taille peut-être changée à volonté, le spectre de couleur est infini et le tout est entièrement scriptable. Si vous êtes assez fou pour cliquer sur Mr. Frown (le patriarche en haut), vous pourrez vous en rendre compte <span style="margin-left: 0.2em;" frown>;)</span>

Vous pourrez trouver l'ensemble du code relatif à ce post sur ce <a href="https://gist.github.com/675490">gist</a>.
