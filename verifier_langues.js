#!/usr/bin/env node
const fs = require('fs');
const contenu = fs.readFileSync('index.html', 'utf8');
const bloc = contenu.match(/const TEXTES = (\{[\s\S]*?\n    \});/);
if (!bloc) { console.error('TEXTES introuvable dans index.html'); process.exitCode = 1; }
else {
  const textes = Function(`"use strict"; return (${bloc[1]});`)();
  const reference = new Set(Object.keys(textes.fr || {}));
  let erreur = false;
  for (const [langue, dictionnaire] of Object.entries(textes)) {
    if (langue === 'fr') continue;
    const manquantes = [...reference].filter(cle => !(cle in dictionnaire));
    if (manquantes.length) { erreur = true; console.log(`${langue}: clés manquantes: ${manquantes.join(', ')}`); }
    else console.log(`${langue}: toutes les clés sont présentes.`);
  }
  if (!erreur) console.log('Vérification terminée : aucune clé manquante.');
  process.exitCode = erreur ? 1 : 0;
}
