Title: pdf.js et génération markdown vers pdf
Author: Mickael Daniel
Date: Apr 09 2011 18:00:00 GMT+0100 (CDT)
Categories: JavaScript, node
Tags: JavaScript, Markdown, node, pdf

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

Voici exactement la même [démo](#demo). Have fun :)

<style>
textarea{font-family:monospace;width:100%;-moz-box-shadow:0px 0px 10px rgb(218,218,218);-webkit-box-shadow:0px 0px 2px rgb(218,218,218);box-shadow:0px 0px 10px rgb(218,218,218);-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px;border:1px solid rgb(170,170,170);color:rgb(68,68,68);padding:0.5em;margin:1em 0;}
.download{display:none;}
</style>
<div id="main" role="main">
      
  <a class="generate" href="#demo">Click here to create example pdf</a>
  <p class="download">
    <a>filename</a> Right click and save as pdf
  </p>

<textarea rows="20" class="pane" style="height: 542px;">

Using this tool
---------------

This page lets you create HTML by entering text in a simple format that's easy to read and write.

  - Type Markdown text in the left window
  - See the HTML in the right

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site] [1]:

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable 
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This document is written in Markdown; you can see the plain-text version on the left.  To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.  You can see a Markdown syntax guide by switching the right-hand window from *Preview* to *Syntax Guide*.

Showdown is a Javascript port of Markdown.  You can get the full [source code] by clicking on the version number at the bottom of the page.

**Start with a [blank page] or edit this document in the left window.**

  [john gruber]: http://daringfireball.net/
  [1]: http://daringfireball.net/projects/markdown/
  [source code]: http://www.attacklab.net/showdown-v0.9.zip
  [blank page]: ?blank=1 "Clear all text"

        

Markdown Syntax Guide
=====================

This is an overview of Markdown's syntax.  For more information, visit the [Markdown web site].

 [Markdown web site]:
   http://daringfireball.net/projects/markdown/






Italics and Bold
================


*This is italicized*, and so is _this_.

**This is bold**, and so is __this__.

You can use ***italics and bold together*** if you ___have to___.






Links
=====


Simple links
------------

There are three ways to write links.  Each is easier to read than the last:

Here's an inline link to [Google](http://www.google.com/).
Here's a reference-style link to [Google] [1].
Here's a very readable link to [Yahoo!].

  [1]: http://www.google.com/
  [yahoo!]: http://www.yahoo.com/

The link definitions can appear anywhere in the document -- before or after the place where you use them.  The link definition names (`1` and `Yahoo!`) can be any unique string, and are case-insensitive; `[Yahoo!]` is the same as `[YAHOO!]`.


Advanced links: Title attributes
--------------------------------

You can also add a `title` attribute to a link, which will show up when the user holds the mouse pointer it.  Title attributes are helpful if your link text is not descriptive enough to tell users where they're going.  (In reference links, you can use optionally parentheses for the link title instead of quotation marks.)

Here's a [poorly-named link](http://www.google.com/ "Google").
Never write "[click here][^2]".
Trust [me].

  [^2]: http://www.w3.org/QA/Tips/noClickHere
        (Advice against the phrase "click here")
  [me]: http://www.attacklab.net/ "Attacklab"


Advanced links: Bare URLs
-------------------------

You can write bare URLs by enclosing them in angle brackets:

My web site is at <http://www.attacklab.net>.

If you use this format for email addresses, Showdown will encode the address to make it harder for spammers to harvest.  Try it and look in the *HTML Output* pane to see the results:

Humans can read this, but most spam harvesting robots can't: <me@privacy.net>






Headers
=======


There are two ways to do headers in Markdown.  (In these examples, Header 1 is the biggest, and Header 6 is the smallest.)

You can underline text to make the two top-level headers:

Header 1
========

Header 2
--------

The number of `=` or `-` signs doesn't matter; you can get away with just one.  But using enough to underline the text makes your titles look better in plain text.

You can also use hash marks for all six levels of HTML headers:

# Header 1 #
## Header 2 ##
### Header 3 ###
#### Header 4 ####
##### Header 5 #####
###### Header 6 ######

The closing `#` characters are optional.






Horizontal Rules
================


You can insert a horizontal rule by putting three or more hyphens, asterisks, or underscores on a line by themselves:

---

*******
___

You can also use spaces between the characters:

-  -  -  -

All of these examples produce the same output.






Lists
=====


Simple lists
------------

A bulleted list:

- You can use a minus sign for a bullet
+ Or plus sign
* Or an asterisk

A numbered list:

1. Numbered lists are easy
2. Markdown keeps track of the numbers for you
7. So this will be item 3.

A double-spaced list:

- This list gets wrapped in `<p>` tags

- So there will be extra space between items


Advanced lists: Nesting
-----------------------

You can put other Markdown blocks in a list; just indent four spaces for each nesting level.  So:

