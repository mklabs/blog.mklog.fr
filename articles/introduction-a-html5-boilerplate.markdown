Title: Introduction à HTML5 Boilerplate
Author: Mickael Daniel
Date: Nov 6 2010 16:31:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: HTML5

<img class="mk-blog-img-center" src="/boilerplate/html5boilerplate_600.jpg" alt="" width="600" height="234" /> 

Je vous propose aujourd'hui de faire un tour d'horizon d'<a href="http://html5boilerplate.com/">HTML5 Boilerplate</a>.

<h2>Késako?</h2>
HTML5 Boilerplate est un ensemble de fichiers HTML/CSS/JS qu'un développeur front-end peut utiliser pour commencer un site/appli web. Voyez le comme un template hyper-solide, pour un site rapide, robuste et prêt à évoluer. Lorsque l'initiative fut annoncé et mis à disposition début août, j'y ai tout de suite vu un grand intérêt et me suis récement plongé plus en avant avec la création de ce blog et le thème wordpress conçu pour l'occasion. HTML5 Boilerplate représente le travail de plus de deux ans de développement, vous pourrez y trouver le meilleur des bonnes pratiques front-end: 
<ul>
	<li>Compatibilité cross-browser (IE6 inclus)</li>
	<li>Optimisation des performances.</li>
	<li>Fonctionnalités cross-domain Ajax et Flax.</li>
	<li>Configuration apache avec fichier .htacess (configuration disponible également pour serveur nginx, IIS et lighttpd) pour configuration du cache aux petits oignons et préparer votre site à servir des vidéos HTML5.</li>
	<li>Optimisations navigateurs mobiles</li>
	<li>Profiling</li>
	<li>Et j'en passe...</li>
</ul>

Pour finir sur cette courte introduction, l'auteur du projet n'est autre que <a href="http://paulirish.com/">Paul Irish</a>, entre autre membre de la team jQuery.

Définitivement, Il y a vraiment plein de bonnes choses dans ce projet HTML5 Boilerplate. Je vous propose ici d'y jeter un coup d'oeil et de faire un tour ensemble de ses fonctionnalités. Les deux références qui me serviront de fil rouge tout le long de cet article sont: <a href="http://net.tutsplus.com/tutorials/html-css-techniques/the-official-guide-to-html5-boilerplate/">Guide officiel de Paul Irish sous forme de screencast publié sur Nettuts</a> et <a href="https://github.com/paulirish/html5-boilerplate/wiki">le wiki github du projet</a>.

<!--more-->

Voici le <a href="http://net.tutsplus.com/tutorials/html-css-techniques/the-official-guide-to-html5-boilerplate/comment-page-1/#comments">screencast publié sur Nettuts</a>:
<div style="text-align: center; margin: 1em 0 3em 0;">
<embed src="http://blip.tv/play/gcMVgffAOgI%2Em4v" type="application/x-shockwave-flash" width="480" height="330" allowscriptaccess="always" allowfullscreen="true"></embed>
</div>

<h2>Pour commencer</h2>
<em><a href="https://github.com/paulirish/html5-boilerplate/wiki/Get-Started!">https://github.com/paulirish/html5-boilerplate/wiki/Get-Started!</a></em>
Aprés avoir télécharger le fichier zip du projet en cliquant sur le bouton "Download" (Via le <a href="http://html5boilerplate.com/">site du projet</a> ou <a href="https://github.com/paulirish/html5-boilerplate">github</a>), vous voudrez peut-être jeter un oeil à chacun des fichiers présents:

