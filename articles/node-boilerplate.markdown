Title: Node Boilerplate: ou comment mettre en place une appli node.js en moins de 5 minutes
Author: Mickael Daniel
Date: Nov 23 2010 22:18:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: javascript, node

<img class="mk-blog-img" src="/node-boilerplate/node-boilerplate-featured.jpg" />Troisième article consacré à cette série, nous allons aujourd'hui nous pencher sur <a href="https://github.com/robrighter/node-boilerplate">Node Boilerplate</a> et à la mise en en place du squelette de notre appli Node.

Inspiré par <a href="http://html5boilerplate.com/">HTML5 Boilerplate</a>, <a href="http://robrighter.com/">Rob Righter</a> eut l'idée de créer un outil permettant de générer tout ce dont nous pouvons avoir besoin pour mettre en place une appli ou un site Node. 

Fondamentalement, ce projet permet de:
<ol>
	<li>Stopper la répétition induite à chaque début de projet.</li>
	<li>Restreindre les dépendances (librairies et modules) au répertoire du projet. Ne rien installer en dehors de ce répertoire (Déploiement en prod. facilité)</li>
	<li>Faciliter l'installation de modules additionnels au sein du projet.</li>
	<li>Générer facilement un squelette pour notre application node.js avec <a href="https://github.com/visionmedia/express">Express.js</a>, <a href="https://github.com/learnboost/socket.io-node">Socket.IO</a> et <a href="https://github.com/paulirish/html5-boilerplate">HTML5 Boilerplate</a>, intégré pour vous via templates <a href="https://github.com/visionmedia/ejs">ejs</a>.</li>
</ol>

Lorsque l'on initialise un projet, ceci configure un nouveau répertoire avec une application web fonctionnelle utilisant express et socket.IO, initialise un nouveau repository git et effectue le premier commit. Vous pouvez toujours ajouter de nouveaux modules dans le répertoire lib de votre projet, ils seront alors rendu disponible pour inclusion dans votre nouveau projet sans avoir à se soucier de chemins relatifs.

Suite à cette brève présentation de node-boilerplate, penchons nous maintenant sur sa prise en main.

<!--more-->

<h2>Récupérer les sources</h2>
Cet article part du principe que vous disposez de Git installé en local afin d'avoir la possibilité de cloner le projet et de gérer les dépendances (dans sa dernière version, préférable pour la gestion des modules en mode récursif, ce que nous verrons plus tard). En effet, node-boilerplate utilise Git et sa fonction submodule pour gérer les dépendances du projet. Le script d'installation, que nous verrons par la suite, utilise des commandes git pour mettre en place votre structure de projet.

Aussi, si vous souhaitez suivre ce tutorial et que vous ne vous êtes toujours pas mis à Git, c'est le moment de s'y mettre <span rt-90>;)</span>. De nombreux articles et guides sont maintenant disponibles sur internet, notamment sur le site de <a href="http://help.github.com/">github</a>. Si vous êtes à la recerche de ressources francophones, assurez vous de faire un tour sur <a href="http://www.git-attitude.fr/">git-attitude</a>.

Commençons par cloner le projet. Vous pouvez le faire pour le répertoire de votre choix, il suffit d'adapter la commande ci-dessous en prenant soin de modifier mynewproject par le nom de votre projet (si non spécifié, le répertoire prendra le nom du projet github cloné, ici node-boilerplate). Les instructions du <a href="https://github.com/robrighter/node-boilerplate">README</a> sont plutôt explicites.

<script src="https://gist.github.com/710251.js"> </script>

Ceci permettra de télécharger sur votre poste local les sources de node-boilerplate.

Vous devriez voir l'arborescence suivante:

<img class="mk-blog-img-center" src="/node-boilerplate/node-boilerplate-tree.png" alt="" />

