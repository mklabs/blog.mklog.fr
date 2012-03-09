<!--config
{
  "Title": "Just gimme web assets please",
  "Author": "Mickael Daniel",
  "Date": "Fri Mar 09 2012 11:05:09 GMT+0100 (CET)",
  "Categories": "javascript",
  "Tags": "node, javascript, tools"
}
config-->


<p class="txt-center">
  <img src="/assets/img/gimme/preview.2.png" title="Gimme preview plz"
/>
</p>

[gimme-assets](github.com/mklabs/gimme-assets) est un petit outil que
j'ai développé pour répondre à un rapide besoin.

Complètement inspiré de [asset](https://github.com/visionmedia/asset) par @visionmedia,
gimme-assets est un outil en ligne de commande écrit en node pour gérer et télécharger
facilement n'importe quelle librairie sur [cdnjs.com](http://www.cdnjs.com/) ou
[microjs.com](http://microjs.com/)

Bien sûr d'autres projets similaires existent, que je recommende fortement:

* [ender](http://ender.no.de/)
* [bpm](http://getbpm.org/)
* [volojs](https://github.com/volojs/volo)

Ender comme bpm reposent sur l'idée d'un registry. Bpm est grosso-modo
une tentative de npm coté-client avec la maintenance d'un registry
propre à bpm, ender quant à lui repose sur le registry de npm et propose
tout un outillage pour se composer son propre "micro" framework basé sur
des packages npm taggués `ender` et obéissant à une certaine interface
pour exposer ce qui doit l'être et augmenter la variable `$` qui est
alors une composition d'un tas de lib différentes (backbone, underscore,
bonzo, qwery, jquery etc.)

J'adôre l'approche d'ender, et ces deux projets proposent également une gestion de dépendances entre les packages.

Volo est une autre belle alternative par @jrburke, contrairemnt à ender ou bpm, volo ne repose pas sur un registry spécialisé mais traite github comme un registry unique. La plupart des projets open-source aujourd'hui (surtout niveau web et JS) sont hébergés sur github, traiter github comme le registry principal a donc beaucoup de sens, et est selon moi la bonne façon de traiter cette problématique. A moins d'être npm lui-même, je ne crois pas vraiment en l'idée d'un repository personnalisé qu'il faudrait maintenir.

La seule chose me gênant un peu dans volo est l'approche *full AMD*. Bien que volo stipule vouloir "[Treat AMD as first class, but don't be annoying about it](https://github.com/volojs/volo/blob/master/docs/designGoals.md)", il est quand même pensé en premier lieu pour une utilisation sur des sources AMD. Bien que rien ne nous empêche d'utiliser volo en mode non AMD, volo lui même qui est un package node est écrit en AMD.. coté serveur.. où les modules commonjs et le chargement des modules node fonctionnent tout à fait correctement et représente un réel plaisir à utiliser. Déjà que j'ai de plus en plus tendance coté client à éviter l'AMD, rentrer dans les sources d'un projet node lui même développé via syntaxe AMD m'a paru rédibitoire...

### Gimme web assets plz

gimme-assets ne fait pas tout ça. Il est beaucoup plus bête dans son approche et ne se contente que de télécharger les libs et de les placer dans un répertoire particulier (`js/libs` par défaut). Ni plus, ni moins.

Il ne dispose pas d'un système de gestion de dépendences comme le fait npm, ou ender (qui repose sur npm), ou bien bpm et ne le fera probablement jamais. C'est une problématique trop complexe, et nécessittant trop de travail pour être bien fait, que l'intégrer dans gimme me semble limité. Si la gestion des dépendences entre libs et leur téléchagement / install est un pré-requis, bpm ou ender semble beaucoup plus approprié.

Par contre, gimme devrait pouvoir être utilisé depuis windows (naturellement unix / osx également) et depuis derrière un proxy (qui est tellement commun dans nos entreprises respectives, n'est ce pas?).

gimme se repose sur un "registry" unique (github) et sur deux "dictionnaires" de données différents: [cdnjs.com](http://www.cdnjs.com/) ou
[microjs.com](http://microjs.com/). cdnjs propose près de 80 libs, microjs propose quant à lui pas loin de 180 libs, ce qui donne un potentiel honnête d'à peu près 260 librairies installable en une ligne de commande.

Bien sûr, certains doublons existent entre ces deux sources de données (ex. backbone), dans ce cas, gimme traite les libs de cdnjs comme "prioritaire" et installera les version de cdnjs plutôt que celle de microjs.

### gimme cached

Lors de la première commande, les deux sources de données sont téléchargées / parsées et fusionnées en un seul et même fichier ensuite utilisé pour chacune des commandes.

Ces deux différentes sources de données sont:

* cdnjs: https://github.com/cdnjs/website/blob/gh-pages/packages.json
* microjs: https://github.com/madrobby/microjs.com/blob/master/data.js

gimme gérera un cache au niveau du répertoire $HOME du user (ou $USERPROFILE sur windows) au sein d'un dossier spécial nommé `.gimme` (ex. `C:\Users\fancyname\.gimme` sur windows ou `/home/fancyname/.gimme` sur unix).

Ce réperoire servira notamment à stocker les librairies qui ont pu être déja téléchargées pour les récupérer en local et éviter des requêtes non nécessaires, ce qui rend l'install immédiate une fois qu'une librairie dans une version donnée à été téléchargé.

Ce dossier peut également contenir d'autres "staging" files utilisés dans des commandes particulières, je pense notamment à `gimme readme` mais j'y reviendrais un poil plus tard.

`~/.gimme/commands` est un dossier particulier qui peut-être utilisé pour créer des commands custom, mais ici aussi j'y reviendrais un peu plus tard.


### Utilisation basique

gimme est sur npm, l'install se résume donc à:

    npm install gimme-assets -g

Une fois installé, depuis n'importe où sur le système, la commande `gimme` (ou `gimme help`, ou `gimme --help`) devrait retourner:

    Usage:
      gimme [command] [options]

    Commands:
      gimme completion              Setup tab completion
      gimme list                    List available packages
      gimme docs <name>             Tries to open package's documentation using default browser
      gimme install <name ...>      Installs the lib(s) <name ...>
      gimme readme <name>           Show the appropriate documentation manpage generated from readme file

    Options:

      -o, --out <dir>          output directory defaulting to ./js/libs
      -l, --loglevel <level>   What level of logs to report
      -v, --version            output program version
      -h, --help               display help information

Ce petit output d'aide permet également de se rendre compte des commandes disponibles que je vais rapidement présenter. Certaines sont assez "fantaisiste", d'autres ne seront supportés que sous un OS décent (pas windows, `/trollface`), mais qui selon moi apportent un réel plus.

### gimme commands

#### completion

Probablement ma commande préférée ☺ Et seule commande qui n'est pas supporté sous win32 ☹

`gimme completion` est typiquement une commande qu'on exécutera une seule fois et qui vous facilitera grandement la vie. Je suis assez fan des possibilités de completion que ce soit pour les commandes systèmes classique, la completion git ou encore la completion npm, etc. etc. Les mécanismes de tab-completion n'ont l'air de rien mais aident vraiment, que ce soit dans l'utilisation d'un outil ou son apprentissage. Je ne compte plus le nombre d'option bien sympa que j'ai découvert aprés avoir mis en place la completion de npm... (--save, --gangsta, ... --etc)

Dailleurs, la completion mise en place dans gimme et le mécanisme permettant de le mettre en oeuvre depuis du code JS est complètement basé sur celle de npm.

Tout [comme npm](http://npmjs.org/doc/completion.html), la completion peut être installé avec cette simple commande:

    . <(gimme completion)

Ce qui aura pour effet de charger, dans le shell courant, le scipt sh permettant de faire le bridge entre le shell et le code de gimme (vous pouvez voir / vérifier l'output du script en lançant `gimme completion`). Optionnellement, ajouter ce script à votre `~/.bashrc` ou `~/.zshrc` rendra la completion disponible depuis n'importe où, et pas seulement le shell actuel.

    gimme completion >> ~/.bashrc  (ou ~/.zshrc)

Désintaller la completion est très simple et revient à enlever le script de completion de gimme prélablement ajouté dans votre `.bashrc` ou `.zshrc` et de recharger la config du shell (`source ~/.bashrc` ou (`.zshrc`), ou simplement relancer un nouveau shell).

Faire de la complétion de commande depuis du code node est un sujet super intéressant, que j'ai pu apprendre en naviguant dans les (fabuleuses) sources de npm, et mériterait probablement un article complet (qui peut-être viendra...)

#### list

`list` est une commande basique qui se chargera de dumper dans la console une liste de toutes les libs disponibles, avec le nom et description du package.

Depuis le support des libs de microjs, cette liste est passé de 80 packages à plus de 230, je vous épargne donc l'output de la console ici. Mais on aura compris l'idée.

Une issue est ouverte pour diminuer la verbosité de cette commande, comme une idée de pagination. Alternativement, je pense depuis un moment à ajouter le support de "term" à cette commande qui ne retournerait que les packages validant la regexp construite à partir des arguments en ligne de commande (eg. `gimme list jquery` ne retournerait que les libs avec `jquery` dans le nom du package).

#### docs

Directement inspiré de l'excellente commande qu'offre npm: `npm docs packagename`. Cette commande aura pour effet d'ouvrir dans le navigateur configuré par défaut la page de documentation du projet qui est parsé ou deviné par npm depuis les infos du package.json (bien souvent il s'agira du readme sur github). Ca a l'air de rien comme ça, mais c'est super pratique.

L'idée ici est la même, `gimme docs socket.io` aura pour effet d'ouvrir la page du projet dans votre navigateur préféré.

    $ » gimme docs socket.io
      info  - Opening HTML in default browser...
      debug - docs done in 0.973s


#### install

La commande qu'on utilisera probablement le plus souvent. Elle permet de télécharger puis d'installer dans le répertoire par défaut (`./js/libs`) les packages passés depuis la command line. On peut installer plusieurs libs en une seule commande:

    $ » gimme install zepto backbone.js underscore.js
      log   - Installing... zepto backbone.js underscore.js
      log   - all done
      debug - install done in 0.016s

`0.016s` presque immédiat car j'ai déja ces libs au niveau du cache de gimme, les premiers appels seraient un peu plus long mais dépendant de votre connection cela peut se dérouler très rapidement.

#### readme

Probablement ma seconde commande préféré après `completion` ☺ Et elle aussi directement inspirée et basée sur le code de npm pour sa commande `npm help`.

Cette commande tentera de récupérer le readme sur le repo github correspondant, générera une manpage temporaire à partir du markdown et l'affichera directement dans votre console si votre système le permet et a `man` d'installé, où générera une page html correspondante qu'il affichera dans le navigateur par défaut (windows).

Il y a quelque chose de magique dans le fait de taper `gimme readme socket.io` et de voir quelques secondes plus tard (ou immédiatement si prélablement caché) la documentation apparaissant dans le readme du projet directement dans la console :p


### custom commands

Comment gimme est développé en interne et comment les commandes sont impléméntés est un autre sujet, mais je voulais parler ici de la possibilité qu'il offre à l'utilisateur de définir et d'enregistrer auprès de gimme un ensemble de commandes custom.

Au démararge (chaque fois que l'executable `gimme` est executé), gimme "scanne" le répertoire `commands` interne (avec list, install etc.) pour connaître et charger les commandes disponibles. Il vérifie également l'existence d'un répertoire particulier `~/.gimme/commands` pour charger toute commande stockée ici (chaque fichier est un module commonjs définissant une commande) et la rendre disponible depuis la ligne de commande.

Pour connaître l'emplacement du répertoire `.gimme` sur votre système, lancez un petit REPL node et tapez `process.env.HOME` sous unix ou `process.env.USERPROFILE`:

    $ » node
    > process.env.HOME
    >
    > // ou sur win32
    > process.env.USEPROFILE

Le repl devrait vous retourner l'emplacement de votre home directory où sera créé `.gimme`.

Ainsi une commande tout bête (l'éternel helloworld) qui serait stocké dans un fichier `~/.gimme/commands/hello.js` (le nom du fichier est important, nom du fichier = nom de la commande) avec le contenu suivant:


    module.exports = helloworld;

    helloworld.usage = "gimme helloworld <pkgname>";
    helloworld.description = ['helloworld <name>', "best command ever"];

    function helloworld (opts, cb) {
      var args = opts.argv.remain.slice(1);
      console.log('Hello', args.join(' '));
      cb();
    }

permettrait de lancer la commande `gimme hello` et d'obtenir l'output correspondant

    $ » gimme hello from gimme
    Hello from gimme
      debug - hello done in 0.004s


L'api et la manière de construire ses propres commandes sera sûrement ammenée à changer un peu, mais le concept restera le même.

### Chère proxy...

Dans toutes les boites où j'ai pu travailler, j'ai toujours eu affaire à un proxy qui, la plupart du temps, m'empêche de travailler plus qu'autre chose.

Le développement de gimme n'a pas été epargné mais je voulais vraiment pouvoir l'utiliser depuis mon environnement de travail (car ca me fait gagner un peu de temps finalement...). Laissez moi vous dire que gérer à la fois unix/osx/windows et les environnements proxié/non-proxié n'est pas une mince affaire, qui ne va pas sans quelques [bugs et issues](https://github.com/mklabs/gimme-assets/issues) mais le support basique est là, et devrait s'améliorer au fur et à mesure.

Scénario classique: gimme pour fonctionner dérrière un proxy a besoin d'une variable d'environnement particulière (la même que celle utilisé par git). Si placé, gimme saura qu'il doit se débrouiller dans cet environnement et enclenchera la logique approprié.

Synopsis classique - Erreur proxy: si une install prends anormalement trop de temps (<10s), gimme assumera que vous êtes derrière un proxy et qu'il lui faut les variables d'environnement correspondantes.

    $ » gimme install ace
      log   - Installing... ace
      error - Request timeout: You may be behind an http proxy.

    Try setting up $http_proxy environement variable:

    Unixes:
      export http_proxy=http://proxy:port

    Windows:
      set http_proxy=http://proxy:port

Une fois les bonnes variables d'environnement placées:

    $ » gimme install ace
      log   - Installing... ace
      log   - all done
      debug - install done in 0.016s

    $ gimme install jquery
      log   - Installing... jquery
      log   - all done
      debug - install done in 2.131s

    $ ls js/libs/
    ace.js  jquery.min.js

BOOM. done.

### gimme vnext

Je tente d'améliorer gimme régulièrement et ai sous le coude un tas d'idée et de commande qui resterait à implémenter. Certaines de ces fonctionnalités me font cruellement défaut, je devrais donc les ajouter très prochainement.

* commande html: une commande pour générer le bout d'html nécessaire et correspondant à une lib. Si cdnjs, le markup html retourné devrait utiliser la lib hébergés sur cdnjs avec le fallback correspondant.
  * une option comme `--append path/to/file.html` pourrait ajouter directement l'import de la lib qui va bien, à l'endroit qui va bien.

* commande add: une commande add permettrait de définir et gérer un ensemble de package custom, c'est à dire n'apparaissant pas dans les repository de cdnjs ou microjs. En pratique, ce serait une commande qui se comporterait comme `npm init` et lancerait une série de prompt pour définir un nouveau package (name, description, repo, branch, liste de fichiers). L'idée ici serait de pouvoir mapper non seulement un ensemble de fichier `.js` mais aussi `.css`, `.html`, `.less` ou encore un repository complet.

* compress / minify option: Toutes les libs présente sur cdnjs sont déja minifiés, l'intérêt est donc limité pour cdnjs mais une option `--compress` pourrait automatiquement passer les libs (ne finissant pas par `.min.js`) dans [uglifyjs](https://github.com/mishoo/UglifyJS) avant de les installer.

* commande bundle: ou tout autre nom approprié. Une légère variante à la commande install permettrait de concaténer / minifier la liste des libs en un seul "bundle" optimisé.

* commande coffee: Une simple commande qui s'interfacerait avec ma machine à expresso pour facilement... Okay, je →

### Conclusion / TLDR;

gimme gimme gimme...