<h3>HTML</h3>
<ul>
	<li>Si vous utilisez un système de templates, vous aurez sûrement besoin d'y intégrer à votre système. (template principale index.html)</li>
	<li>Vous pouvez rapidement voir une petite démo avec <a href="https://github.com/paulirish/html5-boilerplate/blob/master/demo/elements.html">demo/elements.html</a>.</li>
	<li>La classe à utiliser avec les images background au format png est .png_bg. Vous pouvez toujours changer la classe utiisée en prenant soin de modifier DD_belatedPNG.fix('img, .png_bg'); avec la valeur que vous voulez utiliser.</li>
	<li>HTML5 Boilerplate vous permet de facilement "profiler" votre code par l'utilisation des profiler YUI. Dans un environnement de prod. vous devrez enlever le lien vers ces scripts. Sur ce thème, je me suis contenté de les placer en commentaire, mais c'est définitivement pas la meilleur des choses à faire. Si vous êtes à l'aise avec la ligne de commande, vous pouvez considérer essayer le <a href="https://github.com/paulirish/html5-boilerplate/wiki/Build-script">script de build</a> (intégré dans la dernière version).</li>
	<li>Si vous vous posez des questions sur l'utilité des ?v=2, une explication détaillée se trouve <a href="https://github.com/paulirish/html5-boilerplate/wiki/Version-Control-with-Cachebusting">ici</a>. Fondamentalement, il s'agit d'une technique utilisée conjointement avec une gestion du cache utilisant des Expires Header (Entête d'expiration stipulant au navigateur quand doit-il re-demander une version d'un fichier au serveur, ou utiliser le fichier stocké en cache) placé très loin dans le futur. Il s'agit "d'artificiellement" changer le nom du fichier demandé au serveur par l'ajout d'une petite query string de la forme ?v=1, ?v=2 etc. Cette technique est appellée Cachebusting (Contournement du cache).</li>
</ul>

<h3>CSS</h3>
<ul>
	<li>Vous devrez (bien qu'absolument pas obligatoire) placer tous les styles dont vous avez besoin à l'intérieur du fichier style.css, juste après le commentaire qui commence par "Primary Styles". Si vous vous trouvez dans un projet de plus grosse envergure, il deviendra intéressant de splitter (séparer) vos régles dans de multiples fichiers. Dans ce cas, la présence d'un processus de build est quasi automatique, la concaténation des fichiers JS / CSS et leur minification se ferait à ce niveau.</li>
</ul>

<h3>JS</h3>
<ul>
	<li>Considérez placer le code JS relatif aux plugins / widgets que vous utilisez dans le fichier plugin.js dans le répertoire js/</li>
	<li>Si vous utilisez une bibliothèque tierce, considérez placer ces fichiers sous le répertoire "mylibs".</li>
        <li>Utilisez le fichier script.js pour placer tout script que vous utilisez pour importer tout plugins ou outil tiers. De cette façon, ce sera placé en cache et ne nécessitera pas d'ajout dans le chargement initial de la page.</li>
</ul>

<h3>Configuration coté-serveur</h3>
Vous pouvez héberger vos fichiers sur les serveurs Apache, IIS, nginx ou lighttpd. Boilerplate dispose de fichiers de configurations pour chacun de ces serveurs (.htaccess pour Apache, web.config pour IIS, nginx.conf & mime.types pour nginx, lighttpd.conf pour lighttpd).

Si vous vous y connaissez en configuration de ces serveurs et comprenez ce que contient chacun de ces fichiers, prenez la liberté de vérifier leur configuration et adapter selon vos propres besoins.
<ul>
	<li><a href="https://github.com/paulirish/html5-boilerplate/wiki/web.config">web.config</a> - intro and how to use settings inside web.config to improve IIS server performance</li>
	<li><a href="https://github.com/paulirish/html5-boilerplate/wiki/.htaccess">.htaccess</a> - intro and how to use settings inside .htaccess to improve Apache server performance</li>
	<li><a href="https://github.com/paulirish/html5-boilerplate/wiki/nginx.conf">nginx.conf</a> - intro and how to use settings inside nginx.conf to improve nginx server performance</li>
	<li><a href="https://github.com/paulirish/html5-boilerplate/wiki/Version-Control-with-Cachebusting">Version Control with Cachebusting</a> - intro and how to use ?v=1</li>
</ul>

<h3>Divers</h3>
<ul>
	<li>Un favicon est fourni avec Boilerplate mais vous aurez sûrement à shouhait de le changer par le favicon de votre choix (fichier favicon.ico à placer à la racine de votre arborescence).</li>
	<li>Vous devrez sans doute faire la même chose pour le fichier apple-touch-icon.png (si vous vous souciez des terminaux mobile Apple).</li>
	<li>Modifier le fichier 404 (ou le laisser tel quel ;) )</li>
	<li>Le fichier robots.txt vous permet de configurer les pages que vous ne voulez pas voir indexées par les moteurs de recherche.</li>
</ul>

