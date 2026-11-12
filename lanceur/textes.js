"use strict";
// Textes du lanceur et de l'écran de victoire (\u00a0 = espace insécable avant « ! » en français).
// Pour ajouter une langue : copier le bloc fr, le renommer, traduire les valeurs sans changer les clés,
// puis lancer `node verifier_langues.js`.
const TEXTES_LANCEUR = {
  fr: {
    code_html:"fr", locale:"fr-FR", langue_court:"FR", titre:"Tarta na Praia", sous_titre:"Apprends à programmer", tortue:"Tarta, la tortue",
    activites:"Activités", plein_ecran:"Plein écran", quitter_plein_ecran:"Quitter le plein écran", bientot:"Bientôt", termine:"Terminé", groupe_langue:"Langue", prenom:"Prénom", prenom_exemple:"Écris ton prénom",
    activite_tarta:"Tarta na Praia", aide_tarta:"Guide la tortue avec des blocs",
    activite_labyrinthe:"Le labyrinthe", aide_labyrinthe:"Trouve le chemin",
    activite_coquillages:"Les coquillages", aide_coquillages:"Retrouve les paires",
    activite_binaire:"Pixels en binaire", aide_binaire:"Colorie avec des 0 et des 1",
    activite_formes:"Les formes", aide_formes:"Trie les formes et les couleurs",
    victoire_titre:"Bravo\u00a0!", victoire_etoiles:"5 étoiles sur 5", victoire_message:"Tu as aidé la tortue à rejoindre la mer\u00a0!",
    victoire_rejouer:"Rejouer", victoire_menu:"Retour au menu",
    victoire_labyrinthe_message:"Tu as trouvé le chemin\u00a0!", victoire_labyrinthe_etoiles:"3 étoiles sur 3"
  },
  pt: {
    code_html:"pt-PT", locale:"pt-PT", langue_court:"PT", titre:"Tarta na Praia", sous_titre:"Aprende a programar", tortue:"Tarta, a tartaruga",
    activites:"Atividades", plein_ecran:"Ecrã inteiro", quitter_plein_ecran:"Sair do ecrã inteiro", bientot:"Em breve", termine:"Concluído", groupe_langue:"Língua", prenom:"Nome", prenom_exemple:"Escreve o teu nome",
    activite_tarta:"Tarta na Praia", aide_tarta:"Guia a tartaruga com blocos",
    activite_labyrinthe:"O labirinto", aide_labyrinthe:"Encontra o caminho",
    activite_coquillages:"As conchas", aide_coquillages:"Encontra os pares",
    activite_binaire:"Píxeis em binário", aide_binaire:"Pinta com 0 e 1",
    activite_formes:"As formas", aide_formes:"Ordena as formas e as cores",
    victoire_titre:"Parabéns!", victoire_etoiles:"5 estrelas em 5", victoire_message:"Ajudaste a tartaruga a chegar ao mar!",
    victoire_rejouer:"Jogar outra vez", victoire_menu:"Voltar ao menu",
    victoire_labyrinthe_message:"Encontraste o caminho!", victoire_labyrinthe_etoiles:"3 estrelas em 3"
  }
};
