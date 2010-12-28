Title: Introduction à node.js
Author: Mickael Daniel
Date: Nov 13 2010 21:55:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: Javascript, node.js

<img class="mk-blog-img" src="/node/nodejs-attitude.jpg"></img>

Plus je joue avec node.js, plus j'aime cette plate-forme. Le projet est passé en version 0.2.0 il y a peu (la v0.3.0 étant en dev et la v0.2.4 étant la version stable à l'heure ou j'écris ces lignes), marquant une première stabilisation du projet. Jusqu'à maintenant, il était difficile de suivre, avec des versions s'enchaînant à un rythme soutenu, apportant incompatibilité d'API et difficulté pour les auteurs de framework et module node.js à les maintenir. Ryan Dahl a promis d'assurer la compatibilité de l'API pour les versions 0.2.x. 


<div class="clear"></div>
<h2>Node.js: Tête la première (et les dents en avant)</h2>
Ayant joué un peu avec les versions antérieures à la version 0.2.0, je n'avais pas encore eu l'occasion de me replonger dans node.js, la tête la première (et les dents en avant). Je me suis alors mis en tête de jouer avec node.js, socket.IO et harmony. L'idée étant de permettre au canvas généré par harmony:
<ul>
	<li>d'émettre au serveur les déplacements de la souris de l'utilisateur courant</li>
	<li>d'écouter les mouvement de souris de tout autre utilisateur présent en même temps sur la page</li>
  	<li>de permettre au canvas de retranscrire les mouvements des autres utilisateurs.</li>
</ul>

Ce billet prendra la forme d'un tutorial, vraisemblablement en plusieurs parties, expliquant pas à pas les étapes permettant de développer cette petite appli et de la déployer sur un serveur webfaction (et webbynode).

<!--more-->

<h2>Au menu</h2> 
<ol>
	<li><a href="http://blog.mklog.fr/2010/11/16/node-js-presentation-installation-et-prise-en-main/">Présentation, installation, et prise en main</a>. Nous parlerons un peu plus en détail des caractéristiques du projet et de sa prise en main.</li>
	<li><a href="http://blog.mklog.fr/2010/11/node-boilerplate/">Mise en place du squelette de notre appli</a> en utilisant <a href="https://github.com/robrighter/node-boilerplate">node-boilerplate</a>, pour une mise en route simple et rapide. Avec tout ce qu'il faut, prêt et fonctionnel, pour commencer à développer.</li>
	<li><a href="http://blog.mklog.fr/2010/12/express-js/">Dev. coté serveur et prise en main d'Express</a>, sans oublier l'implémentation et la configuration de Socket.IO coté node.js grâce à <a href="https://github.com/LearnBoost/Socket.IO-node">Socket.IO-node</a></li>
	<li>Dev. et mise en place de Socket.IO coté client. On adaptera également un peu le comportement d'harmony pour qu'il permette d'envoyer les événements qui nous intéressent pour transmission des informations au serveur. Ce dernier s'occupera de broadcaster les données à l'ensemble des clients connectés.</li>
	<li>Enfin, nous aborderons la question du déploiement avec la mise en ligne de l'appli sur des serveurs distants.</li>
</ol>

On fera ainsi le tour de chacune des étapes nécessaires à la mise en place d'une solution tournant sur node.js, de l'installation au déploiement.

<h2>Une petite démo?</h2>
En attendant, voici ce que ça donne <span rt-90>;)</span>: <a href="http://nodeapp.mkl.me">http://nodeapp.mkl.me</a> (URL Edit: Test sur webbynode permettant de directement utilisé node.js, nginx ne permet pas de "proxier" directement des requêtes websocket). Ouvrez autant de navigateurs que possible, commencez à dessiner sur l'un puis regardez les autres... Top moumoute, n'est ce pas? Bon j'avoue, ce n'était rien de plus qu'un prétexte pour geek que de jouer un peu avec node.js mais ça ouvre de belles perspectives à des applications intéressantes dans un autre domaine que celui du gadget.

Vraiment, développer avec nodejs est un pur bonheur. Assurément (et bien sûr, cela n'engage que moi), nodejs risque bien de chambouler le visage du web dans les quelques années à venir.

A suivre "Installation et prise en main de nodejs"...

<em style="font-size: 0.9em;">Pour ceux qui se demanderait d'ou vient l'image du tee-shirt node.js utilisé dans cette article, suivez ce <a href="http://www.redbubble.com/people/dmitrybaranovsk/t-shirts/5821133-1-node-js">lien</a>. Vraiment classe et fera sûrement son petit effet dans l'open space ou à la machine à café. N'hésitez pas à faire un tour sur la page r<a href="http://www.redbubble.com/people/dmitrybaranovsk">edbubble de Dmitry Baranovskiy</a> pour découvrir ses autres créations vestimentaires (Raphael.JS, Sencha, Svg), j'aime particulièrement la déclinaison <a href="http://www.redbubble.com/people/dmitrybaranovsk/t-shirts/5430474-1-sencha-in-code">Sencha in Code</a><span ><3</span>.</em>