<h2>Markup</h2>
<em><a href="https://github.com/paulirish/html5-boilerplate/wiki/The-markup">https://github.com/paulirish/html5-boilerplate/wiki/The-markup</a></em>
<h3>Classes CSS IE spécifique sur le tag html</h3>
Vous pourrez voir une série de "if" autour du tag html (body dans la version de ce site) qui applique une classe différente en fonction du navigateur, plus spécifiquement en fonction de la version du navigateur si l'utilisateur utilise IE. Ceci permet de facilement permettre des fix CSS pour chaque version spécifique d'IE sans des hacks comme: 
<script src="https://gist.github.com/665367.js"> </script>

Hacks communément utilisés pour contourner des bugs relatif au moteur de rendu (rendering engine) d'IE. En utilisant Modernizr, ceux-ci peuvent être remplacés par: 
<script src="https://gist.github.com/665372.js"> </script>

<h3>S'assurer que la dernière version d'IE soit utilisée</h3>
Les versions 8 et 9 d'IE contiennent de nombreux moteurs de rendu, cela implique d'avoir la possibilité d'utiliser un moteur de rendu différent du dernier disponible, pour corriger cela: 
<script src="https://gist.github.com/665378.js"> </script>

Ce tag meta permet de spécifier au navigateur Internet Exporer d'utiliser la dernière version de moteur de rendu disponible tout en permettant, si installé, d'utiliser le moteur de rendu de <a href="http://code.google.com/intl/fr-FR/chrome/chromeframe/">Chrome frame's</a>. Vous vous assurez ainsi que n'importe quel utilisateur utilisant IE dispose de la meilleur expérience utilisateur possible (et dépendant de leur environnement).

<h3>Mobile Viewport -  Créer une version mobile</h3>
Boilerplate vous propose par défaut la configuration du méta tag Viewport:
<script src="https://gist.github.com/665382.js"></script>

Vous pouvez utiliser différentes options avec l'utilisation de ce tag, si vous êtes intéressé et souhaitez en savoir plus: <a href="http://j.mp/mobileviewport">j.mp/mobileviewport</a> (Apple developer docs).

<h3>Modernizr</h3>
<a href="http://www.modernizr.com/">Modernizr</a> (du même auteur) est une librairie Javascript qui vous aide à tirer parti des nouvelles technologies web (CSS3, HTML 5), tout en conservant un bon niveau de contrôle sur les anciens navigateurs, en ajoutant des classes CSS spécifiques à l'élement &lt;html /&gt;.

Le script Modernizr est le seul fichier Javascript chargé en haut du document. Il a besoin de s'exécuter avant que le navigateur commence le rendu de la page afin de permettre aux navigateurs ne supportant pas certains des nouveaux tags HTML5 d'être capable de les gérer correctement.

<h3>Contenu du boilerplate</h3>
La partie centrale du template boilerplate est pratiquement vide:
<script src="https://gist.github.com/665395.js"> </script>

Paul Irish l'explique par l'intention de rendre boilerplate propice à la fois au contexte de page web et de web app.

<h3>Javascript</h3>
<h4>Google CDN pour jQuery</h4>
Vers la fin de la page, vous pourrez trouver l'import des fichiers JS, en commençant par la librarie jQuery. 

<script src="https://gist.github.com/665405.js"> </script>

Vous remarquerez également l'utilisation du CDN (Content delivery network) de chez Google. Cet article ne se prête pas à présenter tout l'intérêt d'utiliser un CDN pour servir vos fichiers statiques (pour plus d'informations: <a href="http://encosia.com/2010/09/15/6953-reasons-why-i-still-let-google-host-jquery-for-me/">6,953 reasons why I still let Google host jQuery for me</a>), mais quelque soit votre librairie préférée, l'utilisation d'un CDN est fortement recommandée. Non seulement vous vous assurez d'utiliser d'emblée le cache de vos utilisateurs du fait qu'il peuvent déjà avoir rencontré cette version de fichier , mais vous servirez vos fichiers statiques plus rapidement que vous ne pourrez jamais le faire avec votre propre serveur.

<h4>PNG Fix</h4>
Le snippet suivant est une correction concernant le problème d'IE6 à rendre correctement les images .png. 

<script src="https://gist.github.com/665412.js"> </script>

Vous pourrez trouver plus d'informations sur ce sujet <a href="http://www.dillerdesign.com/experiment/DD_belatedPNG/">ici</a>.

<h4>Google Analytics code</h4>
En toute fin de fichier, vous pourrez trouver la toute dernière version du code de tracking Google Analytics, plus quelques optimisations.
<script src="https://gist.github.com/665423.js"> </script>

