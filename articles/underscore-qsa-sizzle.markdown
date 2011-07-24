Title: underscore + qsa + sizzle
Author: Mickael Daniel
Date: Sun Jul 24 2011 15:47:02 GMT+0200 (CEST)
Categories: javascript
Tags: underscore, javascript

**Juste une expérience.**

> Underscore is a utility-belt library for JavaScript that provides a lot of the functional programming support that you would expect in Prototype.js (or Ruby), but without extending any of the built-in JavaScript objects. It's the tie to go along with jQuery's tux.

Et si nous pouvions utiliser cette fantastique librairie qu'est [underscore](http://documentcloud.github.com/underscore/) avec des éléments DOM? 

L'idée de base est de `_.mixin` un petit helper [querySelectorAll](https://developer.mozilla.org/En/DOM/Document.querySelectorAll) pour retourner un tableau de nœuds dom correspondant.

Quelques trucs bien fun deviennent possible comme...


##### tri en fonction du nb d'enfant


    _('div').qsa().sortBy(function(el) {
      return this.children.length;
    });

##### tri en fonction de la longueur de l'innerHTML


    _('*').qsa().sortBy(function(el) {
      return -el.innerHTML.length;
    });
    
    _('*').qsa().sortBy(function(el) {
      return el.innerHTML.length;
    });

 

##### max/min en fonction de l'innerHTML


    _('*').qsa().max(function(el) {
      return el.innerHTML.length;
    });
    // > <html lang=​"en-us" dir=​"ltr" class=​"js">​…​</html>​

    _('*').qsa().min(function(el) {
      return el.innerHTML.length;
    });
    // > <meta charset=​"utf-8">


##### pluck


    _('*').qsa().pluck('nodeName');
    // > ["HTML", "HEAD", "META", "META", "TITLE", "META", "STYLE", "BODY", "SCRIPT", "SCRIPT", "SCRIPT"]


##### each, map, reduce, first, last, etc.

En fait, à peu près chacune des méthodes [array et collection d'underscore] (http://documentcloud.github.com/underscore/) seraient possible (besoins de tests). 

> Collection: each, map, reduce, reduceRight, detect, select, reject, all, any, include, invoke, pluck, max, min, sortBy, groupBy, sortedIndex, toArray, size

> Array: first, rest, last, compact, flatten, without, union, intersection, difference, uniq, zip, indexOf, lastIndexOf, range

### _.mixin({qsa: function(){}}) 

a peu près 23 lignes, rien de sensationnel. utilisation de `_.mixin` pour créer la méthode `_.qsa`, `délégation à querySelectorAll` si disponible, sinon utilisation de [Sizzle](http://sizzlejs.com/). renvoie un tableau de noeud correspondant au sélecteur.

On peut également utiliser un autre moteur, et déléguer a jQuery par exemple (ou prototype, ou mootools, etc. todo: serait intéressant à tester.) en passant la lib correctement en 3e paramètre. querySelectorAll, Sizzle (qui est le moteur interne de jQuery) et jQuery partage la même signature.

    (function(_, document, $, exports) {

      var qsable = !!document.querySelectorAll,
      qsa = function $(sel, context) {
        // depending on qsapibility, delegates to Sizzle if we need to, otherwise use qsa
        // we may also hook up with a $ lib like jQuery
        return qsable ? context.querySelectorAll(sel) : (Sizzle(sel, context) || $);
      };


      _.mixin({
        qsa: function(sel, context) {     
          // query from given context, document if none specified
          context = context || document;

          // if sel is #sel, delegates to getElementById, querySelectorAll otherwise
          return _(Array.prototype.slice.call(sel.charAt(0) === '#' ? 
            [document.getElementById(sel.replace('#', ''))] : 
            qsa(sel, context)
          ));
        }
      });

    })(this._, this.document, this.jQuery, this);
    


##### Wait! 

ça me rappelle une super lib, appelé [qsa](http://benalman.com/projects/javascript-library-boilerplate/#qsa).

> QSA is a 0.3k blazing fast query selector engine allowing you to select elements with CSS1, CSS2 & CSS3 selectors (including attribute selectors), in EVERY browser that supports the querySelectorAll API. And according to our “benchmarks,” QSA outperforms EVERY other JavaScript selector engine in terms of both speed and size.

;) à [javascript-library-boilerplate](https://github.com/cowboy/javascript-library-boilerplate)

> Fork the repo. Change the name and $ function. And rename the .js files. And change all references to QSA or qsa to your new name. And edit the unit tests. And document everything. Or just use jQuery.

*Quoi qu'il en soit, c'était plutôt intéressant d'associer underscore + sizzle. assez marrant pour essayer quelques trucs avec cette underquewery expérience et justifier un post.*