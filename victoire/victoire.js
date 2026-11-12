"use strict";
// Écran de victoire, affiché par tarta.html quand le dernier niveau est réussi.
// Textes : TEXTES_LANCEUR (lanceur/textes.js), langue partagée avec le lanceur et le jeu.
const CLE_LANGUE = "tarta-na-praia-langue", CLE_PROGRESSION = "tarta-na-praia-progression";
const LARGEUR_SCENE = 1024, HAUTEUR_SCENE = 768;
let langue = "fr";
const el = id => document.getElementById(id);

function lire(cle) { try { return localStorage.getItem(cle); } catch(erreur) { console.warn("Lecture indisponible", erreur); return null; } }
function t(cle) { const texte = (TEXTES_LANCEUR[langue] || TEXTES_LANCEUR.fr)[cle]; if (texte === undefined) { console.warn(`Clé de traduction manquante: ${cle}`); return TEXTES_LANCEUR.fr[cle] ?? cle; } return texte; }

function afficherTextes() {
  document.documentElement.lang = t("code_html");
  document.querySelectorAll("[data-texte]").forEach(noeud => noeud.textContent = t(noeud.dataset.texte));
  document.querySelectorAll("[data-texte-aria]").forEach(noeud => noeud.setAttribute("aria-label", t(noeud.dataset.texteAria)));
}

// Même mise à l'échelle que le lanceur : la scène garde ses dimensions de maquette.
function ajusterEchelle() {
  const largeur = document.documentElement.clientWidth, hauteur = document.documentElement.clientHeight, echelle = Math.min(largeur / LARGEUR_SCENE, hauteur / HAUTEUR_SCENE);
  el("scene").style.transform = `translate(${(largeur - LARGEUR_SCENE * echelle) / 2}px, ${(hauteur - HAUTEUR_SCENE * echelle) / 2}px) scale(${echelle})`;
}

// Rejouer : oublie la partie en cours (pas la langue ni le prénom) et relance le niveau 1.
function rejouer() { try { localStorage.removeItem(CLE_PROGRESSION); } catch(erreur) { console.warn("Effacement indisponible", erreur); } window.location.href = "tarta.html"; }

function construire() {
  el("etoiles").innerHTML = ComposantsVictoire.etoiles();
  el("rejouer").insertAdjacentHTML("afterbegin", ComposantsVictoire.icones.rejouer);
  el("menu").insertAdjacentHTML("afterbegin", ComposantsVictoire.icones.maison);
  el("rejouer").addEventListener("click", rejouer);
  el("menu").addEventListener("click", () => { window.location.href = "index.html"; });
}

const langueSauvee = lire(CLE_LANGUE);
if (langueSauvee && TEXTES_LANCEUR[langueSauvee]) langue = langueSauvee;
construire();
afficherTextes();
ajusterEchelle();
window.addEventListener("resize", ajusterEchelle);
el("rejouer").focus();
