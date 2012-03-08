<!--config
{
  "Title": "Git, bien plus qu'un VCS",
  "Author": "Mickael Daniel",
  "Date": "Mon May 16 2011 19:49:46 GMT+0200 (CDT)"
}
config-->

Dans ce post, je ne vous parlerais pas de [Git](http://git-scm.com/) du point de vue VCS (version control system), je vais essayer de vous faire toucher du doigt une partie des possibilités offertes par Git.

Ce qui rend Git si génial ne vient en fait pas vraiment de ce que l'on entend communément (enfin si, c'est aussi génial pour ça):

* Git est rapide.

* Git est distribué.

* Git dispose d'un système de branche locale hyper efficace.

* Git fait partie de cette nouvelle génération de VCS qui ne vous pousse pas à la pause café à chaque commit. (true story!)

* et des millions d'autres raisons

Toutes ces choses ne sont en fait que la partie immergée de l'iceberg et nous font qu'entre-apercevoir les millions de possibilités offertes par cette plateforme.

Car, Oui, Git est bien plus qu'un VCS, Git est une plateforme.

## Git, un système de fichiers

Git représente une nouvelle et différente manière de manipuler et gérer vos données. Je l'utilise depuis deux ans maintenant de manière personnelle, et je n'ai aperçu cette possibilité et adopter cette vision que très récemment.

Ce qui importe réellement, c'est que Git apporte avec lui une autre manière de penser. Je ne parle pas de la manière dont vous gérez le versionning de votre code, mais de n'importe quelle donnée...

