Title: Javascript: Orienté objet et manipulation du prototype (via call / apply)
Author: Mickael Daniel
Date: Thu Dec 16 2010 13:01:00 GMT-0500 (CDT)
Note: This post is an import from an older wordpress post, as a results not markdown formated
Categories: javascript

<p>
Lors d'un précédent article sur <a href="/article/express-framework-web-node/">express</a>, j'ai eu l'occasion d'utiliser <a href="https://github.com/ajaxorg/node-github">node-github</a>, un module Node permettant de dialoguer avec l'API Rest de Github. Il dispose d'une API orienté objet et asynchrone. J'ai pu y découvrir un pattern, une manière de manipuler le prototype qui m'a particulièrement plu.
</p>

    var Citizen = function Citizen(name){
      this.name = name;		
    };

    (function(){
        this.getName = function getName(){
            return this.name;
        };
    }).call(Citizen.prototype);

<p>
Utilisation d'une fonction anonyme auto-exécutée (self-executed function). Mais l'invocation qui est habituellement faîtes par l'utilisation de () juste aprés la définition de la fonction fait place ici à l'utilisation de la méthode call, permettant de placer le contexte de la fonction anonyme et de forcer la valeur de <em>this</em> au prototype que l'on veut manipuler.
</p>

<p>
Voilà! L'article pourrait se terminer ici, mais il sera surtout l'occasion de présenter succinctement quelques particularités du langage Javascript:
</p>

<ul>

<li>
Notion d'orienté objet et utilisation du prototype.
</li>

<li>
Les fonctions et les différents moyens à notre disposition pour les invoquer (et les implications pour le sens de <em>this</em> et la valeur du return).
</li>

<li>
Utilisation des méthodes call/apply pour manipuler le prototype. 
</li>

</ul>

## Orienté objet

<p>
J'essaie de faire attention quand je parle de Javascript orienté objet. Fondamentalement, le Javascript est un langage orienté objet, mais ne dispose pas de Classe, ce qui peut nous surprendre nous les devs éduqué à coup de `Class Animal`. Tout en Javascript est objet ou en est dérivé. Seulement cinq primitives ne sont pas des objets:
</p>

<ul>

<li>
number 
</li>

<li>
string
</li>

<li>
boolean
</li>

<li>
null
</li>

<li>
undefined
</li>

</ul>

<p>
Et les trois premières disposent de représentation objet sous la forme d'enveloppeur de primitives (Primitive wrappers. Vraiment, je déteste parfois la traduction fr de ces notions de prog., apprenons les termes anglais et utilisons les, quitte à faire des anglicismes. Pas besoin de traduire absolument tout les termes anglais, surtout dans le domaine du développement logiciel. Fin de la paranthèse ;) ).
</p>

<p>
Les fonctions sont des objets également. Elles peuvent avoir des propriétés et méthodes.
</p>

<p>
On peut se demander rapidement ce qu'est un objet. En fait, un objet est relativement simple. Un objet est juste une collection de propriétés nommées, une liste de paires clé/valeurs (qu'on peut assimiler aux tableaux associatifs d'autres langages). Certaines de ces propriétés peuvent être des fonctions, auquel cas elle sont nommées méthodes.
</p>

<p>
Un point important à noter également à propos des objets que l'on crée: nous pouvons les modifier à n'importe quel moment. Ces objets sont dits mutables (bien que ECMA 5 introduit une API empêchant les mutations.) Nous pouvons prendre un objet et ajouter, enlever ou mettre à jour ses membres.
</p>

<p>
Une dernière chose concernant les objets, ils en existent deux types principaux:
</p>

<ul>

<li>
Native: Décrit par la spécification ECMAScript. Intégré au langage (Array, Date) ou défini par l'utilisateur (var o = {};).
</li>

<li>
Host: Définit par l'environnement (par exemple, le navigateur ou Node). Par exemple, l'objet window ou les objets relatifs au DOM. global, process ou __dirname pour Node.
</li>

</ul>

<h3>
Pas de Classes
</h3>

<p>
Un aspect important du langage à assimiler et à ne pas oublier: Il n'y a pas de classes en Javascript. Nous ne manipulons que des objets. Ce qui est souvent assimilé comme classe est simplement une fonction qui agit comme un constructeur. Leur nom commence communément par une majuscule.
</p>

<js-oo-et-manipulation-prototype-via-call-apply/basic-oo.js>

