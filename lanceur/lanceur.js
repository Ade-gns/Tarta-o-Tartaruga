"use strict";
// Lanceur : liste des activités, langue, prénom et mise à l'échelle de la scène 1024×768.
// Pour brancher une activité, donner à son entrée le chemin de sa page dans `page`.
// `progression` (facultatif) : clé où l'activité enregistre `serie_terminee` ; le lanceur affiche alors « Terminé ».
// `langueDansUrl` (facultatif) : la page reçoit la langue en paramètre (`?lang=fr`).
const ACTIVITES = [
  { id:"tarta", page:"tarta.html", progression:"tarta-na-praia-progression" },
  { id:"labyrinthe", page:"labyrinthe/index.html", progression:"labyrinthe_niveaux", langueDansUrl:true },
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
  majPleinEcran();
}

function changerLangue(code) { langue = TEXTES_LANCEUR[code] ? code : "fr"; ecrire(CLE_LANGUE, langue); afficherTextes(); }

// Mise en page plein écran. Les tailles des blocs sont celles de la maquette (unités de maquette) ;
// l'échelle e convertit en pixels. Deux dispositions : paysage (maquette 1024×768) et portrait (empilée,
// prévue pour 740×1018), et on garde celle qui permet les plus grands blocs.
function placer(id, x, y, e, largeur) {
  const bloc = el(id);
  bloc.style.left = `${x * e}px`; bloc.style.top = `${y * e}px`;
  bloc.style.transform = `scale(${e})`;
  if (largeur !== undefined) bloc.style.width = `${largeur}px`;
}
function mettreEnPage() {
  const L = document.documentElement.clientWidth, H = document.documentElement.clientHeight;
  const ePaysage = Math.min(L / LARGEUR_SCENE, H / HAUTEUR_SCENE), ePortrait = Math.min(L / 740, H / 1018);
  const portrait = ePortrait > ePaysage, e = portrait ? ePortrait : ePaysage;
  const largeur = L / e, hauteur = H / e;                       // fenêtre en unités de maquette
  const largeurBandeau = Math.min(640, largeur - 196);          // laisse la place du bouton plein écran
  placer("bandeau", (largeur - largeurBandeau) / 2, 18, e, largeurBandeau);
  placer("plein-ecran", largeur - 82, 18, e);
  const etroite = largeur - 48 < 900, hauteurBarre = etroite ? 156 : 84;   // barre étroite : date sur une 2e ligne
  el("barre").classList.toggle("etroite", etroite);
  placer("barre", 24, hauteur - 8 - hauteurBarre, e, largeur - 48);       // collée en bas, sur toute la largeur
  placer("mascotte", 14, hauteur - 20 - hauteurBarre - 246, e);           // coin bas gauche, au-dessus de la barre
  // Panneau : centré dans l'espace libre (à droite de la tortue en paysage, entre le bandeau et la tortue en portrait).
  const xPanneau = portrait ? (largeur - 692) / 2 : Math.max(308, (largeur - 692) / 2);
  const yPanneau = portrait ? Math.max(134, (118 + hauteur - 278 - hauteurBarre) / 2 - 269) : Math.max(134, (118 + hauteur - 8 - hauteurBarre) / 2 - 265);
  placer("panneau", xPanneau, yPanneau, e);
  // Décor : le viewBox couvre toute la fenêtre, sans déformation ; soleil à droite, sable et étoile de mer en bas.
  el("decor-svg").setAttribute("viewBox", `0 0 ${largeur} ${hauteur}`);
  el("ancre-droite").setAttribute("transform", `translate(${largeur - LARGEUR_SCENE} 0)`);
  el("ancre-bas").setAttribute("transform", `translate(0 ${Math.max(0, hauteur - HAUTEUR_SCENE)})`);
}

// Plein écran : bouton masqué si l'API n'existe pas ; le jeu reste utilisable sans.
const racine = document.documentElement;
const demanderPleinEcran = racine.requestFullscreen || racine.webkitRequestFullscreen;
function enPleinEcran() { return !!(document.fullscreenElement || document.webkitFullscreenElement); }
function majPleinEcran() { el("plein-ecran").setAttribute("aria-label", t(enPleinEcran() ? "quitter_plein_ecran" : "plein_ecran")); }
function basculerPleinEcran() {
  if (enPleinEcran()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else { const promesse = demanderPleinEcran.call(racine); if (promesse && promesse.catch) promesse.catch(() => {}); }
}

function construire() {
  el("decor").innerHTML = Composants.decor();
  el("mascotte").innerHTML = Composants.tortue();
  ACTIVITES.forEach(activite => {
    const ligne = Composants.ligneActivite(activite, serieTerminee(activite));
    if (activite.page) ligne.querySelector("button").addEventListener("click", () => { window.location.href = activite.page + (activite.langueDansUrl ? `?lang=${langue}` : ""); });
    el("activites").append(ligne);
  });
  el("barre").innerHTML = Composants.barreBas(Object.keys(TEXTES_LANCEUR));
  document.querySelectorAll(".bouton-langue").forEach(bouton => bouton.addEventListener("click", () => changerLangue(bouton.dataset.langue)));
  const prenom = el("prenom");
  prenom.value = lire(CLE_PRENOM) || "";
  prenom.addEventListener("input", () => ecrire(CLE_PRENOM, prenom.value.trim()));
}

// Langue : paramètre `?lang=` (retour d'une activité), sinon celle mémorisée.
const langueDemandee = new URLSearchParams(window.location.search).get("lang"), langueSauvee = lire(CLE_LANGUE);
if (langueDemandee && TEXTES_LANCEUR[langueDemandee]) { langue = langueDemandee; ecrire(CLE_LANGUE, langue); }
else if (langueSauvee && TEXTES_LANCEUR[langueSauvee]) langue = langueSauvee;
construire();
if (demanderPleinEcran && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
  el("plein-ecran").hidden = false;
  el("plein-ecran").addEventListener("click", basculerPleinEcran);
  ["fullscreenchange", "webkitfullscreenchange"].forEach(evenement => document.addEventListener(evenement, majPleinEcran));
}
afficherTextes();
mettreEnPage();
window.addEventListener("resize", mettreEnPage);
window.addEventListener("orientationchange", mettreEnPage);
