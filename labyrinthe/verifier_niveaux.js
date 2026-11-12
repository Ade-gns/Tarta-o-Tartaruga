#!/usr/bin/env node
// Vérifie que chaque niveau du labyrinthe est résoluble avec le nombre d'emplacements prévu.
// Recherche en largeur sur l'état (ligne, colonne, orientation) : chaque ordre coûte 1, donc le premier
// passage sur le coquillage donne le programme le plus court.
// Usage : node verifier_niveaux.js   (depuis le dossier labyrinthe/ ou la racine du projet)
'use strict';
var fs = require('fs');
var path = require('path');

var contenu = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
var bloc = contenu.match(/<script id="donnees-niveaux">([\s\S]*?)<\/script>/);
if (!bloc) { console.error('Bloc <script id="donnees-niveaux"> introuvable dans index.html'); process.exit(1); }
var NIVEAUX = Function(bloc[1] + '; return NIVEAUX;')();

var DIRECTIONS = ['haut', 'droite', 'bas', 'gauche'];
var DEPLACEMENTS = { haut: [-1, 0], droite: [0, 1], bas: [1, 0], gauche: [0, -1] };
var MURS = '#=';
var NOMS = { A: 'Avancer', G: 'Gauche', D: 'Droite' };

function trouver(grille, lettre) {
  for (var l = 0; l < grille.length; l++) { var c = grille[l].indexOf(lettre); if (c >= 0) return [l, c]; }
  return null;
}

// Applique un ordre ; un mur ou le bord laisse le crabe sur place, comme dans le jeu.
function appliquer(grille, etat, ordre) {
  var d = DIRECTIONS.indexOf(etat[2]);
  if (ordre === 'G') return [etat[0], etat[1], DIRECTIONS[(d + 3) % 4]];
  if (ordre === 'D') return [etat[0], etat[1], DIRECTIONS[(d + 1) % 4]];
  var pas = DEPLACEMENTS[etat[2]], l = etat[0] + pas[0], c = etat[1] + pas[1];
  if (l < 0 || c < 0 || l >= grille.length || c >= grille[l].length || MURS.indexOf(grille[l][c]) >= 0) return etat;
  return [l, c, etat[2]];
}

function plusCourtProgramme(niveau) {
  var depart = trouver(niveau.grille, 'S'), arrivee = trouver(niveau.grille, 'E');
  var debut = [depart[0], depart[1], niveau.orientation];
  var vus = {}; vus[debut.join()] = true;
  var file = [{ etat: debut, programme: '' }];
  while (file.length) {
    var courant = file.shift();
    if (courant.programme.length >= niveau.emplacements) continue;
    for (var i = 0; i < 3; i++) {
      var ordre = 'AGD'[i], suivant = appliquer(niveau.grille, courant.etat, ordre), cle = suivant.join();
      if (suivant[0] === arrivee[0] && suivant[1] === arrivee[1]) return courant.programme + ordre;
      if (!vus[cle]) { vus[cle] = true; file.push({ etat: suivant, programme: courant.programme + ordre }); }
    }
  }
  return null;
}

function erreursDeForme(niveau) {
  var erreurs = [];
  if (niveau.grille.length !== niveau.taille) erreurs.push('la grille a ' + niveau.grille.length + ' lignes au lieu de ' + niveau.taille);
  niveau.grille.forEach(function (ligne, i) {
    if (ligne.length !== niveau.taille) erreurs.push('la ligne ' + i + ' a ' + ligne.length + ' cases');
    if (/[^#=.SE]/.test(ligne)) erreurs.push('la ligne ' + i + ' contient un caractère inconnu');
  });
  ['S', 'E'].forEach(function (lettre) {
    var nombre = niveau.grille.join('').split(lettre).length - 1;
    if (nombre !== 1) erreurs.push(nombre + ' case(s) « ' + lettre + ' » au lieu d\'une');
  });
  if (DIRECTIONS.indexOf(niveau.orientation) < 0) erreurs.push('orientation inconnue : ' + niveau.orientation);
  return erreurs;
}

var echec = false;
NIVEAUX.forEach(function (niveau, index) {
  var dernier = index === NIVEAUX.length - 1;
  var entete = niveau.id + ' (' + niveau.taille + '×' + niveau.taille + ', ' + niveau.emplacements + ' emplacements)';
  var erreurs = erreursDeForme(niveau);
  if (erreurs.length) { echec = true; console.log('✗ ' + entete + ' : ' + erreurs.join(' ; ')); return; }
  var programme = plusCourtProgramme(niveau);
  if (!programme) { echec = true; console.log('✗ ' + entete + ' : IMPOSSIBLE avec ' + niveau.emplacements + ' ordres'); return; }
  var marge = niveau.emplacements - programme.length;
  // Marge : au moins 2 emplacements de plus que le minimum, sauf au dernier niveau (au plus 1).
  var margeOk = dernier ? marge <= 1 : marge >= 2;
  if (!margeOk) echec = true;
  console.log((margeOk ? '✓ ' : '✗ ') + entete + ' : ' + programme.length + ' ordres minimum, marge ' + marge +
    (margeOk ? '' : (dernier ? ' (doit être ≤ 1)' : ' (doit être ≥ 2)')));
  console.log('    ' + programme.split('').map(function (o) { return NOMS[o]; }).join(', '));
});
console.log(echec ? '\nCertains niveaux sont à corriger.' : '\nTous les niveaux sont résolubles, avec la bonne marge.');
process.exitCode = echec ? 1 : 0;