Elle contient notamment les répertoires /lib et /bin, le premier contenant <a href="https://github.com/robrighter/node-boilerplate/tree/master/lib">les modules</a> socket.IO, socket.IO-node, Express et HTML5 Boilerplate qui ne sont pour l'instant que des répertoires vides, le second contenant le script d'installation initproject.sh dont vous pouvez voir le contenu ci-dessous.

<h2>Script d'installation</h2>
<script src="https://gist.github.com/710271.js"> </script>

Ce script parle presque de lui-même. L'instruction la plus importante étant la première:
<script src="https://gist.github.com/710283.js"></script>

Cette commande permet d’initialiser les repository de chaque module et de les mettre à jour (téléchargement des sources). Ceci est fait récursivement, pour que vous n'ayez pas à gérer inutilement l'init et update de chaque dépendance.

Cette commande revient à (version non récursive):
<script src="https://gist.github.com/710292.js"> </script>

<em>Veuillez noter que j'ai éprouvé quelques difficultés, une fois sur le serveur distant, à initialiser les submodules de manière récursive. Ceci étant dû (je suppose) à la version de git installé sur mon serveur partagé (1.5.4.3 vs 1.7.0.3 en local). Ceci dit, rien d'insurmontable, soit vous effectuez la mise à jour de git vers une version plus récente (en recompilant les sources et configurant l'environnement), soit vous la jouer plus feignant (encore que...) et faîtes la manip git submodule init / git submodule update pour chaque dépendance et sous dépendance de votre projet (un poil longuet pour avoir choisi l'option feignant...).</em>

Lançons donc le script d'install via la commande suivante, depuis la racine de votre projet:
<script src="https://gist.github.com/712388.js"> </script>

Le téléchargement de chacun des submodules peut prendre un peu de temps, et votre terminal deviendra très verbeux, avec à la fin quelque chose comme:

<img class="mk-blog-img-center" src="/node-boilerplate/node-boilerplate-initproject.png" alt="" />

<h2>Que le squelette soit</h2>
Ok, nous avons désormais une appli Node prête et fonctionnelle qui utilise express et socket.IO, avec un repository git tout neuf et le premier commit effectué. Il ne reste plus qu'a exécuter la commande 'node server.js':

<img class="mk-blog-img-center" src="/node-boilerplate/node-boilerplate-run.png" alt="" />

Vous pourrez voir ce que cela donne en visitant <a href="http//localhost:8081">http//localhost:8081</a>
<img class="mk-blog-img-center" src="/node-boilerplate/node-boilerplate-test.png" alt="" />


node-boilerplate est fourni  avec une configuration d'express par défaut, facilement adaptable et représentant un très bon point de départ:
<img class="mk-blog-img-right" src="/node-boilerplate/node-boilerplate-tree2.png" alt="" />

<ul>
	<li>Les vues sont stockées dans le répertoire /views</li>
	<li>Les fichiers statiques (css, js, img, etc.) dans le répertoire /static</li>
	<li>Configuration des routes pour l'index et les pages 404/500</li>
	<li>html5-boilerplate implémenté via templates ejs avec le layout et les vues correspondantes à index/404/500. Les fichiers statiques étant dans leur répertoire dédié (/static)</li>
</ul>

node-boilerplate est vraiment un super outil. Il prend html5-boilerplate, express, connect et socket.IO et les organise en une appli prête à l'emploi. C'est un moyen rapide et efficace pour commencer à travailler sur un projet Node sans avoir à se soucier de sa configuration. Il prend soin de toutes les parties ennuyeuses et répétées à chaque début de projet comme configurer les vues, les page 404/500, organiser les modules, etc.

<div class="clear"></div>

Finalement, ce tutorial n'est qu'une présentation de cet outil, que je trouve formidable, et pourrait tenir en trois lignes:
<script src="https://gist.github.com/712570.js"> </script>

Un grand merci à <a href="https://github.com/robrighter">Rob Righter</a> d'avoir eu l'idée node-boilerplate et la gentillesse de la partager!

<div class="clear"></div>
