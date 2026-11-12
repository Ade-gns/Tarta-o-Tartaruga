# Le labyrinthe

Deuxième activité de Tarta na Praia. Un petit crabe doit traverser un labyrinthe sur la plage pour rejoindre un coquillage. L'enfant compose un programme avec trois flèches (avancer, tourner à gauche, tourner à droite), puis appuie sur « Go ».

Tout est dans `index.html` : HTML, CSS, JavaScript et dessins SVG. La page fonctionne hors ligne, par double-clic. On l'ouvre depuis le lanceur, ou directement avec `index.html?lang=fr` ou `?lang=pt`.

## Organisation de `index.html`

| Bloc | Contenu |
|---|---|
| `<style>` | Mise en page 1024 × 768, mise à l'échelle pour remplir la fenêtre. |
| `<svg>` de symboles `dessin-…` | Sable, rocher, muret, coquillage, traces de pas, crabe (dos, côté, face, tête), flèches, étoile. |
| `<script id="donnees-niveaux">` | Les niveaux : uniquement des données. |
| `<script id="donnees-textes">` | Les textes FR et PT. |
| Dernier `<script>` | La logique (état, exécution pas à pas) et l'affichage. |

## Ajouter un niveau

Ajoutez un objet à la fin du tableau `NIVEAUX` (bloc `donnees-niveaux`). La logique n'est pas à modifier.

```js
{ id: "niveau-6", taille: 8, orientation: "droite", emplacements: 12, grille: [
  "#=######",
  "S.....=#",
  ...
] }
```

| Champ | Contenu |
|---|---|
| `id` | Identifiant unique : il sert à mémoriser les niveaux réussis. |
| `taille` | Nombre de cases par côté (6 à 8). |
| `grille` | `taille` chaînes de `taille` caractères : `#` rocher, `=` muret (les deux sont des murs), `.` sable, `S` départ, `E` coquillage. |
| `orientation` | Direction du crabe au départ : `haut`, `droite`, `bas` ou `gauche`. |
| `emplacements` | Nombre de cases de « Mon programme » (12 au maximum pour que tout tienne à l'écran). |

Lancez ensuite `node verifier_niveaux.js` : le niveau doit être résoluble, avec au moins 2 emplacements de plus que le programme le plus court (au plus 1 pour le dernier niveau). Le nombre d'étoiles et « Niveau X / Y » suivent automatiquement.

## Ajouter une langue

1. Dans le bloc `donnees-textes`, copiez le bloc `fr`, renommez-le (par exemple `kea`) et traduisez les valeurs sans changer les clés. `code_html` est la langue de la page, et `nom_langue` le libellé du bouton (par exemple `KEA`).
2. Lancez `node verifier_langues.js` pour lister les clés manquantes.
3. Pour que le lanceur propose aussi cette langue, ajoutez-la dans `../lanceur/textes.js`.

Une clé manquante est remplacée par le texte français, avec un avertissement dans la console.

## Scripts de vérification

Depuis ce dossier, ou depuis la racine du projet en ajoutant `labyrinthe/` devant :

```
node verifier_niveaux.js    # résolubilité et marge de chaque niveau, programme le plus court
node verifier_langues.js    # clés de chaque langue comparées au français
```

Les deux scripts se terminent avec le code 1 en cas de problème.

## Données enregistrées

| Clé `localStorage` | Contenu |
|---|---|
| `tarta-na-praia-langue` | Langue choisie, partagée avec le lanceur et les autres activités. |
| `labyrinthe_niveaux` | `{ "reussis": ["niveau-1", …], "serie_terminee": true/false }`. Le lanceur affiche « Terminé » quand `serie_terminee` vaut `true`. |

Sans stockage (navigation privée…), le jeu fonctionne normalement mais ne retient rien.

## Clavier

- **↑**, **←** et **→** ajoutent les ordres Avancer, Tourner à gauche et Tourner à droite.
- **Retour arrière** retire le dernier ordre.
- **Entrée** lance le programme (« Niveau suivant » après une réussite).
- **Tab** passe d'un bouton à l'autre.