1. Lists in a list item:
    - Indented four spaces.
        * indented eight spaces.
    - Four spaces again.

2.  Multiple paragraphs in a list items:

    It's best to indent the paragraphs four spaces
    You can get away with three, but it can get
    confusing when you nest other things.
    Stick to four.

    We indented the first line an extra space to align
    it with these paragraphs.  In real use, we might do
    that to the entire list so that all items line up.

    This paragraph is still part of the list item, but it looks messy to humans.  So it's a good idea to wrap your nested paragraphs manually, as we did with the first two.

3. Blockquotes in a list item:

    > Skip a line and
    > indent the >'s four spaces.

4. Preformatted text in a list item:

        Skip a line and indent eight spaces.
        That's four spaces for the list
        and four to trigger the code block.






Blockquotes
===========


Simple blockquotes
------------------

Blockquotes are indented:

> The syntax is based on the way email programs
> usually do quotations. You don't need to hard-wrap
> the paragraphs in your blockquotes, but it looks much nicer if you do.  Depends how lazy you feel.


Advanced blockquotes: Nesting
-----------------------------

You can put other Markdown blocks in a blockquote; just add a `>` followed by a space:

Parragraph breaks in a blockquote:

> The > on the blank lines is optional.
> Include it or don't; Markdown doesn't care.
>
> But your plain text looks better to
> humans if you include the extra `>`
> between paragraphs.


Blockquotes within a blockquote:

> A standard blockquote is indented
> > A nested blockquote is indented more
> > > > You can nest to any depth.


Lists in a blockquote:

> - A list in a blockquote
> - With a > and space in front of it
>     * A sublist

Preformatted text in a blockquote:

>     Indent five spaces total.  The first
>     one is part of the blockquote designator.






Images
======


Images are exactly like links, but they have an exclamation point in front of them:

 ![Valid XHTML] (http://w3.org/Icons/valid-xhtml10).

The word in square brackets is the alt text, which gets displayed if the browser can't show the image.  Be sure to include meaningful alt text for blind users' screen-reader software.

Just like links, images work with reference syntax and titles:

 This page is ![valid XHTML][checkmark].

 [checkmark]: http://w3.org/Icons/valid-xhtml10
           "What are you smiling at?"


**Note:**

Markdown does not currently support the shortest reference syntax for images:

  Here's a broken ![checkmark].

But you can use a slightly more verbose version of implicit reference names:

  This ![checkmark][] works.

The reference name (`valid icon`) is also used as the alt text.






Inline HTML
===========


If you need to do something that Markdown can't handle, you can always just use HTML:

 Strikethrough humor is <strike>funny</strike>.

Markdown is smart enough not to mangle your span-level HTML:

<u>Markdown works *fine* in here.</u>

Block-level HTML elments have a few restrictions:

1. They must be separated from surrounding text by blank
   lines.
2. The begin and end tags of the outermost block element
   must not be indented.
3. You can't use Markdown within HTML blocks.

So:

<div style="background-color: lightgray">
    You can <em>not</em> use Markdown in here.
</div>






Preformatted Text
=================


You can include preformatted text in a Markdown document.

To make a code block, indent four spaces:

    printf("goodbye world!");  /* his suicide note
                                  was in C */

The text will be wrapped in `<pre>` and `<code>` tags, and the browser will display it in a monospaced typeface.  The first four spaces will be stripped off, but all other whitespace will be preserved.

You cannot use Markdown or HTML within a code block, which makes them a convenient way to show samples of Markdown or HTML syntax:

    <blink>
       You would hate this if it weren't
       wrapped in a code block.
    </blink>






Code Spans
==========


You can make inline `<code>` tags by using code spans.  Use backticks to make a code span:

 Press the `<Tab>` key, then type a `$`.

(The backtick key is in the upper left corner of most keyboards.)

Like code blocks, code spans will be displayed in a monospaced typeface.  Markdown and HTML will not work within them:

 Markdown italicizes things like this: `I *love* it.`

 Don't use the `<font>` tag; use CSS instead.


</textarea>

<script>
(function(){
  Modernizr.load({
    load: ['/markdown-pdf/showdown.js', '/markdown-pdf/pdf.js', '/markdown-pdf/pdf-ui.js']
  });
})();
</script>
</div>


Pour les curieux, voici un lien vers le [fork de pdf.js](https://github.com/mklabs/pdf.js/tree/markdown-pdf) où vous pourrez retrouver les sources. J'ai également ajouté la possibilité de spécifier différentes fonts en modifiant un poil les sources de pdf.js. [Pull request](https://github.com/marak/pdf.js/issues#issue/3) envisageable si je trouve le temps de nettoyer un peu le tout (et implémenter la méthode setFont. Pour l'instant, j'ai ajouté la possibilité de spécifier la font à utilisée via `doc.text(x, y, text, font)` et leur initialisation au niveau de `doc.setProperties()`).