Title: Utilisation des hooks git/hg pour tester, valider et linter votre code
Author: Mickael Daniel
Date: Wed Nov 16 2011 17:39:15 GMT+0100 (CET)
Categories: git, hg, hooks, jshint, test

... ou comment s'assurer le titre de `clean pusher™`.

Dans cette article, je tenterais de présenter très brièvement le concept et l'utilisation de hooks pour Git et Mercurial, fournir quelques scripts que j'utilise pour automatiquement lancer une validation de code sur les fichiers edités dans le repository, ou encore lancer une suite de tests unitaires et échouer en fonction.

L'idée est simple, si le résultat de la suite de tests unitaire ou la validation du code échoue, le commit n'est pas autorisé, obligeant le développeur à fixer ce qui doit être fixé avant de commiter tout changement.

Bien que les exemples présentés ici se réfèrent a des besoins de projet JavaScript, il est tout à fait possible d'intégrer une suite de test play par exemple (ou mvn), ou d'utiliser bash, python, php, ruby, nodejs, etc. en tant qu'interpréteur de script (mais node est plutôt pas mal :p ).

## Donc, qu'est ce qu'un hook ?

Les hooks sont des petits scripts que l'on peut placer sous le répertoire `.git/hooks` pour Git ou référencer dans son `.hg/hgrc` pour Mercurial. Ces scripts permettent de déclencer une action à certain moment du cycle de vie des opérations de votre VCS.

Que ce soit pour hg ou git, retenez que que les hooks sont essentiellement des scripts qui sont executés avant ou après certaines commandes. Étant donné que les hooks sont exécutés localement et pas sur un server, ils permettent une grande liberté et la possibilité d'écrire des scripts très intéressants.

Que ce soit pour hg ou git, les scripts doivent être exécutables (`chmod +x`)

La plupart des hooks disposent de versions pre- et post-: on peut stopper un commit ou une autre opération dans le cas où une ou plusieurs règles projets ne sont pas respectées.

