#!/usr/bin/env node
// Compare les clés de chaque langue à celles du français et liste les clés manquantes (ou en trop).
// Usage : node verifier_langues.js   (depuis le dossier labyrinthe/ ou la racine du projet)
'use strict';
var fs = require('fs');
var path = require('path');

var contenu = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
var bloc = contenu.match(/<script id="donnees-textes">([\s\S]*?)<\/script>/);
if (!bloc) { console.error('Bloc <script id="donnees-textes"> introuvable dans index.html'); process.exit(1); }
var TEXTES = Function(bloc[1] + '; return TEXTES;')();

var reference = Object.keys(TEXTES.fr);
var erreur = false;
Object.keys(TEXTES).forEach(function (langue) {
  if (langue === 'fr') return;
  var cles = Object.keys(TEXTES[langue]);
  var manquantes = reference.filter(function (cle) { return cles.indexOf(cle) < 0; });
  var enTrop = cles.filter(function (cle) { return reference.indexOf(cle) < 0; });
  if (manquantes.length) { erreur = true; console.log(langue + ' : clés manquantes : ' + manquantes.join(', ')); }
  if (enTrop.length) console.log(langue + ' : clés absentes du français (ignorées) : ' + enTrop.join(', '));
  if (!manquantes.length) console.log(langue + ' : les ' + reference.length + ' clés sont présentes.');
});
console.log(erreur ? 'Des traductions sont à compléter.' : 'Vérification terminée : aucune clé manquante.');
process.exitCode = erreur ? 1 : 0;