<p>
Le javascript est langage basé sur des prototypes, au lieu d'être basé sur des classes. A cause de cette différence fondamentale, cela peut être plus difficile de voir comment Javascript permet de créer une hiérarchie d'objet avec la possibilité d'hériter de leur propriétés et valeurs.
</p>

<p>
Les langages orientés objet basés sur les classes, comme Java et C++ sont fondés sur le concept de deux entités distinctes : les classes et les instances. Le Javascript, langage basé sur les prototypes, lui ne manipule que des objets. Voyez le prototype comme un modèle depuis lequel on obtient les propriétés et méthodes pour un nouvel objet. 
</p>

<p>
Ainsi, au lieu de créer des classes, vous créez des objets prototypes, et ensuite utilisez une fonction agissant comme constructeur pour fabriquer de nouvelles instances. Les objets sont mutables en Javascript, ainsi nous pouvons augmenter ces nouvelles instances, leur donnant de nouvelles propriétés et méthodes. Ces objets alors crées et éventuellement mis à jour peuvent servir de prototype pour de nouveaux objets. Nous n'avons pas vraiment besoin de classe pour fabriquer des objets similaires. 
</p>

<p>
Tous les objets sont descendant d'<em>Object</em>. Ainsi, tous les objets héritent des propriétés et méthodes de Object.prototype, bien qu'elles puissent être surchargées. 
</p>

<p>
Toute modification de l'objet prototype est propagé vers tous les objets dérivés de ce prototype à moins que leur propriétés ou méthodes ne soient surchargées plus loin dans la chaîne de prototypes.
</p>

<p>
Des objets héritant d'objets. Qu'est ce qui peut être plus orienté objet que cela?
</p>

<h3>
Le prototype
</h3>

<p>
Javascript peut bien sûr mettre en l'oeuvre la notion d'héritage, bien qu'il ne s'agisse que d'une manière de permettre la réutilisation du code. L'héritage peut être mis en oeuvre de différentes manières, impliquant généralement l'utilisation de prototypes. Un prototype est un objet. Toute fonction créée récupère automatiquement un prototype qui pointe vers un nouvel objet vide. Cet objet est quasiment identique à un objet obtenu de manière littérale (var o = {}), à l'exception près de son constructeur (la propriété du prototype nommé constructor) pointant vers la fonction créée et plus vers le natif Object().
</p>

<p>
  
<img src="/js-oo-et-manipulation-prototype-via-call-apply/prototype-and-constructor.png" style="float: none"></img>

</p>

