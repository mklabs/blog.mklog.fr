<!--config
{
  "Title": "node et travis-ci",
  "Author": "Mickael Daniel",
  "Date": "Wed Sep 14 2011 22:08:40 GMT+0200 (CDT)",
  "Categories": "javascript",
  "Tags": "travis, javascript, ci"
}
config-->

Mais revenons au sujet du post: Utiliser Travis pour vos projets node

## Intro travis

> an open-source, distributed build system for the open-source community

Yay ! La première fois que j'ai entendu parler de Travis, le projet se décrivait "... for the ruby community". Le projet semblait très intéressant (il semble pas, il l'est), mais semblait ne pas s'appliquer à mon besoin: node (je ne suis suis pas (encore) un rubyist.. personne n'est parfait).

Puis récemment, [@loicfrering](http://twitter.com/#!/loicfrering), alors qu'on en était venu à parler CI, m'a refillé le lien vers Travis en me disant quelque chose du genre:

* "Tu devrais y jetter un coup d'oeil."

* moi: "ruby only?"

* lui: "tout, ruby, node, python, php, etc."

* moi: "http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/ ?"

* moi: "Enorme, exactement ce que je cherchais.."

Rapidement, le principe de Travis est de fournir [une VM avec un environnement complet](http://about.travis-ci.org/docs/user/ci-environment/), et de trigger un build sur le déclenchement d'un [post-receive hook](http://help.github.com/post-receive-hooks/) sur un de vos repository. Pour ce faire, il suffit de le configurer en fonction. Étant plutôt sympa, travis s'en charge également. C'est la raison pour laquelle Github OAuth demande des droits d'écriture sur votre compte: configurer le post-receive hook de votre repo pour pinger travis-ci.org. Le hook étant déclenché sur chacun des push effectué sur le repo. Travis n'effectuera aucun autre manipulation d'écriture sur votre compte.

Les VMs Travis intègre donc node 0.4.8 et npm 1.0.12. Les builds spawnant une VMs à chaque build en la rollbackant une fois terminé. Travis utilise l'excellentissime Vagrant pour gérer ses VMs, mais vous n'avez pas besoin de toucher à Vagrant pour faire tourner le tout (même s'il est fortement recommendé d'y jeter un oeil...)

Les VMs intégrant donc node et npm, on peut les utiliser pour effectuer les builds et lancer les tests. Le résultat du build indique si le build est passé ou a échoué. L'exit code standard `0` indique que tout s'est bien passé, tout autre exit code est compris par Travis comme un build ayant échoué.

## Configuration

La doc de Travis, simple et concise, est vraiment très claire. Toutes les étapes listées dans cet article viennent de la documentation du projet -> http://about.travis-ci.org/docs/user/getting-started/

Ce blog étant maintenue par un JavaScript nerd, je me concentrerais ici sur Travis et la mise en place du hook sur un projet node lambda: le blog que vous êtes en train de lire.

Le vaste sujet des tests unitaires (sans parler des tests fonctionnels ou d'intégration) est bien au delà du scope du présent post, et mériterait un article à lui tout seul. En attendant, vous pourriez jeter un oeil à cet article paru il y a de ça un petit moment sur le blog d'af83: [Testez votre code Node.js avec Vows](http://dev.af83.com/nodejs/testez-votre-code-nodejs-avec-vows/2011/02/03)

(*un article sur les tenants et aboutissant des tests sous node, avec un focus sur vows, async tests et macros est définitivement dans ma todolist + npm test*)

Si vous vous intéressez aux domaines des tests fonctionnels, et souhaitez vous pencher sur des solutions headless testing (et si jamais c'est pas le cas, sérieusement, vous devriez!), vous pourriez jeter un oeil à l'article sur le sujet paru sur le blog de clever age: [Mise en place de tests fonctionnels avec Zombie-js](http://www.clever-age.com/veille/blog/mise-en-place-de-tests-fonctionnels-avec-zombie-js.html)

## Quick Start

Assez de BlaBla, rentrons dans le vif du sujet.

En suivant le [Getting Started](http://about.travis-ci.org/docs/user/getting-started/) de la documentation:

* on s'inscrit: Inscription en passant par [Github OAuth](http://travis-ci.org/users/auth/github).

* ajout du post-receive hook: Une fois authentifié, se rendre sur sa page de [profil](http://travis-ci.org/profile). Vous devriez obtenir une liste de vos repos. Ensuite, il suffit de switcher le bouton on/off sur les repos que l'on veut intégrer à Travis.

![repos-list](/travis/repos-list.png)

Vous pourrez ensuite vous rendre sur la page des Services Hooks de la partie admin du repo: github.com/**user**/**repo**/admin/hooks (remplacer user par votre login, repo par le repository correspondant).

Vous devriez voir le service hook `Travis` correctement configuré (Wep, Travis a été intégré aux [github-services-hooks](https://github.com/github/github-services))

*Note*: Les builds sont déclenchés grâce aux post-receive hook, à chaque push sur le repository, mais vous pouvez clicker sur le joli bouton `Test Hook` sur la page des services hook du repository.

### Builds

Travis par défaut traite votre repository comme un projet Ruby, et associe une [configuration de build](http://about.travis-ci.org/docs/user/build-configuration/) basée sur bundler/rake.

Un fichier de configuration `.travis.yml` à la racine du repo permet de configurer et adapter le build de Travis.

Le but étant de lancer une suite de tests pour un projet node, il nous faut utiliser un build légérement différent où il nous faudra vraisemblablement lancé un petit `npm install` suivi des tests,idéallement en utilisant `npm test`.

Okay, rendons nous alors au niveau de la page  [javascript-with-nodejs](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/) pour en apprendre un peu plus...

    before_script: "npm install --dev"

    script: "npm test"

*note:* c'était peut-être le cas avec de précédente version de npm (pre 1.0), je peux également dire une énorme connerie mais... je vous invite à essayer sans le `--dev`. L'idée étant d'install également les dependencies définies dans le `devDependencies` du package.json, censé contenir les dépendences de dev, nécessaire par expl à l'éxecution de tests. Cependant, le `--dev` n'est normalement pas nécessaire, les `devDependencies` du projet devrait être gérés. La présence du `--dev` par contre a une incidence sur comment npm gére les `devDeps` des sous modules, en les installant pouvant inutilement alonger le temps de build

*2nd note:* Ceci est à confirmer, mais en théorie, on pourrait utiliser le flag `--npat` de npm pour faire des tests une condition de l'install, npm se chargeant de récursivement run les tests de chaques modules/sous-modules et de fail l'install en fonction. Le script `.travis.yml` pourrait donc ainsi ressembler à:

    script: "npm install --npat"

Travis comprend également la notion de branche, vous permetant de configurer un build différent par branche si nécessaire.

### npm test

Pour pouvoir lancer `npm test` correctement (sans que la console nous traite de tous les noms), il faut impacter le package.json en fonction en utilisant les [scripts npm](http://npmjs.org/doc/scripts.html).

En pratique, on utilise surtout la partie test du cycle de vie géré par npm.

    "scripts": {"test":"vows tests/*.js --spec"}

[voir la partie relative de ce package.json](https://github.com/mklabs/nabe/blob/master/package.json#L28)

Notez que le script du `.travis.yml` peut définir absolument n'importe quoi: make, rake, cake.. Cake! (suis trèc cake en ce moment). Il n'y a aucune obligation à utiliser `npm test` (même si fortement recommandé)

Si tout est ok, un push sur votre repo, ou l'utilisation du bouton `Test Hook` devrait pinger travis-ci.org, qui se chargera de lancer le build de test. On peut également consulter l'état du build et son avancement en cliquant sur le [n° de version](http://travis-ci.org/#!/mklabs/nabe/builds/166927)

![output](/travis/output.png)

## Gotchas

Les VMs Travis intégrant node dans sa version 0.4.8, assurez vous d'utiliser des librairies correctement packagés, et ainsi vous éviter la frusration du build ne passant pas pour un [engine mal configuré](http://travis-ci.org/#!/mklabs/nabe/builds/156402)...

    npm ERR! Required: {"node":">= 0.5.0"}

    npm ERR! Actual:   {"npm":"1.0.12","node":"v0.4.8"}

Mon environnement de dev disposant de node dans sa version unstable > 0.5.0, l'erreur n'est alors pas apparente.

En règle générale, soyez attentif au packaging de vos dépendences en s'assurant que le package est correctement `npm install`-able.

## Enjoy

et faîtes quelques trucs sympas.

Travis est une superbe plateforme, par la communauté, pour la communauté. Un merci tout particulier à tous les membre de l'organisation s'impliquant et donnant d'eux même pour rendre tout ceci possible.

Je suis plus que conquis.

Je n'ai effleuré qu'une partie des possibilités offertes par Travis, vous aurez sûrement l'envie de creuser et pourquoi pas d'intégrer votre dernier fantastique projet open source dans une solution d'intégration continue. Comme les grands...

Travis gère également un tas de [configuration de DB différentes](http://about.travis-ci.org/docs/user/database-setup/), et permet même de mettre en place des tests [Selenium](http://about.travis-ci.org/docs/user/selenium-setup/).

