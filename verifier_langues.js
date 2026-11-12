#!/usr/bin/env node
const fs = require('fs');
// Chaque source : fichier, et comment en extraire le dictionnaire des langues.
const SOURCES = [
  { nom: 'tarta.html (jeu)', fichier: 'tarta.html', extraire: contenu => { const bloc = contenu.match(/const TEXTES = (\{[\s\S]*?\n    \});/); return bloc && Function(`"use strict"; return (${bloc[1]});`)(); } },
  { nom: 'lanceur/textes.js (lanceur)', fichier: 'lanceur/textes.js', extraire: contenu => Function(`${contenu}; return TEXTES_LANCEUR;`)() }
];
let erreur = false;
for (const source of SOURCES) {
  const textes = source.extraire(fs.readFileSync(source.fichier, 'utf8'));
  if (!textes) { erreur = true; console.error(`${source.nom}: dictionnaire introuvable`); continue; }
  const reference = new Set(Object.keys(textes.fr || {}));
  for (const [langue, dictionnaire] of Object.entries(textes)) {
    if (langue === 'fr') continue;
    const manquantes = [...reference].filter(cle => !(cle in dictionnaire));
    if (manquantes.length) { erreur = true; console.log(`${source.nom} — ${langue}: clés manquantes: ${manquantes.join(', ')}`); }
    else console.log(`${source.nom} — ${langue}: toutes les clés sont présentes.`);
  }
}
if (!erreur) console.log('Vérification terminée : aucune clé manquante.');
process.exitCode = erreur ? 1 : 0;
