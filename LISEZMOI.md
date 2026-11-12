# Tarta-na-Praia

Mini-jeu éducatif de programmation par blocs pour les enfants de 7 à 11 ans, avec un décor inspiré des plages du Cap-Vert.

## Ouvrir le jeu hors ligne

Copiez le dossier sur une clé USB, puis ouvrez [index.html](./index.html) par double-clic dans un navigateur. Le jeu ne télécharge rien et ne nécessite aucune installation ni connexion Internet.

## Ajouter un niveau

1. Ouvrez `index.html` et ajoutez un objet dans le tableau `NIVEAUX`.
2. Donnez-lui un `id`, une grille de 8 lignes, un `depart`, un `but`, un `maxBlocs`, un titre et une clé d’indice.
3. Ajoutez les textes correspondants dans `TEXTES.fr`, puis vérifiez la grille et les coordonnées.

La grille utilise `.` pour le sable, `#` pour un rocher, `S` pour le départ et `M` pour la mer. Le moteur parcourt automatiquement les niveaux et le bouton de niveau suivant devient disponible dès qu’il y en a plusieurs.

## Ajouter une langue en 3 étapes

1. Copiez le bloc `fr` dans `TEXTES` et renommez-le, par exemple `pt`.
2. Traduisez toutes ses valeurs sans modifier les clés.
3. Lancez `node verifier_langues.js` pour vérifier que toutes les clés françaises existent dans la nouvelle langue.

Le sélecteur de langue se construit automatiquement et le choix est mémorisé dans le navigateur.

## Fichiers

- `index.html` : jeu complet autonome (HTML, CSS et JavaScript).
- `verifier_langues.js` : vérification des clés d’internationalisation.