Git, à la base, n'était pas un VCS, comme [l'explique Linus Torvald](http://bit.ly/4UN1j)

> Anyway, the reason I can do it quickly is that my scripts will not be an SCM, they'll be a very specific "log Linus' state" kind of thing. That will make the linear patch merge a lot more time-efficient, and thus possible.

Toujours selon la même source [wikipédia](http://bit.ly/4UN1j), quelques uns des principes de départ de Git sont:

> 1. Take CVS as an example of what not to do; if in doubt, make the exact opposite decision.

2. Support a distributed, BitKeeper-like workflow.

3. Very strong safeguards against corruption, either accidental or malicious

4. Very high performance



La conception de git a été inspiré par [BitKeeper](http://www.bitkeeper.com/) et [Monotone](http://www.monotone.ca/main.php). Il a été conçu au départ comme un système bas-niveau de gestion de version. On peut voir la conception de Git comme le résultat de l'expérience de Torvald avec Linux pour maintenir un gros projet largement distribué, mais aussi de son expérience toujours concernant le même projet avec le système de fichiers et ses performances.

Git n'était pas, au départ, à proprement parler un logiciel de gestion de versions. [Linus Torvald expliquait que](http://marc.info/?l=linux-kernel&m=111293537202443): 

> It's not an SCM, it's a distribution and archival mechanism. I bet you could make a reasonable SCM on top of it, though. Another way of looking at it is to say that it's really a content-addressable filesystem, used to track directory trees.

On peut considérer Git comme un système de fichiers sous stéroïde. 

  

> In many ways you can just see git as a filesystem - it's content-addressable, and it has a notion of versioning, but I really really designed it coming at the problem from the viewpoint of a _filesystem_ person (hey, kernels is what I do), and I actually have absolutely _zero_ interest in creating a traditional SCM system.

_[source](http://marc.info/?l=linux-kernel&m=111314792424707)_

Git a été conçu en résolvant le problème du point de vue d'un spécialiste de systèmes de fichiers. Il a aujourd'hui évolué pour intégrer toutes les fonctionnalités d'un gestionnaire de version.

Le point important est: Git est, à la base, un système de gestion de fichiers hyper performant, originellement conçu comme un système de contrôle de version ultra bas niveau sur lequel on peut concevoir.. d'autre choses.

Git est une plateforme.

## Un champ immense de possibilités

Aujourd'hui, il existe plus de 100 commandes `git *`. C'est impressionnant, fait un peu peur également et peut porter à confusion mais...cela siginfie, au risque de me répéter, que Git est une plateforme... Sur lequel on peut concevoir des applications... Toutes sortes d'applications... 

Git est un nouvel outil. Et avoir un nouvel outil signifie que l'on peut créer de nouvelles choses, que l'on ne pouvait pas forcément faire avant (ou différemment... pardon difficilement).

Git est une nouvelle sorte de système de fichiers, et il est plus rapide que n'importe quel système de fichiers.

Git stocke l'historique complet des révisions des fichiers d'une arborescence, et il le fait avec une compression impressionnante.

Git dispose de millions d'autres qualités en passant par la sécurité et l'intégrité des données.

Ce sur quoi j'aimerais insister, c'est que Git n'est pas contraint à versionner des sources. On peut tout à fait versionner un ensemble de fichiers, quels qu'il soient, et accéder simplement à un outil surpuissant pour gérer tout et n'importe quoi. On peut penser (comme j'ai pu l'entendre dans l'épisode [Git j'ai vu la lumière épisode 23 des castcodeurs](http://lescastcodeurs.com/2010/05/les-cast-codeurs-podcast-episode-23-interview%C2%A0dvcs-et-git-jai-vu-la-lumiere-avec%C2%A0david-gageot-dalgodeal/)) à totalement gérer les plugins de son IDE comme Eclipse (si tant est que l'on utilise Eclipse). Les plugins Eclipse ne sont que des jar et zip structurés d'une certaine manière. Rien ne nous empêche de versionner notre conf Eclipse (et ainsi avoir la possibilité de gérer des branches, faire un revert d'un environnement corrompu, etc.).

Partant de ce postulat, on peut penser à des tas d'applications...

De nombreux projets ont conçus des systèmes de merge et diff sophistiqué pour wikis par exemple. En utilisant Git, les repository seraient à la fois petit (très petit), et l'on peut penser à faire une copie complète et locale d'un wiki.

La même chose s'applique aux moteurs de blogs, CMS, application de gestion de documentaire et j'en passe. Le blog que vous êtes en train de lire est en fait lui même propulsé et supporté par Git ([Wheat](https://github.com/creationix/wheat)).

[Gollum](https://github.com/github/gollum), le moteur derrière les wikis GitHub, repose essentiellement sur Git (via [Grit](https://github.com/mojombo/grit)) et [un bel](https://github.com/blog/699-making-github-more-open-git-backed-wikis) [exemple](https://github.com/blog/774-git-powered-wikis-improved) de ce que l'on peut faire avec un tel outil.

[toto](http://cloudhead.io/toto) est un autre bel exemple de Git appliqué à un moteur de blog. Simple et efficace.

On peut vraiment penser à de belles choses où une recherche devient un `git grep`, où une comparaison de fichier devient un `git diff`, où la sauvegarde d'un fichier devient un `git commit`, où la publication d'article ou de contenu se fait via un `git push`, où un `git clone` permet de récupérer l'ensemble du contenu d'un site, ...

Avec Git, un nouveau monde s'ouvre à nous où l'historique de révisions, les checksums et les branches ne rendent pas le système de fichiers plus lent, ils le rendent plus rapide. Ils ne rendent pas vos données plus volumineuses, ils les rendent plus petites. Ils ne risquent pas l'intégrité de vos données, ils la garantissent. Enfin, ils ne centralisent pas vos données dans une énorme base de données, ils les distribuent point par point.

Pour paraphraser [cet article](http://apenwarr.ca/log/?m=200801#31) (paru il y a de ça trois ans et qui m'a finalement fait écrire celui-ci), tout comme Unix, le projet Git en lui même importe peu, c'est le format, la philosophie, les concepts qui changent tout.

Je suis actuellement concentré sur le développement d'un nouveau moteur de blog, qui deviendra bientôt le moteur du présent site. Et les possibilités immenses offertes par Git, en dehors de la gestion de source classique, viennent toute juste de me sauter au visage. Dans toute leur splendeur.
