"use strict";
// Composants du lanceur (maquette « A · Plage illustrée »). Chaque fonction renvoie du SVG ou un élément prêt à insérer.
// Les textes sont posés plus tard par lanceur.js grâce aux attributs data-texte, data-texte-aria et data-texte-exemple.
const Composants = (() => {
  const vague = (y, couleur, epaisseur, opacite, classe) => `<g class="${classe}"><path d="M-100 ${y} q25 -10 50 0${" t50 0".repeat(26)}" fill="none" stroke="${couleur}" stroke-width="${epaisseur}" stroke-linecap="round" opacity="${opacite}"/></g>`;
  const rayons = Array.from({length:12}, (_, i) => `<path d="M0 -54 V-68" transform="rotate(${i*30})"/>`).join("");
  const palme = transformation => `<path d="M0 0 C20 -34 78 -44 116 -6 C82 -22 36 -14 0 0 Z" transform="${transformation}"/>`;
  const grains = [[44,560],[130,606],[262,582],[340,716],[520,722],[700,718],[900,724],[980,690]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("");

  function decor() {
    return `<svg aria-hidden="true" viewBox="0 0 1024 768" width="1024" height="768">
<defs>
<linearGradient id="degrade-ciel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ADDF7"/><stop offset="1" stop-color="#E6F9FF"/></linearGradient>
<linearGradient id="degrade-mer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#169FC6"/><stop offset="1" stop-color="#22C7C8"/></linearGradient>
</defs>
<rect width="1024" height="270" fill="url(#degrade-ciel)"/>
<g transform="translate(24 36)" fill="#fff"><circle cx="30" cy="34" r="18"/><circle cx="56" cy="24" r="24"/><circle cx="84" cy="36" r="16"/><rect x="14" y="36" width="84" height="14" rx="7"/></g>
<g transform="translate(936 66)"><g stroke="#FFC93C" stroke-width="8" stroke-linecap="round">${rayons}</g><circle r="40" fill="#FFD34D" stroke="#15361F" stroke-width="4"/></g>
<rect y="262" width="1024" height="240" fill="url(#degrade-mer)"/>
${vague(300, "#9AF2E8", 5, .75, "vagues")}
${vague(346, "#FFFCF2", 4, .5, "vagues vagues-lentes")}
${vague(398, "#9AF2E8", 5, .6, "vagues")}
<rect y="488" width="1024" height="48" fill="#E7B563"/>
<rect y="534" width="1024" height="234" fill="#F7CF73"/>
<path d="M0 492 q32 -18 64 0${" t64 0".repeat(16)}" fill="none" stroke="#FFFCF2" stroke-width="12" stroke-linecap="round"/>
<g fill="#E0AA45">${grains}</g>
<polygon transform="translate(227 28)" points="45,604 49.1,614.3 60.2,615.1 51.7,622.2 54.4,632.9 45,627 35.6,632.9 38.3,622.2 29.8,615.1 40.9,614.3" fill="#FF6A3A" stroke="#15361F" stroke-width="3" stroke-linejoin="round"/>
<g transform="translate(150 316)">
<path d="M-8 30 q14 -8 28 0 t28 0 t28 0 t28 0" fill="none" stroke="#FFFCF2" stroke-width="5" stroke-linecap="round" opacity=".8"/>
<path d="M55 0 V-52" stroke="#15361F" stroke-width="4" stroke-linecap="round"/>
<path d="M55 -52 L82 -44 L55 -36 Z" fill="#FFC93C" stroke="#15361F" stroke-width="3" stroke-linejoin="round"/>
<path d="M0 0 H110 L96 24 H14 Z" fill="#FF6A3A" stroke="#15361F" stroke-width="4" stroke-linejoin="round"/>
<path d="M6 9 H104" stroke="#FFC93C" stroke-width="6"/>
<path d="M0 0 H110 L96 24 H14 Z" fill="none" stroke="#15361F" stroke-width="4" stroke-linejoin="round"/>
</g>
<path d="M26 520 C30 420 60 320 112 226" fill="none" stroke="#15361F" stroke-width="30" stroke-linecap="round"/>
<path d="M26 520 C30 420 60 320 112 226" fill="none" stroke="#8A5A2E" stroke-width="20" stroke-linecap="round"/>
<path d="M26 520 C30 420 60 320 112 226" fill="none" stroke="#6B4222" stroke-width="20" stroke-dasharray="3 22"/>
<g transform="translate(112 226)" fill="#2FA34A" stroke="#15361F" stroke-width="4" stroke-linejoin="round">
${palme("rotate(-30)")}${palme("rotate(15)")}${palme("scale(-1 1) rotate(-30)")}${palme("scale(-1 1) rotate(15)")}${palme("rotate(-75)")}${palme("scale(-1 1) rotate(-75)")}
<circle cx="-7" cy="10" r="8" fill="#8A5A2E"/><circle cx="9" cy="12" r="8" fill="#8A5A2E"/>
</g>
</svg>`;
  }

  function tortue() {
    const ecailles = [["184,112 167,141.4 133,141.4 116,112 133,82.6 167,82.6","#74CE57"],["184,170.8 167,200.2 133,200.2 116,170.8 133,141.4 167,141.4","#3FAE48"],["133,141.4 116,170.8 82,170.8 65,141.4 82,112 116,112","#3FAE48"],["235,141.4 218,170.8 184,170.8 167,141.4 184,112 218,112","#3FAE48"],["133,200.2 116,229.6 82,229.6 65,200.2 82,170.8 116,170.8","#74CE57"],["235,200.2 218,229.6 184,229.6 167,200.2 184,170.8 218,170.8","#74CE57"],["133,82.6 116,112 82,112 65,82.6 82,53.2 116,53.2","#3FAE48"],["235,82.6 218,112 184,112 167,82.6 184,53.2 218,53.2","#3FAE48"],["184,53.2 167,82.6 133,82.6 116,53.2 133,23.8 167,23.8","#74CE57"],["82,112 65,141.4 31,141.4 14,112 31,82.6 65,82.6","#74CE57"],["82,170.8 65,200.2 31,200.2 14,170.8 31,141.4 65,141.4","#3FAE48"],["286,112 269,141.4 235,141.4 218,112 235,82.6 269,82.6","#74CE57"],["286,170.8 269,200.2 235,200.2 218,170.8 235,141.4 269,141.4","#3FAE48"]]
      .map(([points, couleur]) => `<polygon fill="${couleur}" points="${points}"/>`).join("");
    const dome = "M34 202 C28 108 94 44 150 44 C214 44 272 108 266 202 Q150 238 34 202 Z";
    return `<svg viewBox="0 0 330 280" width="100%" height="100%" role="img" data-texte-aria="tortue">
<defs><clipPath id="dome-carapace"><path d="${dome}"/></clipPath></defs>
<ellipse cx="160" cy="262" rx="134" ry="13" fill="#5A2D05" opacity=".25"/>
<ellipse cx="128" cy="236" rx="22" ry="17" fill="#6FB43A" stroke="#15361F" stroke-width="5"/>
<ellipse cx="184" cy="238" rx="22" ry="17" fill="#6FB43A" stroke="#15361F" stroke-width="5"/>
<path d="M38 200 L6 222 L40 222 Z" fill="#A9E05E" stroke="#15361F" stroke-width="5" stroke-linejoin="round"/>
<circle cx="285" cy="142" r="37" fill="#15361F"/>
<path d="M258 196 L282 150" stroke="#15361F" stroke-width="52" stroke-linecap="round"/>
<circle cx="285" cy="142" r="31" fill="#A9E05E"/>
<path d="M258 196 L282 150" stroke="#A9E05E" stroke-width="40" stroke-linecap="round"/>
<circle cx="296" cy="132" r="9" fill="#fff" stroke="#15361F" stroke-width="3"/>
<circle cx="299" cy="133" r="4.5" fill="#15361F"/>
<circle cx="301" cy="131" r="1.7" fill="#fff"/>
<circle cx="273" cy="152" r="6" fill="#FF8C78" opacity=".75"/>
<path d="M281 155 Q296 169 310 152" fill="none" stroke="#15361F" stroke-width="4" stroke-linecap="round"/>
<g clip-path="url(#dome-carapace)">
<rect width="330" height="260" fill="#36A644"/>
<g stroke="#1D7432" stroke-width="4" stroke-linejoin="round">${ecailles}</g>
<ellipse cx="104" cy="92" rx="20" ry="9" transform="rotate(-32 104 92)" fill="#fff" opacity=".28"/>
</g>
<path d="${dome}" fill="none" stroke="#15361F" stroke-width="6" stroke-linejoin="round"/>
<path d="M34 202 Q150 238 266 202 L268 216 Q150 254 32 216 Z" fill="#F7CF73" stroke="#15361F" stroke-width="5" stroke-linejoin="round"/>
<ellipse cx="84" cy="238" rx="28" ry="20" fill="#A9E05E" stroke="#15361F" stroke-width="5"/>
<ellipse cx="224" cy="240" rx="28" ry="20" fill="#A9E05E" stroke="#15361F" stroke-width="5"/>
<circle cx="76" cy="236" r="3" fill="#6FB43A"/><circle cx="90" cy="244" r="3" fill="#6FB43A"/><circle cx="216" cy="238" r="3" fill="#6FB43A"/><circle cx="231" cy="246" r="3" fill="#6FB43A"/>
</svg>`;
  }

  const coquillage = transformation => `<g transform="${transformation}"><path d="M-14 10 C-24 -2 -17 -17 0 -19 C17 -17 24 -2 14 10 Q0 16 -14 10 Z" fill="#FF8C78" stroke="#15361F" stroke-width="4.5" stroke-linejoin="round"/><path d="M0 10 L-11 -13 M0 10 L0 -17 M0 10 L11 -13 M0 10 L-17 -2 M0 10 L17 -2" fill="none" stroke="#C9533F" stroke-width="3.2" stroke-linecap="round"/><rect x="-7" y="11" width="14" height="7" rx="2.5" fill="#FFE2BF" stroke="#15361F" stroke-width="4"/></g>`;
  const pixels = [[1,0,1],[1,1,1],[0,1,0]];
  const fondIcone = couleur => `<rect x="2" y="2" width="60" height="60" rx="15" fill="${couleur}" stroke="#15361F" stroke-width="3.5"/>`;
  const icones = {
    tarta: `${fondIcone("#8EE6DD")}
<rect x="48" y="4" width="6" height="5" rx="2" fill="#FFC93C" stroke="#15361F" stroke-width="2.5"/><rect x="44" y="7" width="14" height="11" rx="3" fill="#FFC93C" stroke="#15361F" stroke-width="2.5"/>
<g fill="#A9E05E" stroke="#15361F" stroke-width="2.5"><ellipse cx="15" cy="30" rx="8" ry="4.5" transform="rotate(-35 15 30)"/><ellipse cx="45" cy="30" rx="8" ry="4.5" transform="rotate(35 45 30)"/><ellipse cx="17" cy="51" rx="7" ry="4" transform="rotate(35 17 51)"/><ellipse cx="43" cy="51" rx="7" ry="4" transform="rotate(-35 43 51)"/><polygon points="27,52 33,52 30,59" stroke-linejoin="round"/><circle cx="30" cy="20" r="6"/></g>
<circle cx="28" cy="19" r="1.2" fill="#15361F"/><circle cx="32" cy="19" r="1.2" fill="#15361F"/>
<ellipse cx="30" cy="38" rx="13" ry="15" fill="#36A644" stroke="#15361F" stroke-width="3"/>
<polygon points="37,38 33.5,44.1 26.5,44.1 23,38 26.5,31.9 33.5,31.9" fill="#74CE57" stroke="#1D7432" stroke-width="2" stroke-linejoin="round"/>`,
    labyrinthe: `${fondIcone("#FFD35C")}
<rect x="12" y="12" width="40" height="40" rx="7" fill="#FFF9E6" stroke="#15361F" stroke-width="3"/>
<path d="M24 12 V26 M12 32 H38 V20 M26 52 V46 H52" fill="none" stroke="#15361F" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 47 V39 H45 V27" fill="none" stroke="#D9482B" stroke-width="3" stroke-linecap="round" stroke-dasharray="0.1 6.5"/>
<circle cx="17" cy="47" r="3.5" fill="#36A644" stroke="#15361F" stroke-width="2"/>
<path d="M45 25 V16" stroke="#15361F" stroke-width="2.5" stroke-linecap="round"/>
<path d="M45 16 L52 18.5 L45 21 Z" fill="#FF6A3A" stroke="#15361F" stroke-width="2" stroke-linejoin="round"/>`,
    coquillages: `${fondIcone("#FFB9A8")}${coquillage("translate(19 35) rotate(-10) scale(.66)")}${coquillage("translate(45 35) rotate(10) scale(.66)")}`,
    binaire: `${fondIcone("#CDEB8B")}
<g stroke="#15361F" stroke-width="2.5" stroke-linejoin="round">${pixels.map((ligne, l) => ligne.map((bit, c) => `<rect x="${11+c*14}" y="${11+l*14}" width="14" height="14" fill="${bit ? "#FF8C78" : "#fff"}"/>`).join("")).join("")}</g>
<g font-family="Fredoka, sans-serif" font-weight="700" font-size="12" fill="#15361F" text-anchor="middle">${pixels.map((ligne, l) => ligne.map((bit, c) => `<text x="${18+c*14}" y="${21+l*14}">${bit}</text>`).join("")).join("")}</g>`,
    formes: `${fondIcone("#A9D8F7")}
<polygon points="32,9 48,33 16,33" fill="#FF8C78" stroke="#15361F" stroke-width="3.5" stroke-linejoin="round"/>
<circle cx="20" cy="46" r="10" fill="#FFD35C" stroke="#15361F" stroke-width="3.5"/>
<rect x="33" y="36" width="20" height="20" rx="4" fill="#36A644" stroke="#15361F" stroke-width="3.5"/>`
  };

  const pastilleJouer = `<svg class="jouer" viewBox="0 0 56 56" aria-hidden="true"><circle class="jouer-fond" cx="28" cy="28" r="25" fill="#FFC93C" stroke="#15361F" stroke-width="3.5"/><path class="jouer-triangle" d="M22 17 L40 28 L22 39 Z" fill="#15361F" stroke="#15361F" stroke-width="3" stroke-linejoin="round"/></svg>`;
  const etiquetteBientot = `<span class="bientot"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3 H18 M6 21 H18 M7 3 C7 9 12 10 12 12 C12 14 7 15 7 21 M17 3 C17 9 12 10 12 12 C12 14 17 15 17 21" fill="none" stroke="#2E3B40" stroke-width="2.4" stroke-linecap="round"/></svg><span data-texte="bientot"></span></span>`;

  const etiquetteTermine = `<span class="termine"><svg width="22" height="22" viewBox="-12 -12 24 24" aria-hidden="true"><polygon points="0,-10 2.6,-3.6 9.5,-3.1 4.3,1.4 5.9,8.1 0,4.5 -5.9,8.1 -4.3,1.4 -9.5,-3.1 -2.6,-3.6" fill="#FFC93C" stroke="#15361F" stroke-width="2" stroke-linejoin="round"/></svg><span data-texte="termine"></span></span>`;

  // Une activité sans page est affichée « Bientôt » et désactivée ; une série terminée affiche « Terminé ».
  function ligneActivite(activite, terminee = false) {
    const element = document.createElement("li");
    element.innerHTML = `<button type="button" class="ligne${activite.page ? " disponible" : ""}"${activite.page ? "" : " disabled"}>
<svg class="icone" viewBox="0 0 64 64" aria-hidden="true">${icones[activite.id]}</svg>
<span class="texte"><span class="nom" data-texte="activite_${activite.id}"></span><span class="aide" data-texte="aide_${activite.id}"></span></span>
${terminee ? etiquetteTermine : ""}${activite.page ? pastilleJouer : etiquetteBientot}
</button>`;
    return element;
  }

  function barreBas(langues) {
    return `<div class="date-boite">
<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M4 16 V13 a6 6 0 0 1 6 -6 H30 a6 6 0 0 1 6 6 V16 Z" fill="#22C7C8"/><rect x="4" y="7" width="32" height="29" rx="6" fill="none" stroke="#15361F" stroke-width="3.5"/><path d="M4 16 H36 M13 3 V10 M27 3 V10" stroke="#15361F" stroke-width="3.5" stroke-linecap="round"/></svg>
<span class="date" id="date"></span>
</div>
<div class="langues" role="group" data-texte-aria="groupe_langue">${langues.map(code => `<button type="button" class="bouton-langue" data-langue="${code}" lang="${TEXTES_LANCEUR[code].code_html}" aria-pressed="false">${TEXTES_LANCEUR[code].langue_court}</button>`).join("")}</div>
<div class="champ"><label for="prenom" data-texte="prenom"></label><input id="prenom" type="text" autocomplete="off" maxlength="30" data-texte-exemple="prenom_exemple"></div>`;
  }

  return { decor, tortue, icones, ligneActivite, barreBas };
})();