Il suffit de remplacer "UA-XXXXX-X" par l'identifiant GA de votre site.

<h2>Le Style</h2>
<em><a href="https://github.com/paulirish/html5-boilerplate/wiki/The-style">https://github.com/paulirish/html5-boilerplate/wiki/The-style</a></em>
HTML5 Boilerplate propose par défaut un ensemble cohérent et solide de régles CSS permettant à tout site ou application web de commencer leur implémentation frontend ou phase de maquettage sur des fondations à toute épreuve.

<h3>Reset Styles</h3>
Le reset CSS est une technique qui consiste à réinitialiser les valeurs de l'ensemble des élements HTML afin d'éviter une partie des différences d'affichage sur les différents navigateurs. Ici, le Reset CSS est une <a href="http://html5doctor.com/html-5-reset-stylesheet/">version modifiée du Reset CSS d'Eric Meyer.</a>

<h3>Style de police</h3>
Boilerplate utilise <a href="http://developer.yahoo.com/yui/3/cssfonts/">Yahoo’s CSS Fonts</a>.

<h3>Style d'impression</h3>
Les style d'impression représentent un ensemble de règle CSS qui ciblent le média print, autrement dit les 
documents imprimés.
<ul>
	<li>Les styles d'impression sont définit en "inline" pour <a href="http://www.phpied.com/delay-loading-your-print-css/">réduire le nombre des requêtes http</a>.</li>
	<li>L'ensemble des couleurs d'arrière plan sont désactivées et la couleur de la police devient gris sombre. Les éventuels text-shadow sont également désactivés. Tout ceci pour éviter à vos imprimantes de manger une cartouche à chaque page web imprimée.</li>
	<li>Styles spécifiques pour les élements &lt;a&gt; et leur différents états.</li>
</ul>

<h2>Le javascript</h2>
<h3>script.js & plugin.js</h3>
script.js est censé être utilisé pour contenir votre "code applicatif". Il peut paraître judicieux de le stocker dans un <a href="http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/">object littéral et de l'éxecuter en fonction des classes du tag &lt;html&gt; ou &lt;body&gt;</a>. L'utilisation de Boilerplate et Modernizr facilite grandement ce Pattern.

plugin.js est censé être utilisé pour contenir tout plugin jQuery ou vos propres scripts. Tous les pluging jQuery devraient être insérés dans la closure (function($){ ... })(jQuery); pour s'assurer qu'ils se trouvent bien dans le namespace jQuery.

<h3>Profiling</h3>
Les outils Firebug & Chrome Dev sont vraiment formidables mais il n'existent pas d'outils aussi puissant et accessible pour le faire également efficacement sous IE6 et IE7.

Le script de profiling YUI qui est intégré avec Boilerplate peut identifier les parties de votre code qui prennent anormalement trop de temps à s'exécuter.  La configuration par défaut permet de profiler l'objet jQuery, mais vous devriez changer config.js pour qu'il surveille a peu prés tout ce que vous pouvez souhaiter.

<script src="https://gist.github.com/665468.js"> </script>

<h2>Pour finir</h2>
Cet article n'a fait qu'effleurer toute la puissance d'HTML5 Boilerplate et l'ensemble de ses fonctionnalités. Les principales sources d'informations viennent de:
<ul>
	<li><a href="https://github.com/paulirish/html5-boilerplate/wiki">HTML5 Boilerplate Github Wiki</a></li>
	<li><a href="http://net.tutsplus.com/tutorials/html-css-techniques/the-official-guide-to-html5-boilerplate/">The Official Guide to HTML5 Boilerplate</a></li>
	<li><a href="http://designreviver.com/articles/an-unofficial-guide-to-the-html5-boilerplate/">An Unofficial Guide to the HTML5 Boilerplate</a></li>
	<li><a href="http://mashable.com/2010/09/02/html5-boilerplate-guide/">HOW TO: Get Started with HTML5 Boilerplate</a></li>
</ul>

Si vous vous intéressez à HTML5 Boilerplate, n'hésitez pas à y faire un tour. Vous obtiendrez les meilleures et les plus précises informations sur le sujet.

Un grand Merci à Paul Irish et à l'ensemble des contributeurs du projet, ceci représente vraiment un condensé incroyable de bonnes pratiques et optimisations en fournissant un socle, une fondation solide et cohérente que tout site ou application web se doit d'avoir.
