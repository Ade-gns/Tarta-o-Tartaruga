"use strict";
// Écran de victoire réutilisable : victoire.html?type=niveau5 (par défaut) ou ?type=labyrinthe, et ?lang=fr|pt.
// Affiché par tarta.html après son dernier niveau et par labyrinthe/index.html après le sien.
// Textes : TEXTES_LANCEUR (lanceur/textes.js), langue partagée avec le lanceur et les activités.
const CLE_LANGUE = "tarta-na-praia-langue";
// Un type = une illustration sans texte + les textes et la mise en page de sa maquette.
// `rejouer` : page relancée depuis le début ; `progression` : clé effacée avant de rejouer.
const TYPES = {
  niveau5: { fond:"images/victoire-A.svg", message:"victoire_message", etoiles:[64, 72, 84, 72, 64], etiquetteEtoiles:"victoire_etoiles",
    rejouer:"tarta.html", langueDansUrl:false, progression:"tarta-na-praia-progression" },
  labyrinthe: { fond:"images/victoire-labyrinthe-A.svg", message:"victoire_labyrinthe_message", etoiles:[64, 84, 64], etiquetteEtoiles:"victoire_labyrinthe_etoiles",
    rejouer:"labyrinthe/index.html", langueDansUrl:true, progression:"labyrinthe_niveaux" }
};
const parametres = new URLSearchParams(window.location.search);
const nomType = TYPES[parametres.get("type")] ? parametres.get("type") : "niveau5", type = TYPES[nomType];
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

// Rejouer : oublie la partie en cours de l'activité (pas la langue ni le prénom) et la relance au niveau 1.
function rejouer() {
  try { localStorage.removeItem(type.progression); } catch(erreur) { console.warn("Effacement indisponible", erreur); }
  window.location.href = type.rejouer + (type.langueDansUrl ? `?lang=${langue}` : "");
}

function construire() {
  el("scene").classList.add(`type-${nomType}`);
  el("fond").src = type.fond;
  el("message").dataset.texte = type.message;
  el("etoiles").dataset.texteAria = type.etiquetteEtoiles;
  el("etoiles").innerHTML = ComposantsVictoire.etoiles(type.etoiles);
  el("rejouer").insertAdjacentHTML("afterbegin", ComposantsVictoire.icones.rejouer);
  el("menu").insertAdjacentHTML("afterbegin", ComposantsVictoire.icones.maison);
  el("rejouer").addEventListener("click", rejouer);
  el("menu").addEventListener("click", () => { window.location.href = `index.html?lang=${langue}`; });
}

// Langue : ?lang=, sinon celle mémorisée, sinon le français.
const langueDemandee = parametres.get("lang"), langueSauvee = lire(CLE_LANGUE);
if (langueDemandee && TEXTES_LANCEUR[langueDemandee]) langue = langueDemandee;
else if (langueSauvee && TEXTES_LANCEUR[langueSauvee]) langue = langueSauvee;
construire();
afficherTextes();
ajusterEchelle();
window.addEventListener("resize", ajusterEchelle);
el("rejouer").focus();