<p>
L'utilisation de la console de votre navigateur permet de bien mettre en évidence ces concepts. L'instance george (l'instance la plus classe du monde) définie plus tôt dispose ainsi de toutes les méthodes et propriétés héritées de Object.prototype et sa propriété constructor pointe maintenant vers notre fonction Citizen. L'utilisation du mot instance est maladroite, puisque nous avons vu que le Javascript ne dispose pas de ces notions d'instances et de classes, l'instance george est en fait un objet qui suit le modèle du comportement de la fonction constructeur Citizen et du prototype qui lui est rattaché.
</p>

<p>
Vous pouvez ajouter de nouveaux membres à ce prototype et avoir d'autres objets qui en héritent, utilisant ainsi les propriétés du prototype comme les leurs. 
</p>

<p>
Les prototypes sont des objets et toute fonction dispose d'une propriété nommée prototype. Tout prototype dispose d'une propriété constructor pointant vers la fonction auquel est rattaché ce prototype.
</p>

<h2>
Fonctions
</h2>

<hr />

<p>
Une des parties les plus puissantes du langage Javascript sont les fonctions. Les fonctions renferme un ensemble d'instruction. Elles sont l'unité modulaire fondamentale du langage. Elles sont utilisés pour permettre réutilisation du code, dissimulation d'information et composition. Elles sont utilisées pour spécifier le comportement d'un objet.
</p>

<p>
Les fonctions en Javascript sont des objets. Les objets sont des collections de paires clé/valeurs qui ont un lien implicite vers un objet prototype. Les fonctions sont liées au prototype Function.prototype (qui est lui même lié à Object.prototype).
</p>

<p>
Etant donné que les fonctions sont des objets, elles peuvent être utilisées comme n'importe quelles autres valeurs. Les fonctions peuvent être stockées dans des variables, objets ou tableaux et peuvent être utilisées comme argument de fonctions. Elles peuvent également retourner des fonctions. Et vu que les fonctions sont des objets, elles peuvent avoir des méthodes. 
</p>

<p>
La particularité des fonctions se situe dans leur capacité à être invoquée.
</p>

<h3>
Invocation
</h3>

<p>
En plus des paramètres déclarés dans la signature de la fonction, elles reçoivent deux paramètres additionnels: <em>this</em> et <em>arguments</em>. Le mot-clé <em>this</em> est très important en POO, et sa valeur est déterminé par la manière dont a été invoqué la fonction.
</p>

<p>
Il existe fondamentalement quatre manière d'invoquer une fonction, quatre patterns: 
</p>

<ul>

<li>
L'invocation de méthode
</li>

<li>
L'invocation de fonction
</li>

<li>
L'invocation par constructeur
</li>

<li>
Et l'invocation par apply/call
</li>

</ul>

<p>
Tous ces patterns diffèrent dans le sens octroyé au mot clé <em>this</em> dans la fonction invoquée.
</p>

<h4>
Invocation de méthode
</h4>

<p>
Quand une fonction est assigné à une propriété d'un objet, elle est généralement appelée méthode. Quand une méthode est invoquée, <em>this</em> référence l'objet auquel est rattachée cette méthode (o.method() ou o['method']())
</p>

<h4>
Invocation de fonction
</h4>

<p>
Quand une fonction n'est pas propriété d'un objet, alors elle est invoqué comme une fonction:
</p>

<js-oo-et-manipulation-prototype-via-call-apply/function-invoc.js>

<p>
Quand une fonction est invoqué de cette manière, le mot-clé <em>this</em> est lié à l'objet global. C'est un comportement dangereux et enclin à nous faire faire quelques erreurs, c'est donc pourquoi l'utilisation du <em>this</em> doit se faire avec précaution, lorsque l'on connaît ou force le moyen d'exécution de la fonction.
</p>

<h4>
Invocation par constructeur
</h4>

<p>
Le javascript est basé sur l'héritage de prototype. Ceci signifie que les objets peuvent hérités des propriétés d'autres objets. Le langage ne dispose pas de notions de classes.
</p>

<p>
Si une fonction est invoquée avec le préfixe <em>new</em>, alors un nouvel objet sera crée avec un lien implicité vers la valeur du prototype de la fonction, et le mot-clé <em>this</em> sera lié à ce nouvel objet.
</p>

<p>
L'utilisation de <em>new</em> entraîne également quelques changements dans le comportement de l'instruction return.
</p>

<p>
Les fonctions étant destinées à être utilisé comme constructeur sont habituellement définies avec un nom en majuscule. Les conventions de codage forcent habituellement cette pratique pour éviter l'utilisation d'un constructeur (qui utilise vraisemblablement this comme référençant un nouvel objet) sans le préfixe <em>new</em>
</p>

<p>
Si la fonction pensée comme constructeur est utilisée comme une fonction classique, le sens de <em>this</em> sera alors placé sur l'objet global de l'environnement. Toute utilisation de this pour rattacher une propriété à un nouvel objet impliquera alors la création d'une variable globale.
</p>

<p>

<img src="/js-oo-et-manipulation-prototype-via-call-apply/wo-new.png" alt="wo-new" title="" />

</p>

<p>
De plus, la variable george qui au départ permettait de récupérer l'objet nouvellement créée est indéfini. L'oubli de new a également des impacts au niveau du retour implicite de la fonction.
</p>

<p>
Ceci dit, on peut aisément contourner ce problème et se passer de l'utilisation de <em>new</em>:
</p>

<js-oo-et-manipulation-prototype-via-call-apply/get-rid-of-new.js>

<p>
Au début de la fonction citizen, nous testons si this référence la portée globale de l'environnement, nous retournons immédiatement l'invocation du même constructeur par l'utilisation du préfixe this. Le contexte (ou binding) du constructeur est ainsi assuré d'être placé comme il faut, et la valeur de retour est explicitement spécifiée dans le cas ou la fonction est invoqué "globalement". La valeur global est obtenue grâce à la fonction self executé plus haut, moyen élégant de ne pas faire référence à l'objet window propre à l'environnement navigateur. En effet, la fonction anonyme qui est automatiquement exécutée aprés sa définition suit le pattern d'invocation de fonction, le mot-clé <em>this</em> référence alors la portée globale.
</p>

<h4>
Invocation par apply/call
</h4>

<p>
Nous avons pu l'évoquer plus haut, les fonctions dispose d'un lien implicite vers le prototype Function.prototype. Ce dernier dispose de deux méthodes particulièrement intéressante: call et apply.
</p>

<p>
La méthode apply nous permet d'utiliser un tableau d'argument, elle nous permet également de choisir la valeur de <em>this</em>. La méthode apply accepte donc deux paramètres. Le premier étant la valeur qui doit être référencé par <em>this</em>, le second étant un tableau de paramètres.
</p>

<p>
La méthode call est très semblable à apply, à la différence près que les arguments de la fonction invoqué sont directement passé. call prend donc un nombre de paramètres allant de 1 à n, le premier permettant de choisir le sens de <em>this</em>, les suivants représentants les paramètres de la fonction.
</p>

<p>
Généralement, l'utilisation de call peut-être utilisé lorsque l'on connaît précisément la liste des paramètres à utiliser, apply est plus adapté quand nous ne connaissons pas les paramètres, où l'utilisation d'un tableau est plus approprié (et se marie particulièrement bien avec <em>arguments</em>)
</p>

<h4>
Arguments
</h4>

<p>
Un paramètre additionnel est rendue disponible aux fonctions quand elles sont invoqués. Il s'agit du tableau (ou pseudo tableau) <em>arguments</em>. Il permet d'accéder à l'ensemble des arguments qui ont été fournis au moment de l'invocation d'une fonction. Ceci inclut les arguments additionnels qui n'ont pas été assigné à des paramètres. <em>arguments</em> rends alors possible la conception de fonctions qui prennent un nombre indéfini de paramètres.
</p>

<p>

<em>arguments</em> est souvent considéré comme un pseudo tableau (pseudo array). Il dispose d'une propriété length et se comporte comme un tableau, mais il ne dispose d'aucune méthode des tableaux (pop, push, concat, etc.).
</p>

<p>
Une excellente présentation de Douglas Crockford fais le tour complet de cette fantastique particularité du langage: 
<a href="http://developer.yahoo.com/yui/theater/video.php?v=crockonjs-3">Act III: Function the Ultimate</a>

<div style="width: 576px; margin: auto;"><object width="576" height="324"><param name="movie" value="http://d.yimg.com/nl/ydn/default/player.swf"></param><param name="flashVars" value="vid=18292373&"></param><param name="allowfullscreen" value="true"></param><param name="wmode" value="transparent"></param><embed width="576" height="324" allowFullScreen="true" src="http://d.yimg.com/nl/ydn/default/player.swf" type="application/x-shockwave-flash" flashvars="vid=18292373&"></embed></object></div>

</p>

<h2>
Utiliser this pour manipuler le prototype
</h2>

<hr />

<p>
Nous y voici. L'utilisation conjointe de la méthode call/apply à une fonction anonyme nous permet de placer le contexte de cette fonction sur à peu près ce que nous voulons. Ici, nous pouvons utiliser le prototype d'une fonction pour le manipuler.
</p>

<js-oo-et-manipulation-prototype-via-call-apply/prototype-call.js>

<p>
J'aime beaucoup ce pattern que je trouve très élégant. Vous pouvez naviguer à travers les sources node-github qui représente une très belle mise en oeuvre de ce pattern et implémentation d'une API orienté objet dans un environnement Node.
</p>

<p>
J'ai pu retrouver récemment l'utilisation de cette méthode, via l'excellent 
<a href="http://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/">
article sur le namespacing d'Angus Croll</a> et le <a href="http://blogs.sitepoint.com/2010/11/30/my-favorite-javascript-design-pattern/">favorite-javascript-design-pattern de James Edwards</a>.
</p>

<p>

<em><strong>Référence:</strong></em>

</p>

<ul>

<li><a href="http://www.amazon.com/gp/product/0596806752?ie=UTF8&amp;tag=rebasbl-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=0596806752">JavaScript Patterns</a> de Stoyan Stefanov
</li>

<li>

<a href="http://www.amazon.com/gp/product/0596517742?ie=UTF8&amp;tag=rebasbl-20&amp;linkCode=as2&amp;camp=1789&amp;creative=390957&amp;creativeASIN=0596517742">JavaScript: The Good Parts</a> de Douglas Crockford
</li>

<li>

<a href="http://javascript.crockford.com/prototypal.html">Prototypal Inheritance in JavaScript</a> de Douglas Crockford</li>

<li>
<a href="https://developer.mozilla.org/en/JavaScript/Guide/Details_of_the_Object_Model">Details of the Object Model</a></li>

</ul>
