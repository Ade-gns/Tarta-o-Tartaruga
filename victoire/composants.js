"use strict";
// Composants de l'écran de victoire (maquette « Victoire A · Tortue au centre »).
const ComposantsVictoire = (() => {
  const TAILLES_ETOILES = [64, 72, 84, 72, 64];
  const etoile = taille => `<svg width="${taille}" height="${taille}" viewBox="-28 -28 56 56" aria-hidden="true"><polygon points="0,-24 6.3,-8.7 22.8,-7.4 10.3,3.3 14.1,19.4 0,10.8 -14.1,19.4 -10.3,3.3 -22.8,-7.4 -6.3,-8.7" fill="#FFC93C" stroke="#15361F" stroke-width="3.5" stroke-linejoin="round"/></svg>`;

  function etoiles() { return TAILLES_ETOILES.map(etoile).join(""); }

  const icones = {
    rejouer: `<svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true"><path d="M30 19 A11 11 0 1 1 24 9.3" fill="none" stroke="#15361F" stroke-width="4.5" stroke-linecap="round"/><path d="M19 4 L26.5 9.5 L19 15 Z" fill="#15361F" stroke="#15361F" stroke-width="2" stroke-linejoin="round"/></svg>`,
    maison: `<svg width="38" height="38" viewBox="0 0 38 38" aria-hidden="true"><path d="M9 18 V32 H29 V18" fill="#FFF9E6" stroke="#15361F" stroke-width="4.5" stroke-linejoin="round"/><path d="M5 19 L19 6 L33 19" fill="none" stroke="#15361F" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="16" y="23" width="6" height="9" fill="#15361F"/></svg>`
  };

  return { etoiles, icones };
})();
