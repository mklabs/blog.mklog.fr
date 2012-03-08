<!--config
{
  "Title": "pdf.js et génération markdown vers pdf",
  "Author": "Mickael Daniel",
  "Date": "Apr 09 2011 18:00:00 GMT+0100 (CDT)",
  "Categories": "javascript, node",
  "Tags": "javascript, markdown, node, pdf",
  "layout": "main"
}
config-->

Certains sont certainement déjà au courant de l'existence de l'excellent outil de génération pdf écrit purement en JavaScript par James Hall: [jsPDF](http://snapshotmedia.co.uk/blog/jspdf) ([source](https://github.com/MrRio/jsPDF)).

Un [module node](https://github.com/marak/pdf.js) existe également basé essentiellement sur jsPDF effectué par [Marak](https://github.com/marak/) permettant de facilement générer des documents pdf avec node. En fait, je suis venu à m'intéresser à ce sujet en cherchant quelque chose me permettant de générer des documents pdf à partir de fichiers markdown. Et je voulais pouvoir le faire aussi bien complètement coté client qu'en environnement node.js.

## jsPDF - pdf.js

jsPDF est une solution plutôt brillante utilisant [PostScript](http://fr.wikipedia.org/wiki/PostScript) (dans sa version 1.3 si je dis pas de bêtise) pour manipuler et générer la sortie pdf. Autrement dit, bravo à James Hall d'avoir écrit cette librairie, cela à du nécessiter de longues heures d'analyse de la spec. Adobe et de coding. Il a permit la possibilité de générer des rapports coté client (ou dans tout environnement JavaScript). Ceci dit, bien que l'API soit plutôt bien faîte, elle dispose de certaines limites dés lors que l'on pousse un peu le besoin.

pdf.js est un module node basé essentiellement sur jsPDF. Ce post et les exemples de codes sont basé sur pdf.js (l'api des deux librairies diffèrent un peu)

L'API est essentiellement composée de:

* `addImage: function (imageData, format, x, y, w, h) {}`

* `addPage: function () {}`

* `drawLine: function (x1, y1, x2, y2, weight, style) {}`

* `drawRect: function (x, y, w, h, style) {}`

* `output: function (type, options) {}`

* `setFontSize: function (size) {}`

* `setProperties: function (properties) {}`

* `text: function (x, y, text) {}`

Vous pouvez jouer avec sur la [démo](http://www.maraksquires.com/pdf.js/) fournie par pdf.js.

Assez sympa, n'est ce pas? La possibilité de le faire en utilisant que du JavaScript est une perspective super intéressante, permettant une solution de génération de rapport (si l'idée est poussée) entièrement coté client. Bien sûr, le même code et la même librairie pourraient être utilisé coté serveur avec node.

Mais, car il y a un petit mais, la génération d'un rapport demande un peu de programmation et manipulation de l'api. La principale méthode utilisée étant `text(x, y, test)`. Cela ne pose aucun soucis dans des cas simples, ou effet de démo, mais j'aurais aimé quelque chose me permettant d'automatiquement prendre un texte, idéalement markdown formaté, et d'en générer un fichier pdf. La conversion vers html est déjà très bien faîte par [Showdown](http://www.showdown.im/), il resterait alors à trouver une solution, même basique, pour générer un document pdf en utilsiant jsPDF à partir d'un arbre dom ou string html.

Et, c'est là que ce post revêt un peu plus d'intérêt (parce que bon, suffit de googler `pdf js` pour trouver ces formidables librairies).

## Markdown!

Deux problèmes majeurs lors de l'utilisation de jsPDF (après tout une API relativement bas niveau) avec des documents plus évolués:

* Une ligne trop longue (typique d'un paragraphe markdown) pour le format de la page apparaîtra sur une seule ligne, sortant du document. Aucune notion de retour à la ligne automatique.

* Même problème lors des fins de page. jsPDF ne détecte pas automatiquement le dépassement, et un appel à addPage doit être fait explicitement.

Marak a d'ailleur ouvert un ticket résumant bien ce point: [https://github.com/marak/pdf.js/issues#issue/1](https://github.com/marak/pdf.js/issues#issue/1)

> Forcing the user to create a PDF using only Post Script notation is cruel.

Je confirme, c'est cruel :) Bien que la solution de disposer d'un espèce de [moteur de rendu DOM](https://github.com/marak/pdf.js/issues#issue/2) (et qui idéalement utiliserait les css pour la mise en page) semble idéale, ce n'est vraiment pas quelque chose de facile à implémenter.

Mon besoin de départ était de pouvoir générer une sortie PDF en n'utilisant que du texte (markdown formaté) ou un arbre dom, en n'ayant pas à manipuler l'API. Je suis donc venu à adopter une autre approche, basé sur le une variation du [domWalker de Douglas Crockford](http://www.javascriptworkshop.com/wp-content/uploads/pdf/AnInconvenientAPI.pdf).

L'idée fut donc de:

* Générer du markup html à partir d'un texte markdown (showdown utilisé)

* à partir d'un noeud dom, parser son contenu en utilisant firstChild et nextSibling, et pour chaque tag supporté, appeler les bonnes méthodes de l'api de pdf.js en fonction du tag.

La variété des tags supportés est vraiment limitée: h1, h2, h3, h4, h5, h6, a, p, blockquote, ul, li, code. Il s'agit pour l'instant plus d'un POC (proof of concept) que d'une réelle librairie. Mais je suis plutôt content du résultat et trouvait que cela méritait un petit post. On peut penser à des choses intéressante, comme concevoir des extensions de navigateurs, l'utiliser coté serveur via node.js, ou encore penser à une génération automatique de quelque chose se rapprochant d'un ebook à partir d'une liste de fichiers markdown (qu'on peut d'ailleurs utilisé avec les services github). Bref, vous me voyez venir... En tout cas, ça va me rendre de sacrés services. Pour l'instant, la fonctionnalité est basique mais, avec un peu plus de boulot, on peut penser à un poil plus de configuration sur le rendu et la mise en page utilisé, tout comme arriver à un meilleur support de l'ensemble des tags générés par Markdown. J'aimerais également supprimé la dépendance à jQuery ($.fn.text principalement.)

<h2 id="demo">Démo</h2>

Une démo est accessible [ici](http://mklabs.github.com/pdf.js/markdown/). Il suffit de taper votre texte markdown formaté (ou markup html, showdown le laissera en l'état) et clicker sur le lien permettant la génération pdf. Un nouveau fichier pdf sera généré(dataURIs) que vous pourrez ensuite `Right click and save as`. Marche encore mieux sous navigateur Webkit où vous pourrez directement ouvrir le fichier.

Pour les curieux, voici un lien vers le [fork de pdf.js](https://github.com/mklabs/pdf.js/tree/markdown-pdf) où vous pourrez retrouver les sources. J'ai également ajouté la possibilité de spécifier différentes fonts en modifiant un poil les sources de pdf.js. [Pull request](https://github.com/marak/pdf.js/issues#issue/3) envisageable si je trouve le temps de nettoyer un peu le tout (et implémenter la méthode setFont. Pour l'instant, j'ai ajouté la possibilité de spécifier la font à utilisée via `doc.text(x, y, text, font)` et leur initialisation au niveau de `doc.setProperties()`).
