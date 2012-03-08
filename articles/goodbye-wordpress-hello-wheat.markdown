<!--config
{
  "Title": "Goodbye Wordpress, Hello Wheat! Une solution basée sur node.js et Git",
  "Author": "Mickael Daniel",
  "Date": "Dec 28 2010 20:00:00 GMT+0100 (CDT)"
}
config-->

<img class="mk-blog-img" src="/wheat/wheat-field.jpg" alt="Wheat!" title="Wheat!">

Le titre résume parfaitement cet article, j'ai finalement basculé mon blog depuis Wordpress pour utiliser [Wheat](https://github.com/creationix/wheat), un moteur de blog écrit par Tim Caswell basé sur [node.js](http://nodejs.org/) et utilisant brillamment [Git](https://github.com/creationix/node-git) et son système de fichier comme support. Wheat est d'ailleurs utilisé sur le site [howtonode.org](http://howtonode.org/), que les amateurs de node.js ne manqueront pas de connaître. 

Ceci signifie: Plus de mise à jour de sécurité, plus d'aller-retour en base pour afficher quoi que ce soit enfin: je peux versionner mes articles grâce à la toute puissance de Git! Chaque révision d'un article est un commit.

Wheat est un bel exemple de mise en valeur de la nature distribué de Git, tout l'historique étant en local, aucune nécessité à contacter un serveur distant. De plus, Wheat dispose d'un système de gestion de cache plutôt bien pensé et carrément efficace, sans oublier qu'il a été écrit pour tourner sur node.js, ce qui ne me laisse naturellement pas indifférent ;)

Autre bénéfice notable, je peux maintenant écrire mes posts en utilisant le format [Markdown](http://daringfireball.net/projects/markdown/) au lieu du simple format HTML, ce qui se traduit par une expérience d'écriture complètement différente et grandement améliorée. Sans oublier la possibilité d'éditer mes posts dans son IDE favori, ce qui n'est pas négligeable. Autrement dit, bye bye textarea. De plus, pour les utilisateurs du formidable IDE sur OSx TextMate, ce dernier dispose d'un bundle ‘Blogging’ avec une fonction preview des plus utile.

## Wordpress...

Wordpress et autres moteurs de blogs sont des CMS simplifié. Beaucoup des fonctionnalités qu'ils offrent sont relatives au besoin d'un blog pour gérer du contenu dynamique. La page principale a besoin d'être mis à jour si du nouveau contenu est publié, et chaque article doit évoluer si commentaires, trackbaks et mise à jour sont apportés.

Malheureusement, dans la multitude de fonctionnalités qu'offre ces moteurs populaires, ils rendent souvent plus difficile le simple exercice d'écriture. Tandis qu'ils continuent d'offrir des fonctionnalité d'édition de texte de plus en plus sophistiqués, la plupart d'entre nous qui écrivons du code sommes plutôt confortable avec nos propres éditeurs. Peu importe combien les widgets d'édition de texte sont devenus performants, ils ne seront jamais TextMate, Emacs ou vim. (ou votre éditeur de texte favori).

## Nouveau moteur, Nouveau thème

Le changement de plate-forme s'accompagne également d'un petit lifting au niveau du thème qui utilise quelques folies CSS3 et HTML5 (manipulation de l'API History). Ceux d'entre vous tournant sur des versions récentes de Safari, Chrome ou Firefox 4 peuvent avoir noter quelques changement dans la navigation.

Certains n'auront sans doute pas manqué récemment l'annonce de GitHub concernant leur nouveau TreeSlider. Leur travail et inspiration sont brillants, je sais pas vous mais j'adore la nouvelle expérience apporté par cette nouvelle fonctionnalité lorsque l'on navigue parmi les sources d'un repo. Pour les utilisateurs ne disposant pas encore de navigateurs supportant l'API History HTML5, voici une vidéo de présentation que l'on peut retrouver sur le [post original](https://github.com/blog/760-the-tree-slider):

<div style="width: 480px; margin: 2em auto;">

<embed src="http://blip.tv/play/AYKSzQUC" type="application/x-shockwave-flash" width="480" height="390" allowscriptaccess="always" allowfullscreen="true"></embed>

</div>

Si je parle de GitHub et de leur TreeSlider, c'est principalement parce que ce thème et l'utilisation qu'il fait des [transitions CSS3](http://developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Transitions/Transitions.html) et de l'[API Hitory](https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history) (pushState et replaceState) sont directement inspiré de leur implémentation. Je trouve l'idée à la fois brillante et élégante (n'en déplaise aux râleurs - cf. commentaire sur le post original - qui trouve le moyen d'être ennuyé par l'effet de transition).

J'ai donc tout de suite eu envie de comprendre comment ils avaient procédés, j'ai également immédiatement voulu savoir si ce cas d'utilisation pouvait s'appliquer à la navigation d'un site plus classique (pas de navigation au sein d'un système de fichier), disons un blog.

De fil en aiguille, et après quelques heures de reverse, je suis arrivé à une première version d'un widget jQueryUI dont vous pouvez retrouver les sources [ici](https://github.com/MkLabs/wheat-harmonious-theme/blob/master/public/js/mylibs/ui.treeslider.js) et qui est mis en oeuvre actuellement sur la version du site que vous consultez actuellement. Idéalement et dans une seconde étape, je compte le ré-écrire complètement de manière à la rendre plus flexible et un peu plus propre, avec tests unitaires, documentations et démos.

Finalité, la blog dispose maintenant d'une barre de navigation affichant les différentes catégories du blog, le treeslider étant actif sur ces liens. J'aurais pu étendre (et c'est d'ailleurs ce que j'avais commencer à faire) cette fonctionnalité sur les liens de type articles mais disqus m'a freiné dans cet enthousiasme.

Rentrer dans les détails de mise en oeuvre de cet effet serait un peu hors du propos du présent post, mais fera peut-être l'objet d'un article dédié dans le futur. 

Rapidement, le click sur les liens sont interceptés, un appel à history.pushState() est fait pour changer l'URL du navigateur, un appel ajax est effectué pour récupérer les données, enfin on effectue l'effet de transition vers ce nouvel élement.

Toutes les pages qui sont demandé au serveur suivent le markup suivant:

    <div class="frames">

      <div class="frame frame-center" data-path="this/is/the/url/requested">

        ... page content ...

      </div>

    </div>

    

Si une ressource précédement demandé est présente dans l'arbre DOM ($('.frame[data-path=path]') existe), le widget effectue directement la transition.

Le style CSS alors utilisé pour rendre l'effet possible est le suivant:

    #main{overflow:hidden;}

    #main .frames{width:10000px;}

    #main .frames .frame{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;float:left;}

    #main .frames .frame-left{margin-left:-2000px;margin-right:200px;}

    #main .frames .frame-center{margin-left:0;}

    #main .frames .frame-loading{height:100%;}

    

Ah oui, et bien sûr, le thème suit la structure d'[html5 boilerplate](http://github.com/mklabs/wheat).

## Le processus de migration

1. Premièrement, beaucoup de customisation de wheat sur un [fork personnel](http://github.com/mklabs/wheat) dans le but d'une utilisation personnelle. J'ai pu y ajouter le support des thèmes (basiquement juste le répertoire skin qui est architecture en skin/skin1, skin/skin2 etc. et la possibilité de changer l'option du thème utilisé au démarrage de l'appli), modifier un peu git-fs pour utiliser l'encoding utf8 lors des accès de fichiers de type texte (fs.readFile) du filesystem git (vous savez pour tout nos beaux accents et caractères spéciaux), personnaliser un peu les routes utilisées pour mettre en place une gestion rapide des pages 404 (qui finalement ne font que rediriger vers l'accueil), etc.

2. Deuxièmement, la migration des posts à proprement parlé. Fort heureusement, ce blog est encore assez récents et les articles ne sont pas encore très nombreux. Il a s'agit essentiellement de récupérer le contenu HTML de chaque article, de créer les fichiers markdown correspondants et de configurer leurs metadata (data, titre, catégories, etc.), le travail le plus fastidieux étant le processus de migration des screens et images utilisés au sein des posts. Je n'ai pas contre pas eu le courage de remplacer les gists (wheat gère plutôt bien la mise à disposition de bout de code et leur ‘syntax highlight’) ou de convertir le format HTML en Markdown. Fort heureusement, les fichiers markdown peuvent contenir directement du code HTML.

2. Enfin, la migration des commentaires. Wheat ne disposant pas de système de gestion de commentaires intégrés, il utilise [disqus](http://disqus.com/) pour proposer ce type de service. La [documentation](http://docs.disqus.com/help/24/) de disqus est plutôt bien faîte concernant cette problématique, il m'a fallu effectuer un export du blog wordpress (Tools>Export) au format WXR vers le forum disqus associé à ce sote et d'ensuite fournir un mapping entre les anciennes URL et les nouvelles pour chacun des posts disposant de commantaires.

## Wheat is so sweet

Je suis très enthousiaste concernant cette migration. Je suis immensément plus à l'aise avec cette solution qu'avec Wordpress. Bien qu'il s'agisse d'un CMS et plate-forme de blog tout simplement géniale, Wordpress ne correspondait pas exactement à mon ‘workflow’ d'écriture. L'interface d'administration est superbe, mais finalement, de mon point de vue, ne vaudra jamais l'utilisation de son IDE favori et la possibilité de versionner chacun des articles grâce à git. En tout cas, du point de vue d'un codeur, Wheat n'est que du bohneur (et en plus ça rime).

Ceci dit, Wheat n'est pas la seule solution de blog disponible utilisant git comme support, [Jekyll](https://github.com/mojombo/jekyll) est une moteur écrit en Ruby notamment utilisé sur GitHub pour [pages.github.com](http://pages.github.com/) et la branche gh-pages de chaque repo. Pour information, tout repo github peut disposer d'une branche appellée gh-pages. Le contenu de cette branche peut alors être utilisée pour publier du contenu sur le web par un simple push de contenu. Jekyll peut alors être utilisé pour des mises en pages complexes et [peut être adapté](http://metajack.im/2009/01/23/blogging-with-git-emacs-and-jekyll/) à l'[usage d'un blog](https://github.com/blog/164-use-github-as-your-blog).

J'écrirais sûrement une série de posts concernant Wheat, histoire de vous parler un peu plus en détail de son fonctionnement, de son architecture et des possibilités à le personnaliser pour répondre exactement à vos besoin.

Pour finir, j'espère que la nouvelle interface vous plaît. En tout cas, ça a été fait avec amour.

<span style="font-size: 0.8em;">_Et si jamais bugs et comportement viennent troubler votre navigation, n'hésitez pas à me le faire remonter ;) Je sais que l'animation du logo fr fais faire des choses bizarre à Safari sur la zone de contenu principal, un travail de finition sur les différents navaigateurs (mobiles inclus!) est encore à faire (cela devrait marcher convenablement sur Chrome ou FF4 par contre)_</span>
