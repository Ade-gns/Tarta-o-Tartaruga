"use strict";
// Lanceur : liste des activités, langue, prénom et mise à l'échelle de la scène 1024×768.
// Pour brancher une activité, donner à son entrée le chemin de sa page dans `page`.
// `progression` (facultatif) : clé où l'activité enregistre `serie_terminee` ; le lanceur affiche alors « Terminé ».
const ACTIVITES = [
  { id:"tarta", page:"tarta.html", progression:"tarta-na-praia-progression" },
  { id:"labyrinthe", page:null },
  { id:"coquillages", page:null },
  { id:"binaire", page:null },
  { id:"formes", page:null }
];
const CLE_LANGUE = "tarta-na-praia-langue", CLE_PRENOM = "tarta-na-praia-prenom";
const LARGEUR_SCENE = 1024, HAUTEUR_SCENE = 768;
let langue = "fr";
const el = id => document.getElementById(id);

function lire(cle) { try { return localStorage.getItem(cle); } catch(erreur) { console.warn("Lecture indisponible", erreur); return null; } }
function ecrire(cle, valeur) { try { localStorage.setItem(cle, valeur); } catch(erreur) { console.warn("Mémorisation indisponible", erreur); } }
function serieTerminee(activite) { if (!activite.progression) return false; try { return JSON.parse(lire(activite.progression) || "{}").serie_terminee === true; } catch(erreur) { return false; } }
function t(cle) { const texte = (TEXTES_LANCEUR[langue] || TEXTES_LANCEUR.fr)[cle]; if (texte === undefined) { console.warn(`Clé de traduction manquante: ${cle}`); return TEXTES_LANCEUR.fr[cle] ?? cle; } return texte; }

function dateDuJour() {
  try { const texte = new Intl.DateTimeFormat(t("locale"), { weekday:"long", day:"numeric", month:"long" }).format(new Date()); return texte.charAt(0).toUpperCase() + texte.slice(1); }
  catch(erreur) { return ""; }
}

function afficherTextes() {
  document.documentElement.lang = t("code_html");
  document.querySelectorAll("[data-texte]").forEach(noeud => noeud.textContent = t(noeud.dataset.texte));
  document.querySelectorAll("[data-texte-aria]").forEach(noeud => noeud.setAttribute("aria-label", t(noeud.dataset.texteAria)));
  document.querySelectorAll("[data-texte-exemple]").forEach(noeud => noeud.placeholder = t(noeud.dataset.texteExemple));
  document.querySelectorAll(".bouton-langue").forEach(bouton => bouton.setAttribute("aria-pressed", String(bouton.dataset.langue === langue)));
  el("date").textContent = dateDuJour();
}

function changerLangue(code) { langue = TEXTES_LANCEUR[code] ? code : "fr"; ecrire(CLE_LANGUE, langue); afficherTextes(); }

// La scène garde ses dimensions de maquette et est agrandie ou réduite pour remplir la fenêtre.
function ajusterEchelle() {
  const largeur = document.documentElement.clientWidth, hauteur = document.documentElement.clientHeight, echelle = Math.min(largeur / LARGEUR_SCENE, hauteur / HAUTEUR_SCENE);
  el("scene").style.transform = `translate(${(largeur - LARGEUR_SCENE * echelle) / 2}px, ${(hauteur - HAUTEUR_SCENE * echelle) / 2}px) scale(${echelle})`;
}

function construire() {
  el("decor").innerHTML = Composants.decor();
  el("mascotte").innerHTML = Composants.tortue();
  ACTIVITES.forEach(activite => {
    const ligne = Composants.ligneActivite(activite, serieTerminee(activite));
    if (activite.page) ligne.querySelector("button").addEventListener("click", () => { window.location.href = activite.page; });
    el("activites").append(ligne);
  });
  el("barre").innerHTML = Composants.barreBas(Object.keys(TEXTES_LANCEUR));
  document.querySelectorAll(".bouton-langue").forEach(bouton => bouton.addEventListener("click", () => changerLangue(bouton.dataset.langue)));
  const prenom = el("prenom");
  prenom.value = lire(CLE_PRENOM) || "";
  prenom.addEventListener("input", () => ecrire(CLE_PRENOM, prenom.value.trim()));
}

const langueSauvee = lire(CLE_LANGUE);
if (langueSauvee && TEXTES_LANCEUR[langueSauvee]) langue = langueSauvee;
construire();
afficherTextes();
ajusterEchelle();
window.addEventListener("resize", ajusterEchelle);
