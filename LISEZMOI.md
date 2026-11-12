# Tarta na Praia

Mini-jeu éducatif de programmation par blocs pour les enfants de 7 à 11 ans, avec un décor inspiré des plages du Cap-Vert.

## Ouvrir le jeu hors ligne

Copiez le dossier sur une clé USB, puis ouvrez [index.html](./index.html) par double-clic dans un navigateur. Le lanceur s’affiche : choisissez la langue (FR | PT), écrivez votre prénom, puis cliquez sur une activité. Rien n’est téléchargé (les polices sont dans `polices/`), aucune installation ni connexion Internet n’est nécessaire.

## Brancher une nouvelle activité

Les activités 2 à 5 (labyrinthe, coquillages, pixels en binaire, formes) sont affichées « Bientôt ». Quand l’une d’elles existe, placez sa page à la racine et indiquez son chemin dans `page` (tableau `ACTIVITES` de `lanceur/lanceur.js`) : le bouton devient actif et lance la page.

## Ajouter un niveau

1. Ouvrez `tarta.html` et ajoutez un objet dans le tableau `NIVEAUX`.
2. Donnez-lui un `id`, une grille de 8 lignes, un `depart`, un `but`, un titre et une clé d’indice. `maxBlocs` est facultatif : il limite le nombre de blocs du programme (sans lui, pas de limite).
3. Ajoutez les textes correspondants dans `TEXTES.fr`, puis vérifiez la grille et les coordonnées.

La grille utilise `.` pour le sable, `#` pour un rocher, `S` pour le départ et `M` pour la mer. Le moteur parcourt automatiquement les niveaux : quand un niveau est réussi, le suivant s’affiche tout seul. Après le dernier niveau, le jeu ouvre l’écran de victoire (`victoire.html`) et enregistre `serie_terminee` dans la progression.

## Ajouter une langue en 3 étapes

1. Copiez le bloc `fr` dans `TEXTES` (jeu, `tarta.html`) et dans `TEXTES_LANCEUR` (`lanceur/textes.js`), et renommez-le, par exemple `pt`.
2. Traduisez toutes ses valeurs sans modifier les clés.
3. Lancez `node verifier_langues.js` pour vérifier que toutes les clés françaises existent dans la nouvelle langue, pour le jeu et pour le lanceur.

Les sélecteurs de langue se construisent automatiquement. Le choix est mémorisé dans le navigateur et partagé entre le lanceur, le jeu et l’écran de victoire (dont les textes sont aussi dans `TEXTES_LANCEUR`).

## Fichiers

- `index.html` : lanceur (écran d’accueil des activités).
- `lanceur/` : style (`lanceur.css`), textes FR/PT (`textes.js`), décor, tortue, icônes, ligne d’activité et barre du bas (`composants.js`), logique (`lanceur.js`).
- `polices/` : Fredoka et Nunito (woff2, sous-ensemble latin) et leurs licences OFL.
- `tarta.html` : activité Tarta na Praia, jeu complet autonome (HTML, CSS et JavaScript).
- `victoire.html` : écran de victoire, affiché après le dernier niveau. « Rejouer » efface la progression (pas la langue ni le prénom) et relance le niveau 1 ; « Retour au menu » ouvre le lanceur.
- `victoire/` : style (`victoire.css`), étoiles et icônes des boutons (`composants.js`), logique (`victoire.js`).
- `images/victoire-A.svg` : illustration de fond de l’écran de victoire (à ne pas modifier).
- `verifier_langues.js` : vérification des clés d’internationalisation.