Les hooks sont des scripts exécutables (`chmod +x`) écrit en bash ou tout autre interpréteur. Un shebang (`#!`) indique quel interpréteur doit exécuter le script. (dans les exemples à suivre, il s'agira de script node). Les scripts indiquent alors le status de l'opération en exitant 0 (ok) ou autre chose que 0 (nok).

Pour git, quand `git init` est exécuté, quelques exemples de hooks sont copiés dans le répertoire `.git/hooks`, ces scripts sont désactivés par défaut. Pour activer un hook, il suffit d'enlever son extension `.sample`.

Pour hg, les scripts sont référencés depuis le fichier de conf `.hg/hgrc`. Dans le cas d'hg, je conseillerais de créer un répertoire `.hg/hooks` et d'y placer les différents scripts comme ce serait fait avec git. L'étape supplémentaire consistant à référencer ces scripts depuis le fichier `.hg/hgrc`.

Les scripts étant placés dans `.git` ou `.hg` (non versionné), ils peuvent être personnalisé de repo en repo ou pour chaque copie du repository.

## Client Side hooks

Ils existent deux principaux types de hooks: client-side and server-side. Dans cet article, je me concentrerais essentiellement sur les client-side hooks (et plus particulièrement le `pre-commit`). Ce sont des scripts exécutés sur le poste du développeur, la plupart du temps suite à des opérations qui impliquent de nouveaux commits ou modification de commits existants.

* [pre-commit](http://schacon.github.com/git/githooks.html#_pre_commit): exécuté avant un commit (probablement celui que j'utilise le plus).
* [prepare-commit-msg](http://schacon.github.com/git/githooks.html#_prepare_commit_msg): vous permet d'éditer le message par défaut avant que l'éditeur soit lancé.
* [commit-msg](http://schacon.github.com/git/githooks.html#_commit_msg): dernier étape dans laquelle on peut interrompre un commit.
* [commit-msg](http://schacon.github.com/git/githooks.html#_prepare_commit_msg): dernier étape dans laquelle on peut interrompre un commit.
* [post-commit](http://schacon.github.com/git/githooks.html#_post_commit): invoqué après l'exécution d'un commit, généralement utilisé pour notification.

Les autres client-side hooks ne sont pas exécutés par la commande `git commit`, mais leur nom est plutôt explicite. Se référencer aux mans (`git help hooks`) [pour plus d'infos](http://schacon.github.com/git/githooks.html).


Concernant Mercurial, [voici une liste des différents hooks disponibles](http://hgbook.red-bean.com/read/handling-repository-events-with-hooks.html#id401916), `precommit` étant celui qui nous intéresse ici.

**Note:** Bien que le book hg indique d'utiliser `precommit`, il s'agit en réalité de `pre-commit`. `precommit` ne fonctionnera pas (ma version hg étant 1.9.1)

## Exemple: npm test

Ce script permet de lancer la commande `npm test`, et `exit 1` dans le cas ou npm nous retourne des erreurs. La commande lancé par npm est décrit dans le `package.json` du repository, au niveau des script npm. ex: `{ "scripts": { "test": "vows test/*.js --spec" } }`

    #!/usr/bin/env node

    var npm = nrequire('npm');
    if (npm) return npm.load(function(e, n) {
      this.commands.test(function(e) {
        process.exit(e ? 1 : 0);
      });
    });
    
    
    // npm not installed locally, spawn process instead.
    // basically the same, but less pretty.
    var spawn = require('child_process').spawn,
      ch = spawn('npm', ['test']);
    
    ch.stdout.pipe(process.stdout, {end: false});
    ch.stderr.pipe(process.stderr);
    ch.on('exit', function (code) {
      process.exit(code ? 1 : 0);
    });
    
    
    function nrequire(m) {
      var n;
      try { n = require(m); }
      catch(e) { console.log('please, install ' + m + ' locally to be able to use it programmatically. will spawn process instead. \n'); }
      return n;
    }
    
Si la commande `npm test` s'est déroulé avec succès (aucun test fail), le commit sera possible, si ce n'est pas le cas git ou hg ne le permettra pas vous obligeant à corriger les tests avant de vous laisser commiter. Voyez le comme un moyen simple et pratique de vous assurer que tout ce qui est commité dans le repo (potentiellement pushé par la suite) ne casse pas la build.

`npm install npm` pour installer le package localement et permettre au script de l'utiliser programmatiquement. Pour une première installation, se référer au [readme du projet](http://npmjs.org/doc/README.html#Simple-Install-Unix-only-sorry). On peut également y trouver des instructions concernant l'installation de npm sur windows, mais veuillez noter que ces scripts n'ont pas été testés sous windows. Cedi dit, j'imagine qu'avec [msysgit](http://code.google.com/p/msysgit/), on devrait pouvoir s'en sortir (peut-être le sujet d'un prochain post, ou mise à jour de celui-ci).

## Exemple: jshint

Ce script permet de lancer [jshint](http://jshint.com/) automatiquement sur tout fichier en état "modifié" du repository. Très pratique puisqu'il ne vous empêchera pas de commits dû à des erreurs lints sur d'autres fichiers du repo, des fichiers que l'on a potentiellement jamais touché (ceci serait probablement plus le boulot du build d'intégration continue).

    #!/usr/bin/env node
    
    // todo: try to require jshint here, instead of spawning process, then fallback to spawning process.
    var jshint = nrequire('jshint');
    if (jshint) return process.exit(0);
    
    // jshint not installed locally, spawn process instead.
    // basically the same, but less pretty.
    var exec = require('child_process').exec;
    
    // Get the list of changed files in working dir. command depends on __dirname
    // where a path with `.git/` triggers the git command. otherwise hg.
    // git: git status -s
    // hg: hg status
    
    var cmd = /\.git\//.test(__dirname) ? 'git status -s' : 'hg status'
    
    exec(cmd, function(err, stdout) {
      if(err) return error(err);
    
      var changed = (stdout.match(/^\s?M\s(.+)/gim) || []).map(function(file) {
        return file.trim().replace(/^M\s?/, '');
      });
    
      if(!changed.length) return process.exit(0);
    
      console.log('Running jshint on', changed.length, 'files');
    
      exec('jshint ' + changed.join(' '), function(err, stdout) {
        if(err) return error(stdout);
        console.log(stdout);
        process.exit(0);
      });
    });
    
    function nrequire(m) {
      var n;
      try { n = require(m); }
      catch(e) { console.log('please, install ' + m + ' locally to be able to use it programmatically. will spawn process instead. \n'); }
      return n;
    }
    
    function error(err) {
      if(!(err instanceof Error)) err = new Error(err);
      console.error(err.message || err.stack);
      process.exit(1);
    }

Le script tente d'abord d'effectuer un `git status -s` (`-s` pour short format) ou un `hg status` en fonction du chemin du hook (en testant `__dirname`).

La sortie de la console pour la commande status est ensuite parsée pour récupérer tout fichier en état `M` dans le repo. Jshint est ensuite exécuté (en mode cli) avec pour arguments chacun des fichiers parsés depuis le `status` du repo.

Une amélioration à apporter serait d'utiliser jshint via son api, si jshint est installé localement (eg. présent dans node_modules).

`npm install jshint` pour installer le package localement, `npm install -g jshint` pour installer le package en global et vous permettre de lancer `jshint` depuis la console.

On peut définir une configuration que jshint chargera automatiquement par l'utilisation d'un fichier `.jshintrc` à la racine du repository.

## Installation / Utilisation des hooks

### git

Il suffit de remplacer le fichier `.git/hooks/pre-commit.sample` par le contenu du hook jshint ou npm test en s'assurant d'enlever le suffixe .sample (ou le laisser en place, l'important étant de disposer du fichier `.git/hooks/pre-commit`). Il faut ensuite s'assurer que le fichier est exécutable en lançant `chmod +x .git/hooks/pre-commit` si besoin.

Il suffit ensuite de lancer un `git commit` pour le voir en action. Dans le cas du hook npm. Il faut également s'assurer de définir un [script npm] test avec la commande désirée, autrement le hook ne servira probablement à rien avec npm tentant de lancer une commande test n'existant pas (dans ce cas, exit 0, le commit est autorisé).

Voici un petit script que j'utilise pour mettre automatiquement en place le [hook npm test](https://raw.github.com/gist/1246769/pre-commit) en tant que `pre-commit` hook:

    git init
    curl https://raw.github.com/gist/1246769/pre-commit >> .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    git commit

Le même script pointant sur [la version hook jshint](https://raw.github.com/gist/1367701/pre-commit):

    git init
    curl https://raw.github.com/gist/1367701/pre-commit >> .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    git commit

### hg

Concernant hg, le script est légèrement différent. Dans le cas de Mercurial, les hooks sont mis en place à l'aide du fichier `.hg/hgrc` (et donc via `~/.hgrc` permettant la mise en place de hooks globalement, pous plusieurs repos).

Voici le script équivalent pour installer le [hook npm test](https://raw.github.com/gist/1246769/pre-commit) en tant que pre-commit hook hg:

    hg init
    mkdir .hg/hooks
    curl https://raw.github.com/gist/1246769/pre-commit >> .hg/hooks/pre-commit
    chmod +x .hg/hooks/pre-commit
    
    echo '[hooks]' >> .hg/hgrc
    echo 'pre-commit = ./.hg/pre-commit' >> .hg/hgrc
    cat .hg/hgrc
    
    hg commit


Le même pour installer la [version jshint](https://raw.github.com/gist/1367701/pre-commit):


    hg init
    mkdir .hg/hooks
    curl https://raw.github.com/gist/1367701/pre-commit >> .hg/hooks/pre-commit
    chmod +x .hg/hooks/pre-commit
    
    echo '[hooks]' >> .hg/hgrc
    echo 'pre-commit = ./.hg/pre-commit' >> .hg/hgrc
    cat .hg/hgrc
    
    hg commit

### tips

Lors d'un `git commit`, vous pouvez bypasser les hooks en passant l'option `no-verify`.

Pour hg, je n'ai pas été en mesure de trouver l'option correspondante. Une alternative, si hg ne le permet pas, serait probablement de tester l'approche: "je parse les options de la ligne de commande et cherche le flag `no-verify` auquel cas j'exit 0 avant le reste du script."

### Conclusion

Que ce soit pour hg ou git, les hooks représentent une formidable moyen d'améliorer votre workflow, et généralement d'automatiser tout un tas de choses. Les possibilités ne se résument bien sûr pas au lancement de tests ou de lint de code.

Les client-side hooks fournissent une grande souplesse et la possibilité très intéressante de pouvoir faire a peu près n'importe quoi... et je conseille à quiconque travaillant avec hg ou git de jouer avec.

Les server-side hooks sont également très intéressants, on peut penser notamment au post-receive hook qui permet d'effectuer une action à chaque push sur le serveur.

Happy hooking :p

### Ressources

* git: http://progit.org/book/ch7-3.html
* git: http://book.git-scm.com/5_git_hooks.html
* git: http://schacon.github.com/git/githooks.html ou lancer `git help hooks`
* hg: http://hgbook.red-bean.com/read/handling-repository-events-with-hooks.html
* npm scripts: http://npmjs.org/doc/scripts.html
* jshint: http://www.jshint.com/
